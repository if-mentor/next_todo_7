import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";

const top = () => {
	const router = useRouter();
	const [todos, setTodos] = useState([
		{
			id: 1,
			task: "testttttttttttt",
			status: "DONE",
			priority: "High",
			create_date: "2020-11-8 18:55",
			update_date: "2020-11-8 18:55",
		},
		{
			id: 2,
			task: "test2",
			status: "DOING",
			priority: "High",
			create_date: "2020-11-8 18:55",
			update_date: "2020-11-8 18:55",
		},
		{
			id: 3,
			task: "test3",
			status: "NOT STARTED",
			priority: "High",
			create_date: "2020-11-8 18:55",
			update_date: "2020-11-8 18:55",
		},
	]);

	return (
		<>
			<Container p="20px 100px 0" w="100%" maxW="1080px">
				<Box pb="15px">
					<Text
						fontSize="28px"
						fontWeight="700"
						color="blackAlpha.800"
						lineHeight="33px"
					>
						TODO LIST
					</Text>
				</Box>
				<Flex alignItems="flex-start">
					<HStack w="600px" spacing="24px" alignItems="flex-end">
						<Stack sx={filterBox}>
							<Text sx={filterTitle}>SEARCH</Text>
							<Input placeholder="Text" />
						</Stack>
						<Stack sx={filterBox}>
							<Text sx={filterTitle}>STATUS</Text>
							<Select placeholder="- - - - - - -">
								<option value="option1">Not Starting</option>
								<option value="option2">Doing</option>
								<option value="option3">Done</option>
							</Select>
						</Stack>
						<Stack sx={filterBox}>
							<Text sx={filterTitle}>PRIORITY</Text>
							<Select placeholder="- - - - - - -">
								<option value="option1">High</option>
								<option value="option2">Middle</option>
								<option value="option3">Low</option>
							</Select>
						</Stack>
						<Button
							type="button"
							color="black"
							bg="blackAlpha.500"
							borderColor="blackAlpha.800"
							p="0 50px"
							size="md"
							borderRadius="50px"
						>
							RESET
						</Button>
					</HStack>
					<Spacer />
					<HStack spacing="16px">
						<Image src="Trash Icon Button.png" />
						<Image src="Draft Icon Button.png" />
						<Image
							onClick={() => router.push("/create")}
							src="New Icon Button.png"
							_hover={{ opacity: 0.8, cursor: "pointer" }}
						/>
					</HStack>
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
											<Link href={`/detail?id=${todo.id}`}>
												<a>{todo.task}</a>
											</Link>
										</Td>
										<Td textAlign="center">
											<Box
												w="120px"
												h="40px"
												lineHeight="40px"
												borderRadius="50px"
												bg="green.600"
												color="#F0FFF4"
											>
												<Text>{todo.status}</Text>
											</Box>
										</Td>
										<Td textAlign="center">
											<Select value={todo.priority}>
												<option value="option1">High</option>
												<option value="option2">Middle</option>
												<option value="option3">Low</option>
											</Select>
										</Td>
										<Td fontSize="14px" textAlign="center">
											{todo.create_date}
										</Td>
										<Td fontSize="14px" textAlign="center">
											{todo.update_date}
										</Td>
										<Td>
											<HStack spacing="16px" justify="center">
												<Image src="Edit.png" />
												<Image src="Trash.png" />
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

export default top;
