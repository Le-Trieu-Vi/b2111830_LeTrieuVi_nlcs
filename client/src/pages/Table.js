import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../Api';

function Table() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      axios.get(`${baseUrl}/tables`)
        .then((res) => {
          setData(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          setError(error);
          console.error("Lỗi:", error);
        });
    } else {
      console.error("Vui lòng đăng nhập!");
    }
  }, []);

  return (
    <div>
      <h1>Table</h1>
      {error && <p>Error: {error.message}</p>}
      {data ? (
        <div>
          {/* Hiển thị dữ liệu bảng */}
          {JSON.stringify(data)}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Table;
