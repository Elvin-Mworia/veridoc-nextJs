'use client'
import Layout from "@/components/layout";
import { useSelector } from "react-redux";
import { useEffect,useState} from "react";
import axios from "axios"
import dayjs from "dayjs"
import { useRouter } from "next/navigation";


export default function CaseForUser(){
    const router=useRouter();
    const {caseId}=useSelector((state)=>state.caseId)
    const [file,setFile]=useState(null)    
    const [subfile,setSubFile]=useState([])   
    
    async  function fetchCase(){
      let res=await axios.post("http://127.0.0.1:5001/cases/getCase",{caseId})
    // console.log(res.data.message[0]);
      setFile(res.data.message);
      let subRes=await axios.post("http://127.0.0.1:5001/cases/getSubsequentFile",{caseId})
      setSubFile(subRes.data.message);
    }

  
  function unixToDate(timestamp){
    const dateObject = dayjs.unix((Number(timestamp)/1000));
   return( dateObject.format("DD MMM YYYY,HH:mm"))
  }
 
    useEffect(()=>{
      fetchCase();
    },[])

    return(
        <div className=" flex  p-3 mt-2">
     <div className="p-10">
      <h1 className="font-bold text-secondary-blue text-2xl mb-4">
        Case
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
                <td className="px-6 py-2">{file?.txId}</td>
                  <td className="px-6 py-2">{unixToDate(file?.date)}</td>
                </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-4">
        <h2 className="font-bold text-main-blue">Subsequent Files/Uploads:</h2>
        <table className="min-w-full text-sm font-light">
          <thead className="bg-main-blue text-white">
            <tr>
              <th className="px-6 py-2">File</th>
              <th className="px-6 py-2">Filetype</th>
              <th className="px-6 py-2">Upload/Modification Date</th>
            </tr>
          </thead>
          <tbody>
          {
             subfile.length>0 ? subfile.map((file)=>{
              return(
                <>
                <tr className="border-b">
                <td className="px-6 py-2">{file?.txId}</td>
                <td className="px-6 py-2">{file?.filetype}</td>
                  <td className="px-6 py-2">{unixToDate(file?.date)}</td>
                </tr>
                </>
              )
             }) :  <>
             <tr className="border-b">
             <td className="px-6 py-2">No Subsequent file Uploaded</td>
             </tr>
             </>
          }     
          </tbody>
        </table>
      </div>

     
    </div>
      </div> 
    )
      }
CaseForUser.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };
  