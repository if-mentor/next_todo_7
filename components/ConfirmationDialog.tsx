import React, { FC, useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { handleDeleteData } from '../pages/trash';
import { handleDeleteAllData } from '../pages/trash';
import { handleRestoreAllData } from '../pages/trash';
import { Todo } from '../pages/top';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  cancelRef: any;
  dialogText: string;
  todos: Todo[];
  deleteTodoId: string;
};

const ConfirmationDialog: FC<Props> = (props) => {
  const [dialogTitle, setDialogTitle] = useState(['', '']);
  const { isOpen, onClose, cancelRef, dialogText, todos, deleteTodoId } = props;

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

  const handlerDeleteOrRestore = (deleteTodoId: string) => {
    switch (dialogText) {
      case 'UNIT_DELETE':
        console.log(deleteTodoId);
        handleDeleteData(deleteTodoId);
      case 'ALL_DELETE':
        handleDeleteAllData(todos);
      case 'ALL_RESTORE':
        handleRestoreAllData(todos);
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
            {/* {dialogText === 'UNIT_DELETE' ? 'Delete Todo' : 'Delete All Todos'} */}
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              //複数処理のときは、アローの後を｛関数A,関数B｝にする
              // onClick={() => {
              //   onClick(), onClose();
              // }}
              onClick={() => handlerDeleteOrRestore(deleteTodoId)}
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
