import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders } from "../store/orderSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const { myOrders, status } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {status === "loading" ? (
        <p className="text-gray-500">Loading...</p>
      ) : myOrders.length === 0 ? (
        <p className="text-gray-600">No orders yet.</p>
      ) : (
        <div className="space-y-6">
          {myOrders.map((order) => (
            <div
              key={order._id}
              className="border rounded-md shadow-sm p-4 bg-white"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                <div>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Order ID:</span>{" "}
                    {order._id}
                  </p>
                  <p className="text-sm text-gray-500">
                    Placed on:{" "}
                    <span className="font-medium">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm mb-1">
                    <span className="text-gray-600">Status: </span>
                    <span
                      className={`inline-block px-2 py-1 rounded text-white text-xs ${
                        order.status === "Pending"
                          ? "bg-yellow-500"
                          : order.status === "Shipped"
                          ? "bg-blue-500"
                          : "bg-green-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-600">Payment: </span>
                    <span
                      className={`inline-block px-2 py-1 rounded text-white text-xs ${
                        order.paymentStatus === "Paid"
                          ? "bg-green-600"
                          : "bg-red-500"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </p>
                </div>
              </div>

              {/* Products List */}
              <div className="divide-y">
                {order.products.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center py-3 gap-4"
                  >
                    <img
                      src={item.productId.images[0]}
                      alt={item.productId.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.productId.name}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-gray-700">
                      ₹{item.productId.price}
                    </p>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="flex justify-end pt-4 border-t mt-4">
                <p className="text-lg font-bold">Total: ₹{order.totalAmount}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
