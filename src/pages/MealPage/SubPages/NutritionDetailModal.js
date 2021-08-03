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
  Divider,
  List,
  Heading,
  ListItem,
  Box,
  Spacer,
} from "@chakra-ui/react";

const NutritionDetailModal = (props) => {
  const {
    isNutritionDetailModalOpen,
    handleNutritionDetailModalDismiss,
    nutritions,
  } = props;

  return (
    <Modal
      isOpen={isNutritionDetailModalOpen}
      onClose={handleNutritionDetailModalDismiss}
      size="4xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> Nutrition information </ModalHeader>
        <ModalCloseButton />
        <form>
          <ModalBody>
            <Box px={6} py={10}>
              <List spacing={3}>
                {nutritions.map((item, key) => {
                  return (
                    <div key={key}>
                      <ListItem>
                        <Flex>
                          <Heading as="h3" size="xd">
                            {item.nutrientName} ----- {item.value}
                            {item.unitName}
                          </Heading>
                        </Flex>
                      </ListItem>

                      <Divider orientation="horizontal" />
                    </div>
                  );
                })}
              </List>
            </Box>
          </ModalBody>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default NutritionDetailModal;
