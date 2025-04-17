"use client"
import Image from "next/image";
import {useState,useEffect,useRef} from 'react';
import axios from 'axios'
import { useSelector,useDispatch} from "react-redux";
import { useRouter } from 'next/navigation'
import { Box ,Tabs,VStack,useTabs,Center} from "@chakra-ui/react"
import LoginForm from "@/components/loginForm";
export default function Login(){
    const router = useRouter();
    const dispatch=useDispatch();
    const [isWindowAvailable, setIsWindowAvailable] = useState(false);
    let othent;
     useEffect(() => {
        try{
          if (typeof window !== 'undefined') {
            setIsWindowAvailable(true);
            //dispatch(userRegInfo({category:userCategory}));
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
    const tabs = useTabs({
        defaultValue: "Individual",
      })
   
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
                  </VStack>  
              </Box>
            </div>
          </div>
        </div>);
}