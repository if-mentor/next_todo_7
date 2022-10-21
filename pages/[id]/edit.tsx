import * as React from "react";
// import { usePromise } from 'react-use';
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
import { useRouter } from "next/router";
import { db } from "../../firebase/firebase";
import { collection, DocumentData, getDocs, onSnapshot, query, QueryDocumentSnapshot, QuerySnapshot, Timestamp } from "firebase/firestore";

type Todo = {
  id: string;
  task: string;
  status: "NOT STARTED" | "DOING" | "DONE";
  priority: "High" | "Middle" | "Low";
  create_date: Timestamp;
  update_date: Timestamp | null;
};

const Edit = () => {
  const [todo, setTodo] = React.useState<QueryDocumentSnapshot>();
  const [todos, setTodos] = React.useState<QueryDocumentSnapshot[]>();
  const router = useRouter();

  React.useEffect(() => {

    
    const q = query(collection(db, 'todos'));
    const querySnapshot = getDocs(q);
    console.log(querySnapshot);

    // usePromise()

    // onSnapshot(q, (snapShot) => {
    //   setTodos(snapShot.docs);
    // });
  }, [])

  // React.useEffect(() => {
  //   console.log(todos);
  // }, [todos])

  // React.useEffect(() => {
  //   console.log(todo);
  // }, [todo])

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
                htmlFor="title"
              >
                TITLE
              </FormLabel>
              <Input
                id="title"
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
                value={todo?.data().task}
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
                value={todo?.data().detail}
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
                >2022-9-21 9:50</Text>
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
                >2022-9-21 9:51</Text>
              </Flex>
            </Flex>

            <Flex w="100%" flexDirection="row-reverse">
              <Button
                type="submit"
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