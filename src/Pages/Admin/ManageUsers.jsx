import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = async (id) => {
    try {
      const res = await api.put(`/admin/users/${id}/toggle-status`);
      const updated = res.data;

      setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)));
    } catch (err) {
      console.error("Failed to toggle status", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/users/${id}`);

      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  };

  if (loading) return <p className="text-white">Loading users...</p>;
  console.log(users);
  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold text-cyan-400 mb-8">
        Users Management
      </h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search users..."
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
              <th>Phone</th>
              <th>Status</th>
              <th className="text-right pr-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users
              .filter(
                (u) =>
                  u.name.toLowerCase().includes(search.toLowerCase()) ||
                  u.email.toLowerCase().includes(search.toLowerCase())
              )
              .map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-slate-700/40 hover:bg-slate-700/20 transition"
                >
                  <td className="py-4 font-medium">{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                        user.status === "ACTIVE"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="flex justify-end space-x-4 py-4 pr-2">
                    <button
                      onClick={() => handleToggleStatus(user.id)}
                      className={`font-medium ${
                        user.status === "ACTIVE"
                          ? "text-red-400 hover:text-red-300"
                          : "text-green-400 hover:text-green-300"
                      }`}
                    >
                      {user.status === "ACTIVE" ? "Deactivate" : "Activate"}
                    </button>

                    <button
                      onClick={() => handleDelete(user.id)}
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

export default ManageUsers;
