import React from "react";
import {
  Button,
  Center,
  Container,
  Input,
  VStack,
  FormControl,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Header } from "../components/Header";
import { useAppContext } from "../context/appContext";

const LoginPage = () => {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    trigger,
    register,
  } = useForm();
  const { forgotPassword } = useAppContext();

  const validationRules = {
    email: {
      required: "Email is required.",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      },
    },
  };

  async function onSubmit(values) {
    forgotPassword(values.email);
    alert(
      `An email has sent to ${values.email} Please check your mail box. If you can't find it in your mail box, please also check your spam folder.`
    );
    router.push("/login");
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
          <Text>メールアドレスをパスワード再設定メールを送信します。</Text>
          <Text mb={8}>登録時のメールアドレスをご入力してください。</Text>
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
                  error={Boolean(errors.email)}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
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
                メール送信
              </Button>
              <Button
                variant="link"
                onClick={() => {
                  router.push("/login");
                }}
              >
                アカウントをお持ちの方はこちら→ログイン
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
