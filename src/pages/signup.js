"use client"
import Image from "next/image";
import {useState,useEffect,useRef} from 'react';
import axios from 'axios'
import { useSelector,useDispatch} from "react-redux";
import { useRouter } from 'next/navigation'
import {updateuserinfo} from "../../store/userSlice/userInfo";
import {updateLoginState} from "../../store/userSlice/loginStatus"
import { updateStaffStation } from "../../store/userSlice/staffStation";
import {userRegInfo} from "../../store/userSlice/userRegistration";
import { Box ,Tabs,VStack,useTabs,Center} from "@chakra-ui/react"
import SignupForm from "@/components/SignupForm";
export default function Signup() {
  // const initialAccountType = {
  //   individual: false,
  //   company: false,
  //   lawFirm: false,
  //   staff: false,
  // };
const router = useRouter();
const dispatch=useDispatch();
const {walletAddress,name,role}=useSelector((state)=>(state.userInfo))
let {firstName,lastName,phone,email,password,confirmPassword}=useSelector((state)=>(state.registrationDetail))

const tabs = useTabs({
  defaultValue: "Individual",
})
const [userCategory,setUserCategory]=useState(tabs.value)

//const [accountType, setAccountType] = useState(initialAccountType);
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
//connects the othentkms during signup or login
  async function handleConnect(auth) {
    try{
    if(auth==="login"){
      
      axios.post(`${process.env.BACKENDURL}:${process.env.PORT}/users/v2/login`,{email:email,password:password}).then((res)=>{
      if(res.status===200){
        dispatch(updateLoginState({loginStatus:true}))
        //logic to derive the user walletaddress after successful login
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
      
      })
    
    
    } else if(auth==="signup"){
   
 
    }
  }catch(err){
    console.log(err)
  }
  };

function handleSubmit(e){
  e.preventDefault();
  console.log(password+"  "+confirmPassword);
  password= password.trim();
  confirmPassword= confirmPassword.trim();
  if (password!== confirmPassword) {
    alert("passwords do not match");
    return;
  }
  console.log(`${process.env.BACKENDURL}:${process.env.PORT}/users/register`)
  axios.post(`${process.env.BACKENDURL}:${process.env.PORT}/users/register`,{
    firstName:firstName,lastName:lastName,email:email,phone:phone,password:password
  }).then((res)=>{
   console.log(res);
   if(res.status===201){
    alert("registered successfully,proceed to login");
    dispatch(userRegInfo({firstName:"",lastName:"",email:"",phone:"",password:"",confirmPassword:""}));
   }
   console.log(res.data.message)
  router.push("/")
  }).catch((err)=>{
    
      alert(err.message);
    //  router.push("/");
      console.log(err);
  })

}
  return (
    <div className="h-screen flex flex-col">
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
          onClick={()=>{router.push("/login")}}
        >
          Login
        </button>
      </div>
      <div className="grow flex items-center justify-center">
        <div className="">
         {/*bgPosition="center" bgSize="fit" backgroundOrigin="center" bgRepeat="no-repeat" bgImg="url(/ScaleGavel10.jpeg)"*/}
          <Box className="bg-[url(/signup/ScaleGavel5.webp)] bg-origin-padding bg-center bg-cover bg-no-repeat bg-clip-border "  width="50vw" height="88vh" padding="4" color="white" borderTopRadius="md">
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
      <Tabs.Content value="Individual" ><Center><SignupForm tabsValue={tabs.value}/></Center></Tabs.Content>
      <Tabs.Content value="Law firm" ><Center><SignupForm tabsValue={tabs.value}/></Center></Tabs.Content>
      <Tabs.Content value="Judiciary Staff"><Center><SignupForm tabsValue={tabs.value}/></Center></Tabs.Content>
    </Tabs.Root>
        <button
                type="submit"
                className="bg-main-blue rounded px-5 py-2 text-white mt-4 self-center uppercase text-sm"
                onClick={handleSubmit}
              >
                register
              </button>
              </VStack>  
          </Box>
        </div>
      </div>
    </div>
  );
}
