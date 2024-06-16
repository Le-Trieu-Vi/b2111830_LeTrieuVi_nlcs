import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "../auth/Login";
import Table from "../pages/tables/Table";
// import AddTable from "../pages/AddTable";
import TableDetail from "../pages/tables/TableDetail";
import Payment from "../pages/payments/Payment";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/table" element={<Table />} />
      {/* <Route path="/table/add" element={<AddTable />} /> */}
      <Route path="/table/:id" element={<TableDetail />} />
      <Route path="/payment" element={<Payment />} />
    </Routes>
  );
}

export default AppRoutes;
