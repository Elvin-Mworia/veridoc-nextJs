import { Box, VStack, Field, Input, Center } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { userRegInfo } from "../../store/userSlice/userRegistration";
import {
  PasswordInput,
  PasswordStrengthMeter,
} from "@/components/ui/password-input";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const inputVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
};

export default function SignupForm({ tabsValue }) {
  const inputFields = [
    { label: "First Name", placeholder: "Joe", type: "text",stateName:"firstName" },
    { label: "Last Name", placeholder: "Doe", type: "text",stateName:"lastName" },
    { label: "Email", placeholder: "joedoe@gmail.com", type: "email" ,stateName:"email"},
    { label: "Phone Number", placeholder: "070000000", type: "tel",stateName:"phone"},,
    { label: "Password", placeholder: "password", type: "password", isPassword: true ,stateName:"password"},
    { label: "Confirm Password", placeholder: "password", type: "password", isConfirmPassword: true ,stateName:"confirmPassword"},
  ];
const dispatch=useDispatch();
const{firstName,lastName,phone,email,password,confirmPassword}=useSelector((state)=>(state.registrationDetail))
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
          First Name <Field.RequiredIndicator />
        </Field.Label>
        <motion.Input   
         initial="initial"
         animate="animate"
         variants={inputVariants}
          placeholder="Joe" variant="subtle"  className="p-2 text-black" size="xs" onChange={(e)=>{dispatch(userRegInfo({firstName:e.target.value}))}} value={firstName}/>
      </Field.Root>

      <Field.Root required>
        
        <Field.Label>
          Last Name <Field.RequiredIndicator />
        </Field.Label>
        <motion.Input  initial="initial"
         animate="animate"
         variants={inputVariants} placeholder="Doe" variant="subtle" className="p-2 text-black" size="xs" onChange={(e)=>{dispatch(userRegInfo({lastName:e.target.value}))}} value={lastName}/>
      </Field.Root>

      <Field.Root required>
        
        <Field.Label>
          Email <Field.RequiredIndicator />
        </Field.Label>
        <motion.Input initial="initial"
         animate="animate"
         variants={inputVariants} placeholder="joedoe@gmail.com" variant="subtle" className="p-2 text-black" size="xs" onChange={(e)=>{dispatch(userRegInfo({email:e.target.value}))}} value={email} />
      </Field.Root>
      <Field.Root required>
        
        <Field.Label>
          Phone Number <Field.RequiredIndicator />
        </Field.Label>
        <motion.Input initial="initial"
         animate="animate"
         variants={inputVariants} placeholder="070000000" variant="subtle" className="p-2 text-black" size="xs" onChange={(e)=>{dispatch(userRegInfo({phone:e.target.value}))}} value={phone} />
      </Field.Root>
      <motion.div 
      initial="initial"
      animate="animate"
      variants={inputVariants}>
      <Field.Root required>
        <Field.Label>
          Password <Field.RequiredIndicator />
        </Field.Label>
       <PasswordInput  variant="subtle" placeholder="password" className="p-2 text-black"  size="xs" onChange={(e)=>{dispatch(userRegInfo({password:e.target.value}))}} value={password}/>
       <PasswordStrengthMeter  value={2}/>
      </Field.Root>
      </motion.div>
      <motion.div 
      initial="initial"
      animate="animate"
      variants={inputVariants} size="xs">
      <Field.Root required>
         <Field.Label>
         Confirm Password <Field.RequiredIndicator />
        </Field.Label>
       < PasswordInput  variant="subtle" placeholder="password" className="p-2 text-black"  size="xs" onChange={(e)=>{dispatch(userRegInfo({confirmPassword:e.target.value}))}} value={confirmPassword}/>
      </Field.Root>
      </motion.div>
            </VStack>
          </Center>
        </form>
      </Center>
    </Box>
  );
}