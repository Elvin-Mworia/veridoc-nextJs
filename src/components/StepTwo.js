import { useState } from "react";
import AddPartyModal from "@/components/AddPartyModal";

export default function StepTwo({ nextStep, prevStep, formData, setFormData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddParty = (party) => {
    const updatedParties = [...formData.parties, party];
    setFormData({ ...formData, parties: updatedParties });
  };

  return (
    <div className="p-10">
      <div className="flex justify-between">
        <h1 className="font-bold text-secondary-blue text-2xl">Case Parties</h1>
        <button
          className="bg-main-blue text-white font-semibold px-4 py-2 rounded"
          onClick={openModal}
        >
          Add Party
        </button>
        <AddPartyModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onAddParty={handleAddParty}
        />
      </div>

      <div className="w-4/6 mx-auto">
        {formData.parties.length > 0 ? (
          <table className="min-w-full text-left text-sm font-light">
            <thead className="border font-medium bg-main-blue text-white border-white">
              {/* Table headers */}
              <tr>
                <th scope="col" class="px-6 py-4">
                  Category{" "}
                </th>
                <th scope="col" class="px-6 py-4">
                  Party Type
                </th>
                <th scope="col" class="px-6 py-4">
                  Name
                </th>
                <th scope="col" class="px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="border border-main-blue">
              {formData.parties.map((party, index) => (
                <tr key={index} className="text-main-blue">
                  {/* Party details */}
                  <td class="whitespace-nowrap px-6 py-4 font-medium">
                    {party.category}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">
                    {" "}
                    {party.partyType}{" "}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">{party.name}</td>
                  <td class="whitespace-nowrap px-6 py-4 flex justify-around">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6 text-green-500"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6 text-red-500"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </td>{" "}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center mt-5">There are no parties.</p>
        )}
      </div>

      {/* <div className="w-4/6 mx-auto bg-white rounded p-5">
        <h1>Step 2 form</h1>
      </div> */}

      <div className="flex justify-center mt-12">
        <button
          type="button"
          onClick={prevStep}
          className="mx-2 bg-main-blue text-white font-semibold px-4 py-2 rounded hover:bg-main-blue-dark focus:outline-none focus:ring-2 focus:ring-main-blue focus:ring-opacity-50 transition ease-in-out duration-150"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="mx-2 bg-main-blue text-white font-semibold px-4 py-2 rounded hover:bg-main-blue-dark focus:outline-none focus:ring-2 focus:ring-main-blue focus:ring-opacity-50 transition ease-in-out duration-150"
        >
          Next
        </button>
      </div>
    </div>
  );
}
