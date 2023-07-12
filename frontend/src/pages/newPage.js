import React from 'react'

import { Box, Container, Text } from '@chakra-ui/react';


const ChatPage = () => {
  // const { user } = ChatState();
  
    return (
      <div style={{ width: "100%" }}>
      
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
         welcome home
        </Text>
          </Box>
          </Container>
      </div>
    );
   
}

export default ChatPage
