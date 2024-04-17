"use client"
import axios from "axios";
import {useState} from "react";
import {useDispatch} from "react-redux"
import { updatePayment } from "../../store/paymentSlice/payment";
import Loading from "@/components/loadingOverlay"
export default function MpesaModal({ isOpen, onClose}) {
 const dispatch=useDispatch()
  if (!isOpen) return null;
const [phone,setPhone]=useState("");
const [processing,setProcessing]=useState(false)
function sleep(milliseconds) {  
  return new Promise(resolve => setTimeout(resolve, milliseconds));  
}  
async function handleSubmit(){
  try{
    let amount="1"
    setProcessing(true);
    await sleep(4000);
let res=await axios.post("http://127.0.0.1:5001/mpesa-online/",{phone,amount});
await sleep(10000);
if(res.status===200){
    dispatch(updatePayment({paid:true}))
    setProcessing(false);
    onClose();
}

  }catch(err){
    console.log(err);
  }
 
}

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg">
        <h1 className="text-2xl text-center font-bold mb-5">Lipa na M-Pesa</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >

          <label
            htmlFor="wallet"
            className="block text-sm font-medium text-main-blue"
          >
           Add Phone Number
          </label>
          <input
            type="text"
            id="wallet"
            name="wallet"
            onChange={(e)=>{setPhone(e.target.value)}}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 outline-transparent-blue"
          />
            <label
            htmlFor="amount"
            className="block text-sm font-medium text-main-blue"
          >
           Amount
          </label>
          <input
            type="text"
            id="amount"
            name="amount"
            required
            disabled
            value="75"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 outline-transparent-blue"
          />

          <div className="mt-4 flex justify-between">
            <button
               onClick={onClose}
              className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-main-blue text-white rounded hover:bg-blue-700"
              onClick={(e)=>{handleSubmit()}}
            >
              Pay
            </button>
          </div>
        </form>
      </div>
      {
        processing===true ? <Loading placeholder={"Processing..."}/>:<></>
      }
    </div>
  );
}
