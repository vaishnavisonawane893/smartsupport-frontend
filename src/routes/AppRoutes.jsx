import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "../Pages/Home/HomePage";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Logout from "../Pages/Auth/Logout";
import Profile from "../Pages/Profile/Profile";

import ProtectedRoute from "../components/auth/ProtectedRoute";
import AdminRoute from "../components/auth/AdminRoute";

import CreateTicket from "../Pages/Tickets/CreateTicket";
import MyTickets from "../Pages/Tickets/MyTickets";
import TicketUpdates from "../Pages/Tickets/TicketUpdates";
import TicketDetails from "../Pages/Tickets/TicketDetails";

import AdminLayout from "../Pages/Admin/AdminLayout";
import Dashboard from "../Pages/Admin/Dashboard";
import ManageStaff from "../Pages/Admin/ManageStaff";
import AddStaff from "../Pages/Admin/AddStaff";
import EditStaff from "../Pages/Admin/EditStaff";
import ManageUsers from "../Pages/Admin/ManageUsers";
import AllTickets from "../Pages/Admin/AllTickets";
import ATicketDetails from "../Pages/Admin/TicketDetails";

import StaffDashboard from "../Pages/staff/StaffDashboard";
import StaffTickets from "../Pages/staff/StaffTickets";
import StaffTicketDetails from "../Pages/staff/StaffTicketDetails";
import StaffRemarks from "../Pages/staff/StaffRemarks";
// import STicketDetails from "../Pages/staff/TicketDetails";
// import StaffTickets from "../Pages/staff/StaffTickets";

import StaffLayout from "../Pages/staff/StaffLayout";
import Unauthorized from "../Pages/Auth/Unauthorized";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<Logout />} />

      {/* Customer Protected */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-ticket"
        element={
          <ProtectedRoute>
            <CreateTicket />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-tickets"
        element={
          <ProtectedRoute>
            <MyTickets />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ticket-updates"
        element={
          <ProtectedRoute>
            <TicketUpdates />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ticket/:ticketCode"
        element={
          <ProtectedRoute>
            <TicketDetails />
          </ProtectedRoute>
        }
      />

      {/* ADMIN ROUTES */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        {/* Admin pages  */}
        <Route index element={<Dashboard />} />
        <Route path="staff" element={<ManageStaff />} />
        <Route path="staff/add" element={<AddStaff />} />
        <Route path="staff/edit/:id" element={<EditStaff />} />
        <Route path="users" element={<ManageUsers />} />

        <Route path="tickets" element={<AllTickets />} />
        <Route path="ticket/:ticketId" element={<ATicketDetails />} />

        <Route path="reports" element={<div>Reports Coming Soon...</div>} />
      </Route>

      <Route path="/staff" element={<StaffLayout />}>
        <Route index element={<StaffDashboard />} />
        <Route path="tickets" element={<StaffTickets />} />
        <Route path="tickets/:code" element={<StaffTicketDetails />} />
        <Route path="remarks" element={<StaffRemarks />} />
      </Route>

      {/* Unauthorized */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
