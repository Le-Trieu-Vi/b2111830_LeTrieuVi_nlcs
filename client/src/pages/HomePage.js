import React, { useEffect, useState } from 'react';
import axios from 'axios';


function HomePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <div className="bg-blue-500 text-white p-4">
        <h1 className="text-2xl text-center">Home Page!</h1>
        {/* Render dữ liệu từ API nếu cần */}
        <div>
          {data.map((item, index) => (
            <div key={index}>{item.name}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
