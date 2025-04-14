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
    { label: "First Name", placeholder: "Joe", type: "text" },
    { label: "Last Name", placeholder: "Doe", type: "text" },
    { label: "Email", placeholder: "joedoe@gmail.com", type: "email" },
    { label: "Phone Number", placeholder: "070000000", type: "tel" },
    { label: "Password", placeholder: "password", type: "password", isPassword: true },
    { label: "Confirm Password", placeholder: "password", type: "password", isConfirmPassword: true },
  ];

  return (
    <Box width="80%" height="75%" className="m-.5">
      <Center>
        <form className="flex flex-col space-y-4">
          <Center>
            <VStack spacing={4}>
              {inputFields.map((field, index) => (
                <motion.div
                  key={index}
                  variants={inputVariants}
                  initial="initial"
                  animate={{
                    opacity: 1,
                    transition: { duration: 1, delay: index * 0.2 ,ease:"easeOut"}, // Stagger delay
                  }}
                >
                  <Field.Root required>
                    <Field.Label>
                      {field.label} <Field.RequiredIndicator />
                    </Field.Label>
                    {field.isPassword || field.isConfirmPassword ? (
                      <PasswordInput
                        variant="subtle"
                        placeholder={field.placeholder}
                        className="p-2"
                        size="xs"
                      />
                    ) : (
                      <Input
                        placeholder={field.placeholder}
                        variant="subtle"
                        className="p-2"
                        size="xs"
                        type={field.type}
                      />
                    )}
                    {index === 4 && <PasswordStrengthMeter value={2} />}
                  </Field.Root>
                </motion.div>
              ))}
            </VStack>
          </Center>
        </form>
      </Center>
    </Box>
  );
}