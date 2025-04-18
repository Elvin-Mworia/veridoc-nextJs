
import { Box, VStack, Field, Input, Center } from "@chakra-ui/react";
import { useDispatch,useSelector} from "react-redux";
import {PasswordInput,} from "@/components/ui/password-input";
import { motion } from "framer-motion";
import { useState,useEffect } from "react";
import {updateLoginState} from "../../store/userSlice/loginStatus"


const inputVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
};

export default function LoginForm({ tabsValue }) {

const {email,password}=useSelector((state)=>(state.login))
const dispatch=useDispatch();
const inputVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1 ,ease:"easeOut",delay:0.5 }}
};

 
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
         variants={inputVariants} placeholder="joedoe@gmail.com" variant="subtle" className="p-2 text-black" size="xs" onChange={(e)=>{dispatch(updateLoginState({email:e.target.value}))}} value={email} />
      </Field.Root>
    
      
      <Field.Root required>
      <motion.div
              initial="initial"
              animate="animate"
              variants={inputVariants}
             >
        <Field.Label>
          Password <Field.RequiredIndicator />
        </Field.Label>
       <PasswordInput  variant="subtle" placeholder="password" className="p-2 text-black" maxWidth="264px" size="xs"  onChange={(e)=>{dispatch(updateLoginState({password:e.target.value}))}} value={password}/>
       </motion.div>
      </Field.Root>
       
            </VStack>
          </Center>
        </form>
      </Center>
    </Box>
  );
}