'use client'
import Layout from "@/components/layout";
import { useSelector } from "react-redux";
import { useEffect,useState} from "react";
import axios from "axios"
import dayjs from "dayjs"
import { useRouter } from "next/navigation";
import Link from "next/link";
import AddInfo from "@/components/AdditionalInfoModal";


export default function CaseStaff(){
    const router=useRouter();
    const {caseId}=useSelector((state)=>state.caseId)
    const [file,setFile]=useState(null)   
    const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);
    const [filestatus,setStatus]=useState("")
   //for showing the add infon modal
  function handleStatus(){
    setFeedbackModalOpen(true);
  } 
    
    async  function fetchCase(){
      let res=await axios.post("http://127.0.0.1:5001/cases/getCase",{caseId})
    // console.log(res.data.message[0]);
      setFile(res.data.message);
    }

  async function approval(status){
    let res=await axios.post("http://127.0.0.1:5001/cases/approval",{status,caseId})
    router.push("/staff/dashboard");    

  }
  
  function unixToDate(timestamp){
    const dateObject = dayjs.unix((Number(timestamp)/1000));
   return( dateObject.format("DD MMM YYYY,HH:mm"))
  }
 
    useEffect(()=>{
      fetchCase();
    },[])


    return(
        <div className=" flex  p-3 mt-10">
     <div className="p-10">
      <h1 className="font-bold text-secondary-blue text-2xl mb-4">
        Review and Confirm
      </h1>

      <div className="mb-4">
        <h2 className="font-bold text-main-blue">Case Details:</h2> 
         <p className="font-bold">Applicant</p>
         {file?.applicant.map((name,index)=>(
          <>
          <p>{name}</p>
          </>
         ))}
        <p className="font-bold">Respondent</p>
        {file?.respodent.map((name,index)=>(
          <>
          <p>{name}</p>
          </>
         ))}
        <p className="font-bold">Court Station</p> 
        <p>{file?.courtName}</p>
        {/* <p className="font-bold">Case Category</p> */}
        {/* <p> {formData.caseCategory || "Not specified"}</p>
        <p className="font-bold">Case Type</p>
        <p> {formData.caseType || "Not specified"}</p> */}
        
      </div> 

      {/* <div className="mb-4">
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
           
                <tr key={index} className="border-b">
                  <td className="px-6 py-2">{party.category}</td>
                  <td className="px-6 py-2">{party.partyType}</td>
                  <td className="px-6 py-2">{party.name}</td>
                </tr>
            
          </tbody>
        </table>
      </div> */}

      <div className="mb-4">
        <h2 className="font-bold text-main-blue">Files:</h2>
        <table className="min-w-full text-sm font-light">
          <thead className="bg-main-blue text-white">
            <tr>
              <th className="px-6 py-2">File</th>
              <th className="px-6 py-2">Upload/Modification Date</th>
            </tr>
          </thead>
          <tbody>
          
                <tr className="border-b">
                {/* <td className="px-6 py-2">{file?.txId}</td> */}
                <td class="whitespace-nowrap px-6 py-4"><Link className="text-main-blue text-center underline p-1  hover:text-red-900" href={`https://arweave.net/${file.txId}`} target="_blank">{file.txId}</Link></td>
                  <td className="px-6 py-2">{unixToDate(file?.date)}</td>
                </tr>
            
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={()=>{ setStatus("rejected")
            handleStatus(true)
            }}
          className="bg-main-blue text-white font-semibold px-4 py-2 rounded hover:bg-main-blue-dark focus:outline-none focus:ring-2 focus:ring-main-blue focus:ring-opacity-50 transition ease-in-out duration-150"
        >
          Reject
        </button>
        <button
          onClick={()=>{
            setStatus("approved")
            handleStatus(true)
           } }
          className="bg-main-blue text-white font-semibold px-4 py-2 rounded hover:bg-main-blue-dark focus:outline-none focus:ring-2 focus:ring-main-blue focus:ring-opacity-50 transition ease-in-out duration-150"
        >
          Accept
        </button>
      </div>
    </div>
    <AddInfo   isOpen={isFeedbackModalOpen}
     onClose={() => setFeedbackModalOpen(false)}
     status={filestatus}/>
      </div> 
    )
}
CaseStaff.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };
  