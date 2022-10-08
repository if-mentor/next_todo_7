import React from "react";
import {
	Container,
	Heading,
	Input,
	Text,
	Textarea,
	Radio,
	RadioGroup,
	Stack,
	Button,
	ButtonGroup,
	Flex,
	Box,
} from "@chakra-ui/react";

const create = () => {
	return (
		<>
			<Container maxW="800px" p={4}>
				<Flex justify="space-between" align="center">
					<Heading as="h1">NEW TODO</Heading>
					<Button
						bg="green.300"
						rounded="full"
						shadow="md"
						size="md"
						height="40px"
						width="112px"
						px="35px"
						py="9px"
						_hover={{ opacity: 0.8 }}
					>
						BACK
					</Button>
				</Flex>
				<Stack spacing={4} py={4}>
					<Box>
						<Text>TITLE</Text>
						<Input placeholder="Text" />
					</Box>
					<Box>
						<Text>DETAIL</Text>
						<Textarea placeholder="Text" />
					</Box>
					<Box>
						<Text>PRIORITY</Text>
						<RadioGroup>
							<Stack direction="row">
								<Radio value="1">High</Radio>
								<Radio value="2">Middle</Radio>
								<Radio value="3">Low</Radio>
							</Stack>
						</RadioGroup>
					</Box>
				</Stack>

				<Flex justify="flex-end">
					<ButtonGroup>
						<Button
							bg="pink.100"
							rounded="full"
							shadow="md"
							size="md"
							height="40px"
							width="112px"
							px="35px"
							py="9px"
							_hover={{ opacity: 0.8 }}
						>
							DRAFT
						</Button>
						<Button
							bg="green.600"
							color="white"
							rounded="full"
							shadow="md"
							size="md"
							height="40px"
							width="112px"
							px="35px"
							py="9px"
							_hover={{ opacity: 0.8 }}
						>
							CREATE
						</Button>
					</ButtonGroup>
				</Flex>
			</Container>
		</>
	);
};

export default create;
