"use client"
import axios from "axios";
import {useState} from "react";
export default function AddAdminModal({ isOpen, onClose}) {
  if (!isOpen) return null;
const [walletAddress,setWalletAddress]=useState("");
async function handleSubmit(){
await axios.post("http://127.0.0.1:5001/users/l0",{walletAddress});
}

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg">
        <h1 className="text-2xl text-center font-bold mb-5">Add Admin</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >

          <label
            htmlFor="wallet"
            className="block text-sm font-medium text-main-blue"
          >
            Wallet Address
          </label>
          <input
            type="text"
            id="wallet"
            name="wallet"
            onChange={(e)=>{setWalletAddress(e.target.value)}}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 outline-transparent-blue"
          />

          <div className="mt-4 flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-main-blue text-white rounded hover:bg-blue-700"
              onClick={onClose}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
