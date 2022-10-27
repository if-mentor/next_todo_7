import React, { useEffect, useRef, useState } from 'react';
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
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import { useRecoilValue } from 'recoil';
import { userState } from '../Atoms/userAtom';
import { Todo } from './top';
import parseTimestampToDate from '../utils/parseTimestampToDate';
import ConfirmationDialog from '../components/ConfirmationDialog';
// import useDeleteRestore from '../hooks/useDeleteRestore';

//単一削除
export const handleDeleteData: (id: string, toast) => void = async (
  id,
  toast
) => {
  await deleteDoc(doc(db, 'todos', id));
  await toast({
    title: 'Todo Deleted.',
    status: 'success',
    duration: 9000,
    isClosable: true,
  });
};

// 一括削除
export const handleDeleteAllData: (todos: Todo[], toast) => void = async (
  todos,
  toast
) => {
  if (todos === null) return;
  todos.map(async ({ id }) => {
    await deleteDoc(doc(db, 'todos', id));
  });
  await toast({
    title: 'All Todos Deleted.',
    status: 'success',
    duration: 9000,
    isClosable: true,
  });
};

//単一リストア
export const handleRestoreData: (id: string, toast) => void = async (
  id,
  toast
) => {
  await updateDoc(doc(db, 'todos', id), {
    category: 'top',
  });
  await toast({
    title: 'Todo Restored.',
    status: 'success',
    duration: 9000,
    isClosable: true,
  });
};

// 一括リストア
export const handleRestoreAllData: (todos: Todo[], toast) => void = async (
  todos,
  toast
) => {
  if (todos === null) return;
  todos.map(async ({ id }) => {
    await updateDoc(doc(db, 'todos', id), {
      category: 'top',
    }).catch((err) => {
      alert(err.message);
    });
  });
  await toast({
    title: 'All Todos Restored.',
    status: 'success',
    duration: 9000,
    isClosable: true,
  });
};

const Trash = () => {
  const router = useRouter();
  const uid = useRecoilValue(userState).uid;
  const [deleteOrRestoreTodoId, setDeleteOrRestoreTodoId] =
    useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>();
  const [dialogText, setDialogText] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const toast = useToast();

  //ログイン確認
  useEffect(() => {
    if (!uid) {
      router.push('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //レンダリング時にDBからTrashデータ取得
  useEffect(() => {
    const getTodosQuery = query(
      collection(db, 'todos'),
      where('category', '==', 'trash'),
      // where('author', '==', uid), // 自分のTodoのみ表示させる場合はこの行を追加
      orderBy('create', 'desc')
    );
    const unsubscribe = onSnapshot(getTodosQuery, (querySnapshot) => {
      const getTodos: Todo[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        task: doc.data().task,
        status: doc.data().status,
        priority: doc.data().priority,
        create_date: doc.data().create,
      }));
      setTodos(getTodos);
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //一括リストア・単一削除・一括削除の確認Dialogハンドラー
  const deleteOrRestoreConfirmation: (action: string, id: string) => void = (
    action,
    id
  ) => {
    switch (action) {
      case 'ALL_RESTORE':
        setDialogText('ALL_RESTORE');
        onOpen();
        break;
      case 'UNIT_DELETE':
        setDeleteOrRestoreTodoId(id);
        setDialogText('UNIT_DELETE');
        onOpen();
        break;
      case 'UNIT_RESTORE':
        setDeleteOrRestoreTodoId(id);
        setDialogText('UNIT_RESTORE');
        onOpen();
        break;
      case 'ALL_DELETE':
        setDialogText('ALL_DELETE');
        onOpen();
        break;
    }
  };

  // //単一リストア
  // const handleRestoreData: (id: string, toast) => void = async (id, toast) => {
  //   await updateDoc(doc(db, 'todos', id), {
  //     category: 'top',
  //   });
  //   await toast({
  //     title: 'Todo Restored.',
  //     status: 'success',
  //     duration: 9000,
  //     isClosable: true,
  //   });
  // };

  return (
    <>
      <Container p="110px 100px 0" w="100%" maxW="1200px">
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
              onClick={() => deleteOrRestoreConfirmation('ALL_DELETE', '')}
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
              onClick={() => deleteOrRestoreConfirmation('ALL_RESTORE', '')}
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
              onClick={() => router.back()}
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
                  <>
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
                            onClick={() =>
                              deleteOrRestoreConfirmation(
                                'UNIT_DELETE',
                                todo.id
                              )
                            }
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
                            // onClick={() => {
                            //   handleRestoreData(todo.id, toast);
                            // }}
                            onClick={() =>
                              deleteOrRestoreConfirmation(
                                'UNIT_RESTORE',
                                todo.id
                              )
                            }
                          >
                            Restore
                          </Button>
                        </HStack>
                      </Td>
                    </Tr>
                    <ConfirmationDialog
                      isOpen={isOpen}
                      onClose={onClose}
                      cancelRef={cancelRef}
                      deleteOrRestoreTodoId={deleteOrRestoreTodoId}
                      dialogText={dialogText}
                      todos={todos}
                    />
                  </>
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
