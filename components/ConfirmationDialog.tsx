import React, { FC } from 'react';
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

type Props = {
  isOpen: boolean;
  onClose: () => void;
  cancelRef: any;
  // onClick: () => void;
  dialogText: string;
  deleteTodoId: string;
};

const ConfirmationDialog: FC<Props> = (props) => {
  const { isOpen, onClose, cancelRef, dialogText, deleteTodoId } = props;
  console.log(deleteTodoId);
  const handler = (deleteTodoId: string) => {
    console.log(deleteTodoId);
    dialogText === 'UNIT_DELETE' ? handleDeleteData(deleteTodoId) : 'XXX';
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
            {dialogText === 'UNIT_DELETE' ? 'Delete Todo' : 'Delete All Todos'}
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
              onClick={() => handler()}
              ml={3}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmationDialog;
