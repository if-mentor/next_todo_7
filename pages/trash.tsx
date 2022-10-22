import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useRecoilValue } from 'recoil';
import { userState } from '../Atoms/userAtom';
import { Todo } from './top';
import parseTimestampToDate from '../utils/parseTimestampToDate';

const Trash = () => {
  const router = useRouter();
  const uid = useRecoilValue(userState).uid;
  const [todos, setTodos] = useState<Todo[]>([]);

  //ユーザー確認
  React.useEffect(() => {
    if (!uid) {
      router.push('/login');
    } else {
      getTodos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //DBからTrashデータ取得
  const getTodos: () => void = async () => {
    const querySnapshot = await getDocs(
      query(
        collection(db, 'todos'),
        where('category', '==', 'trash'),
        where('author', '==', uid),
        orderBy('create', 'desc')
      )
    );
    const initialTodos: Todo[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      task: doc.data().task,
      status: doc.data().status,
      priority: doc.data().priority,
      create_date: doc.data().create,
      update_date: doc.data().update,
    }));
    setTodos(initialTodos);
  };

  //リストア
  const handleRestoreData: (
    e: React.FormEvent<HTMLButtonElement>,
    id: string
  ) => void = async (e, id) => {
    await updateDoc(doc(db, 'todos', id), {
      category: 'top',
    });
    //restoreしたtodoを削除したtodoリスト作成
    const restoredTodos: Todo[] = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(restoredTodos);
  };

  //削除
  const handleDeleteData: (
    e: React.FormEvent<HTMLButtonElement>,
    id: string
  ) => void = async (e, id) => {
    console.log('hello');
    await deleteDoc(doc(db, 'todos', id))
      .then(() => alert('データが削除されました'))
      .catch((err) => {
        alert(err.message);
      });
    //deleteしたtodoを削除したtodoリスト作成
    const deletedTodos: Todo[] = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(deletedTodos);
  };

  return (
    <>
      <Container p="110px 100px 0" w="100%" maxW="1080px">
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
              onClick={() => router.push('/top')}
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
                        textAlign="center"
                        borderRadius="50px"
                        bg={
                          todo.status === 'DOING'
                            ? 'green.600'
                            : todo.status === 'DONE'
                            ? 'green.300'
                            : 'green.50'
                        }
                        color={
                          todo.status === 'DOING'
                            ? 'green.50'
                            : 'blackAlpha.800'
                        }
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
                      {parseTimestampToDate(todo.create_date, '-')}
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
                          onClick={(e) => handleDeleteData(e, todo.id)}
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
                          onClick={(e) => handleRestoreData(e, todo.id)}
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

export default Trash;
