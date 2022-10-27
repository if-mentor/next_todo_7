import React from "react";
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
import { useAppContext } from "../context/appContext";

type FormValues = {
  email: string;
  password: string;
  name: string;
};

const loginPage: React.FC = () => {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    trigger,
    register,
  } = useForm();
  const { user, signInUser } = useAppContext();

  React.useEffect(() => {
    !!user && router.push("/top");
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
  };

  async function onSubmit(values: FormValues) {
    await signInUser(values.email, values.password);
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
                  error={Boolean(errors.email)}
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
                  error={Boolean(errors.password)}
                />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
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
                ログイン
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
              <VStack>
                <Button
                  variant="link"
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  アカウントの作成はこちら
                </Button>
                <Button variant="link" onClick={() => router.push("/reissue")}>
                  パスワードの再発行はこちら
                </Button>
              </VStack>
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

export default loginPage;
