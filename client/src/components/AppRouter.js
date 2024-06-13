import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Create from "../pages/Create";
import Login from "../auth/Login";
import Table from "../pages/Table";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Create" element={<Create />} />
      <Route path="/login" element={<Login />} />
      <Route path="/table" element={<Table />} />
    </Routes>
  );
}

export default AppRoutes;
