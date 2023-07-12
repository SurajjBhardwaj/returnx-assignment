import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement,  VStack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Login = () => {
  
   const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
    const toast = useToast();

   const handleClick = () => {
     setShow(!show);
   };
  const handleSubmit = async() => {
    
      setLoading(true);
      if (!email || !password) {
        toast({
          title: "please fill all the fields",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        return;
      }

      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        console.log("okay");
        const { data } = await axios.post(
          "/api/user/login",
          { email, password},
          config
        );
        console.log("now okay");
        toast({
          title: "successfully logined",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
        history.push("/new");
        // window.location.href="/"
      } catch (error) {
        console.log(error);
        toast({
          title: "error happened",
          description: error.message,
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top-left",
        });
        setLoading(false);
      }
   };

   return (
     <VStack spacing={"5px"}>
       <FormControl id="email" isRequired>
         <FormLabel>Email</FormLabel>
         <Input
           placeholder="Enter your Email"
           type="email"
           value={email}
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
             value={password}
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
         isLoading={loading}
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
