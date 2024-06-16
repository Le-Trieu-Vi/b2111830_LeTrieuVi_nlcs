import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../Config";
import { useParams, useNavigate } from "react-router-dom";
import MenuCategory from "../Caterories/MenuCategory";
import ListDish from "../Dishes/ListDish";
import Helper from "../../utils/Helper";
import {
  PencilSquareIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";

function TableDetail() {
  const { id } = useParams();
  const [table, setTable] = useState(null);
  const [error, setError] = useState(null);
  const [orderedItems, setOrderedItems] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [addDish, setAddDish] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [open, setOpen] = useState(false);
  const [showOrderedItems, setShowOrderedItems] = useState(true);
  const navigate = useNavigate();

  const fetchTable = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError(new Error("Vui lòng đăng nhập!"));
        return;
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await axios.get(`${baseUrl}/tables/${id}`);
      setTable(response.data);

      if (response.data.status === "unavailable") {
        const orderedItems = await response.data.orders;
        setOrderedItems(orderedItems);

        const dishes = orderedItems.flatMap((order) =>
          order.orderDetails.map((detail) => ({
            name: detail.dish.name,
            quantity: detail.quantity,
            price: detail.dish.prices[0].price,
          }))
        );

        const dishCount = dishes.reduce((acc, dish) => {
          if (!acc[dish.name]) {
            acc[dish.name] = { count: 0, price: dish.price };
          }
          acc[dish.name].count += dish.quantity;
          return acc;
        }, {});

        const mergedDishes = Object.entries(dishCount).map(
          ([name, { count, price }]) => ({
            name,
            count,
            price,
          })
        );
        setDishes(mergedDishes);
      }
    } catch (error) {
      setError(error);
      console.error("Lỗi:", error);
    }
  };

  useEffect(() => {
    fetchTable();
  }, [id, addDish]);

  const handleCategoryChange = (idCategory) => {
    setSelectedCategoryId(idCategory);
  };

  const handleAddDish = (dish) => {
    if (dish.id) {
      setAddDish((prev) => [...prev, dish]);
    } else {
      console.error("Dish is missing id:", dish);
    }
  };

  const toggleOrderedItems = () => {
    setShowOrderedItems((prev) => !prev);
  };

  const removeEventListener = (dishId) => {
    setAddDish((prev) => prev.filter((item) => item.id !== dishId));
  };

  const handleSubmitOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Vui lòng đăng nhập!");
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const userId = Helper.getIdByToken(token);

      const response = await axios.post(`${baseUrl}/orders`, {
        userId: userId,
        tableId: table.id,
        items: addDish.map((dish) => ({
          dishId: dish.id,
          quantity: dish.quantity,
          price: dish.price,
        })),
      });
      console.log("Đã gửi đơn hàng:", response.data);
      setAddDish([]);
    } catch (error) {
      setError(error);
      console.error("Lỗi khi gửi đơn hàng:", error);
    }
  };

  const handlePayment = async () => {
    console.log(orderedItems);
    navigate("/payment", { state: { orderedItems: orderedItems } });
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!table) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex ">
        <h1 className="text-2xl font-semibold ms-10">Bàn {table.number}</h1>
        <button className="flex items-center">
          <PencilSquareIcon className="h-6 w-6 ms-2  text-yellow-500 hover:text-yellow-600" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 my-6 min-h-96">
        <div className="bg-white rounded-lg p-8 shadow-lg z-10 mx-4">
          {addDish.length > 0 && (
            <>
              <h2 className="text-xl font-semibold mt-4 mb-2 cursor-pointer w-full text-left">
                Gọi thêm món
              </h2>
              <ul className="divide-y divide-gray-200">
                {addDish.map((dish) => (
                  <li
                    key={dish.id}
                    className="flex justify-between  items-center gap-x-6 py-5"
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
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <div className="flex items-center">
                        <span className="mx-2">Số lượng: {dish.quantity}</span>
                        <button
                          className="flex items-center"
                          onClick={() => removeEventListener(dish.id)}
                        >
                          <XMarkIcon className="h-8 w-8 ms-2  text-red-400 hover:text-red-600" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                className="bg-blue-500 text-white rounded-md px-4 py-2 mt-2 block ml-auto"
                onClick={handleSubmitOrder}
              >
                Gửi món
              </button>
            </>
          )}

          {orderedItems && (
            <div>
              <button
                className="flex items-center w-full"
                onClick={toggleOrderedItems}
              >
                <h2 className="text-xl font-semibold mt-4 mb-2 cursor-pointer w-full text-left">
                  {showOrderedItems ? (
                    <Fragment>
                      Các món đã gọi{" "}
                      <ChevronDownIcon className="h-6 w-6 inline" />
                    </Fragment>
                  ) : (
                    <Fragment>
                      Các món đã gọi{" "}
                      <ChevronUpIcon className="h-6 w-6 inline" />
                    </Fragment>
                  )}
                </h2>
              </button>

              {showOrderedItems && (
                <ul className="divide-y divide-gray-200">
                  {dishes.map((dish) => (
                    <li
                      key={dish.name}
                      className="flex justify-between gap-x-6 py-5"
                    >
                      <div className="flex min-w-0 gap-x-4">
                        <img
                          className="h-12 w-12 flex-none rounded-full bg-gray-50"
                          src={
                            dish.imageUrl || "https://via.placeholder.com/256"
                          }
                          alt={dish.name}
                        />
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {dish.name}
                          </p>
                        </div>
                      </div>
                      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <div className="flex items-center">
                          <span className="mx-2">{dish.count}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white rounded-md  px-4 py-2 mt-2 ml-auto block"
                    onClick={handlePayment}
                  >
                    Yêu cầu thanh toán
                  </button>
                </ul>
              )}
            </div>
          )}
        </div>
        <div className="bg-white rounded-lg p-8 shadow-lg z-10 mx-4">
          <div className="flex flex-wrap justify-between">
            <h2 className="text-xl font-semibold mt-4 mb-2">
              Danh sách món ăn
            </h2>
            <MenuCategory onCategoryChange={handleCategoryChange} />
          </div>
          {selectedCategoryId && (
            <ListDish
              selectedCategoryId={selectedCategoryId}
              onAddDish={handleAddDish}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default TableDetail;
