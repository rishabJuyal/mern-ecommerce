const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
    }
  ],
  statusHistory: [
    {
      status: { type: String },
      updatedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"], default: "Pending" },
  paymentStatus: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
  paymentStatusHistory: [
    {
      status: { type: String },
      updatedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  paymentMethod: { type: String, enum: ["ONLINE", "COD"], default: "ONLINE" },
  orderPlaceStatus : {type: String, enum: ["Pending", "Placed"], default: "Pending" },
}, { timestamps: true });

// Middleware to add initial status history entry when saving
orderSchema.pre('save', function(next) {
  if (this.isNew) {
      this.statusHistory.push({ status: this.status });
      this.paymentStatusHistory.push({ status: this.paymentStatus });
  }
  next();
});

module.exports = mongoose.model("Order", orderSchema);
