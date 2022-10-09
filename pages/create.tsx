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
  FormErrorMessage,
  FormLabel,
  FormControl,
  Box,
} from "@chakra-ui/react";
import Head from "next/head";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Header } from "../components/Header";
import { useRouter } from "next/router";
import { db } from "../firebase/firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

type FormValues = {
  title: string;
  detail: string | null;
  priority: string;
};
// top:TOPページ、draft:DRAFTページ、trash:trashページにそれぞれ表示
type Category = "top" | "draft" | "trash";

const create: React.FC = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormValues>();
  const [category, setCategory] = React.useState<Category>("top");
  const router = useRouter();

  // validationは適当です。適宜変更してください。
  const validationRules = {
    title: {
      required: "Title is required",
      maxLength: {
        value: 100,
        message: "Please enter a title in 100 characters or less.",
      },
    },
    detail: {
      maxLength: {
        value: 200,
        message: "Please enter details in 200 characters or less.",
      },
    },
  };

  const onSubmit: SubmitHandler<FormValues> = (values: FormValues) => {
    const firestoreSubmit = async () => {
      await addDoc(collection(db, "todos"), {
        id: uuidv4(),
        title: values.title,
        detail: values.detail,
        status: "NOT STARTED",
        priority: values.priority || 2, // 一度もpriorityを変更していない場合値が入れないため調節
        create: serverTimestamp(),
        update: null,
        author: "uid", // TODO: uidをstate又はpath又はクエリに入れて受け渡すように今後変更予定
        category,
      });

      // TODO: top画面、draft画面作成後は下記のif blockを削除すること
      if (category === "top") {
        alert(
          `New todo is successfully created.
          Title: ${values.title}
          Detail: ${values.detail}
          Status: ${values.priority || 2}`
        );
      } else {
        alert(
          `Your todo is successfully stored at draft page.
          Title: ${values.title}
          Detail: ${values.detail}
          Status: ${values.priority || 2}`
        );
      }
    };
    firestoreSubmit();

    // TODO: top画面、draft画面作成後は以下の通り画面遷移をすること
    // if (category === "top") {
    //   router.push("/top");
    // } else {
    //   router.push("/draft");
    // }
  };

  return (
    <>
      <Head>Create new todo</Head>
      <Header />
      <Container maxW="800px" p={4} pt={32}>
        <Flex justify="space-between" align="center">
          <Heading as="h1">NEW TODO</Heading>
          <Button
            onClick={() => router.push("/top")}
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
                  {...register("title", validationRules.title)}
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
                  {...register("detail", validationRules.detail)}
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
                      defaultValue="2"
                    >
                      <Stack direction="row">
                        <Radio value="1">High</Radio>
                        <Radio value="2">Middle</Radio>
                        <Radio value="3">Low</Radio>
                      </Stack>
                    </RadioGroup>
                  )}
                />
              </FormControl>
            </Box>
          </Stack>

          <Flex justify="flex-end">
            <ButtonGroup>
              <Button
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

export default create;
