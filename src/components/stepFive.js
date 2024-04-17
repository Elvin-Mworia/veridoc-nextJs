import { useSelector,useDispatch } from "react-redux";
import axios from "axios"
import { useRouter } from "next/navigation";
import { useState } from "react";
import MpesaModal from "./mpesaModal";
import Loading from "@/components/loadingOverlay"
import { updatePayment } from "../../store/paymentSlice/payment";
export default function StepFive({ prevStep, formData}) {
  const {courtRank}=useSelector((state)=>(state.rank))
  const {courtStation}=useSelector((state)=>(state.station))
  const {courtDivision}=useSelector((state)=>(state.division))
  const {walletAddress}=useSelector((state)=>(state.userInfo))
  const {file}=useSelector((state)=>(state.file))
  const {paid}=useSelector((state)=>(state.paid))
  const router=useRouter();
  const dispatch=useDispatch();
  const [isAdminModalOpen, setAdminModalOpen] = useState(false);
   
  //for showing the lipa na mpesa online modal
  function handlePayment(){
    setAdminModalOpen(true);
  }
 async function handleSubmit(e){
    e.preventDefault()
   //setAdminModalOpen(true);
  let  applicant=formData.parties.filter((party)=>party.partyType==="applicant")
  let  respodent=formData.parties.filter((party)=>party.partyType==="respodent")
    let res= await axios.post("http://127.0.0.1:5001/cases/add",{walletAddress,station:courtStation,file:file,applicant,respodent},{headers: {
      'Content-Type': 'multipart/form-data'
    }})
    if(res.status!==200){
      alert(res.data.message);
    }else{
      alert("Case filed succefully")
      dispatch(updatePayment({paid:true}))
      router.push("/user/dashboard")
    }
  }
  return (
    <div className="p-10">
      <h1 className="font-bold text-secondary-blue text-2xl mb-4">
        Review and Confirm
      </h1>

      <div className="mb-4">
        <h2 className="font-bold text-main-blue">Case Details:</h2>
        <p className="font-bold">Court Rank</p>
        <p>{courtRank || "Not specified"}</p>
        <p className="font-bold">Court Station</p>
        <p>{courtStation || "Not specified"}</p>
        <p className="font-bold">Court Division</p>
        <p>{courtDivision || "Not specified"}</p>
        {/* <p className="font-bold">Case Category</p> */}
        {/* <p> {formData.caseCategory || "Not specified"}</p>
        <p className="font-bold">Case Type</p>
        <p> {formData.caseType || "Not specified"}</p> */}
        
      </div>

      <div className="mb-4">
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
            {formData.parties.length > 0 ? (
              formData.parties.map((party, index) => (
                <tr key={index} className="border-b">
                  <td className="px-6 py-2">{party.category}</td>
                  <td className="px-6 py-2">{party.partyType}</td>
                  <td className="px-6 py-2">{party.name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-2">
                  No parties added.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mb-4">
        <h2 className="font-bold text-main-blue">Files:</h2>
        <table className="min-w-full text-sm font-light">
          <thead className="bg-main-blue text-white">
            <tr>
              <th className="px-6 py-2">File Type</th>
              <th className="px-6 py-2">Caption</th>
             
            </tr>
          </thead>
          <tbody>
            {formData.files && formData.files.length > 0 ? (
              formData.files.map((file, index) => (
                <tr key={index} className="border-b">
                  <td className="px-6 py-2">{file.fileType}</td>
                  <td className="px-6 py-2">{file.caption}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-2">
                  No files uploaded.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          className="bg-main-blue text-white font-semibold px-4 py-2 rounded hover:bg-main-blue-dark focus:outline-none focus:ring-2 focus:ring-main-blue focus:ring-opacity-50 transition ease-in-out duration-150"
        >
          Go Back
        </button>
        {
          paid===false?       <div>
          
          <button
            onClick={()=>handlePayment()}
            className="bg-main-blue text-white mr-4 font-semibold px-4 py-2 rounded hover:bg-main-blue-dark focus:outline-none focus:ring-2 focus:ring-main-blue focus:ring-opacity-50 transition ease-in-out duration-150"
          >
            Pay
          </button>
          
          <button
            disabled
            className=" bg-blue-300 text-white font-semibold px-4 py-2 rounded hover:bg-main-blue-dark focus:outline-none focus:ring-2 focus:ring-main-blue focus:ring-opacity-50 transition ease-in-out duration-150"
          >
            Complete Submission
          </button>
          </div>:
               <div>
          
               <button
                 disabled
                 className=" bg-blue-300 text-white mr-4 font-semibold px-4 py-2 rounded hover:bg-main-blue-dark focus:outline-none focus:ring-2 focus:ring-main-blue focus:ring-opacity-50 transition ease-in-out duration-150"
               >
                 Pay
               </button>
               
               <button
                 onClick={(e)=>handleSubmit(e)}
                
                 className="bg-main-blue text-white font-semibold px-4 py-2 rounded hover:bg-main-blue-dark focus:outline-none focus:ring-2 focus:ring-main-blue focus:ring-opacity-50 transition ease-in-out duration-150"
               >
                 Complete Submission
               </button>
               </div>
        }
<MpesaModal
     isOpen={isAdminModalOpen}
     onClose={() => setAdminModalOpen(false)}/>
      </div>
    </div>
  );
}
