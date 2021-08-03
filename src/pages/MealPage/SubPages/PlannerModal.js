import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Divider,
  List,
  Heading,
  ListItem,
  Box,
  Spacer,
} from "@chakra-ui/react";
import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import { COLOR_THEME } from "../../../util/constants";

const PlannerModal = (props) => {
  const {
    isPlannerModalOpen,
    handleModalDismiss,
    handleDeleteFood,
    handleAddToTracker,
    mealDetail,
  } = props;
  return (
    <Modal isOpen={isPlannerModalOpen} onClose={handleModalDismiss} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> View Meal Plan </ModalHeader>
        <ModalCloseButton />
        <form>
          <ModalBody>
            <Box px={6} py={10}>
              <List spacing={3}>
                {mealDetail.map((item, key) => {
                  return (
                    <div key={key}>
                      <ListItem>
                        <Flex>
                          <Heading as="h3" size="sm">
                            {item.foodCategory}
                          </Heading>
                          <Spacer />
                          <CheckIcon
                            ml="4"
                            color={
                              item.completed ? `${COLOR_THEME}.500` : "gray.200"
                            }
                            fontSize="lg"
                            cursor="pointer"
                            onClick={() =>
                              handleAddToTracker(!item.completed, item._id)
                            }
                          />
                          <DeleteIcon
                            ml="4"
                            color="red"
                            fontSize="lg"
                            cursor="pointer"
                            onClick={() => handleDeleteFood(item._id)}
                          />
                        </Flex>
                      </ListItem>

                      <Divider orientation="horizontal" />
                    </div>
                  );
                })}
              </List>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme={COLOR_THEME} onClick={handleModalDismiss}>
              Close
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default PlannerModal;
