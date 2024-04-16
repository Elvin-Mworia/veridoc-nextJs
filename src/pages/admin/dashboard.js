"use client"
import AddFolderModal from "@/components/AddFolderModal";
import AddAdminModal from "@/components/AddAdminModal";
import Layout from "@/components/layout";
import { useState,useEffect } from "react";
import axios from 'axios'
import Link from "next/link"

export default function Dashboard() {
  const [isFolderModalOpen, setFolderModalOpen] = useState(false);
  const [isAdminModalOpen, setAdminModalOpen] = useState(false);
  const [folders, setFolders] = useState([]); // Initial folders list
  const [admins, setAdmins] = useState([]);
  const [transactions, setTransactions] = useState([]);

  async function getFoldersAndAdmins(){
    let folder=await axios.get("http://127.0.0.1:5001/station/getAllStationFolders");
    let admins=await  axios.get("http://127.0.0.1:5001/users/getAllAdmins");
    console.log(folder.data.folders)
    console.log(admins.data.admins);
     setFolders(folder.data.folders);
     setAdmins(admins.data.admins);

  }

  async function getTransactions(){
let res= await axios.get("http://127.0.0.1:5001/transaction/")
if(res.status===200){
  setTransactions(res.data.message);
}
  }
//   useEffect(()=>{
//     const interval=setInterval(() => getTransactions(),30000);
// getFoldersAndAdmins();
// return () => clearInterval(interval);
//   },[transactions])
  useEffect(()=>{

getFoldersAndAdmins();
getTransactions();
  },[])

  const addFolder = (e) => {
    e.preventDefault();
    const folderName = e.target.folderName.value;
    setFolders([...folders, folderName]);
    setFolderModalOpen(false); // Close modal after adding
  };

  const addAdmin = (e) => {
    e.preventDefault();
    const adminName = e.target.adminName.value;
    const walletAddress = e.target.wallet.value;
    setAdmins([...admins, { name: adminName, wallet: walletAddress }]);
    setAdminModalOpen(false); // Close modal after adding
  };

  return (
    <div className="p-3 mt-10 flex items-start justify-around">
      {/* Folders Card */}
      <div className="w-64 min-h-fit bg-white  mx-4">
        <div className="bg-transparent-blue/60 text-center text-main-blue p-2 font-bold">
          Folders
        </div>
        <div className="">
          {folders.map((folder, index) => (
            <p
              key={index}
              className="bg-alt-blue w-5/6 mx-auto rounded-lg p-2 text-white text-center m-2 "
            >
              {folder.name}
            </p>
          ))}
        </div>
        <div
          onClick={() => setFolderModalOpen(true)}
          className="bg-transparent-blue/80 p-2 text-center text-white flex justify-center cursor-pointer mt-auto"
        >
          <p className="mr-2">Add Folder</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>

        {/* Modal Component */}
        <AddFolderModal
          isOpen={isFolderModalOpen}
          onClose={() => setFolderModalOpen(false)}
        />
      </div>

      {/* Admins Card */}
      <div className="w-fit bg-white  mx-4 min-h-fit">
        <div className="bg-transparent-blue/60 text-center text-main-blue p-2 font-bold">
          Admins
        </div>
        <div className="">
          {admins.map((admin, index) => (
            <div
              key={index}
              className=" w-fit mx-auto rounded-lg p-2 text-white text-center m-2"
            >
              <p className="text-main-blue  hover:text-red-900">
                {admin.name} - {admin.walletAddress.slice(0,19)}
              </p>
            </div>
          ))}
        </div>
        <div
          onClick={() => setAdminModalOpen(true)}
          className="bg-transparent-blue/80 p-2 text-center text-white flex justify-center cursor-pointer mt-auto"
        >
          <p className="mr-2">Add Admin</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>

        <AddAdminModal
          isOpen={isAdminModalOpen}
          onClose={() => setAdminModalOpen(false)}
        />
      </div>

      {/* Transactions Card */}
      <div className="w-64 bg-white  mx-4 min-h-fit">
        <div className="bg-transparent-blue/60 text-center text-main-blue p-2 font-bold">
          Transactions
        </div>
        <div className="">
          {transactions.map((transaction, index) => (
            <div key={index} className="w-fit mx-auto rounded-lg p-1 text-white text-center m-1">
              <Link className="text-main-blue text-center p-1  hover:text-red-900" href={`https://viewblock.io/arweave/tx/${transaction.txId}`} target="_blank">{transaction.txId.slice(0,20)}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
