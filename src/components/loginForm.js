
import { Box, VStack, Field, Input, Center } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {PasswordInput,} from "@/components/ui/password-input";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import {updateuserinfo} from "../../store/userSlice/userInfo";
import {updateLoginState} from "../../store/userSlice/loginStatus"
import { updateStaffStation } from "../../store/userSlice/staffStation";

const inputVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
};

export default function LoginForm({ tabsValue }) {

const dispatch=useDispatch();
const inputVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1 ,ease:"easeOut",delay:0.5 }}
};
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
   async function handleLogin(auth) {
    try{
       axios.post(`${process.env.BACKENDURL}:${process.env.PORT}/users/v2/login`,{email:email,password:password}).then((res)=>{
        if(res.status===201){
          dispatch(updateLoginState({loginStatus:true}))
          //logic to derive the user walletaddress after successful login
         dispatch(updateuserinfo({walletAddress:walletAddress,role:res.data.role}))
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
        }   
      )
  }catch(err){
    console.log(err);
   }
}
return (
    <Box width="80%" height="75%" className="m-.5">
      <Center>
        <form className="flex flex-col space-y-4">
          <Center>
            <VStack spacing={4}>
            
        <Field.Root required>
        <Field.Label>
          Email <Field.RequiredIndicator />
        </Field.Label>
        <motion.Input initial="initial"
         animate="animate"
         variants={inputVariants} placeholder="joedoe@gmail.com" variant="subtle" className="p-2 text-black" size="xs" onChange={(e)=>{setEmail(e.target.value)}} value={email} />
      </Field.Root>
    
      
      <Field.Root required>
      <motion.div
              initial="initial"
              animate="animate"
              variants={inputVariants}
              maxWidth="264px">
        <Field.Label>
          Password <Field.RequiredIndicator />
        </Field.Label>
       <PasswordInput  variant="subtle" placeholder="password" className="p-2 text-black" maxWidth="264px" size="xs" onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
       </motion.div>
      </Field.Root>
        <button
                    type="submit"
                    className="bg-main-blue rounded px-5 py-2 text-white mt-4 self-center uppercase text-sm"
                    onClick={handleLogin}
                  >
                    login
                  </button>
            </VStack>
          </Center>
        </form>
      </Center>
    </Box>
  );
}