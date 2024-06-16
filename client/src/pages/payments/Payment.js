import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Helper from "../../utils/Helper";
import baseUrl from "../../Config";
import axios from "axios";

function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderedItems } = location.state || { orderedItems: [] };

  const orderDetails = orderedItems.flatMap((order) => order.orderDetails);

  const mergedDishes = orderDetails.reduce((acc, detail) => {
    const existingDish = acc.find((dish) => dish.name === detail.dish.name);

    if (existingDish) {
      existingDish.count += detail.quantity;
    } else {
      acc.push({
        name: detail.dish.name,
        count: detail.quantity,
        price: detail.dish.prices[0].price,
      });
    }

    return acc;
  }, []);

  const handleSubmitPayment = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Vui lòng đăng nhập!");
        return;
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const updatedOrderDetails = orderDetails.map((detail) => ({
        ...detail,
        status: "completed"
      }));

      axios.put(`${baseUrl}/tables/${orderedItems[0].tableId}`, {
        status: "available",
      });

      updatedOrderDetails.map((detail) => {
        axios.put(`${baseUrl}/order-details/${detail.orderId}/${detail.dishId}`, {
          status: "completed",
        });
      });
      
      console.log("Đã gửi thanh toán", updatedOrderDetails);
      navigate("/table");
    } catch (error) {
      console.error("Lỗi khi gửi thanh toán:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-3xl">
        <h1 className="text-2xl font-semibold mb-4 text-center">Thanh toán</h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Các món đã gọi</h2>
          <ul className="divide-y divide-gray-200">
            {mergedDishes.map((dish, index) => (
              <li
                key={index}
                className="flex justify-between items-center gap-x-6 py-5"
              >
                <div className="flex min-w-0 gap-x-4">
                  <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src={dish.imageUrl || "https://via.placeholder.com/256"}
                    alt={dish.name}
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {dish.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Đơn giá: {Helper.customPrice(dish.price)}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <div className="flex items-center">
                    <span className="mx-2">Số lượng: {dish.count}</span>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <div className="flex items-center">
                    <span className="mx-2">
                      Thành tiền: {Helper.customPrice(dish.price * dish.count)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <div className="flex items-center justify-end mt-4">
                <p className="text-lg font-semibold leading-6 text-gray-900 mr-3">
                  Tổng
                </p>
                <span className="text-lg font-semibold text-gray-900">
                  {Helper.customPrice(
                    mergedDishes.reduce(
                      (total, dish) => total + dish.price * dish.count,
                      0
                    )
                  )}
                </span>
              </div>
            </div>
          </ul>
        </div>
        <form onSubmit={handleSubmitPayment} className="space-y-4">
          <div className="flex items-center justify-end">
            <button
              type="button"
              className="bg-red-500 hover:bg-red-400 text-white rounded-md px-4 py-2 mt-4 mx-5"
              onClick={() => navigate(-1)}
            >
              <span>Quay lại</span>
            </button>
            <button
              type="submit"
              className=" bg-blue-500 hover:bg-blue-400 text-white rounded-md px-4 py-2 mt-4"
            >
              Thanh toán
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaymentPage;
