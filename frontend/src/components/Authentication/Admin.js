import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  ChakraProvider,
  Container,
  Text,
  Image,
} from "@chakra-ui/react";


// ...imports and other code...

const AdminPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("/api/user/admin")
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  };
  return (
    <ChakraProvider>
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
            Admin Pannel
          </Text>
        </Box>

        <Box>
          <Table
            variant="simple"
            backdropBlur={100}
            bg={"white"}
            borderRadius="5g"
            borderWidth="1px"
          >
            <TableCaption>Admin Data</TableCaption>
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Profile Pic</Th>
                <Th>Name</Th>
                <Th>Email</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Array.isArray(data) && data.length > 0 ? (
                data.map((item, index) => (
                  <Tr key={item._id}>
                    <Td>{index + 1}</Td>
                    <Td>
                      <Image
                        boxSize="100px"
                        objectFit="cover"
                        src={item.pic} // Replace 'profilePic' with the actual property name in your data object
                        alt="Profile Picture"
                      />
                    </Td>
                    <Td>{item.name}</Td>
                    <Td>{item.email}</Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={4}>No data available</Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>
      </Container>
    </ChakraProvider>
  );
};
export default AdminPage;



