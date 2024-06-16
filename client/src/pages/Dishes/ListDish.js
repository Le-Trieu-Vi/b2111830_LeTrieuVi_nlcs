import React, { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../Config";
import Helper from "../../utils/Helper";

export default function ListDish({ selectedCategoryId, onAddDish }) {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Vui lòng đăng nhập!");
          return;
        }

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const response = await axios.get(
          `${baseUrl}/categories/${selectedCategoryId}`
        );
        setCategory(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi:", error);
        setLoading(false);
      }
    };
    if (selectedCategoryId) {
      setLoading(true);
      fetchDishes();
    }
  }, [selectedCategoryId]);

  useEffect(() => {
    if (category && category.dishes) {
      const initialQuantities = {};
      category.dishes.forEach((dish) => {
        initialQuantities[dish.id] = 1;
      });
      setQuantities(initialQuantities);
    }
  }, [category]);

  const handleIncrease = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: prevQuantities[id] + 1,
    }));
  };

  const handleDecrease = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: prevQuantities[id] > 1 ? prevQuantities[id] - 1 : 1,
    }));
  };

  const handleAddDish = (dish) => {
    const quantity = quantities[dish.id];
    onAddDish({ ...dish, quantity, id: dish.id});
    quantities[dish.id] = 1;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!category || !Array.isArray(category.dishes)) {
    return <div>No dishes available</div>;
  }

  const dishes = category.dishes;

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {dishes.map((dish) => (
        <li key={dish.id} className="flex justify-between gap-x-6 py-5">
          {console.log(dish)}
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
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                Giá bán: {Helper.customPrice(dish.prices[0].price)}
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <div className="flex items-center">
              <button
                type="button"
                className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 text-gray-500 hover:text-gray-700"
                onClick={() => handleDecrease(dish.id)}
              >
                <span className="sr-only">Decrease quantity</span>
                <span className="h-6 w-6">-</span>
              </button>
              <span className="mx-2">{quantities[dish.id]}</span>
              <button
                type="button"
                className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 text-gray-500 hover:text-gray-700"
                onClick={() => handleIncrease(dish.id)}
              >
                <span className="sr-only">Increase quantity</span>
                <span className="h-6 w-6">+</span>
              </button>
            </div>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center h-8 px-4 rounded-full bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => handleAddDish(dish)}
          >
            Thêm món
          </button>
        </li>
      ))}
    </ul>
  );
}
