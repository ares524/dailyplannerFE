import {
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  Flex,
  Text,
  Box,
} from "@chakra-ui/react";
import PrivatePage from "../../components/Layout/PrivatePage";
import PlannerCard from "./SubPages/PlannerCard";
import TrackerCard from "./SubPages/TrackerCard";

import { useState, React, useEffect } from "react";
import { mealsQueryStr } from "../../queries";
import { get } from "../../util/api";

const MealsPage = () => {
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await get(mealsQueryStr);
      if (res) {
        const newRes = [];
        res.meals.map((item) => {
          if (item.completed) {
            newRes.push(item);
          }
          return newRes;
        });
        setMeals(newRes || []);
      }
    }
    fetchData();
  }, []);
  const renderSection = (type) => {
    const handleChangeTab = (index) => {
      if (index === 0) {
        async function fetchData() {
          const res = await get(mealsQueryStr);
          if (res) {
            const newRes = [];
            res.meals.map((item) => {
              if (item.completed) {
                newRes.push(item);
              }
              return newRes;
            });
            setMeals(newRes || []);
          }
        }
        fetchData();
      }
    };
    return (
      <Flex flex="1" p="4" direction="column">
        <Tabs
          isFitted
          variant="enclosed"
          colorScheme="gray"
          onChange={(index) => handleChangeTab(index)}
        >
          <TabList mb="1em">
            <Tab eventKey={1} _selected={{ color: "white", bg: "#2b6cb0" }}>
              <Text fontSize="2xl"> MEAL TRACKER </Text>
            </Tab>
            <Tab _selected={{ color: "white", bg: "#2b6cb0" }}>
              <Text fontSize="2xl">MEAL PLANNER</Text>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <TrackerCard meals={meals} />
            </TabPanel>
            <TabPanel>
              <PlannerCard />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    );
  };

  return (
    <PrivatePage>
      {renderSection("Meal tracker")}
      {/* <Flex p="4">{renderSection("Meal tracker")}</Flex> */}
    </PrivatePage>
  );
};

MealsPage.routeName = "/meals";

export default MealsPage;
