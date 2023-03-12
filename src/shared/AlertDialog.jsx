import { useRef } from "react";
import {
  Button,
  AlertDialog,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogFooter,
  AlertDialogBody,
} from "@chakra-ui/react";

export default function CustomAlertDialog({
  isOpen,
  onClose,
  title,
  description,
  cancelTxt = "Cancel",
  okTxt = "Ok",
  variant = "solid",
  isLoading,
  onOkHandler,
}) {
  const cancelRef = useRef();

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay bg="blackAlpha.500" backdropFilter="blur(5px) hue-rotate(90deg)" />

        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{description}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {cancelTxt}
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              variant={variant}
              onClick={onOkHandler}
              isLoading={isLoading}
            >
              {okTxt}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
