import {
  Box,
  Flex,
  Text,
  Stack,
  Spacer,
  Heading,
  List,
  ListItem,
  Button,
  Divider,
} from "@chakra-ui/react";
import { useState, useEffect, React } from "react";
import { useMutation, useQuery } from "react-apollo";
import { AddIcon } from "@chakra-ui/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import PlannerDrawer from "./PlannerDrawer";
import PlannerModal from "./PlannerModal";
// Import Swiper styles
import "swiper/swiper-bundle.css";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "./style.css";

// import axios from "axios";
import axios from "axios";

import {
  addFoodsMutation,
  deleteFoodMutation,
  updateFoodMutation,
} from "../../../mutations";
import { mealsQuery, mealsQueryStr } from "../../../queries";
import { get } from "../../../util/api";

// install Swiper modules
SwiperCore.use([Pagination]);

const PlannerCard = (props) => {
  const DayOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [addFoods] = useMutation(addFoodsMutation);
  const [deleteFood] = useMutation(deleteFoodMutation);
  const [updateFood] = useMutation(updateFoodMutation);
  const [cardNumber, setCardNumber] = useState(3);
  const [foods, setFoods] = useState([]);
  const [meals, setMeals] = useState([]);
  const [mealDetail, setMealDetail] = useState([]);
  const [CurrentDayOfWeek, setCurrentDayOfWeek] = useState("");

  const { data } = useQuery(mealsQuery, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (data) {
      setMeals(data.meals || []);
    }
    if (document.body.clientWidth < 900) {
      setCardNumber(1);
    } else {
      setCardNumber(3);
    }
  }, [data]);

  window.addEventListener("resize", function (event) {
    if (document.body.clientWidth >= 900) {
      setCardNumber(3);
    }
    if (document.body.clientWidth < 900 && document.body.clientWidth >= 650) {
      setCardNumber(2);
    }
    if (document.body.clientWidth < 650) {
      setCardNumber(1);
    }
  });

  // drawer
  const [isPlannerDrawerOpen, setPlannerDrawerOpen] = useState(false);
  const handlePlannerDrawerClose = () => {
    setPlannerDrawerOpen(false);
  };
  const handlePlannerDrawerOpen = (param) => {
    setCurrentDayOfWeek(param);
    setPlannerDrawerOpen(true);
  };

  const handleFoodSearch = (param) => {
    axios
      .get(
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=0p7EzFU8ngpRiynrASO8lzD88QLk5fqoAxgDCLHc&query=${param}`
      )
      .then((res) => {
        setFoods(res.data.foods);
      });
  };

  //modal
  const [isPlannerModalOpen, setPlannerModalOpen] = useState(false);
  const handleModalDismiss = () => {
    setPlannerModalOpen(false);
  };
  const handlePlannerModalOpen = (day, type) => {
    const MealDetailOption = meals.filter((meal, i) => {
      return meal.type === type && meal.day === day;
    });
    setMealDetail(MealDetailOption);
    setPlannerModalOpen(true);
  };

  //request server
  const handleAddFoods = async (param) => {
    try {
      const foodNutrients = [];
      param.item.foodNutrients.map((item, i) => {
        return foodNutrients.push({
          nutrientName: item.nutrientName,
          unitName: item.unitName,
          value: item.value,
        });
      });
      const response = await addFoods({
        variables: {
          foodCategory: param.item.foodCategory,
          description: param.item.description,
          foodNutrients: foodNutrients,
          type: param.type,
          day: CurrentDayOfWeek,
        },
      });
      if (response.data.createFood) {
        const res = await get(mealsQueryStr);
        if (res && res.meals) {
          setMeals(res.meals || []);
        } else {
          window.location.href = "/meal";
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddToTracker = async (completed, id) => {
    try {
      const updateFoodRes = await updateFood({
        variables: {
          id,
          completed,
        },
      });
      if (updateFoodRes.data.updateFood.result) {
        const res = await get(mealsQueryStr);
        if (res && res.meals) {
          const newMealDetail = [];
          mealDetail.map((meal, i) => {
            if (meal._id === id) {
              meal.completed = !meal.completed;
            }
            newMealDetail.push(meal);
            return newMealDetail;
          });
          setMealDetail(newMealDetail);
          setMeals(res.meals || []);
        } else {
          window.location.href = "/meal";
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteFood = async (id) => {
    try {
      const deleteFoodRes = await deleteFood({
        variables: {
          id,
        },
      });
      if (deleteFoodRes.data.deleteFood.result) {
        const res = await get(mealsQueryStr);
        if (res && res.meals) {
          const newMealDetail = [];
          mealDetail.map((meal, i) => {
            if (meal._id !== id) {
              newMealDetail.push(meal);
            }
            return newMealDetail;
          });
          setMealDetail(newMealDetail);
          setMeals(res.meals || []);
        } else {
          window.location.href = "/meal";
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Swiper
        slidesPerView={cardNumber}
        spaceBetween={30}
        slidesPerGroup={cardNumber}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        observer={true}
        observeParents={true}
        className="mySwiper"
      >
        {DayOfWeek.map((item, i) => {
          return (
            <SwiperSlide key={i}>
              <Box
                m="4"
                maxW={"330px"}
                w={"full"}
                boxShadow={"2xl"}
                rounded={"md"}
                overflow={"hidden"}
              >
                <Stack p={6} align={"center"}>
                  <Stack direction={"row"} align={"center"} justify={"center"}>
                    <Text fontSize={"3xl"} fontWeight={800}>
                      {item}
                    </Text>
                  </Stack>
                </Stack>

                <Box px={6} py={10}>
                  <List spacing={3}>
                    <ListItem>
                      <Flex>
                        <Box>
                          <Heading as="h4" size="md">
                            Breakfast
                          </Heading>
                          <Text color={"gray.500"} fontSize={"sm"}>
                            {meals.map((meal, i) => {
                              return meal.type === "breakfast" &&
                                meal.day === item
                                ? meal.foodCategory + " "
                                : "";
                            })}
                          </Text>
                        </Box>

                        <Spacer />
                        <AddIcon
                          cursor="pointer"
                          onClick={() =>
                            handlePlannerModalOpen(item, "breakfast")
                          }
                        />
                      </Flex>
                    </ListItem>
                    <Divider orientation="horizontal" />
                    <ListItem>
                      <Flex>
                        <Box>
                          <Heading as="h4" size="md">
                            Lunch
                          </Heading>
                          <Text color={"gray.500"} fontSize={"sm"}>
                            {meals.map((meal, i) => {
                              return meal.type === "lunch" && meal.day === item
                                ? meal.foodCategory + " "
                                : "";
                            })}
                          </Text>
                        </Box>
                        <Spacer />
                        <AddIcon
                          cursor="pointer"
                          onClick={() => handlePlannerModalOpen(item, "lunch")}
                        />
                      </Flex>
                    </ListItem>
                    <Divider orientation="horizontal" />
                    <ListItem>
                      <Flex>
                        <Box>
                          <Heading as="h4" size="md">
                            Dinner
                          </Heading>
                          <Text color={"gray.500"} fontSize={"sm"}>
                            {meals.map((meal, i) => {
                              return meal.type === "dinner" && meal.day === item
                                ? meal.foodCategory + " "
                                : "";
                            })}
                          </Text>
                        </Box>
                        <Spacer />
                        <AddIcon
                          cursor="pointer"
                          onClick={() => handlePlannerModalOpen(item, "dinner")}
                        />
                      </Flex>
                    </ListItem>
                    <Divider orientation="horizontal" />
                    <ListItem>
                      <Flex>
                        <Box>
                          <Heading as="h4" size="md">
                            Snack
                          </Heading>
                          <Text color={"gray.500"} fontSize={"sm"}>
                            {meals.map((meal, i) => {
                              return meal.type === "snack" && meal.day === item
                                ? meal.foodCategory + " "
                                : "";
                            })}
                          </Text>
                        </Box>
                        <Spacer />
                        <AddIcon
                          cursor="pointer"
                          onClick={() => handlePlannerModalOpen(item, "snack")}
                        />
                      </Flex>
                    </ListItem>
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
                    onClick={() => handlePlannerDrawerOpen(item)}
                  >
                    Add Items
                  </Button>
                </Box>
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <PlannerDrawer
        isPlannerDrawerOpen={isPlannerDrawerOpen}
        onPlannerDrawerClose={handlePlannerDrawerClose}
        handleFoodSearch={handleFoodSearch}
        foods={foods}
        handleAddFoods={handleAddFoods}
      />
      <PlannerModal
        isPlannerModalOpen={isPlannerModalOpen}
        handleModalDismiss={handleModalDismiss}
        mealDetail={mealDetail}
        handleDeleteFood={handleDeleteFood}
        handleAddToTracker={handleAddToTracker}
      />
    </>
  );
};

PlannerCard.propTypes = {};

export default PlannerCard;
