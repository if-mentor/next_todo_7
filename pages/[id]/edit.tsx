import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Spacer,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { doc, DocumentData, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useRouter } from "next/router";
import parseTimestampToDate from "../../utils/parseTimestampToDate";

const Edit = () => {
  const [editTodoId, setEditTodoId] = useState<string>('');
  // オブジェクトに値をいれておかないと controle と uncontrole で制御するのかしないのかわからないため警告が出る、一時的な回避
  const [editTodo, setEditTodo] = useState<DocumentData>({ task: '' });
  const router = useRouter();
  const { isReady } = useRouter();

  useEffect(() => {
    (async () => {
      if (isReady) {
        const docRef = doc(db, "todos", `${router.query.id}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setEditTodoId(docSnap.id);
          setEditTodo(docSnap.data());
        } else {
          // データを取得できなかった時にアラートなどをだす
          console.log("No such document!");
        }
      } else {
        // データを取得できなかった時にアラートなどをだす
        console.log('No such')
      }
    })()
  }, [isReady]);

  const onClickEditTodoSave = async () => {
    const ref = doc(db, "todos", editTodoId);
    await updateDoc(ref, {
      task: editTodo.task,
      detail: editTodo.detail,
      update: serverTimestamp(),
    });
    router.push('/top');
  }

  return (
    <>
      <Container mt="20px" p="0" w="85%" maxW="1080px">
        <VStack>
          <Flex w="100%">
            <Text
              fontSize="26px"
              fontWeight="bold"
              lineHeight="33px"
              color="blackAlpha.800"
            >
              EDIT TODO
            </Text>
            <Spacer />
            <Button
              w="112px"
              h="40px"
              mt="8px"
              fontSize="18px"
              fontWeight="bold"
              bg="green.300"
              color="blackAlpha.800"
              borderWidth="1px"
              borderColor="blackAlpha.800"
              borderRadius="50px"
              onClick={() => router.push('/top')}
            >
              Back
            </Button>
          </Flex>
          <form style={{ width: "100%" }}>
            <FormControl>
              <FormLabel
                m="0"
                fontSize="24px"
                fontWeight="bold"
                lineHeight="24px"
                color="blackAlpha.800"
                htmlFor="task"
              >
                TITLE
              </FormLabel>
              <Input
                id="task"
                h="72px"
                mt="4px"
                p="8px 16px"
                fontSize="24px"
                fontWeight="bold"
                color="blackAlpha.800"
                borderWidth="1px"
                borderColor="blackAlpha.800"
                borderRadius="10px"
                type="Text"
                value={editTodo?.task}
                onChange={(e) => setEditTodo({ ...editTodo, task: e.target.value })}
              />
              <FormErrorMessage></FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel
                m="28px 0 0 0"
                fontSize="24px"
                fontWeight="bold"
                lineHeight="24px"
                color="blackAlpha.800"
              >
                DETAIL
              </FormLabel>
              <Textarea
                id="detail"
                h="208px"
                mt="4px"
                fontSize="24px"
                fontWeight="bold"
                color="blackAlpha.800"
                borderWidth="1px"
                borderColor="blackAlpha.800"
                borderRadius="10px"
                value={editTodo?.detail}
                onChange={(e) => setEditTodo({ ...editTodo, detail: e.target.value })}
              />
            </FormControl>

            <Flex
              mt="16px"
            >
              <Flex direction="column">
                <Text
                  fontSize="16px"
                  fontWeight="bold"
                  lineHeight="16px"
                  color="blackAlpha.800"
                >
                  Create
                </Text>
                <Text
                  mt="4px"
                  fontSize="20px"
                  fontWeight="bold"
                  lineHeight="20px"
                  color="blackAlpha.800"
                >
                  {parseTimestampToDate(editTodo.create, "-")}
                </Text>
              </Flex>

              <Flex ml="27px" direction="column">
                <Text
                  fontSize="16px"
                  fontWeight="bold"
                  lineHeight="16px"
                  color="blackAlpha.800"
                >
                  Update
                </Text>
                <Text
                  mt="4px"
                  fontSize="20px"
                  fontWeight="bold"
                  lineHeight="20px"
                  color="blackAlpha.800"
                >
                  {parseTimestampToDate(editTodo.update, "-")}
                </Text>
              </Flex>
            </Flex>

            <Flex w="100%" flexDirection="row-reverse">
              <Button
                type="button"
                w="112px"
                h="40px"
                m="10px 2px 0 8px"
                p="0"
                fontSize="18px"
                fontWeight="bold"
                bg="green.600"
                color="green.50"
                borderWidth="1px"
                borderColor="blackAlpha.800"
                borderRadius="50px"
                onClick={() => onClickEditTodoSave()}
              >
                UPDATE
              </Button>
            </Flex>
          </form>
        </VStack>
      </Container>
    </>
  );
};

export default Edit;