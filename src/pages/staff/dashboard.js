import Layout from "@/components/layout";

export default function Dashboard() {
  return (
    <div className="p-3 mt-10">
      {/* Card Container */}
      <div className=" flex justify-around">
        {/* Card */}
        <div className="h-36 w-auto bg-white text-main-blue mx-4">
          <div className="bg-transparent-blue/60 text-center">Total Cases</div>
          <p className="text-center p-10 text-3xl font-bold">2300</p>
        </div>
        <div className="h-36 w-36 bg-white text-main-blue mx-4">
          <div className="bg-transparent-blue/60 text-center">Total Cases</div>
          <p className="text-center p-10 text-3xl font-bold">2300</p>
        </div>{" "}
        <div className="h-36 w-36 bg-white text-main-blue mx-4">
          <div className="bg-transparent-blue/60 text-center">Total Cases</div>
          <p className="text-center p-10 text-3xl font-bold">2300</p>
        </div>{" "}
        <div className="h-36 w-36 bg-white text-main-blue mx-4">
          <div className="bg-transparent-blue/60 text-center">Total Cases</div>
          <p className="text-center p-10 text-3xl font-bold">2300</p>
        </div>
      </div>

      {/* Table Section */}
      <div className="w-5/6 mx-auto mt-10">
        <h1 className="text-2xl font-bold text-main-blue mb-10">
          Recently Filed Cases
        </h1>
        <table class="text-left text-sm font-light w-full">
          <thead class="border font-medium bg-main-blue text-white border-white">
            <tr>
              <th scope="col" class="border px-6 py-4">
                Case Number
              </th>
              <th scope="col" class="border px-6 py-4">
                Court Station
              </th>
              <th scope="col" class="border px-6 py-4">
                Status
              </th>
              <th scope="col" class="border px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white border border-main-blue">
            <tr class="text-main-blue">
              <td class="border border-main-blue whitespace-nowrap px-6 py-4 font-medium">
                #234234
              </td>
              <td class="border border-main-blue whitespace-nowrap px-6 py-4">
                Kilimani
              </td>
              <td class="border border-main-blue whitespace-nowrap px-6 py-4">
                Pending
              </td>
              <td class="border border-main-blue whitespace-nowrap px-6 py-4"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
