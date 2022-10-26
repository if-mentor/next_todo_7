// import { useDisclosure } from '@chakra-ui/react';
// import React, { useState } from 'react';
// import { Todo } from '../pages/top';

// export const useDeleteRestore = () => {
//   // const [todos, setTodos] = useState<Todo[]>([]);
//   const [deleteTodoId, setDeleteTodoId] = useState('');
//   const [dialogText, setDialogText] = useState('');
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   //一括リストア・単一削除・一括削除の確認Dialogハンドラー
//   const deleteOrRestoreConfirmation: (action: string, id?: string) => void = (
//     action,
//     id
//   ) => {
//     console.log(action);
//     switch (action) {
//       case 'ALL_RESTORE':
//         setDialogText('ALL_RESTORE');
//         onOpen();
//         break;
//       case 'UNIT_DELETE':
//         setDeleteTodoId(id);
//         setDialogText('UNIT_DELETE');
//         onOpen();
//         break;
//       case 'ALL_DELETE':
//         setDialogText('ALL_DELETE');
//         onOpen();
//         break;
//     }
//   };

//   return { deleteOrRestoreConfirmation };
// };

// export default useDeleteRestore;
