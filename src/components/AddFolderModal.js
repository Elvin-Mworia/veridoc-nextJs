"use client"
import {useState} from "react";
import axios from "axios";
export default function AddFolderModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  const [name,setFolder]=useState("");
async function handleSubmit(e){
  e.preventDefault()
  try{
let res=await axios.post("http://127.0.0.1:5001/folders/addFolder",{name});
if(res.status===200){
  setFolder("")
  alert(res.data.message);
  onClose();
  
}
  }catch(err){
    console.log(err)
    // alert(err.response.data.message);
    if(err.response?.request?.status==400){
      alert(err.response?.data?.message);
    }
   
  }
    onClose();
    window.location.reload();
}

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg">
        <h1 className="text-2xl text-center font-bold mb-5">Add Folder</h1>
        <p className="text-amber-500 text-center p-2 text-xs">The folder name should match with court station name!</p>
        <form
        >
          <label
            htmlFor="folderName"
            className="block text-sm font-medium text-main-blue"
          >
            Folder Name
          </label>
          <input
            type="text"
            id="folderName"
            name="folderName"
            onChange={(e)=> setFolder(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 outline-transparent-blue outline"
          />
          <div className="mt-4 flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
            type="button"
              className="py-2 px-4 bg-main-blue text-white rounded hover:bg-blue-700"
              onClick={(e)=>{handleSubmit(e)}}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
