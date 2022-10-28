import React from "react";
import { Button, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAppContext } from "../context/appContext";

export const Header = () => {
  const router = useRouter();
  const date = new Date();
  const { user, logoutUser } = useAppContext();
  const formatDate =
    date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();

  return (
    <Flex
      h="80px"
      bgColor="green.300"
      alignItems="center"
      position="fixed"
      w="100%"
      zIndex="100"
    >
      <Heading
        color="blackAlpha.800"
        ml="100px"
        fontSize="48px"
        fontWeight="bold"
        _hover={{
          cursor: "pointer",
        }}
        onClick={() => router.push("/top")}
      >
        TODO
      </Heading>
      <Spacer />
      <Text color="blackAlpha.800" mr="15px" fontSize="16px" fontWeight="bold">
        {formatDate}
      </Text>
      {!!user && (
        <Button
          bgColor="yellow.300"
          _hover={{ bgColor: "yellow.200" }}
          mr="100px"
          onClick={logoutUser}
        >
          ログアウト
        </Button>
      )}
    </Flex>
  );
};
