import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import {
	addDoc,
	collection,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
} from "firebase/firestore";
// import { useRecoilState } from "recoil";
// import { userState } from "../atom/userAtom";
//↓userAtomを作成し、以下を記述
// import { atom } from "recoil";

// export const userState = atom({
//   key: "userState",
//   default: null,
// });
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
import styles from "../styles/Detail.module.css";

const Detail = () => {
	const [comment, setComment] = useState("");
	const [comments, setComments] = useState([]);
	const router = useRouter();
	const { id } = router.query;
	// const [currentUser] = useRecoilState(userState)

	// コメントの取得
	useEffect(() => {
		const unsubscribe = onSnapshot(
			query(
				// idはtodo.idをuse.routerで取得
				//collection"todos"のサブコレとして"comments"を作る想定
				collection(db, "todos", id as string, "comments"),
				orderBy("timestamp", "desc")
			),
			(snapshot) => {
				//いったん型エラー回避のためany
				setComments(snapshot.docs as any);
			}
		);
		return () => unsubscribe();
	}, [db, id]);

	//コメントの投稿
	async function sendComment(event: React.MouseEvent<HTMLButtonElement>) {
		event.preventDefault();
		const commentToSend = comment;
		setComment("");
		await addDoc(collection(db, "todos", id as string, "comments"), {
			comment: commentToSend,
			//headerでログインログアウトを判断機能を追加し、recoilでグローバル状態管理する
			username: currentUser?.username,
			timestamp: serverTimestamp(),
		});
	}

	// // sample
	// const [comments, useComments] = useState([
	// 	{
	// 		name: "じょん",
	// 		text: "Test Test Test Test Test Test Test",
	// 		create_date: "2022/10/1",
	// 		update_date: "2022/11/1",
	// 	},
	// 	{
	// 		name: "じょん",
	// 		text: "Test Test Test Test Test Test Test",
	// 		create_date: "2022/11/1",
	// 		update_date: "2022/11/1",
	// 	},
	// 	{
	// 		name: "じょん",
	// 		text: "Test Test Test Test Test Test Test",
	// 		create_date: "2022/12/1",
	// 		update_date: "2022/11/1",
	// 	},
	// 	{
	// 		name: "じょん",
	// 		text: "Test Test Test Test Test Test Test",
	// 		create_date: "2022/10/1",
	// 		update_date: "2022/11/1",
	// 	},
	// 	{
	// 		name: "じょん",
	// 		text: "Test Test Test Test Test Test Test",
	// 		create_date: "2022/11/1",
	// 		update_date: "2022/11/1",
	// 	},
	// 	{
	// 		name: "じょん",
	// 		text: "Test Test Test Test Test Test Test",
	// 		create_date: "2022/12/1",
	// 		update_date: "2022/11/1",
	// 	},
	// 	{
	// 		name: "じょん",
	// 		text: "Test Test Test Test Test Test Test",
	// 		create_date: "2022/10/1",
	// 		update_date: "2022/11/1",
	// 	},
	// 	{
	// 		name: "じょん",
	// 		text: "Test Test Test Test Test Test Test",
	// 		create_date: "2022/11/1",
	// 		update_date: "2022/11/1",
	// 	},
	// ]);

	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box>
			<Heading bg="green.300" py={{ base: 2 }} px={{ base: 4 }}>
				TODO
			</Heading>

			<Box py={{ base: 6 }} px={{ base: 6 }}>
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
											<Input type="text" />
										</Box>

										<Box mt="5">
											<FormLabel fontWeight="bold">Comment</FormLabel>
											<Textarea minH="200px" maxH="300px" />
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
								Test Test Test Test Test Test Test Test Test Test Test Test Test
								Test Test Test Test Test Test Test Test Test Test Test Test Test
								Test Test
							</Box>
						</Box>

						<Box mt="10">
							<Heading pl="20px" bg="green.300">
								Detail
							</Heading>
							<Box p="5" minH="360px" maxH="360px" bg="white" overflow="scroll">
								Test Test Test Test Test Test Test Test Test Test Test Test Test
								Test Test Test Test Test Test Test Test Test Test Test Test Test
								Test Test Test Test Test Test Test Test Test Test Test Test Test
								Test Test Test Test Test Test Test Test Test Test Test Test Test
								Test Test Test Test Test Test Test Test Test Test Test Test Test
								Test Test Test Test Test Test Test Test Test Test Test Test Test
								Test Test Test Test Test Test Test Test Test Test Test Test Test
								Test Test Test Test Test Test Test Test Test Test Test Test Test
								Test Test Test Test Test Test Test Test Test Test Test Test Test
								Test Test Test Test Test Test Test Test Test Test Test Test Test
								Test Test Test Test Test Test Test Test Test Test
							</Box>
						</Box>
						<Flex alignItems="center" mt="10px" p="0 20px">
							<Button
								color="black"
								p="0 30px"
								size="sm"
								colorScheme="whatsapp"
								borderRadius="20px"
							>
								Edit
								<EditIcon ml="3" />
							</Button>
							<Spacer />
							<Box className={styles.time} fontWeight="bold">
								create
								<br />
								2022/10/1 19:00
							</Box>
							<Spacer />
							<Box className={styles.time} fontWeight="bold">
								update
								<br />
								2022/10/1 20:00
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
								key={comments.data().id}
							>
								<Flex justifyContent="space-between" bg="green.300">
									<Text fontWeight="bold" ml="5">
										{comment.data().username}
									</Text>
									<Text mr="5">{comment.data().timestamp?.toDate()}</Text>
								</Flex>
								<Box p="10px 20px 0" minH="20px" bg="white">
									{comment.data().comment}
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
