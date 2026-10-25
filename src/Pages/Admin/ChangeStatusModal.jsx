import React, { useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";

const STATUS_MAP = {
  Open: "OPEN",
  "In Progress": "IN_PROGRESS",
  Resolved: "RESOLVED",
  Closed: "CLOSED",
};

const REVERSE_STATUS_MAP = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  RESOLVED: "Resolved",
  CLOSED: "Closed",
};

const ChangeStatusModal = ({ open, onClose, currentStatus, onUpdate }) => {
  const statuses = ["Open", "In Progress", "Resolved", "Closed"];

  const [selected, setSelected] = useState(
    REVERSE_STATUS_MAP[currentStatus] || "Open"
  );

  useEffect(() => {
    if (currentStatus) {
      setSelected(REVERSE_STATUS_MAP[currentStatus]);
    }
  }, [currentStatus]);

  if (!open) return null;

  const handleUpdate = () => {
    const apiStatus = STATUS_MAP[selected];
    onUpdate(apiStatus);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 p-6 rounded-2xl w-96 border border-white/10 shadow-xl">
        <h2 className="text-xl font-bold text-cyan-400 mb-4">Change Status</h2>

        <Listbox value={selected} onChange={setSelected}>
          <div className="relative mt-1">
            <Listbox.Button className="w-full cursor-pointer rounded-xl bg-slate-900/60 border border-slate-700 py-3 pl-4 pr-10 text-left text-white">
              <span className="block truncate">{selected}</span>
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
              <Listbox.Options className="absolute mt-2 w-full rounded-xl bg-slate-900 border border-slate-700 shadow-xl z-50">
                {statuses.map((state) => (
                  <Listbox.Option
                    key={state}
                    value={state}
                    className={({ active }) =>
                      `cursor-pointer select-none px-4 py-3 ${
                        active ? "bg-cyan-500/20 text-cyan-300" : "text-white"
                      }`
                    }
                  >
                    {({ selected }) => (
                      <div className="flex items-center justify-between">
                        <span>{state}</span>
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

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-700 rounded-xl hover:bg-slate-600"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeStatusModal;
