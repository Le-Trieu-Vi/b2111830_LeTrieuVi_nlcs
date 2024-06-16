import React, { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../Config";
import { Link, useParams } from "react-router-dom";
import TableItem from "./TableItem";
import TableModal from "./TableModal";
import { PlusIcon } from "@heroicons/react/20/solid";

function Table() {
  const [tables, setTables] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Vui lòng đăng nhập!");
          return;
        }

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const params = new URLSearchParams(window.location.search);
        const status = params.get("status");

        const response = await axios.get(`${baseUrl}/tables?status=${status}`);
        setTables(response.data);
      } catch (error) {
        setError(error);
        console.error("Lỗi:", error);
      }
    };
    fetchTables();
  }, []);

  const openModalAddTable = () => {
    setIsModalOpen(true);
  };

  const closeModalAddTable = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {error && <p>Error: {error.message}</p>}
      {tables ? (
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-14 lg:max-w-7xl lg:px-8">
            <div className="flex justify-end">
              <button
                onClick={openModalAddTable}
                className="flex items-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusIcon className="h-5 w-5 mr-1"/>
                Thêm bàn
              </button>
            </div>
            {isModalOpen && (
              <TableModal
                closeModalAddTable={closeModalAddTable}
                setTables={setTables}
              />
            )}
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 xl:gap-x-8">
              {tables.map((table) => (
                <Link to={`/table/${table.id}`} key={table.id}>
                  <TableItem table={table} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Table;
