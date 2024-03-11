import { useState } from "react";
import AddFileModal from "@/components/AddFileModal"; // Ensure you have this component for adding files

export default function StepFour({
  nextStep,
  prevStep,
  formData,
  setFormData,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddFile = (fileData) => {
    const updatedFiles = [...formData.files, fileData]; // Assuming `files` field in your formData
    setFormData({ ...formData, files: updatedFiles });
  };

  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-secondary-blue text-2xl">Case Files</h1>
        <button
          onClick={openModal}
          className="bg-main-blue text-white font-semibold px-4 py-2 rounded hover:bg-main-blue-dark focus:outline-none focus:ring-2 focus:ring-main-blue focus:ring-opacity-50 transition ease-in-out duration-150"
        >
          Add File
        </button>
      </div>

      <div className="w-4/6 mx-auto mt-6">
        {formData.files && formData.files.length > 0 ? (
          <table className="min-w-full text-left text-sm font-light mt-4">
            <thead className="border font-medium bg-main-blue text-white border-white">
              <tr>
                <th scope="col" className="px-6 py-4">
                  File Type
                </th>
                <th scope="col" className="px-6 py-4">
                  Caption
                </th>
                <th scope="col" className="px-6 py-4">
                  Upload/Modification Date
                </th>
                <th scope="col" className="px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="border border-main-blue">
              {formData.files.map((file, index) => (
                <tr key={index} className="text-main-blue">
                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                    {file.fileType}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {file.caption}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {file.uploadDate} {/* Format this date as needed */}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 flex justify-around">
                    {/* Your action buttons here */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center mt-5">No files have been added.</p>
        )}
      </div>

      <AddFileModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAddFile={handleAddFile}
      />

      <div className="flex justify-center mt-12">
        <button
          onClick={prevStep}
          className="mx-2 bg-main-blue text-white font-semibold px-4 py-2 rounded hover:bg-main-blue-dark focus:outline-none focus:ring-2 focus:ring-main-blue focus:ring-opacity-50 transition ease-in-out duration-150"
        >
          Previous
        </button>
        <button
          onClick={nextStep}
          className="mx-2 bg-main-blue text-white font-semibold px-4 py-2 rounded hover:bg-main-blue-dark focus:outline-none focus:ring-2 focus:ring-main-blue focus:ring-opacity-50 transition ease-in-out duration-150"
        >
          Next
        </button>
      </div>
    </div>
  );
}
