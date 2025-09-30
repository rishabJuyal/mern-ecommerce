const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const Order = require("../../models/Order");
const Product = require("../../models/Product");
const sendEmail = require("../../utils/email");

//To pay using stripe ui
const createCheckoutSession = async (orderId) => {
  try {
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Order not found");

    // ✅ Prevent re-payment
    if (order.paymentStatus === "Paid") throw new Error("Order already paid");

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: `Order #${order._id}`,
            },
            unit_amount: Math.round(order.totalAmount * 100), // cents
          },
          quantity: 1,
        },
      ],
      metadata: {
        orderId: order._id.toString(),
      },
      success_url: 'http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5173/payment-cancel',
    });

    return session.url; // return the URL to caller
  } catch (error) {
    console.error("❌ Error creating Stripe Checkout session:", error.message);
    throw error;
  }
};

const updateOrderAndSendEmail = async (orderId, orderPlaceStatus, userEmail, isCOD) => {
  try {
    // Find the order by ID
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error("Order not found");
    }

    // Update the orderPlaceStatus and payment status
    order.orderPlaceStatus = orderPlaceStatus;
    // Save the order
    await order.save();

    const paymentMessage = isCOD
      ? "Your payment will be collected upon delivery (Cash on Delivery)."
      : "Your payment has been received successfully.";

    if (userEmail) {
      await sendEmail(
        userEmail,
        "Order Placed Successfully",
        `Your order with ID ${order._id} has been placed successfully. ${paymentMessage}`
      );
    }

    return order; // Return the updated order
  } catch (err) {
    console.error("Error updating order and sending email:", err);
    throw new Error("Error updating order and sending email");
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { products, paymentMethod, address} = req.body;

    if(!address){
      return res.status(404).json({ message: "Address is Missing" });
    }

    if (!paymentMethod) {
      return res.status(404).json({ message: "Payment Method is Missing" });
    }
    // Calculate total amount
    let totalAmount = 0;
    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ error: `Product ${item.product} not found` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ error: `Not enough stock for ${product.name}` });
      }
      if (!product.codAvailable && paymentMethod === "COD") {
        return res.status(400).json({ error: `Not COD available for ${product.name}` });
      }
      totalAmount += product.price * item.quantity;
    }

    // Reduce product quantity
    for (const item of products) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity }
      });
    }
    let order = new Order({
      user: req.user.id,
      products,
      totalAmount,
      orderPlaceStatus: "Pending",
      paymentMethod,
      address
    });

    await order.save();

    res.status(201).json({ order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.placeOrder = async (req, res) => {
  const { orderId } = req.body;
  let order = await Order.findById(orderId);
  if (!order) return res.status(404).json({ message: "Order not found" });

  if (String(order.user) !== String(req.user.id)) {
    return res.status(403).send("Unauthorized");
  }

  if (order.orderPlaceStatus == "Placed") {
    return res.status(400).json({ message: "Already placed" });
  }
  const paymentMethod = order.paymentMethod;
  // If it's COD, immediately send email and return the order
  if (paymentMethod === "COD") {
    order = await updateOrderAndSendEmail(order._id, "Placed", req.user.email, true);  // isCOD = true
    return res.status(201).json(order);  // Order is now placed, and email sent
  }

  if (paymentMethod === "ONLINE") {
    const checkoutUrl = await createCheckoutSession(orderId);
    return res.json({ url: checkoutUrl });
  }

  return res.status(400).json({ message: "Invalid payment method" });
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id, orderPlaceStatus: 'Placed' }).populate("products.productId");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user").populate("products.productId");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    order.status = status;
    order.statusHistory.push({ status });
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// webhook.route.js or inside your order controller
exports.stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('⚠️  Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const orderId = session.metadata.orderId;

      const order = await Order.findById(orderId).populate('user', 'name username email role');
      if (order) {
        if (order.paymentStatus !== "Paid") {
          order.paymentStatus = "Paid";
          await order.save();
          const userEmail = order.user.email;
          await updateOrderAndSendEmail(order._id, "Placed", userEmail, false);  // isCOD = false
          console.log(`✅ Order ${order._id} marked as paid via webhook`);
        } else {
          console.log(`⚠️ Order ${order._id} already marked as paid. Skipping.`);
        }
      } else {
        console.warn(`Order ${orderId} not found`);
      }
    }

    // Respond 200 OK to Stripe regardless if order was found or not
    res.json({ received: true });

  } catch (error) {
    console.error('Error handling webhook event:', error);
    // Return 500 so Stripe retries later
    res.status(500).send('Internal Server Error');
  }
};

//if webhook fails to hit our endpoint through ADMIN (Reconcile button)
exports.markOrderPaidManually = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.paymentStatus === "Paid") {
      return res.status(400).json({ message: "Order is already paid" });
    }

    // Optional: verify with Stripe if needed
    order.paymentStatus = "Paid";
    await order.save();

    res.json({ message: "Order marked as paid manually", order });
  } catch (err) {
    console.error("Manual payment update failed:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//double check after redirection to sucessurl 
exports.paymentSuccess = async (req, res) => {
  const sessionId = req.query.session_id;
  if (!sessionId) return res.status(400).send("Missing session ID");

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const orderId = session.metadata.orderId;
    let order = await Order.findById(orderId);

    if (!order) return res.status(404).send("Order not found");

    if (String(order.user) !== String(req.user.id)) {
      return res.status(403).send("Unauthorized");
    }

    if (session.payment_status === "paid" && order.paymentStatus !== "Paid") {
      order.paymentStatus = "Paid";
      await order.save();
      order = await updateOrderAndSendEmail(order._id, "Placed", null, false);  // isCOD = false
    }

    res.json({ order });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
