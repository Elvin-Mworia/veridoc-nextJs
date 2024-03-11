import { useState } from "react";

export default function AddPartyModal({ isOpen, onClose, onAddParty }) {
  const [newParty, setNewParty] = useState({
    category: "",
    partyType: "",
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewParty((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddParty(newParty);
    onClose(); // Close modal after adding
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        {/* Form fields for adding a new party */}
        <div className="mb-4">
          <label className="block font-bold text-sm text-gray-700 mb-2">
            Category
          </label>
          <input
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-main-blue focus:ring focus:ring-main-blue focus:ring-opacity-50"
            name="category"
            value={newParty.category}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold text-sm text-gray-700 mb-2">
            Party Type
          </label>
          <input
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-main-blue focus:ring focus:ring-main-blue focus:ring-opacity-50"
            name="partyType"
            value={newParty.partyType}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold text-sm text-gray-700 mb-2">
            Name
          </label>
          <input
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-main-blue focus:ring focus:ring-main-blue focus:ring-opacity-50"
            name="name"
            value={newParty.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold text-sm text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-main-blue focus:ring focus:ring-main-blue focus:ring-opacity-50"
            name="email" // Make sure to handle this new field in your state and handleChange function
            value={newParty.email || ""} // Assuming you've added 'email' to your newParty state
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-around">
          <button
            className="bg-main-blue text-white font-semibold px-4 py-2 rounded hover:bg-main-blue-dark focus:outline-none focus:ring-2 focus:ring-main-blue focus:ring-opacity-50 transition ease-in-out duration-150"
            onClick={handleSubmit}
          >
            Add Party
          </button>
          <button
            className="ml-4 bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition ease-in-out duration-150"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
