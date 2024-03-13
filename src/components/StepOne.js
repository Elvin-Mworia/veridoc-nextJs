export default function StepOne({ nextStep, formData, handleChange }) {
  return (
    <div className="p-10">
      <h1 className="font-bold text-secondary-blue text-2xl">File New Case</h1>

      <div className="w-4/6 mx-auto bg-white rounded p-5">
        <h2 className="text-center text-secondary-blue">Case Details</h2>

        {/* Categories section */}
        {/* Put categories section here */}
        <div className="mb-4">
          <label
            htmlFor="courtStation"
            className="block font-bold text-sm mb-2 text-gray-700"
          >
            Court Station
          </label>
          <select
            className="block bg-transparent-blue/20 w-full p-2 border border-blue-300 rounded-md shadow-sm focus:border-main-blue focus:ring focus:ring-main-blue focus:ring-opacity-50"
            id="courtStation"
            name="courtStation"
            value={formData.courtStation}
            onChange={handleChange}
          >
            <option value="">Pick Court Station</option>
            <option value="station1">Station 1</option>
            <option value="station2">Station 2</option>
            <option value="station3">Station 3</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="courtDivision"
            className="block font-bold text-sm mb-2 text-gray-700"
          >
            Court Division
          </label>
          <select
            className="block bg-transparent-blue/20 w-full p-2 border border-blue-300 rounded-md shadow-sm focus:border-main-blue focus:ring focus:ring-main-blue focus:ring-opacity-50"
            id="courtDivision"
            name="courtDivision"
            value={formData.courtDivision}
            onChange={handleChange}
          >
            <option value="">Pick Court Division</option>
            <option value="civil">Civil</option>
            <option value="criminal">Criminal</option>
            <option value="family">Family</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="caseCategory"
            className="block font-bold text-sm mb-2 text-gray-700"
          >
            Case Category
          </label>
          <select
            className="block bg-transparent-blue/20 w-full p-2 border border-blue-300 rounded-md shadow-sm focus:border-main-blue focus:ring focus:ring-main-blue focus:ring-opacity-50"
            id="caseCategory"
            name="caseCategory"
            value={formData.caseCategory}
            onChange={handleChange}
          >
            <option value="">Pick Case Category</option>
            <option value="property">Property</option>
            <option value="contract">Contract</option>
            <option value="tort">Tort</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="caseType"
            className="block font-bold text-sm mb-2 text-gray-700"
          >
            Case Type
          </label>
          <select
            className="block bg-transparent-blue/20 w-full p-2 border border-blue-300 rounded-md shadow-sm focus:border-main-blue focus:ring focus:ring-main-blue focus:ring-opacity-50"
            id="caseType"
            name="caseType"
            value={formData.caseType}
            onChange={handleChange}
          >
            <option value="">Pick Case Type</option>
            <option value="type1">Type 1</option>
            <option value="type2">Type 2</option>
            <option value="type3">Type 3</option>
          </select>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={nextStep}
            className="bg-main-blue text-white font-semibold px-4 py-2 rounded hover:bg-main-blue-dark focus:outline-none focus:ring-2 focus:ring-main-blue focus:ring-opacity-50 transition ease-in-out duration-150"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
