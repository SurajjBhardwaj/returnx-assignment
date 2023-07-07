import React, { useState } from 'react'
import {Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack} from '@chakra-ui/react'

const SignUp = () => {

   const [show, setShow] = useState(false);
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [cpassword, setCpassword] = useState()
  const [pic, setPic] = useState()
  
  const handleClick = () => { setShow(!show) } 
  const postDetails = (pics) => { }
  const handleSubmit = ()=>{}
  

  return (
    <VStack spacing={"5px"}>
      <FormControl id="firstname" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          type="string"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

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

      <FormControl id="Cpassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Enter the same password here"
            type={show ? "text" : "password"}
            required
            onChange={(e) => setCpassword(e.target.value)}
          />

          <InputRightElement width={"4.5rem"}>
            <Button h="1.75rem" size={"sm"} onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id='pic'>
        <FormLabel>Upload your profile pic</FormLabel>
        <Input
          type='file'
          p={1.5}
          accept='image/*'
          onChange={(e)=>postDetails(e.target.value.file[0])}
        />
      </FormControl>
      <Button
      
        colorScheme='blue'
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={handleSubmit}
      
      >
        Sign Up
      </Button>


    </VStack>
  );
}

export default SignUp
