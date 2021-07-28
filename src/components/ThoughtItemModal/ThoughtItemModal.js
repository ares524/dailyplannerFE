import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Flex,
  Center,
} from "@chakra-ui/react";
import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import { useThoughtItemModal } from "../../contexts/ThoughtItemModalContext";
import { COLOR_THEME } from "../../util/constants";

const ThoughtItemModal = (props) => {
  const { isOpen, mode, thoughtItem, handleDismiss, handleSubmit } =
    useThoughtItemModal();
  const [title, setTitle] = useState("");
  const [actions, setActions] = useState([]);

  useEffect(() => {
    if (thoughtItem && isOpen) {
      setTitle(thoughtItem.title);
      setActions(thoughtItem.actions);
    }
  }, [isOpen, thoughtItem]);

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ title, actions });
    setTitle("");
    setActions([]);
  };

  const modalTitle = mode === "EDIT" ? "Edit Thought" : "Add New Thought";
  console.log(actions);
  return (
    <Modal isOpen={isOpen} onClose={handleDismiss} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={onSubmit}>
          <ModalBody>
            <Input
              variant="flushed"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Center>
              <Button
                my="4"
                backgroundColor={`${COLOR_THEME}.500`}
                color="white"
                onClick={() =>
                  setActions([
                    ...actions,
                    { _id: String(Date.now()), text: "", completed: false },
                  ])
                }
              >
                Add Action
              </Button>
            </Center>
            {actions.map((action) => (
              <Flex key={action._id} alignItems="center" my="4">
                <Input
                  variant="flushed"
                  type="text"
                  placeholder="Action"
                  value={action.text}
                  onChange={(e) =>
                    setActions(
                      actions.map((a) => {
                        if (a._id !== action._id) return a;
                        return {
                          ...a,
                          text: e.target.value,
                        };
                      })
                    )
                  }
                  textDecoration={action.completed ? "line-through" : "none"}
                />
                <CheckIcon
                  ml="4"
                  color={action.completed ? `${COLOR_THEME}.500` : "gray.200"}
                  fontSize="lg"
                  onClick={() =>
                    setActions(
                      actions.map((a) => {
                        if (a._id !== action._id) return a;
                        return {
                          ...a,
                          completed: !a.completed,
                        };
                      })
                    )
                  }
                  cursor="pointer"
                />
                <DeleteIcon
                  ml="4"
                  color="red"
                  fontSize="lg"
                  onClick={() =>
                    setActions(actions.filter((a) => a._id !== action._id))
                  }
                  cursor="pointer"
                />
              </Flex>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme={COLOR_THEME} mr={3} onClick={handleDismiss}>
              Close
            </Button>
            <Button
              type="submit"
              colorScheme={COLOR_THEME}
              mr={3}
              disabled={!title}
            >
              Submit
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ThoughtItemModal;
