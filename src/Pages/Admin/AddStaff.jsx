import React, { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

const AddStaff = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role: "STAFF", 
      };

      await api.post("/admin/staff", payload);

      navigate("/admin/staff");
    } catch (err) {
      const message = err?.response?.data?.message || "Failed to add staff.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold text-cyan-400 mb-8">Add Staff</h1>

      <div className="flex justify-center">
        <div className="bg-slate-800/40 p-8 rounded-2xl border border-white/10 backdrop-blur-xl max-w-xl shadow-xl w-full">
          {error && (
            <p className="mb-4 text-red-400 bg-red-500/20 p-2 rounded-lg text-center">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
           
            <div>
              <label className="block mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter staff name"
                className="w-full bg-slate-900/40 border border-slate-700 p-3 rounded-xl"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

           
            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter staff email"
                className="w-full bg-slate-900/40 border border-slate-700 p-3 rounded-xl"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            
            <div>
              <label className="block mb-2">Contact Number</label>
              <input
                type="text"
                name="phone"
                placeholder="Enter contact number"
                className="w-full bg-slate-900/40 border border-slate-700 p-3 rounded-xl"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            
            <div>
              <label className="block mb-2">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create password"
                className="w-full bg-slate-900/40 border border-slate-700 p-3 rounded-xl"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl shadow-lg transition ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Adding..." : "Add Staff"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStaff;
