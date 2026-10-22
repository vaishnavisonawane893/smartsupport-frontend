import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import api from "../../api/axios";

const EditStaff = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const statuses = ["Active", "Inactive"];

  const reverseStatus = {
    ACTIVE: "Active",
    INACTIVE: "Inactive",
  };

  const statusToBackend = {
    Active: "ACTIVE",
    Inactive: "INACTIVE",
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    status: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchStaff = async () => {
    try {
      const res = await api.get(`/admin/staff/${id}`);
      const data = res.data;

      setForm({
        name: data.name,
        email: data.email,
        phone: data.phone,
        status: reverseStatus[data.status],
      });
    } catch (err) {
      setError("Failed to load staff details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        status: statusToBackend[form.status],
        role: "STAFF",
      };

      await api.put(`/admin/staff/${id}`, payload);

      navigate("/admin/staff");
    } catch (err) {
      setError("Failed to update staff.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-white">Loading staff details...</p>;

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold text-cyan-400 mb-8">Update Staff</h1>

      <div className="flex justify-center">
        <div className="bg-slate-800/40 p-8 rounded-2xl border border-white/10 backdrop-blur-xl max-w-xl shadow-xl w-full">
          {error && (
            <p className="mb-4 p-2 text-center text-red-300 bg-red-500/20 rounded-xl">
              {error}
            </p>
          )}

          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label className="block mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                className="w-full bg-slate-900/40 border border-slate-700 p-3 rounded-xl"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                name="email"
                className="w-full bg-slate-900/40 border border-slate-700 p-3 rounded-xl"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block mb-2">Contact Number</label>
              <input
                type="text"
                name="phone"
                className="w-full bg-slate-900/40 border border-slate-700 p-3 rounded-xl"
                value={form.phone || ""}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block mb-2">Status</label>

              <Listbox
                value={form.status}
                onChange={(value) => setForm({ ...form, status: value })}
              >
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-pointer rounded-xl bg-slate-900/60 border border-slate-700 py-3 pl-4 pr-10 text-left text-white">
                    <span className="block truncate">
                      {form.status || "Select status"}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                    </span>
                  </Listbox.Button>

                  <Transition
                    enter="transition duration-150"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition duration-100"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Listbox.Options className="absolute mt-2 w-full rounded-xl bg-slate-900/90 border border-slate-700 shadow-xl z-50 overflow-hidden">
                      {statuses.map((status) => (
                        <Listbox.Option
                          key={status}
                          value={status}
                          className={({ active }) =>
                            `cursor-pointer select-none px-4 py-3 ${
                              active
                                ? "bg-cyan-500/20 text-cyan-300"
                                : "text-white"
                            }`
                          }
                        >
                          {({ selected }) => (
                            <div className="flex items-center justify-between">
                              <span>{status}</span>
                              {selected && (
                                <CheckIcon className="h-5 w-5 text-cyan-400" />
                              )}
                            </div>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>

            <button
              type="submit"
              disabled={saving}
              className={`w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl shadow-lg transition ${
                saving ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {saving ? "Updating..." : "Update Staff"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditStaff;
