import { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import { paginate } from "./../utils/paginate";
import {
  Box,
  Container,
  Flex,
  HStack,
  Button,
  Text,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';

// テストデータ --------------------------

// -------------------------------------

const trash = () => {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  
  useEffect(()=>{
    const getPosts = () =>{
      const arr: any = [];
    for(let num=1;num<=100;num++){
      arr.push(
        {
          id: num,
          task: 'test' + String(num),
          status: 'NOT STARTED',
          priority: 'High',
          create_date: '2020-11-8 18:55',
          update_date: '2020-11-8 18:55',
        })
    }
      setTodos(arr);
    }
    getPosts();
  },[])

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }
  const paginatePosts = paginate(todos, currentPage, pageSize);

  return (
    <>
      <Container p="20px 100px 0" w="100%" maxW="auto">
        <Flex justify="space-between">
          <Text
            fontSize="28px"
            fontWeight="700"
            color="blackAlpha.800"
            lineHeight="33px"
          >
            TRASH
          </Text>
          <Flex justify="end" align="center">
            <Button
              color="white"
              variant="outline"
              bgColor="red.500"
              w="112px"
              h="40px"
              borderRadius="3xl"
              fontSize="18px"
              fontWeight="bold"
            >
              Delete all
            </Button>
            <Button
              color="white"
              variant="outline"
              bgColor="blue.300"
              w="112px"
              h="40px"
              borderRadius="3xl"
              fontSize="18px"
              fontWeight="bold"
              ml="24px"
            >
              Restore all
            </Button>
            <Button
              color="black"
              variant="outline"
              bgColor="green.300"
              w="112px"
              h="40px"
              borderRadius="50px"
              borderColor="black.700"
              fontSize="18px"
              fontWeight="bold"
              ml="24px"
            >
              Back
            </Button>
          </Flex>
        </Flex>
        <TableContainer w="100%" m="33px 0 16px">
          <Table>
            <Thead h="56px" bg="green.300">
              <Tr>
                <Th
                  fontSize="24px"
                  color="blackAlpha.800"
                  textTransform="none"
                  textAlign="left"
                  p="0 0 0 10px"
                  minW="100px"
                >
                  Task
                </Th>
                <Th
                  fontSize="24px"
                  color="blackAlpha.800"
                  textTransform="none"
                  textAlign="center"
                  p="0"
                  minW="100px"
                >
                  Status
                </Th>
                <Th
                  fontSize="24px"
                  color="blackAlpha.800"
                  textTransform="none"
                  textAlign="center"
                  p="0"
                  minW="100px"
                >
                  Priority
                </Th>
                <Th
                  fontSize="24px"
                  color="blackAlpha.800"
                  textTransform="none"
                  textAlign="center"
                  p="0"
                  minW="100px"
                >
                  Create
                </Th>
                <Th
                  fontSize="24px"
                  color="blackAlpha.800"
                  textTransform="none"
                  textAlign="center"
                  p="0"
                  minW="100px"
                >
                  Action
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {paginatePosts.map((todo) => {
                return (
                  <Tr key={todo.id}>
                    <Td textAlign="left" pl="10px">
                      {todo.task}
                    </Td>
                    <Td textAlign="center">
                      <Box
                        w="120px"
                        h="40px"
                        lineHeight="40px"
                        borderRadius="50px"
                        bg="green.600"
                        color="#F0FFF4"
                        fontWeight="bold"
                      >
                        <Text>{todo.status}</Text>
                      </Box>
                    </Td>
                    <Td
                      w="174px"
                      h="56px"
                      color="green.100"
                      textAlign="center"
                      fontSize="16px"
                      letterSpacing="0.3em"
                      fontWeight="medium"
                      lineHeight="40px"
                      textShadow="1px 1px 0 black, -1px -1px 0 black,
											-1px 1px 0 black, 1px -1px 0 black,
											0px 1px 0 black,  0 -1px 0 black,
											-1px 0 0 black, 1px 0 0 black;"
                    >
                      {todo.priority}
                    </Td>
                    <Td fontSize="14px" textAlign="center">
                      {todo.create_date}
                    </Td>
                    <Td>
                      <HStack spacing="16px" justify="center">
                        <Button
                          color="white"
                          variant="outline"
                          bgColor="red.500"
                          w="80px"
                          h="40px"
                          borderRadius="3xl"
                          fontSize="18px"
                          fontWeight="bold"
                          p="0"
                        >
                          Delete
                        </Button>
                        <Button
                          color="white"
                          variant="outline"
                          bgColor="blue.300"
                          w="80px"
                          h="40px"
                          borderRadius="3xl"
                          fontSize="18px"
                          fontWeight="bold"
                          p="0"
                        >
                          Restore
                        </Button>
                      </HStack>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
        <Pagination items={todos.length} currentPage={currentPage} pageSize={pageSize} onPageChange={handlePageChange}/>
      </Container>
    </>
  );
};


export default trash;
