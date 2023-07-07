import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'

const Login = () => {
  
   const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
   const [password, setPassword] = useState();

   const handleClick = () => {
     setShow(!show);
   };
   const handleSubmit = () => {};

   return (
     <VStack spacing={"5px"}>
       <FormControl id="email" isRequired>
         <FormLabel>Email</FormLabel>
         <Input
           placeholder="Enter your Email"
           type="email"
           required
           onChange={(e) => setEmail(e.target.value)}
         />
       </FormControl>

       <FormControl id="password" isRequired>
         <FormLabel>Password</FormLabel>
         <InputGroup>
           <Input
             placeholder="Enter your password "
             type={show ? "text" : "password"}
             required
             onChange={(e) => setPassword(e.target.value)}
           />

           <InputRightElement width={"4.5rem"}>
             <Button h="1.75rem" size={"sm"} onClick={handleClick}>
               {show ? "Hide" : "Show"}
             </Button>
           </InputRightElement>
         </InputGroup>
       </FormControl>

       <Button
         colorScheme="blue"
         width={"100%"}
         style={{ marginTop: 15 }}
         onClick={handleSubmit}
       >
         Login
       </Button>

       <Button
         colorScheme="red"
         width={"100%"}
         style={{ marginTop: 15 }}
         onClick={() => {
           setEmail("guest@example.com");
           setPassword("123556");
         }}
       >
         Get a guest user credential
       </Button>
     </VStack>
   );
}

export default Login
