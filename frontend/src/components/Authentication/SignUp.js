import React, { useState } from 'react'
import {Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast} from '@chakra-ui/react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const SignUp = () => {

   const [show, setShow] = useState(false);
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [cpassword, setCpassword] = useState()
  const [pic, setPic] = useState()
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  
  const handleClick = () => { setShow(!show) } 
  const postDetails = (pics) => { 

    setLoading(true);
    if (pics === undefined) {
       toast({
         title: "please select an image",
         status: "warning",
         duration: 5000,
         isClosable: true,
         position:'bottom',
       });
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "surajj-chat");
      data.append("cloud_name", "dyumydxmc");
      fetch("https://api.cloudinary.com/v1_1/dyumydxmc/image/upload", {
        method: 'post', 
        body: data,
      }).then((res) =>  res.json() )
        .then(data => {
          if (data.url) {
            setPic(data.url.toString());
            console.log(data.url.toString());
            setLoading(false);
          } else {
             setLoading(false);
          }
      }).catch((error) => {
        console.log(error);
        setLoading(false);
      });


    } else {
       toast({
         title: "please select an image",
         status: "warning",
         duration: 5000,
         isClosable: true,
         position: "bottom",
       });
      setLoading(false);
       return;
    }
  }


  // after collecting the data it will send the post request to backend
  const handleSubmit = async() => {
    
    setLoading(true);
    if (!name || !email || !password || !cpassword) {
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

    if (password !== cpassword) {
        toast({
          title: "passwords are not matching",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      console.log("okay");
      const { data } = await axios.post("/api/user", { name, email, password, pic }, config);
      console.log("now okay");
      toast({
        title: "Registration Successful",
        status: "warning",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      localStorage.setItem("userInfo", JSON.stringify(data))
      setLoading(false);
      history.push('/chats')
    } catch (error) {
      console.log(error);
        toast({
          title: "error happened",
          description:error.message,
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      setLoading(false);
    }
  }
  

  return (
    <VStack spacing={"5px"}>
      <FormControl id="firstname" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          type="string"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

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

      <FormControl id="Cpassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Enter the same password here"
            type={show ? "text" : "password"}
            value={cpassword}
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

      <FormControl id="pic">
        <FormLabel>Upload your profile pic</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={handleSubmit}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
}

export default SignUp
