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
                <td class="whitespace-nowrap px-6 py-4"></td>
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
          </div>
          <div className="h-28 w-28 shadow m-3">
            <p className="text-center h-8 text-white bg-secondary-blue">
              Cases
            </p>
          </div>
          <div className="h-28 w-28 shadow m-3">
            <p className="text-center h-8 text-white bg-secondary-blue">
              Cases
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
