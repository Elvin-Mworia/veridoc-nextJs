import Layout from "@/components/layout";

export default function Dashboard() {
  return (
    <div className="py-6 ">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-main-blue">Filed Cases</h1>

        <a
          href="/cases/create"
          className="bg-main-blue text-white px-3 py-2 rounded-lg"
        >
          File New Case
        </a>
      </div>
      <div className="flex mt-8">
        {/* Table Section */}
        <div className="w-3/4">
          <table class="min-w-full text-left text-sm font-light">
            <thead class="border font-medium bg-main-blue text-white border-white">
              <tr>
                <th scope="col" class="px-6 py-4">
                  Case Number
                </th>
                <th scope="col" class="px-6 py-4">
                  Court Station
                </th>
                <th scope="col" class="px-6 py-4">
                  Status
                </th>
                <th scope="col" class="px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="border border-main-blue">
              <tr class="text-main-blue">
                <td class="whitespace-nowrap px-6 py-4 font-medium">
                  HC00M/****/2023
                </td>
                <td class="whitespace-nowrap px-6 py-4">Milimani High Court</td>
                <td class="whitespace-nowrap px-6 py-4">Pending</td>
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
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Cards Section */}
        <div className="w-1/4 flex flex-col items-center">
          <div className="h-28 w-28 shadow m-3">
            <p className="text-center h-8 text-white bg-secondary-blue">
              Cases
            </p>
            <p className="p-2 text-center">10 Filed Cases</p>
          </div>
          <div className="h-28 w-28 shadow m-3">
            <p className="text-center h-8 text-white bg-secondary-blue">
              Cases
            </p>
            <p className="p-2 text-center">10 Pending Cases</p>
          </div>
        </div>
      </div>
    </div>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
