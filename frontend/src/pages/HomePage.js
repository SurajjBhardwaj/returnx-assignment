import React from 'react'
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


const HomePage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
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
          Suraj Chat-APP
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
            <Tab width={"50%"} >Login</Tab>
            <Tab width={"50%"}>Sign-up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
             <Login/>
            </TabPanel>
            <TabPanel>
             <SignUp/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default HomePage
