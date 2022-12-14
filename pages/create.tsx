import React from 'react';
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
  FormErrorMessage,
  FormLabel,
  FormControl,
  Box,
} from "@chakra-ui/react";
import Head from "next/head";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Header } from "../components/Header";
import { useRouter } from "next/router";
import { db } from "../firebase/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAppContext } from "../context/appContext";
import { useRecoilValue } from "recoil";
import { loginState } from "../Atoms/userAtom";

type FormValues = {
  title: string;
  detail: string | null;
  priority: 'High' | 'Middle' | 'Low';
};
// top:TOPページ、draft:DRAFTページ、trash:trashページにそれぞれ表示
type Category = 'top' | 'draft' | 'trash';

const Create: React.FC = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormValues>();
  const router = useRouter();
  const { user } = useAppContext();
  const isLogin = useRecoilValue(loginState);
  
  React.useEffect(() => {
    !isLogin && router.push("/login"); 
  }, [isLogin]);

  const validationRules = {
    title: {
      required: 'Title is required',
      maxLength: {
        value: 100,
        message: 'Please enter a title in 100 characters or less.',
      },
    },
    detail: {
      maxLength: {
        value: 200,
        message: 'Please enter details in 200 characters or less.',
      },
    },
  };

  const onSubmit: SubmitHandler<FormValues> = (values: FormValues) => {
    const firestoreSubmit = async () => {
      await addDoc(collection(db, 'todos'), {
        task: values.title,
        detail: values.detail,
        status: 'NOT STARTED',
        priority: values.priority || 'Middle', // 一度もpriorityを変更していない場合値が入れないため調節
        create: serverTimestamp(),
        update: serverTimestamp(),
        author: user.displayName,
        category: 'top',
      });
    };
    firestoreSubmit();
    router.push('/top');
  };

  return (
    <>
      <Head>Create new todo</Head>
      <Header />
      <Container maxW="800px" p={4} pt={32}>
        <Flex justify="space-between" align="center">
          <Heading as="h1">NEW TODO</Heading>
          <Button
            onClick={() => router.push('/top')}
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4} py={4}>
            <Box>
              <FormControl isInvalid={!!errors.title}>
                <FormLabel htmlFor="title">
                  TITLE
                  <Text as="span" color="red">
                    &thinsp;*
                  </Text>
                </FormLabel>
                <Input
                  id="title"
                  placeholder="title"
                  {...register('title', validationRules.title)}
                />
                <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
              </FormControl>
            </Box>
            <Box>
              <FormControl isInvalid={!!errors.detail}>
                <FormLabel htmlFor="detail">Detail</FormLabel>
                <Textarea
                  id="detail"
                  placeholder="detail"
                  {...register('detail', validationRules.detail)}
                />
                <FormErrorMessage>{errors.detail?.message}</FormErrorMessage>
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel htmlFor="priority">PRIORITY</FormLabel>
                <Controller
                  name="priority"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <RadioGroup
                      onChange={onChange}
                      value={value}
                      defaultValue="Middle"
                    >
                      <Stack direction="row">
                        <Radio value="High">High</Radio>
                        <Radio value="Middle">Middle</Radio>
                        <Radio value="Low">Low</Radio>
                      </Stack>
                    </RadioGroup>
                  )}
                />
              </FormControl>
            </Box>
          </Stack>

          <Flex justify="flex-end">
            <ButtonGroup>
              {/* <Button
                type="submit"
                onClick={() => setCategory("draft")}
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
              </Button> */}
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
                type="submit"
              >
                CREATE
              </Button>
            </ButtonGroup>
          </Flex>
        </form>
      </Container>
    </>
  );
};

export default Create;
