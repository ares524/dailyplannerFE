import {
  Input,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  List,
  Flex,
  Heading,
  ListItem,
  Spacer,
  Divider,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useState, React } from "react";
import { AddIcon } from "@chakra-ui/icons";
import NutritionDetailModal from "./NutritionDetailModal";

function PlannerDrawer(props) {
  const {
    isPlannerDrawerOpen,
    onPlannerDrawerClose,
    handleFoodSearch,
    handleAddFoods,
    foods,
  } = props;
  const [isNutritionDetailModalOpen, setNutritionDetailModalOpenOpen] =
    useState(false);
  const [nutritions, setNutritions] = useState([]);
  const handleNutritionDetailModalDismiss = () => {
    setNutritionDetailModalOpenOpen(false);
  };
  const handleNutritionDetailModal = (param) => {
    setNutritions(param);
    setNutritionDetailModalOpenOpen(true);
  };

  return (
    <>
      <Drawer
        isOpen={isPlannerDrawerOpen}
        placement="right"
        onClose={onPlannerDrawerClose}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader> Add Items... </DrawerHeader>

          <DrawerBody>
            <Input
              onChange={(e) => handleFoodSearch(e.target.value)}
              placeholder="Type here to search..."
            />
            <Box px={6} py={10}>
              <List spacing={3}>
                {foods.map((item, key) => {
                  return (
                    <div key={key}>
                      <ListItem>
                        <Flex>
                          <Box
                            onClick={() =>
                              handleNutritionDetailModal(item.foodNutrients)
                            }
                          >
                            <Heading as="h3" size="xs">
                              {item.foodCategory}
                            </Heading>
                            <Text color={"gray.500"} fontSize={"sm"}>
                              {item.description}
                            </Text>
                          </Box>

                          <Spacer />
                          <Menu>
                            <MenuButton
                              as={IconButton}
                              fontSize="xs"
                              aria-label="Options"
                              icon={<AddIcon />}
                            />
                            <MenuList minWidth="240px">
                              <MenuOptionGroup title="Category">
                                <MenuItemOption
                                  value="breakfast"
                                  onClick={() =>
                                    handleAddFoods({ item, type: "breakfast" })
                                  }
                                >
                                  Breakfast
                                </MenuItemOption>
                                <MenuItemOption
                                  value="lunch"
                                  onClick={() =>
                                    handleAddFoods({ item, type: "lunch" })
                                  }
                                >
                                  Lunch
                                </MenuItemOption>
                                <MenuItemOption
                                  value="dinner"
                                  onClick={() =>
                                    handleAddFoods({ item, type: "dinner" })
                                  }
                                >
                                  Dinner
                                </MenuItemOption>
                                <MenuItemOption
                                  value="snack"
                                  onClick={() =>
                                    handleAddFoods({ item, type: "snack" })
                                  }
                                >
                                  Snack
                                </MenuItemOption>
                              </MenuOptionGroup>
                            </MenuList>
                          </Menu>
                        </Flex>
                      </ListItem>
                      <Divider orientation="horizontal" />
                    </div>
                  );
                })}
              </List>
            </Box>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
      <NutritionDetailModal
        isNutritionDetailModalOpen={isNutritionDetailModalOpen}
        handleNutritionDetailModalDismiss={handleNutritionDetailModalDismiss}
        nutritions={nutritions}
      />
    </>
  );
}

PlannerDrawer.propTypes = {};

export default PlannerDrawer;
