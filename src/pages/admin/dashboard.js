import AddFolderModal from "@/components/AddFolderModal";
import AddAdminModal from "@/components/AddAdminModal";
import Layout from "@/components/layout";
import { useState } from "react";

export default function Dashboard() {
  const [isFolderModalOpen, setFolderModalOpen] = useState(false);
  const [isAdminModalOpen, setAdminModalOpen] = useState(false);
  const [folders, setFolders] = useState(["Milimani"]); // Initial folders list
  const [admins, setAdmins] = useState([]);

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
              {folder}
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
          onClose={() => setModalOpen(false)}
          onSubmit={addFolder}
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
              className=" w-5/6 mx-auto rounded-lg p-2 text-white text-center m-2"
            >
              <p className="text-main-blue">
                {admin.name} - {admin.wallet}
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
          onSubmit={addAdmin}
        />
      </div>

      {/* Transactions Card */}
      <div className="w-64 bg-white  mx-4 min-h-fit">
        <div className="bg-transparent-blue/60 text-center text-main-blue p-2 font-bold">
          Admins
        </div>
        <div className="">
          <p className="text-main-blue text-center p-2">
            sadahldafdsafdafhdfldafkdAda
          </p>
          <p className="text-main-blue text-center p-2">
            sadahldafdsafdafhdfldafkdAda
          </p>{" "}
          <p className="text-main-blue text-center p-2">
            sadahldafdsafdafhdfldafkdAda
          </p>{" "}
          <p className="text-main-blue text-center p-2">
            sadahldafdsafdafhdfldafkdAda
          </p>
        </div>
      </div>
    </div>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
