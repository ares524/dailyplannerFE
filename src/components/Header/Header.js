import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Heading,
  Flex,
  Button,
  useDisclosure,
  Divider,
  Center,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { COLOR_THEME } from "../../util/constants";
import { useUser } from "../../contexts/UserContext";
import ExpensesPage from "../../pages/ExpensesPage/ExpensesPage";
import JournalPage from "../../pages/JournalPage/JournalPage";

const Header = (props) => {
  const { pathname } = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleLogout } = useUser();

  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg={`${COLOR_THEME}.700`}
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Link to={"/"}>
          <Heading
            as="h1"
            size={["lg"]}
            letterSpacing={"tighter"}
            textDecoration={
              pathname === "/" || pathname.includes("/sheets/")
                ? "underline"
                : "none"
            }
          >
            Planner
          </Heading>
        </Link>
        <Center height="8" px={["2", "4"]}>
          <Divider orientation="vertical" size="1" color="white" />
        </Center>
        <Link to={ExpensesPage.routeName}>
          <Heading
            as="h1"
            size={["lg"]}
            letterSpacing={"tighter"}
            textDecoration={
              pathname === ExpensesPage.routeName ? "underline" : "none"
            }
          >
            Expenses
          </Heading>
        </Link>
        <Center height="8" px={["2", "4"]}>
          <Divider orientation="vertical" size="1" color="white" />
        </Center>
        <Link to={JournalPage.routeName}>
          <Heading
            as="h1"
            size="lg"
            letterSpacing={"tighter"}
            textDecoration={
              pathname === JournalPage.routeName ? "underline" : "none"
            }
          >
            Journal
          </Heading>
        </Link>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <HamburgerIcon />
      </Box>

      {/* <Stack
        direction={{ base: "column", md: "row" }}
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
      >
        <Text>Profile</Text>
      </Stack> */}

      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <Button
          variant="outline"
          _hover={{
            bg: `${COLOR_THEME}.700`,
            borderColor: `${COLOR_THEME}.700`,
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Flex>
  );
};

export default Header;
