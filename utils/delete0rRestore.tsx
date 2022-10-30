import { Toast } from '@chakra-ui/react';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { Todo } from '../pages/top';

//Todo: toastの型定義

//単一削除
export const handleDeleteData: (id: string, toast: any) => void = async (
  id,
  toast
) => {
  await deleteDoc(doc(db, 'todos', id));
  await toast({
    title: 'Todo Deleted.',
    status: 'success',
    duration: 9000,
    isClosable: true,
  });
};

// 一括削除
export const handleDeleteAllData: (todos: Todo[], toast: any) => void = async (
  todos,
  toast
) => {
  if (todos === null) return;
  todos.map(async ({ id }) => {
    await deleteDoc(doc(db, 'todos', id));
  });
  await toast({
    title: 'All Todos Deleted.',
    status: 'success',
    duration: 9000,
    isClosable: true,
  });
};

//単一リストア
export const handleRestoreData: (id: string, toast: any) => void = async (
  id,
  toast
) => {
  await updateDoc(doc(db, 'todos', id), {
    category: 'top',
  });
  await toast({
    title: 'Todo Restored.',
    status: 'success',
    duration: 9000,
    isClosable: true,
  });
};

// 一括リストア
export const handleRestoreAllData: (todos: Todo[], toast: any) => void = async (
  todos,
  toast
) => {
  if (todos === null) return;
  todos.map(async ({ id }) => {
    await updateDoc(doc(db, 'todos', id), {
      category: 'top',
    }).catch((err) => {
      alert(err.message);
    });
  });
  await toast({
    title: 'All Todos Restored.',
    status: 'success',
    duration: 9000,
    isClosable: true,
  });
};
