import React, { FC, useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast,
} from '@chakra-ui/react';
import { handleDeleteData } from '../utils/delete0rRestore';
import { handleDeleteAllData } from '../utils/delete0rRestore';
import { handleRestoreAllData } from '../utils/delete0rRestore';
import { Todo } from '../pages/top';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  cancelRef: any;
  dialogText: string;
  todos: Todo[];
  deleteOrRestoreTodoId: string;
};

const ConfirmationDialog: FC<Props> = (props) => {
  const [dialogTitle, setDialogTitle] = useState(['', '']);
  const {
    isOpen,
    onClose,
    cancelRef,
    dialogText,
    todos,
    deleteOrRestoreTodoId,
  } = props;
  const toast = useToast();

  //Dialog内のコメントセット
  useEffect(() => {
    switch (dialogText) {
      case 'UNIT_DELETE':
        return setDialogTitle(['Delete Todo', 'Delete']);
      case 'ALL_DELETE':
        return setDialogTitle(['Delete All Todos', 'Delete']);
      case 'ALL_RESTORE':
        return setDialogTitle(['Restore All Todos', 'Restore']);
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogText]);

  //Dialog内ボタンの削除・リストアハンドラー
  const handlerDeleteOrRestore = (deleteOrRestoreTodoId: string) => {
    switch (dialogText) {
      case 'UNIT_DELETE':
        handleDeleteData(deleteOrRestoreTodoId, toast);
        break;
      case 'ALL_DELETE':
        handleDeleteAllData(todos, toast);
        break;
      case 'ALL_RESTORE':
        handleRestoreAllData(todos, toast);
        break;
      default:
        break;
    }
    onClose();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {dialogTitle[0]}
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can&#39;t undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => handlerDeleteOrRestore(deleteOrRestoreTodoId)}
              ml={3}
            >
              {dialogTitle[1]}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmationDialog;
