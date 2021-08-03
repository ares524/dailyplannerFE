import {
  Box,
  SimpleGrid,
  Flex,
  Text,
  Stack,
  Spacer,
  Heading,
  List,
  ListItem,
  Divider,
  Button,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { COLOR_THEME } from "../../../util/constants";

import { useState, React } from "react";
import NutritionDetailModal from "./NutritionDetailModal";

const TrackerCard = (props) => {
  const { meals } = props;
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
    <SimpleGrid columns={[1, null, 2, null, 4]} spacing="40px">
      <Box
        m="4"
        maxW={"330px"}
        w={"full"}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Stack textAlign={"center"} p={6} align={"center"}>
          <Stack direction={"row"} align={"center"} justify={"center"}>
            <Text fontSize={"3xl"} fontWeight={800}>
              Breakfast
            </Text>
          </Stack>
        </Stack>

        <Box px={6} py={10}>
          <List spacing={3}>
            {meals.map((meal, i) => {
              if (meal.type === "breakfast") {
                return (
                  <div>
                    <ListItem>
                      <Flex>
                        <Heading
                          cursor="pointer"
                          as="h4"
                          size="sm"
                          onClick={() =>
                            handleNutritionDetailModal(meal.foodNutrients)
                          }
                        >
                          {meal.foodCategory}
                        </Heading>
                        <Spacer />
                        <CheckIcon
                          ml="4"
                          color={`${COLOR_THEME}.500`}
                          fontSize="lg"
                          cursor="pointer"
                        />
                      </Flex>
                    </ListItem>
                    <Divider orientation="horizontal" />
                  </div>
                );
              }
              return "";
            })}
          </List>
          <Button
            mt={10}
            w={"full"}
            bg={"green.400"}
            color={"white"}
            rounded={"xl"}
            boxShadow={"0 5px 20px 0px rgb(72 187 120 / 43%)"}
            _hover={{
              bg: "green.500",
            }}
            _focus={{
              bg: "green.500",
            }}
          >
            Add Items
          </Button>
        </Box>
      </Box>
      <Box
        m="4"
        maxW={"330px"}
        w={"full"}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Stack textAlign={"center"} p={6} align={"center"}>
          <Stack direction={"row"} align={"center"} justify={"center"}>
            <Text fontSize={"3xl"} fontWeight={800}>
              Lunch
            </Text>
          </Stack>
        </Stack>

        <Box px={6} py={10}>
          <List spacing={3}>
            {meals.map((meal, i) => {
              if (meal.type === "lunch") {
                return (
                  <div>
                    <ListItem>
                      <Flex>
                        <Heading
                          cursor="pointer"
                          as="h4"
                          size="sm"
                          onClick={() =>
                            handleNutritionDetailModal(meal.foodNutrients)
                          }
                        >
                          {meal.foodCategory}
                        </Heading>
                        <Spacer />
                        <CheckIcon
                          ml="4"
                          color={`${COLOR_THEME}.500`}
                          fontSize="lg"
                          cursor="pointer"
                        />
                      </Flex>
                    </ListItem>
                    <Divider orientation="horizontal" />
                  </div>
                );
              }
              return "";
            })}
          </List>
          <Button
            mt={10}
            w={"full"}
            bg={"green.400"}
            color={"white"}
            rounded={"xl"}
            boxShadow={"0 5px 20px 0px rgb(72 187 120 / 43%)"}
            _hover={{
              bg: "green.500",
            }}
            _focus={{
              bg: "green.500",
            }}
          >
            Add Items
          </Button>
        </Box>
      </Box>
      <Box
        m="4"
        maxW={"330px"}
        w={"full"}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Stack textAlign={"center"} p={6} align={"center"}>
          <Stack direction={"row"} align={"center"} justify={"center"}>
            <Text fontSize={"3xl"} fontWeight={800}>
              Dinner
            </Text>
          </Stack>
        </Stack>

        <Box px={6} py={10}>
          <List spacing={3}>
            {meals.map((meal, i) => {
              if (meal.type === "dinner") {
                return (
                  <div>
                    <ListItem>
                      <Flex>
                        <Heading
                          cursor="pointer"
                          as="h4"
                          size="sm"
                          onClick={() =>
                            handleNutritionDetailModal(meal.foodNutrients)
                          }
                        >
                          {meal.foodCategory}
                        </Heading>
                        <Spacer />
                        <CheckIcon
                          ml="4"
                          color={`${COLOR_THEME}.500`}
                          fontSize="lg"
                          cursor="pointer"
                        />
                      </Flex>
                    </ListItem>
                    <Divider orientation="horizontal" />
                  </div>
                );
              }
              return "";
            })}
          </List>
          <Button
            mt={10}
            w={"full"}
            bg={"green.400"}
            color={"white"}
            rounded={"xl"}
            boxShadow={"0 5px 20px 0px rgb(72 187 120 / 43%)"}
            _hover={{
              bg: "green.500",
            }}
            _focus={{
              bg: "green.500",
            }}
          >
            Add Items
          </Button>
        </Box>
      </Box>
      <Box
        m="4"
        maxW={"330px"}
        w={"full"}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Stack textAlign={"center"} p={6} align={"center"}>
          <Stack direction={"row"} align={"center"} justify={"center"}>
            <Text fontSize={"3xl"} fontWeight={800}>
              Snack
            </Text>
          </Stack>
        </Stack>

        <Box px={6} py={10}>
          <List spacing={3}>
            {meals.map((meal, i) => {
              if (meal.type === "snack") {
                return (
                  <div>
                    <ListItem>
                      <Flex>
                        <Heading
                          cursor="pointer"
                          as="h4"
                          size="sm"
                          onClick={() =>
                            handleNutritionDetailModal(meal.foodNutrients)
                          }
                          pointer="cursor"
                        >
                          {meal.foodCategory}
                        </Heading>
                        <Spacer />
                        <CheckIcon
                          ml="4"
                          color={`${COLOR_THEME}.500`}
                          fontSize="lg"
                          cursor="pointer"
                        />
                      </Flex>
                    </ListItem>
                    <Divider orientation="horizontal" />
                  </div>
                );
              }
              return "";
            })}
          </List>
          <Button
            mt={10}
            w={"full"}
            bg={"green.400"}
            color={"white"}
            rounded={"xl"}
            boxShadow={"0 5px 20px 0px rgb(72 187 120 / 43%)"}
            _hover={{
              bg: "green.500",
            }}
            _focus={{
              bg: "green.500",
            }}
          >
            Add Items
          </Button>
        </Box>
      </Box>
      <NutritionDetailModal
        isNutritionDetailModalOpen={isNutritionDetailModalOpen}
        handleNutritionDetailModalDismiss={handleNutritionDetailModalDismiss}
        nutritions={nutritions}
      />
    </SimpleGrid>
  );
};

TrackerCard.propTypes = {};

export default TrackerCard;
