import React, { useState } from 'react';
import {
  Box,
  Container,
  Flex,
  Stack,
  HStack,
  Button,
  Input,
  Spacer,
  Text,
  Image,
  Select,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';

const trash = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      task: 'testttttttttttt',
      status: 'DONE',
      priority: 'High',
      create_date: '2020-11-8 18:55',
      update_date: '2020-11-8 18:55',
    },
    {
      id: 2,
      task: 'test2',
      status: 'DOING',
      priority: 'Low',
      create_date: '2020-11-8 18:55',
      update_date: '2020-11-8 18:55',
    },
    {
      id: 3,
      task: 'test3',
      status: 'NOT STARTED',
      priority: 'High',
      create_date: '2020-11-8 18:55',
      update_date: '2020-11-8 18:55',
    },
  ]);

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
              Resotre all
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
                  Update
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
              {todos.map((todo) => {
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
                    <Td fontSize="14px" textAlign="center">
                      {todo.update_date}
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
        <HStack justify="center" align="center">
          <Box sx={pagenation}>＜</Box>
          <Box sx={pagenation}>1</Box>
          <Box sx={pagenation}>2</Box>
          <Box sx={pagenation}>...</Box>
          <Box sx={pagenation}>5</Box>
          <Box sx={pagenation}>6</Box>
          <Box sx={pagenation}>＞</Box>
        </HStack>
      </Container>
    </>
  );
};

const filterBox = {
  w: '100%',
  minW: '120px',
};
const filterTitle = {
  fontWeight: '700',
  fontSize: '18px',
  lineHeight: '22px',
};
const pagenation = {
  w: '40px',
  h: '40px',
  lineHeight: '40px',
  textAlign: 'center',
  borderRadius: '10px',
  border: '1px solid rgba(0, 0, 0, 0.8)',
  fontSize: '18px',
  color: 'blackAlpha.800',
};

export default trash;
