import { useState } from "react";

function AddFileModal({ isOpen, onClose, onAddFile }) {
  const [fileData, setFileData] = useState({
    fileType: "",
    caption: "",
    uploadDate: "", // You might want to auto-generate this based on the file upload timestamp
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFileData({ ...fileData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFileData({
      ...fileData,
      file: e.target.files[0],
      uploadDate: new Date().toISOString().slice(0, 10),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddFile(fileData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white p-5 rounded-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="fileType"
              className="block text-main-blue font-semibold"
            >
              File Type
            </label>
            <select
              name="fileType"
              id="fileType"
              value={fileData.fileType}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select a file type</option>
              <option value="petition">Petition</option>
              <option value="motion">Motion</option>
              <option value="complaint">Complaint</option>
              <option value="affidavit">Affidavit</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="caption"
              className="block text-main-blue font-semibold"
            >
              Caption
            </label>
            <input
              type="text"
              name="caption"
              id="caption"
              value={fileData.caption}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label
              htmlFor="file"
              className="block text-main-blue font-semibold"
            >
              File
            </label>
            <input
              type="file"
              name="file"
              id="file"
              onChange={handleFileChange}
              className="mt-1 block w-full"
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-main-blue text-white px-4 py-2 rounded hover:bg-main-blue-dark"
            >
              Upload File
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddFileModal;
