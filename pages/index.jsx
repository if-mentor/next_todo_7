import React, { useState, useEffect } from "react";
import {
  Button,
  Center,
  Container,
  Input,
  VStack,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Header } from "../components/Header";
import { useRecoilState } from "recoil";
import { loginState } from "../Atoms/userAtom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";

const LoginPage = () => {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    trigger,
    register,
  } = useForm();
  const [userNames, setUserNames] = useState([]);
  const [isLogin, setIsLogin] = useRecoilState(loginState);

  React.useEffect(() => {
    isLogin && router.push("/top");
  }, []);

  const validationRules = {
    email: {
      required: "Email is required.",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      },
    },
    password: {
      required: "Password is required.",
      minLength: {
        value: 6,
        message: "Password must be more than 6 characters",
      },
      maxLength: {
        value: 20,
        message: "Password must be less than 20 characters",
      },
    },
    name: {
      required: "Name is required.",
      minLength: {
        value: 2,
        message: "Name must be more than 2 characters",
      },
      maxLength: {
        value: 20,
        message: "Name must be less than 20 characters",
      },
    },
  };

  // これまでに作成されたdisplayNameを取得する
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "userNames")),
      (querySnapshot) => {
        const userNames = querySnapshot.docs.map(
          (doc) => doc.data().displayName
        );
        setUserNames(userNames);
      }
    );
    return unsubscribe;
  }, []);

  async function onSubmit(values) {
    // 既に同じ名前のuserが登録されている場合はアラートを出してreturn
    if (userNames.includes(values.name)) { 
      alert(
        "The user name is already in the list. Please select a different user name."
      );
      return;
    }
    try {
      // user登録
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      // ログインユーザー情報にdisplayName登録
      await updateProfile(auth.currentUser, {
        displayName: values.name,
      });
      // userNamesリストにdisplayName登録
      await addDoc(collection(db, "userNames"), {
        displayName: values.name,
      });
      setIsLogin(true);
      router.push("/top");
    } catch (err) {
      alert(`Sign-up is failed. Error:${err.message}`);
    }
  }

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={[6, 8]} mb={[8, 12]}>
              <FormControl isInvalid={!!errors.email}>
                <Input
                  id="email"
                  // name="email"
                  type="email"
                  required={true}
                  placeholder="Please enter your email."
                  sx={inputStyle}
                  {...register("email", validationRules.email)}
                  onKeyUp={() => {
                    trigger("email");
                  }}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.password}>
                <Input
                  id="password"
                  type="password"
                  required={true}
                  placeholder="Please enter your password."
                  sx={inputStyle}
                  {...register("password", validationRules.password)}
                  onKeyUp={() => {
                    trigger("password");
                  }}
                />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.name}>
                <Input
                  id="name"
                  type="name"
                  required={true}
                  placeholder="Please enter your name."
                  sx={inputStyle}
                  {...register("name", validationRules.name)}
                  onKeyUp={() => {
                    trigger("name");
                  }}
                />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>
            </VStack>
            <VStack spacing={[6, 8]}>
              <Button
                colorScheme="green"
                color="green.50"
                bgColor="green.500"
                type="submit"
                sx={buttonStyle}
              >
                サインアップ
              </Button>
              {/* <Button
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
              </Button> */}
              <Button
                variant="link"
                onClick={() => {
                  router.push("/login");
                }}
              >
                アカウントをお持ちの方はこちら
              </Button>
            </VStack>
          </form>
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

export default LoginPage;
