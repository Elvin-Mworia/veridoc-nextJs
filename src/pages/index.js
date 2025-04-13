"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useState, useEffect,useRef } from 'react';
import { useSelector,useDispatch} from "react-redux";
import {updateuserinfo} from "../../store/userSlice/userInfo";
import {updateLoginState} from "../../store/userSlice/loginStatus"
import { updateStaffStation } from "../../store/userSlice/staffStation";
import axios from "axios"
import {motion } from "framer-motion";

export default function Home() {
  const router = useRouter()
  const [isWindowAvailable, setIsWindowAvailable] = useState(false);
  let othent;
  const dispatch=useDispatch();
  const {walletAddress,name,role}=useSelector((state)=>(state.userInfo))
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
      axios.post(`${process.env.BACKENDURL}:${process.env.PORT}/users/login`,{walletAddress:walletAddress}).then((res)=>{
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
    router.push( "/signup");
  }
  }catch(err){
    console.log(err)
  }
  };
  const fadeInAnimationDiv = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { delay: .8, duration: 0.5, ease: "easeOut" } },
  };
  const fadeInAnimationLoginButton = {
    initial: { x: 100, opacity: 0 }, 
    animate: { x: 0, opacity: 1, transition: { delay: .5,duration: 0.5, ease: "easeOut" } },
  };
  const fadeInAnimationSignupButton = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { delay: 1.2, duration: 0.5, ease: "easeInOut" } },
  };
  const fadeInAnimationLogo = {
    initial: { x: -100, opacity: 0 }, 
    animate: { x: 0, opacity: 1, transition: { delay: .3,duration: 0.5, ease: "easeOut" } },
  };
  return (
    <div className="h-screen flex flex-col bg-[url(/homepage/courtroom1.jpeg)] bg-origin-padding bg-center bg-cover bg-no-repeat bg-clip-border ">
      <div className="flex h-16 items-center w-full p-6">
        <motion.div 
         variants={fadeInAnimationLogo}
         initial="initial"
         animate="animate"
        className="flex flex-row">
        <Image
          className=""
          width={50}
          height={50}
          src="/veridoc2.webp"
          alt="Veridoc Log"
        />
        <div className="ml-5">
          <h1 className="text-3xl font-bold text-white tracking-widest">Veridoc</h1>
          <p className="text-sm text-alt-blue font-bold"> 
            Decentralizing Trust: Fairness for All
          </p>
        </div>
        </motion.div>
        <motion.button
          variants={fadeInAnimationLoginButton}
          initial="initial"
          animate="animate"
          className="bg-main-blue rounded px-5 py-1 text-white ml-auto"
          onClick={()=>{handleConnect('login')}}
        >
          Login
        </motion.button>
      </div>
      <div className="grow flex items-center w-full">
        <div className="image-part w-3/6">
          {/* <Image
            className="opacity-20"
            width={500}
            height={500}
            src="/homepage/veridoc.jpeg"
            alt="Veridoc Log"
          /> */}
        </div> 
        <motion.div 
          variants={fadeInAnimationDiv}
          initial="initial"
          animate="animate"
          className="w-3/6 p-4">
          <h2 className="text-4xl font-black mb-4 text-white">
            Empowering the Judiciary with Blockchain
          </h2>
          <p className="mb-6 text-cyan-400 font-semibold ">
            Veridoc introduces a revolutionary e-filing system designed to
            transform judicial document management. Utilizing blockchain
            technology, we offer unmatched security, transparency, and
            efficiency, setting a new standard for legal processes worldwide.
          </p>
          <div>
            <motion.button
              variants={fadeInAnimationSignupButton}
              initial="initial"
              animate="animate"
             className="bg-main-blue rounded px-6 py-2 text-white mx-2 my-5" 
                onClick={()=>{handleConnect('signup')}}>
              Signup
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
