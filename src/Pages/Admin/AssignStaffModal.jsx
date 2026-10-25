import React, { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";

const AssignStaffModal = ({ open, onClose, staffList, onAssign }) => {
  const [selectedStaff, setSelectedStaff] = useState(null);

  if (!open) return null;

  const handleAssignClick = () => {
    if (!selectedStaff) return;
    onAssign(selectedStaff.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 p-6 rounded-2xl w-96 border border-slate-700 shadow-xl">
        <h2 className="text-xl font-bold text-white mb-4">Assign Staff</h2>

        <Listbox value={selectedStaff} onChange={setSelectedStaff}>
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-slate-900 border border-slate-700 p-3 pl-4 pr-10 text-left text-white">
              <span className="block truncate">
                {selectedStaff ? selectedStaff.name : "Select Staff"}
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
              <Listbox.Options className="absolute mt-2 w-full overflow-auto rounded-lg bg-slate-900 border border-slate-700 py-2 shadow-xl max-h-60 z-50 text-white">
                {staffList.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    value={person}
                    className={({ active }) =>
                      `cursor-pointer select-none px-4 py-2 ${
                        active ? "bg-cyan-500/20 text-cyan-300" : ""
                      }`
                    }
                  >
                    {({ selected }) => (
                      <div className="flex items-center justify-between">
                        <span>{person.name}</span>
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
            className="px-4 py-2 bg-slate-700 rounded-lg text-white"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-cyan-500 rounded-lg text-black hover:bg-cyan-600"
            onClick={handleAssignClick}
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignStaffModal;
