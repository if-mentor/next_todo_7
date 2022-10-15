import React from "react";
import { Button, Center, Container, Input, VStack } from "@chakra-ui/react";
import { Header } from "../components/Header";

const loginPage = () => {
  return (
    <>
      <Header />
      <Center w="100vw" pt="100px">
        <Container
          bgColor="green.100"
          px={[4, 12, 20]}
          py={[8, 12, 20]}
          m={2}
          borderRadius="3xl"
          maxW="800px"
        >
          <VStack spacing={[6, 8]} mb={[8, 12]}>
            <Input
              placeholder="Please enter your email."
              type="email"
              sx={inputStyle}
            />
            <Input
              placeholder="Please enter your password."
              type="password"
              sx={inputStyle}
            />
          </VStack>
          <VStack spacing={[6, 8]}>
            <Button
              colorScheme="green"
              color="green.50"
              bgColor="green.500"
              type="submit"
              sx={buttonStyle}
            >
              EMAIL LOGIN
            </Button>
            <Button
              mt={4}
              _hover={{
                background: "gray.400",
              }}
              _active={{
                background: "gray.500",
              }}
              bgColor="gray.300"
              color="green.50"
              type="button"
              sx={buttonStyle}
            >
              GOOGLE LOGIN
            </Button>
          </VStack>
        </Container>
      </Center>
    </>
  );
};

const inputStyle = {
  fontSize: [20, 24],
  bgColor: "green.50",
  h: ["3rem", "3.6rem"],
  px: ["1.6rem", "2rem"],
  borderRadius: "full",
};

const buttonStyle = {
  fontSize: [20, 24],
  fontWeight: "600",
  w: "min(70%, 300px)",
  h: ["3rem", "3.6rem"],
  mx: "4",
  borderRadius: "full",
};

export default loginPage;
