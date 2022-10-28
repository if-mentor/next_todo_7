import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
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
  useDisclosure,
} from "@chakra-ui/react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Header } from '../components/Header';
import { Todo } from "./top";
import parseTimestampToDate from "../utils/parseTimestampToDate";
import ConfirmationDialog from "../components/ConfirmationDialog";
import { useAppContext } from "../context/appContext";
import { useRecoilValue } from "recoil";
import { loginState } from "../Atoms/userAtom";

const Trash = () => {
  const router = useRouter();
  const [deleteOrRestoreTodoId, setDeleteOrRestoreTodoId] =
    useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>();
  const [dialogText, setDialogText] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const isLogin = useRecoilValue(loginState);
  const { user } = useAppContext();

  //ログイン確認
  React.useEffect(() => {
    !isLogin && router.push("/login");
  }, [isLogin]);

  //レンダリング時にDBからTrashデータ取得
  useEffect(() => {
    const getTodosQuery = query(
      collection(db, "todos"),
      where("category", "==", "trash"),
      where('author', '==', user.displayName), // 自分のTodoのみ表示させる場合はこの行を追加
      orderBy("create", "desc")
    );
    const unsubscribe = onSnapshot(getTodosQuery, (querySnapshot) => {
      const getTodos: Todo[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        task: doc.data().task,
        status: doc.data().status,
        priority: doc.data().priority,
        create_date: doc.data().create,
        update_date: doc.data().update,
      }));
      setTodos(getTodos);
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }
  const paginatePosts = paginate(todos, currentPage, pageSize);

  //一括リストア・単一削除・一括削除の確認Dialogハンドラー
  const deleteOrRestoreConfirmation: (action: string, id: string) => void = (
    action,
    id
  ) => {
    switch (action) {
      case "ALL_RESTORE":
        setDialogText("ALL_RESTORE");
        onOpen();
        break;
      case "UNIT_DELETE":
        setDeleteOrRestoreTodoId(id);
        setDialogText("UNIT_DELETE");
        onOpen();
        break;
      case "UNIT_RESTORE":
        setDeleteOrRestoreTodoId(id);
        setDialogText("UNIT_RESTORE");
        onOpen();
        break;
      case "ALL_DELETE":
        setDialogText("ALL_DELETE");
        onOpen();
        break;
    }
  };

  return (
    <>
      <Header />
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
              onClick={() => deleteOrRestoreConfirmation("ALL_DELETE", "")}
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
              onClick={() => deleteOrRestoreConfirmation("ALL_RESTORE", "")}
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
              {paginatePosts.map((todo) => {
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
                            todo.status === "DOING"
                              ? "green.600"
                              : todo.status === "DONE"
                              ? "green.300"
                              : "green.50"
                          }
                          color={
                            todo.status === "DOING"
                              ? "green.50"
                              : "blackAlpha.800"
                          }
                          fontWeight="bold"
                          m="0 auto"
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
                        {parseTimestampToDate(todo.create_date, "-")}
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
                                "UNIT_DELETE",
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
                            onClick={() =>
                              deleteOrRestoreConfirmation(
                                "UNIT_RESTORE",
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
        <Pagination items={todos.length} currentPage={currentPage} pageSize={pageSize} onPageChange={handlePageChange}/>
      </Container>
    </>
  );
};

const filterBox = {
  w: "100%",
  minW: "120px",
};
const filterTitle = {
  fontWeight: "700",
  fontSize: "18px",
  lineHeight: "22px",
};
const pagenation = {
  w: "40px",
  h: "40px",
  lineHeight: "40px",
  textAlign: "center",
  borderRadius: "10px",
  border: "1px solid rgba(0, 0, 0, 0.8)",
  fontSize: "18px",
  color: "blackAlpha.800",
};

export default Trash;
