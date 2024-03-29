"use client"
import Layout from "@/components/layout";
import Query from "@irys/query";
import { useSelector} from "react-redux";
import {useState,useEffect} from "react"
import axios from "axios";
import AddFileModal from "@/components/AddFileModal";

export default function Dashboard() {
  const {walletAddress}=useSelector((state)=>(state.userInfo))
  const [files,setFiles]=useState([]);
  const [pending,setPending]=useState([])
  const [courtName,setCourtName]=useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const myQuery=new Query();
 async function getUserFiles(walletAddress){
  let res=await myQuery.search("irys:transactions")
	.tags([{ name: "Content-Type", values: ["application/pdf","application/epub+zip"] },
  { name: "walletAddress", values: [walletAddress] }]);
  //console.log(res);
  if(res.length>0){
    setFiles(...res)
  }
 }
 //fetching user files then filtering the once with status of pending
 function getUserPendingFiles(walletAddress){
  axios.post("http://localhost:5001/cases/casesForUser",{walletAddress}).then(res=>{
    if(res.status===200){  
      setFiles(res.data.message);
    let pendingFiles=res.data.message.filter((file)=>file.status==="pending");
    console.log(pendingFiles.length)
    setPending(pendingFiles);
      }
  }).catch((err)=>{
    console.log(err);
  })
 }
//get the name of a court provided is stationId
 function getCourtName(stationId){
  axios.post("http://localhost:5001/station/getStation",{stationId}).then(res=>{
    if(res.status===200){  
      setCourtName(res.data.message);
      }
  }).catch((err)=>{
    console.log(err);
  })

 }

useEffect(()=>{
 // getUserFiles(walletAddress);
 // getUserPendingFiles("d6KpB0ztMhjMnC9fuE3lp");
  getUserPendingFiles(walletAddress);
},[])

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
                  Files
                </th>
              </tr>
            </thead>
            <tbody className="border border-main-blue">
              {files.length>0 ? files.map((file,key)=>{
                // getCourtName(file.stationId)
             
                return(
                  <>
                   <tr class="text-main-blue">
                <td class="whitespace-nowrap px-6 py-4 font-medium">
                  {file.caseId}
                </td>
                <td class="whitespace-nowrap px-6 py-4">{file.courtName}</td>
                <td class="whitespace-nowrap px-6 py-4">{file.status}</td>
                <td class="whitespace-nowrap px-6 py-4"><a class="underline  hover:text-red-900">{file.txId}</a></td>
               
              </tr>
                  </>
                )
              }):<tr><td class="whitespace-nowrap px-6 py-4">No cases</td></tr>}
             
            </tbody>
          </table>
        </div>
        {/* Cards Section */}
        <div className="w-1/4 flex flex-col items-center">
          <div className="h-28 w-28 shadow m-3">
            <p className="text-center h-8 text-white bg-secondary-blue">
              Cases
            </p>
            <p className="p-2 text-center">{files.length} case filed</p>
          </div>
          <div className="h-34 w-28 shadow m-3">
            <p className="text-center h-14 text-white bg-secondary-blue">
              Pending Approval
            </p>
            <p className="p-2 text-center">{pending.length} pending case</p>
          </div>
          {files.length>0?  <button
        onClick={openModal}
          className="bg-main-blue text-white mt-10 px-3 py-2 rounded-lg"
        >
          Upload subsequent File
        </button>:  <button
        disabled
          className="bg-blue-300  text-white mt-10 px-3 py-2 rounded-lg"
        >
          Upload subsequent File
        </button>}
      
        <AddFileModal
        isOpen={isModalOpen}
        onClose={closeModal}
        scenario={"subsequent"}
        userfiles={files}
      />
        </div>
      </div>
    </div>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
