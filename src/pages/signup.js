"use client"
import Image from "next/image";
import {useState,useEffect} from 'react';
import axios from 'axios'
import { useSelector,useDispatch} from "react-redux";
import { useRouter } from 'next/navigation'
import {updateuserinfo} from "../../store/userSlice/userInfo";
import {updateLoginState} from "../../store/userSlice/loginStatus"
import { updateStaffStation } from "../../store/userSlice/staffStation";


export default function signup() {
  // const initialAccountType = {
  //   individual: false,
  //   company: false,
  //   lawFirm: false,
  //   staff: false,
  // };
const router = useRouter();
const {walletAddress,name,role}=useSelector((state)=>(state.userInfo))
const[phone,setPhone]=useState(null)
const[fullname,setName]=useState(null)
const[email,setAddress]=useState(null)
//const [accountType, setAccountType] = useState(initialAccountType);
const [isWindowAvailable, setIsWindowAvailable] = useState(false);
  let othent;
  const dispatch=useDispatch();

  useEffect(() => {
    try{
      if (typeof window !== 'undefined') {
        setIsWindowAvailable(true);
         // Import the connect function only after window is available
         import('@othent/kms').then((module) => {
         othent= module
        });
      }else{
        setIsWindowAvailable(false);
  
      }
    }catch(err){
console.log(err);
    }
  
  }, [isWindowAvailable]);
//connects the othentkms during signup or login
  async function handleConnect(auth) {
    try{
    if(auth==="login"){
    othent.connect().then((res)=>{
      let walletAddress=res.walletAddress;
      let name=res.name;
      axios.post('http://localhost:5001/users/login',{walletAddress:walletAddress}).then((res)=>{
      if(res.status===200){
        dispatch(updateLoginState({loginStatus:true}))
       dispatch(updateuserinfo({walletAddress:walletAddress,name:name,role:res.data.role}))
          alert(res.data.message);
          console.log(res.data)
          if(res.data.role=="staff"){
           dispatch(updateStaffStation({station:res.data.station}))
            router.push( "/staff/dashboard");
          }
          if(res.data.role=="admin"){
            router.push( "/admin/dashboard");
          }
         if(res.data.role=="normalUser"){
            router.push( "/user/dashboard");
          }
     
        }
        
      }).catch((err)=>{
        console.log(err);
        // if(err.request.status===400){
        // alert(err.data.message.concat("try signing up!"))
        // }
        
      })
    
    });
    } else if(auth==="signup"){
      othent.connect().then((res)=>{
        dispatch(updateuserinfo({walletAddress:res.walletAddress,name:res.name,role:"normalUser"}))
        router.push( "/signup");
    })
 
    }
  }catch(err){
    console.log(err)
  }
  };

function handleSubmit(e){
  e.preventDefault();
  axios.post('http://localhost:5001/users/l2',{
    walletAddress,email,phone,role,fullname
  }).then((res)=>{
   console.log(res);
   if(res.response.status===200){
    alert("registered successfully,proceed to login");
    setName(null);
    setPhone(null);
    setAddress(null);
   }
   console.log(res.response.data.message)
  router.push("/")
  }).catch((err)=>{
    if(err.response.status===400){
      alert(err.response.data.message.concat("proceed to login"));
      router.push("/");
    }
  })

}

// const handleAccountTypeChange = (e) => {
//   const selectedType=e.target.value;
//   console.log(selectedType);
//   setAccountType((prevState) => ({
//     ...prevState,
//    // Set the selected type to true and reset others to false
//    individual: selectedType === 'individual' ? true : false,
//    company: selectedType === 'company' ? true : false,
//    lawFirm: selectedType === 'lawFirm' ? true : false,
//    staff: selectedType === 'staff' ? true : false,
//  }));
//  console.log(accountType);
// }
  return (
    <div className="h-screen flex flex-col">
      <div className="flex h-16 items-center w-full p-6">
        <Image
          className=""
          width={50}
          height={50}
          src="/veridoc2.webp"
          alt="Veridoc Log"
        />
        <div className="ml-5">
          <h1 className="text-3xl font-bold text-secondary-blue">Veridoc</h1>
          <p className="text-sm text-alt-blue">
            Decentralizing Trust: Fairness for All
          </p>
        </div>
        <button
          className="bg-main-blue rounded px-5 py-1 text-white ml-auto"
          onClick={()=>{handleConnect('login')}}
        >
          Login
        </button>
      </div>
      <div className="grow flex items-center justify-center">
        <div className="">
          <h1 className="text-center font-bold text-2xl text-main-blue">
            Complete Registration
          </h1>

          <div className="mt-5 rounded p-3 bg-transparent-blue">
            {/* Put form here */}
            <form className="flex flex-col space-y-4">
              <fieldset className="mb-4">
                <legend className="font-bold mb-2">Account Type</legend>
                <div className="flex">
                  <label className="mr-6 block">
                    <input
                      type="radio"
                      name="accountType"
                      value="individual"
                      className="mr-2"                
                    />
                    Individual
                  </label>
                  <label className="mr-6 block">
                    <input
                      type="radio"
                      name="accountType"
                      value="company"
                      className="mr-2"
                    />
                    Company
                  </label>
                  <label className="mr-6 block">
                    <input
                      type="radio"
                      name="accountType"
                      value="lawFirm"
                      className="mr-2"
                     
                    />
                    Law Firm
                  </label>
                  <label className="mr-6 block">
                    <input
                      type="radio"
                      name="accountType"
                      value="staff"
                      className="mr-2"
                    
        
                    />
                    Judiciary Staff
                  </label>
                </div>
              </fieldset>
              <div className="flex flex-col">
                <label htmlFor="name" className="font-bold block">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={fullname}
                  className="p-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={(e)=>{setName(e.target.value)}}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="address" className="font-bold block">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={email}
                  onChange={(e)=>{setAddress(e.target.value)}}
                  className="p-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="phoneNumber" className="font-bold block">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={phone}
                  className="p-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                 onChange={(e)=>{setPhone(e.target.value)}}
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-main-blue rounded px-5 py-2 text-white mt-4 self-center uppercase text-sm"
                onClick={handleSubmit}
              >
                register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
