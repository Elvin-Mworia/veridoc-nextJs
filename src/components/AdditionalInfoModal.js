"use client"
import axios from "axios";
import {useState} from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Loading from "@/components/loadingOverlay"
export default function AddInfo({ isOpen, onClose,status}) {
  
const {caseId}=useSelector((state)=>state.caseId)
const [input,setInput]=useState("");
const [processing,setProcessing]=useState(false)
const router=useRouter();
function sleep(milliseconds) {  
  return new Promise(resolve => setTimeout(resolve, milliseconds));  
}  
async function approval(status){
    let res=await axios.post("http://127.0.0.1:5001/cases/approval",{status,caseId,feedback:input})
     
    if(res.status===200){
      setProcessing(true);
      await sleep(3000)
      router.push("/staff/dashboard");
      setInput("");
      onClose()
      alert("Feedback submitted successfuly.")
      setProcessing(false);

    } 

  }
async function handleSubmit(){
  try{
   await approval(status);
  }catch(err){
    console.log(err)
  //  alert(err.response.data.message)
    if(err.request?.status==400){
      alert(err.request.data.message);
    }
  }
  onClose();
 // window.location.reload();
}
if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg">
        <h1 className="text-2xl text-center font-bold mb-5">Status</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >

          <label
            htmlFor="wallet"
            className="block text-sm font-medium text-main-blue"
          >
            Additional Info
          </label>
          {/* <input
            type="text"
            id="wallet"
            name="wallet"
            value={input}
            onChange={(e)=>{setInput(e.target.value)}}
            required
            className="mt-1 block h-48 w-full rounded-md border-blue-300 focus:border-main-blue  outline-blue-200 shadow-sm p-2 "
          /> */}
          <textarea id="message" rows="4"  value={input}
            onChange={(e)=>{setInput(e.target.value)}}
            required className="mt-1 block h-48 w-full rounded-md border-blue-300 focus:border-main-blue  outline-blue-400 shadow-sm p-2 " placeholder="Add text here.."></textarea>

          <div className="mt-4 flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              
              className="py-2 px-4 bg-main-blue text-white rounded hover:bg-blue-700"
              onClick={()=>{handleSubmit()}}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      {
        processing===true ? <Loading placeholder={"Submitting..."}/>:<></>
      }
    </div>
  );
}