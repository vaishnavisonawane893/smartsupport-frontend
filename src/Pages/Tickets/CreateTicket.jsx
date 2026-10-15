import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";

const CreateTicket = () => {
  const navigate = useNavigate();

  const categories = [
    "Electrical Issue",
    "Network Issue",
    "Billing Problem",
    "Software Error",
    "Hardware Failure",
    "Other",
  ];

  const priorities = ["Low", "Medium", "High"];

  const [form, setForm] = useState({
    title: "",
    category: "",
    priority: "Medium",
    description: "",
    attachment: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "attachment") {
      setForm({ ...form, attachment: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: form.title,
      description: form.description,
      category: form.category,
      priority: form.priority,
    };

    try {
      await api.post("/customer/tickets", payload);
      alert("Ticket created successfully!");
      handleClear();
      navigate("/my-tickets");
    } catch (error) {
      console.error(error);
      alert("Failed to submit ticket");
    }
  };

  const handleClear = () => {
    setForm({
      title: "",
      category: "",
      priority: "Medium",
      description: "",
      attachment: null,
    });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white mt-14 p-8 rounded-xl shadow-lg border">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Generate a New Ticket
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium mb-1">Issue Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Ex: Internet not working"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Category</label>

          <Listbox
            value={form.category}
            onChange={(value) => setForm({ ...form, category: value })}
          >
            <div className="relative">
              <Listbox.Button className="relative w-full px-4 py-2 border rounded-lg text-left bg-white cursor-pointer">
                <span className="block truncate">
                  {form.category || "Select category"}
                </span>
                <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-500" />
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
                <Listbox.Options className="absolute mt-2 w-full bg-white shadow-xl rounded-lg border z-50">
                  {categories.map((cat) => (
                    <Listbox.Option
                      key={cat}
                      value={cat}
                      className={({ active }) =>
                        `cursor-pointer px-4 py-2 ${
                          active ? "bg-blue-100 text-blue-600" : "text-gray-900"
                        }`
                      }
                    >
                      {({ selected }) => (
                        <div className="flex items-center justify-between">
                          <span>{cat}</span>
                          {selected && (
                            <CheckIcon className="h-5 w-5 text-blue-600" />
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

        <div>
          <label className="block font-medium mb-1">Priority</label>

          <Listbox
            value={form.priority}
            onChange={(value) => setForm({ ...form, priority: value })}
          >
            <div className="relative">
              <Listbox.Button className="relative w-full px-4 py-2 border rounded-lg text-left bg-white cursor-pointer">
                <span className="block truncate">{form.priority}</span>
                <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-500" />
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
                <Listbox.Options className="absolute mt-2 w-full bg-white shadow-xl rounded-lg border z-50">
                  {priorities.map((p) => (
                    <Listbox.Option
                      key={p}
                      value={p}
                      className={({ active }) =>
                        `cursor-pointer px-4 py-2 ${
                          active ? "bg-blue-100 text-blue-600" : "text-gray-900"
                        }`
                      }
                    >
                      {({ selected }) => (
                        <div className="flex items-center justify-between">
                          <span>{p}</span>
                          {selected && (
                            <CheckIcon className="h-5 w-5 text-blue-600" />
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

        <div>
          <label className="block font-medium mb-1">Issue Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Explain the issue you are facing..."
          ></textarea>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Submit Ticket
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTicket;
