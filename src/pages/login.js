"use client"
import Image from "next/image";
import {useState,useEffect,useRef} from 'react';
import axios from 'axios'
import { useSelector,useDispatch} from "react-redux";
import { useRouter } from 'next/navigation'
import { Box ,Tabs,VStack,useTabs,Center} from "@chakra-ui/react"
import LoginForm from "@/components/loginForm";
import {updateuserinfo} from "../../store/userSlice/userInfo";
import {updateLoginState} from "../../store/userSlice/loginStatus"
import { updateStaffStation } from "../../store/userSlice/staffStation";

export default function Login(){
    const router = useRouter();
    const dispatch=useDispatch();
  const {email,password}=useSelector((state)=>(state.login))
  
     useEffect(() => {}, []);
    const tabs = useTabs({
        defaultValue: "Individual",
      })
      async function handleLogin() {
        // e.preventDefault();
        try{
           axios.post(`${process.env.BACKENDURL}:${process.env.PORT}/users/v2/login`,{email:email,password:password}).then((res)=>{
            console.log(res);
            if(res.status===202){
              dispatch(updateLoginState({loginStatus:true}))
              //logic to derive the user walletaddress after successful login
             dispatch(updateuserinfo({firstName:res.data.user.firstName,lastName:res.data.user.lastName,role:res.data.user.role,email:res.data.user.email,phone:res.data.user.phone}))
                alert(res.data.message);
                console.log(res.data)
                if(res.data.user.role=="staff"){
                 dispatch(updateStaffStation({station:res.data.station}))
                  router.push( "/staff/dashboard");
                }
                if(res.data.user.role=="admin"){
                  router.push( "/admin/dashboard");
                }
               if(res.data.user.role=="user"){
                  router.push( "/user/dashboard");
                }
              }        
            }).catch((err)=>{
              console.log(err);
            }   
          )
      }catch(err){
        console.log(err);
       }
    }
   
    return(    <div className="h-screen flex flex-col bg-[url(/homepage/courtroom1.jpeg)] bg-origin-padding bg-center bg-cover bg-no-repeat bg-clip-border "  >
          <div className="flex h-16 items-center w-full p-6">
            <Image className="" width={50} height={50} src="/veridoc2.webp" alt="Veridoc Log"
            />
            <div className="ml-5">
              <h1 className="text-3xl font-bold text-secondary-blue">Veridoc</h1>
              <p className="text-sm text-alt-blue">
                Decentralizing Trust: Fairness for All
              </p>
            </div>
            <button
              className="bg-main-blue rounded px-5 py-1 text-white ml-auto"
              onClick={()=>{router.push("/signup")}}
            >
              Signup
            </button>
          </div>
          <div className="grow flex items-center justify-center">
            <div className="">
             {/*bgPosition="center" bgSize="fit" backgroundOrigin="center" bgRepeat="no-repeat" bgImg="url(/ScaleGavel10.jpeg)"*/}
              <Box className="bg-[url(/signup/ScaleGavel2.jpeg)] bg-origin-padding bg-center bg-cover bg-no-repeat bg-clip-border "  width="40vw" height="55vh" padding="4" color="white" borderRadius="md">
       <VStack>    
         <Tabs.Root defaultValue="Individual" variant="line" width="100%" fitted   >
          <Tabs.List >
            <Tabs.Trigger value="Individual"  className="text-black w-3xs m-2 text-lg font-black  hover:bg-sky-200 focus:bg-sky-700 focus:text-white" borderTopRadius="md">
              Individual
            </Tabs.Trigger>
            <Tabs.Trigger value="Law firm"  className="text-black w-3xs m-2 text-lg font-black hover:bg-sky-200 focus:bg-sky-700 focus:text-white" borderTopRadius="md">  
            Law Firm
            </Tabs.Trigger>
            <Tabs.Trigger value="Judiciary Staff"  className="text-black w-3xs m-2 text-lg font-black hover:bg-sky-200 focus:bg-sky-700 focus:text-white" borderTopRadius="md">
            Judiciary Staff
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="Individual" ><Center><LoginForm tabsValue={tabs.value}/></Center></Tabs.Content>
          <Tabs.Content value="Law firm" ><Center><LoginForm tabsValue={tabs.value}/></Center></Tabs.Content>
          <Tabs.Content value="Judiciary Staff"><Center><LoginForm tabsValue={tabs.value}/></Center></Tabs.Content>
        </Tabs.Root>
        <button
                    type="submit"
                    className="bg-main-blue rounded px-5 py-2 text-white mt-4 self-center uppercase text-sm"
                    onClick={handleLogin}
                  >
                    login
                  </button>
                  </VStack>  
              </Box>
            </div>
          </div>
        </div>);
}