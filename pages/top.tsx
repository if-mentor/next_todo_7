import React, { ChangeEvent, useMemo, useState } from 'react';
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
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  where,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { Header } from '../components/Header';
import { useAppContext } from '../context/appContext';
import parseTimestampToDate from '../utils/parseTimestampToDate';

export type Todo = {
  id: string;
  author?: string;
  task: string;
  status: 'NOT STARTED' | 'DOING' | 'DONE';
  priority: 'High' | 'Middle' | 'Low';
  create_date: Timestamp;
  update_date: Timestamp | null;
};

type FilterQuery = {
  task: string;
  status: '' | 'NOT STARTED' | 'DOING' | 'DONE';
  priority: '' | 'High' | 'Middle' | 'Low';
};

const Top: React.FC = () => {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const statuses = ['NOT STARTED', 'DOING', 'DONE'];
  const priorities = ['High', 'Middle', 'Low'];
  const { user } = useAppContext();
  const [filterQuery, setFilterQuery] = useState<FilterQuery>({
    task: '',
    status: '',
    priority: '',
  });

  React.useEffect(() => {
    !!user || router.push('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const filteredTodos: Todo[] = useMemo(() => {
    //Memo:...todosでやると配列のコピーになり、オブジェクトは参照になる
    let cloneTodos: Todo[] = todos.map((todo) => ({ ...todo }));
    const tmpTodos = cloneTodos.filter((row) => {
      switch (Object.values(filterQuery).filter((n) => n === '').length) {
        case 3:
          return todos;
        case 2:
          if (
            (filterQuery.priority !== '' &&
              filterQuery.priority === row.priority) ||
            (filterQuery.status !== '' && filterQuery.status === row.status) ||
            (filterQuery.task !== '' && row.task.includes(filterQuery.task))
          ) {
            return row;
          }
        case 1:
          if (
            (filterQuery.task == '' &&
              filterQuery.status === row.status &&
              filterQuery.priority === row.priority) ||
            (filterQuery.status == '' &&
              row.task.includes(filterQuery.task) &&
              filterQuery.priority === row.priority) ||
            (filterQuery.priority == '' &&
              row.task.includes(filterQuery.task) &&
              filterQuery.status === row.status)
          ) {
            return row;
          }
        case 0:
          if (
            row.task.includes(filterQuery.task) &&
            filterQuery.status === row.status &&
            filterQuery.priority === row.priority
          ) {
            return row;
          }
        default:
          break;
      }
    });
    return tmpTodos;
  }, [todos, filterQuery]);

  const handleFilter = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    //本当はanyにしない方が良い...(ただし、statusがnumとかになるとstring指定するとerrorになる)
    const { name, value }: any = e.target;
    //Memo: スプレッド構文で、フィルタリング要素をfilterQueryに追加
    setFilterQuery({ ...filterQuery, [name]: value });
  };

  const filterReset: () => void = () => {
    setFilterQuery({
      task: '',
      status: '',
      priority: '',
    });
  };

  const trashTodo: (id: string) => void = async (id) => {
    await updateDoc(doc(db, 'todos', id), {
      category: 'trash',
    });
    //trashしたtodoを削除したtodoリスト作成
    const trashedTodos: Todo[] = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(trashedTodos);
  };

  const handleChangePriority: (
    e: React.ChangeEvent<HTMLSelectElement>,
    id: string
  ) => void = (e, id) => {
    updateDoc(doc(db, 'todos', id), {
      priority: e.target.value,
      update: serverTimestamp(),
    });
  };

  const handleClickStatus: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
    status: string
  ) => void = (e, id, status) => {
    //  statusesリストにおいて、現在のstatusの次のindexのstatusをnewStatusとする
    const newStatus = statuses[(statuses.indexOf(status) + 1) % 3];
    updateDoc(doc(db, 'todos', id), {
      status: newStatus,
      update: serverTimestamp(),
    });
  };

  React.useEffect(() => {
    const getTodos = query(
      collection(db, 'todos'),
      where('category', '==', 'top'),
      // where("author", "==", uid), // 自分のTodoのみ表示させる場合はこの行を追加
      orderBy('create', 'desc')
    );
    const unsubscribe = onSnapshot(getTodos, (querySnapshot) => {
      const initialTodos: Todo[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        author: doc.data().author,
        task: doc.data().task,
        status: doc.data().status,
        priority: doc.data().priority,
        create_date: doc.data().create,
        update_date: doc.data().update,
      }));
      setTodos(initialTodos);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Header />
      <Container p="110px 100px 0" w="100%" maxW="1400px">
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
              <Input
                name="task"
                placeholder="Text"
                value={filterQuery.task}
                onChange={handleFilter}
              />
            </Stack>
            <Stack sx={filterBox}>
              <Text sx={filterTitle}>STATUS</Text>
              <Select
                name="status"
                placeholder="- - - - - - -"
                value={filterQuery.status}
                onChange={handleFilter}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Select>
            </Stack>
            <Stack sx={filterBox}>
              <Text sx={filterTitle}>PRIORITY</Text>
              <Select
                name="priority"
                placeholder="- - - - - - -"
                value={filterQuery.priority}
                onChange={handleFilter}
              >
                {priorities.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </Select>
            </Stack>
            <Button
              color="black"
              bg="blackAlpha.500"
              borderColor="blackAlpha.800"
              p="0 50px"
              size="md"
              borderRadius="50px"
              onClick={filterReset}
            >
              RESET
            </Button>
          </HStack>
          <Spacer />
          <HStack spacing="16px">
            <button onClick={() => router.push('/trash')}>
              <Image src="Trash Icon Button.png" />
            </button>
            {/* <button>
              <Image src="Draft Icon Button.png" />
            </button> */}
            <button onClick={() => router.push('/create')}>
              <Image src="New Icon Button.png" _hover={{ opacity: 0.8 }} />
            </button>
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
                  p="0 0 0 10px"
                  minW="100px"
                >
                  User
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
              {filteredTodos.map((todo) => {
                return (
                  <Tr key={todo.id}>
                    <Td textAlign="left" pl="10px">
                      <Button
                        variant="link"
                        onClick={() => router.push(`${todo.id}/detail`)}
                      >
                        {todo.task}
                      </Button>
                    </Td>
                    <Td textAlign="center">{todo.author}</Td>
                    <Td textAlign="center">
                      <Button
                        w="120px"
                        h="40px"
                        lineHeight="40px"
                        borderRadius="50px"
                        m="0 auto"
                        bg={
                          todo.status === 'DOING'
                            ? 'green.600'
                            : todo.status === 'DONE'
                            ? 'green.300'
                            : 'green.50'
                        }
                        color={
                          todo.status === 'DOING'
                            ? 'green.50'
                            : 'blackAlpha.800'
                        }
                        onClick={(e) =>
                          handleClickStatus(e, todo.id, todo.status)
                        }
                      >
                        <Text>{todo.status}</Text>
                      </Button>
                    </Td>
                    <Td textAlign="center">
                      <Select
                        defaultValue={todo.priority}
                        onChange={(e) => handleChangePriority(e, todo.id)}
                      >
                        {priorities.map((priority) => (
                          <option key={priority} value={priority}>
                            {priority}
                          </option>
                        ))}
                      </Select>
                    </Td>
                    <Td fontSize="14px" textAlign="center">
                      {parseTimestampToDate(todo.create_date, '-')}
                    </Td>
                    <Td fontSize="14px" textAlign="center">
                      {parseTimestampToDate(todo.update_date, '-') || '-'}
                    </Td>
                    <Td>
                      <HStack spacing="16px" justify="center">
                        {/* TODO:対象TODOの編集画面に遷移できるようにする */}
                        <button onClick={() => router.push(`${todo.id}/edit`)}>
                          <Image src="Edit.png" />
                        </button>
                        <button onClick={() => trashTodo(todo.id)}>
                          <Image src="Trash.png" />
                        </button>
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
  w: '100%',
  minW: '120px',
};
const filterTitle = {
  fontWeight: '700',
  fontSize: '18px',
  lineHeight: '22px',
};
const pagenation = {
  w: '40px',
  h: '40px',
  lineHeight: '40px',
  textAlign: 'center',
  borderRadius: '10px',
  border: '1px solid rgba(0, 0, 0, 0.8)',
  fontSize: '18px',
  color: 'blackAlpha.800',
};

export default Top;
