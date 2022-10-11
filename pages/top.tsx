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

type Todo = {
  id: number;
  task: string;
  status: 'NOT STARTED' | 'DOING' | 'DONE';
  priority: 'High' | 'Middle' | 'Low';
  create_date: string; //TODO:Timestampに変更予定
  update_date: string; //TODO:Timestampに変更予定
};

type FilterQuery = {
  task: string;
  status: '' | 'NOT STARTED' | 'DOING' | 'DONE';
  priority: '' | 'High' | 'Middle' | 'Low';
};

const Top: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      task: 'testttttttttttt',
      status: 'DONE',
      priority: 'High',
      create_date: '2020-11-8 18:55',
      update_date: '2020-11-8 18:55',
    },
    {
      id: 2,
      task: 'test2',
      status: 'DOING',
      priority: 'Middle',
      create_date: '2020-11-8 18:55',
      update_date: '2020-11-8 18:55',
    },
    {
      id: 3,
      task: 'test3',
      status: 'NOT STARTED',
      priority: 'Low',
      create_date: '2020-11-8 18:55',
      update_date: '2020-11-8 18:55',
    },
    {
      id: 4,
      task: 'test4',
      status: 'NOT STARTED',
      priority: 'Low',
      create_date: '2020-11-8 18:55',
      update_date: '2020-11-8 18:55',
    },
  ]);
  const statuses = ['NOT STARTED', 'DOING', 'DONE'];
  const priorities = ['High', 'Middle', 'Low'];

  const [filterQuery, setFilterQuery] = useState<FilterQuery>({
    task: '',
    status: '',
    priority: '',
  });
  const [trashTodos, setTrashTodos] = useState<Todo[]>([]);

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

  const trashTodo: (id: number) => void = (id) => {
    //trashしたtodoを削除したtodoリスト作成
    const trashedTodos: Todo[] = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(trashedTodos);
    //trashページ用にtrashtodoリストを作成
    const newTrashTodo: Todo | undefined = todos.find((todo) => {
      return todo.id === id;
    });
    if (newTrashTodo === undefined) return;
    setTrashTodos([...trashTodos, newTrashTodo]);
  };

  const router = useRouter();

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
            <button>
              <Image src="Draft Icon Button.png" />
            </button>
            <button onClick={() => router.push('/create')}>
              <Image src="New Icon Button.png" />
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
                      {todo.task}
                    </Td>
                    <Td textAlign="center">
                      <Box
                        w="120px"
                        h="40px"
                        lineHeight="40px"
                        borderRadius="50px"
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
                      >
                        <Text>{todo.status}</Text>
                      </Box>
                    </Td>
                    <Td textAlign="center">
                      <Select defaultValue={todo.priority}>
                        {priorities.map((priority) => (
                          <option key={priority} value={priority}>
                            {priority}
                          </option>
                        ))}
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
                        {/* TODO:対象TODOの編集画面に遷移できるようにする */}
                        <button onClick={() => router.push('/Edit')}>
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
