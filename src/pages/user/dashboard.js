"use client"
import Layout from "@/components/layout";
import Query from "@irys/query";
import { useSelector,useDispatch} from "react-redux";
import {useState,useEffect} from "react"
import axios from "axios";
import Link from "next/link"
import { updateCaseId } from "../../../store/caseSlice/caseId";

export default function Dashboard() {
  const {walletAddress}=useSelector((state)=>(state.userInfo))
  const [files,setFiles]=useState([]);
  const [pending,setPending]=useState([])
  const [courtName,setCourtName]=useState([]);
  const dispatch=useDispatch();
  const myQuery=new Query();
  const courtNameMap=new Map()
  function sorting(data) {
    // 1. Sort the array in ascending order by timestamp
    const sortedData = data.sort((a, b) => Number(b.date) -Number(a.date)) ;
    // 2. Return the first element (youngest based on ascending sort)
    return sortedData;
  }
 async function getUserFiles(walletAddress){
  let res=await myQuery.search("irys:transactions")
	.tags([{ name: "Content-Type", values: ["application/pdf","application/epub+zip"] },
  { name: "walletAddress", values: [walletAddress] }]);
  //console.log(res);
  if(res.length>0){

    setFiles(...sorting(res));
  }
 }
 //fetching user files then filtering the once with status of pending

useEffect(()=>{
  function getUserPendingFiles(walletAddress){
    axios.post(`${process.env.BACKENDURL}:${process.env.PORT}/cases/casesForUser`,{walletAddress}).then(res=>{
      if(res.status===200){  
        setFiles(sorting(res.data.message));
      let pendingFiles=res.data.message.filter((file)=>file.status==="pending");
  
      console.log(pendingFiles.length)
      setPending(pendingFiles);
        }
    }).catch((err)=>{
      console.log(err);
    })
   }
 // getUserFiles(walletAddress);
 // getUserPendingFiles("d6KpB0ztMhjMnC9fuE3lp");
  getUserPendingFiles(walletAddress);
},[pending])

  return (
    <div className="py-6 ">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-main-blue">Filed Cases</h1>

        <Link
          href={"/cases/create"}
          className="bg-main-blue text-white px-3 py-2 mr-2 rounded-lg"
        >
          File New Case
        </Link>
      </div>
      <div className="flex mt-8">
        {/* Table Section */}
        <div className="w-3/4 h-96 overflow-y-auto">
          <table class="min-w-full  text-left text-sm font-light overflow-y-auto">
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
              {files.length>0 ? files.map((file,index)=>{
                return(
                  <>
                   <tr class="text-main-blue">
               <Link href={`/user/case/${file.caseId}`} onClick={()=>dispatch(updateCaseId({caseId:file.caseId}))}><td class="whitespace-nowrap px-6 py-4 font-medium">
                 {file.caseId}
                </td>
                </Link> 
                <td class="whitespace-nowrap px-6 py-4">{file.courtName}</td>
                <td class="whitespace-nowrap px-6 py-4">{file.status}</td>
                {/* <td class="whitespace-nowrap px-6 py-4"><a class="underline  hover:text-red-900">{file.txId}</a></td> */}
                <td class="whitespace-nowrap px-6 py-4"><Link className="text-main-blue text-center underline p-1  hover:text-red-900" href={`https://arweave.net/${file.txId}`} target="_blank">{file.txId}</Link></td>

               
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
            <p className="p-2 text-center">{files.length} cases filed</p>
          </div>
          <div className="h-28 w-28 shadow m-3">
            <p className="text-center h-8 text-white bg-secondary-blue">
              Cases
            </p>
            <p className="p-2 text-center">{pending.length} pending cases</p>
          </div>
        </div>
      </div>
    </div>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
