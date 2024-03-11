export default function StepFive({ prevStep, formData, handleSubmit }) {
  return (
    <div className="p-10">
      <h1 className="font-bold text-secondary-blue text-2xl mb-4">
        Review and Confirm
      </h1>

      <div className="mb-4">
        <h2 className="font-bold text-main-blue">Case Details:</h2>
        <p className="font-bold">Court Station</p>
        <p>{formData.courtStation || "Not specified"}</p>
        <p className="font-bold">Court Division</p>
        <p>{formData.courtDivision || "Not specified"}</p>
        <p className="font-bold">Case Category</p>
        <p> {formData.caseCategory || "Not specified"}</p>
        <p className="font-bold">Case Type</p>
        <p> {formData.caseType || "Not specified"}</p>
        
      </div>

      <div className="mb-4">
        <h2 className="font-bold text-main-blue">Parties:</h2>
        <table className="min-w-full text-sm font-light">
          <thead className="bg-main-blue text-white">
            <tr>
              <th className="px-6 py-2">Category</th>
              <th className="px-6 py-2">Party Type</th>
              <th className="px-6 py-2">Name</th>
            </tr>
          </thead>
          <tbody>
            {formData.parties.length > 0 ? (
              formData.parties.map((party, index) => (
                <tr key={index} className="border-b">
                  <td className="px-6 py-2">{party.category}</td>
                  <td className="px-6 py-2">{party.partyType}</td>
                  <td className="px-6 py-2">{party.name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-2">
                  No parties added.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mb-4">
        <h2 className="font-bold text-main-blue">Files:</h2>
        <table className="min-w-full text-sm font-light">
          <thead className="bg-main-blue text-white">
            <tr>
              <th className="px-6 py-2">File Type</th>
              <th className="px-6 py-2">Caption</th>
              <th className="px-6 py-2">Upload/Modification Date</th>
            </tr>
          </thead>
          <tbody>
            {formData.files && formData.files.length > 0 ? (
              formData.files.map((file, index) => (
                <tr key={index} className="border-b">
                  <td className="px-6 py-2">{file.fileType}</td>
                  <td className="px-6 py-2">{file.caption}</td>
                  <td className="px-6 py-2">{file.uploadDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-2">
                  No files uploaded.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          className="bg-main-blue text-white font-semibold px-4 py-2 rounded hover:bg-main-blue-dark focus:outline-none focus:ring-2 focus:ring-main-blue focus:ring-opacity-50 transition ease-in-out duration-150"
        >
          Go Back
        </button>
        <button
          onClick={handleSubmit}
          className="bg-main-blue text-white font-semibold px-4 py-2 rounded hover:bg-main-blue-dark focus:outline-none focus:ring-2 focus:ring-main-blue focus:ring-opacity-50 transition ease-in-out duration-150"
        >
          Complete Submission
        </button>
      </div>
    </div>
  );
}
