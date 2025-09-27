const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const Order = require("../../models/Order");
const Product = require("../../models/Product");
const sendEmail = require("../../utils/email");

exports.createOrder = async (req, res) => {
  try {
    const { products } = req.body;

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
      totalAmount += product.price * item.quantity;
    }

    // Reduce product quantity
    for (const item of products) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity }
      });
    }
    const order = new Order({
      user: req.user.id,
      products,
      totalAmount,
    });

    await order.save();
    // inside placeOrder after saving the order
    await sendEmail(
      req.user.email,
      "Order Placed Successfully",
      `Your order with ID ${order._id} has been placed and is pending payment.`
    );

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate("products.productId");
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

//only for test purpose
exports.payOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.user.id;

    const order = await Order.findOne({ _id: orderId, user: userId });

    if (!order) {
      return res.status(404).json({ message: "Order Not Found" });
    }
    if (order.paymentStatus === "Paid") {
      return res.status(400).json({ message: "Order is already paid" });
    }
    if (order.paymentStatus !== "Pending") {
      return res.status(400).json({ message: "Order cannot be paid" });
    }    

    // Simulate payment success
    order.paymentStatus = "Paid";
    await order.save();
    // inside payOrder after saving the order
    await sendEmail(
      req.user.email,
      "Order Payment Successful",
      `Your order with ID ${order._id} has been successfully paid. Thank you for shopping with us!`
    );


    res.json({ message: "Payment successful", order });

  } catch (err) {
    console.error("pay order", err);
    res.status(500).json({ message: "Server error" });
  }
};

//to pay using our frontend 
exports.createPaymentIntent = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // ✅ Prevent re-payment
    if (order.paymentStatus === "Paid") {
      return res.status(400).json({ message: "Order already paid" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.totalAmount * 100), // amount in cents
      currency: "usd",
      metadata: { orderId: order._id.toString() }
    });

    res.json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    console.error("Payment Intent Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//To pay using stripe ui
exports.createCheckoutSession = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // ✅ Prevent re-payment
    if (order.paymentStatus === "Paid") {
      return res.status(400).json({ message: "Order already paid" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
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
      success_url: 'http://localhost:5000/payment-success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5000/payment-cancel',
    });

    res.json({ url: session.url }); // send back the hosted Stripe Checkout URL
  } catch (error) {
    console.error("Checkout Session Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
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

      const order = await Order.findById(orderId);
      if (order) {
        if (order.paymentStatus !== "Paid") {
          order.paymentStatus = "Paid";
          await order.save();
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
    const order = await Order.findById(orderId);

    if (!order) return res.status(404).send("Order not found");
    
    if (String(order.user) !== String(req.user.id)) {
      return res.status(403).send("Unauthorized");
    }
    
    if (session.payment_status === "paid" && order.paymentStatus !== "Paid") {
      order.paymentStatus = "Paid";
      await order.save();
    }

    res.render('payment-success', { order });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
