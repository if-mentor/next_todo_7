import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import {
	addDoc,
	collection,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
	Timestamp,
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
import styles from "../styles/Detail.module.css";
import { useRecoilState } from "recoil";
import { userState } from "../Atoms/userAtom";
import { timeStamp } from "console";

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
	const router = useRouter();
	// const { id } = router.query;

	// Timestamp型から文字列への変換
	const parseTimestampToDate = (timestamp: Timestamp, separator: string) => {
		if (timestamp != null) {
			const date = timestamp.toDate();
			const year = date.getFullYear();
			const month = ("00" + (date.getMonth() + 1)).slice(-2);
			const day = ("00" + date.getDate()).slice(-2);
			const hour = ("00" + date.getHours()).slice(-2);
			const minutes = ("00" + date.getMinutes()).slice(-2);

			return `${year}${separator}${month}${separator}${day} ${hour}:${minutes}`;
		}
	};

	// コメントの取得
	useEffect(() => {
		const unsubscribe = onSnapshot(
			query(
				//todoのidがまだtopから取得できないので直接ドキュメントidを記載しています
				// collection(db, "todos", id as string, "comments"),
				collection(db, "todos", "rvMETyCjqUG5Jk5v3mYm", "comments"),
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
		await addDoc(collection(db, "todos", "rvMETyCjqUG5Jk5v3mYm", "comments"), {
			comment: commentToSend,
			username: commentedUserName,
			timestamp: serverTimestamp(),
		});
	}

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
