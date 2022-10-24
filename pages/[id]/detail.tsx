import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  DocumentData,
  getDoc,
  doc,
} from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import styles from "../../styles/Detail.module.css";
import parseTimestampToDate from "../../utils/parseTimestampToDate";
import { Header } from "../../components/Header";

type CommentUser = {
  id: string;
  comment: string;
  username: string;
  timestamp: Timestamp;
};

const Detail = () => {
  const [comment, setComment] = useState("");
  const [commentUserName, setCommentUserName] = useState("");
  const [comments, setComments] = useState<CommentUser[] | null>(null);
  const [todo, setTodo] = useState<DocumentData>({
    id: "",
    task: "",
    detail: "",
    create_date: "",
    update_date: "",
    defaultDisplayName: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  // todo取得
  useEffect(() => {
    (async () => {
      if (router.isReady) {
        const docRef = doc(db, "todos", `${router.query.id}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTodo({
            id: docSnap.id,
            task: docSnap.data().task,
            detail: docSnap.data().detail,
            create_date: docSnap.data().create,
            update_date: docSnap.data().update,
          });
					setCommentUserName(docSnap.data().author)
        } else {
          alert("ドキュメントを取得できませんでした。リロードしてください。");
        }
      }
    })();
  }, []);

  // コメントの取得
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "todos", `${router.query.id}`, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        const userComments: CommentUser[] = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          comment: doc.data().comment,
          username: doc.data().username,
          timestamp: doc.data().timestamp,
        }));
        setComments(userComments);
      }
    );
    return () => unsubscribe();
  }, []);

  //コメントの投稿
  async function sendComment(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const commentToSend = comment;
    const commentedUserName = commentUserName;
    setComment("");
    setCommentUserName("");
    await addDoc(collection(db, "todos", `${router.query.id}`, "comments"), {
      comment: commentToSend,
      username: commentedUserName,
      timestamp: serverTimestamp(),
    });
		onClose()
  }


  return (
    <Box>
      {/* <Heading bg="green.300" py={{ base: 2 }} px={{ base: 4 }}>
        TODO
      </Heading> */}
      <Header />
      <Box py={{ base: 28 }} px={{ base: 6 }}>
        <Flex justifyContent="space-between">
          <Text className={styles.title}>Show Todo</Text>
          <Box className={styles.button_box}>
            <Button size="sm" onClick={onOpen}>
              Comment
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <FormControl>
                <ModalContent top="20%">
                  <ModalHeader>Comment</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Box>
                      <FormLabel fontWeight="bold">Name</FormLabel>
                      <Input
                        type="text"
                        value={commentUserName}
                        onChange={(event) =>
                          setCommentUserName(event.target.value)
                        }
                        placeholder="お名前を入力してください"
                      />
                    </Box>

                    <Box mt="5">
                      <FormLabel fontWeight="bold">Comment</FormLabel>
                      <Textarea
                        minH="200px"
                        maxH="300px"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        placeholder="コメントを入力してください"
                      />
                    </Box>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      colorScheme="blue"
                      color="white"
                      onClick={sendComment}
                      disabled={!comment.trim()}
                    >
                      Create
                    </Button>
                    <Button colorScheme="red" mr="3" ml="10" onClick={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </FormControl>
            </Modal>

            <Link href="/">
              <Button className={styles.back_button} size="sm">
                Back
              </Button>
            </Link>
          </Box>
        </Flex>

        <Box className={styles.box} my={{ base: 6 }}>
          <Box
            className={styles.detail_box}
            h="660px"
            p="5"
            border="1px"
            borderRadius="3xl"
          >
            <Box>
              <Heading pl="20px" bg="green.300">
                Title
              </Heading>
              <Box
                p="10px 20px 0"
                minH="50px"
                maxH="80px"
                bg="white"
                overflow="scroll"
              >
                {todo.task}
              </Box>
            </Box>

            <Box mt="10">
              <Heading pl="20px" bg="green.300">
                Detail
              </Heading>
              <Box p="5" minH="360px" maxH="360px" bg="white" overflow="scroll">
                {todo.detail}
              </Box>
            </Box>
            <Flex alignItems="center" mt="10px" p="0 20px">
              <Button
                color="black"
                p="0 30px"
                size="sm"
                colorScheme="whatsapp"
                borderRadius="20px"
                onClick={() => router.push(`/${todo.id}/edit`)}
              >
                Edit
                <EditIcon ml="3" />
              </Button>
              <Spacer />
              <Box className={styles.time} fontWeight="bold">
                create
                <br />
                {todo.create_date ? parseTimestampToDate(todo.create_date, "-"):""}
              </Box>
              <Spacer />
              <Box className={styles.time} fontWeight="bold">
                update
                <br />
                {todo.update_date ? parseTimestampToDate(todo.update_date, "-") : "-"}
              </Box>
            </Flex>
          </Box>

          <Box className={styles.comment_box} h="660px" p="5" overflow="scroll">
            <Text fontWeight="bold" bg="#f5f5f5" p="2">
              Comment
            </Text>
            {comments?.map((comment) => (
              <Box
                mt="5"
                border="1px"
                borderRadius="20px"
                overflow="hidden"
                key={comment.id}
              >
                <Flex justifyContent="space-between" bg="green.300">
                  <Text fontWeight="bold" ml="5">
                    {comment.username}
                  </Text>
                  <Text mr="5">
                    {parseTimestampToDate(comment.timestamp, "-")}
                  </Text>
                </Flex>
                <Box p="10px 20px 0" minH="20px" bg="white">
                  {comment.comment}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Detail;
