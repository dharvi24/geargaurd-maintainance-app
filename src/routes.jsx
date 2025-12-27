import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import TeamList from "./pages/teams/TeamList";
import TeamDetails from "./pages/teams/TeamDetails";
import EquipmentList from "./pages/equipment/EquipmentList";
import AddEquipment from "./pages/equipment/AddEquipment";
import EquipmentDetails from "./pages/equipment/EquipmentDetails";



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/teams" element={<TeamList />} />
      <Route path="/teams/:id" element={<TeamDetails />} />

      {/* Equipment */}
      <Route path="/equipment" element={<EquipmentList />} />
      <Route path="/equipment/add" element={<AddEquipment />} />
      <Route path="/equipment/:id" element={<EquipmentDetails />} />
    </Routes>
  );
};

export default AppRoutes;
