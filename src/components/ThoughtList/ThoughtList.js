import { VStack, Text, Flex } from "@chakra-ui/react";
import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useEditMode } from "../../contexts/EditModeContext";
import { COLOR_THEME } from "../../util/constants";

function ThoughtList({
  thoughts,
  handleDeleteItem,
  handleItemEdit,
  toggleCompleted,
}) {
  const { editMode } = useEditMode();

  return thoughts.length < 1 ? (
    <Text fontSize={editMode ? "md" : ["xs", "md"]}>No thoughts yet...</Text>
  ) : (
    <VStack width="100%" spacing={[1, 4]}>
      {thoughts.map((thought) => (
        <Flex
          key={thought.items[0]._id}
          width="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          {console.log(thought)}

          <CheckIcon
            mr="4"
            color={
              thought.items[0].completed ? `${COLOR_THEME}.500` : "gray.200"
            }
            fontSize="lg"
            onClick={() =>
              !thought.items[0].actions.length
                ? toggleCompleted(thought.items[0])
                : handleItemEdit(thought.items[0])
            }
            cursor="pointer"
            display={editMode ? "inline-flex" : ["none", "inline-flex"]}
          />
          <Text
            flex="1"
            textAlign="left"
            textDecoration={
              thought.items[0].completed ? "line-through" : "none"
            }
            textDecorationColor={`${COLOR_THEME}.500`}
            onClick={() => handleItemEdit(thought.items[0])}
            cursor="pointer"
            fontSize={editMode ? "md" : ["xs", "md"]}
          >
            {thought.items[0].title}
          </Text>
          <EditIcon
            onClick={() => handleItemEdit(thought.items[0])}
            fontSize="lg"
            cursor="pointer"
            mr="4"
            display={editMode ? "inline-flex" : ["none", "inline-flex"]}
          />
          <DeleteIcon
            onClick={() => handleDeleteItem(thought.items[0]._id)}
            fontSize="lg"
            color="red.500"
            cursor="pointer"
            display={editMode ? "inline-flex" : ["none", "inline-flex"]}
          />
        </Flex>
      ))}
    </VStack>
  );
}
export default ThoughtList;
