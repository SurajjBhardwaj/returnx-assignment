import React, { useEffect } from 'react'
import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import Login from '../components/Authentication/Login';
import SignUp from '../components/Authentication/SignUp';
import { useHistory } from 'react-router-dom';



const HomePage = () => {

   
  const history = useHistory();
  useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) history.push("/new");
    
  }, [history])



  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"tomato"}
        width="100%"
        m="40px 0 15px 0"
        borderRadius="5g"
        borderWidth="1px"
      >
        <Text
          fontSize={"3xl"}
          fontFamily={"work sans"}
          color={"black"}
          textAlign={"center"}
        >
          Return x assignment
        </Text>
      </Box>

      <Box
        bg={"white"}
        width={"100%"}
        p={4}
        borderRadius={"1g"}
        borderWidth={"1px"}
      >
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab width={"50%"}>Sign-up</Tab>
            <Tab width={"50%"}>Login</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SignUp />
            </TabPanel>
            <TabPanel>
              <Login />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default HomePage
