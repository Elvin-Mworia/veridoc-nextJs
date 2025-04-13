import { Box ,VStack,Field,Input,Center} from "@chakra-ui/react"
import { useSelector,useDispatch} from "react-redux";
import {userRegInfo} from "../../store/userSlice/userRegistration";
import {
    PasswordInput,
    PasswordStrengthMeter,
  } from "@/components/ui/password-input"

export default function SignupForm({tabsValue}){

    return(
        <Box width="80%" height="75%" className="m-.5">
            <Center>
            <form className="flex flex-col space-y-4">
                <Center>
                    <VStack>
        <Field.Root required>
        <Field.Label>
          First Name <Field.RequiredIndicator />
        </Field.Label>
        <Input placeholder="Joe" variant="subtle"  className="p-2" size="xs"/>
      </Field.Root>

      <Field.Root required>
        
        <Field.Label>
          Last Name <Field.RequiredIndicator />
        </Field.Label>
        <Input placeholder="Doe" variant="subtle" className="p-2" size="xs"/>
      </Field.Root>

      <Field.Root required>
        
        <Field.Label>
          Email <Field.RequiredIndicator />
        </Field.Label>
        <Input placeholder="joedoe@gmail.com" variant="subtle" className="p-2" size="xs" />
      </Field.Root>
      <Field.Root required>
        
        <Field.Label>
          Phone Number <Field.RequiredIndicator />
        </Field.Label>
        <Input placeholder="070000000" variant="subtle" className="p-2" size="xs" />
      </Field.Root>
      <Field.Root required>
        <Field.Label>
          Password <Field.RequiredIndicator />
        </Field.Label>
       < PasswordInput  variant="subtle" placeholder="password" className="p-2"  size="xs"/>
       <PasswordStrengthMeter value={2}/>
      </Field.Root>
      
      <Field.Root required>
         <Field.Label>
         Confirm Password <Field.RequiredIndicator />
        </Field.Label>
       < PasswordInput  variant="subtle" placeholder="password" className="p-2"  size="xs"/>
      </Field.Root>
      
        </VStack>
        </Center>
 
            </form>
            </Center>
        </Box>
    )

}