export default function StepThree({
  nextStep,
  prevStep,
  formData,
  setFormData,
  handleChange,
}) {
  return (
    <div className="p-10">
      <h1 className="font-bold text-secondary-blue text-2xl">Case Details</h1>

      <div className="mb-4">
        <label
          htmlFor="citation"
          className="block text-main-blue font-semibold text-sm"
        >
          Citation
        </label>
        <input
          type="text"
          id="citation"
          name="citation"
          value={formData.citation || ""}
          onChange={handleChange}
          className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-main-blue focus:ring focus:ring-main-blue focus:ring-opacity-50"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="summaryPrayers"
          className="block text-main-blue font-semibold text-sm"
        >
          Summary/Prayers
        </label>
        <textarea
          id="summaryPrayers"
          name="summaryPrayers"
          value={formData.summaryPrayers || ""}
          onChange={handleChange}
          rows="4"
          className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-main-blue focus:ring focus:ring-main-blue focus:ring-opacity-50"
        ></textarea>
      </div>

      <div className="flex justify-center mt-6">
        <button
          type="button"
          onClick={prevStep}
          className="mr-6 bg-main-blue text-white font-semibold px-4 py-2 rounded hover:bg-main-blue-dark focus:outline-none focus:ring-2 focus:ring-main-blue focus:ring-opacity-50 transition ease-in-out duration-150"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="mr-6 bg-main-blue text-white font-semibold px-4 py-2 rounded hover:bg-main-blue-dark focus:outline-none focus:ring-2 focus:ring-main-blue focus:ring-opacity-50 transition ease-in-out duration-150"
        >
          Next
        </button>
      </div>
    </div>
  );
}
