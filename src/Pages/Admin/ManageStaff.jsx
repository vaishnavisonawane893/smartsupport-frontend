import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const ManageStaff = () => {
  const navigate = useNavigate();

  const [staffList, setStaffList] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchStaff = async () => {
    try {
      const res = await api.get("/admin/staff");
      setStaffList(res.data);
    } catch (err) {
      console.error("Failed to fetch staff", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleToggleStatus = async (id) => {
    try {
      const res = await api.put(`/admin/staff/${id}/toggle-status`);

      setStaffList((prev) => prev.map((s) => (s.id === id ? res.data : s)));
    } catch (err) {
      console.error("Failed to toggle status", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/staff/${id}`);

      setStaffList((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Failed to delete staff", err);
    }
  };

  if (loading) return <p className="text-white">Loading staff...</p>;

  return (
    <div className="text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-cyan-400">Staff Management</h1>

        <button
          onClick={() => navigate("/admin/staff/add")}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded-xl shadow-md transition flex items-center gap-2"
        >
          ➕ Add Staff
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search staff..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-80 bg-slate-900/40 border border-slate-700 p-3 rounded-xl text-white focus:ring focus:ring-cyan-400/30"
        />
      </div>

      <div className="bg-slate-800/40 border border-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-xl overflow-x-auto">
        <table className="w-full min-w-[750px]">
          <thead>
            <tr className="text-left text-gray-300 border-b border-slate-700/70">
              <th className="py-3">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-right pr-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {staffList
              .filter(
                (s) =>
                  s.name.toLowerCase().includes(search.toLowerCase()) ||
                  s.email.toLowerCase().includes(search.toLowerCase())
              )
              .map((staff) => (
                <tr
                  key={staff.id}
                  className="border-b border-slate-700/40 hover:bg-slate-700/20 transition"
                >
                  <td className="py-4 font-medium">{staff.name}</td>
                  <td>{staff.email}</td>
                  <td>{staff.role}</td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                        staff.status === "ACTIVE"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {staff.status}
                    </span>
                  </td>

                  <td className="flex justify-end space-x-4 py-4 pr-2">
                    <button
                      onClick={() => navigate(`/admin/staff/edit/${staff.id}`)}
                      className="text-cyan-400 hover:text-cyan-300"
                    >
                      ✏️ Edit
                    </button>

                    <button
                      onClick={() => handleToggleStatus(staff.id)}
                      className={`font-medium ${
                        staff.status === "ACTIVE"
                          ? "text-red-400 hover:text-red-300"
                          : "text-green-400 hover:text-green-300"
                      }`}
                    >
                      {staff.status === "ACTIVE" ? "Deactivate" : "Activate"}
                    </button>

                    <button
                      onClick={() => handleDelete(staff.id)}
                      className="text-red-500 hover:text-red-400"
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageStaff;
