import { useUser } from "../../contexts/UserContext";
import Header from "../../components/Header/Header";
import { Box, Flex } from "@chakra-ui/react";
import ThoughtsCard from "./MenuCard";
import { EditModeProvider } from "../../contexts/EditModeContext";
import { SheetProvider, useSheet } from "../../contexts/ThoughtSheetContext";
import Popup from "./Popup";
import { ThoughtItemModalProvider } from "../../contexts/ThoughtItemModalContext";
import ThoughtItemModal from "../../components/ThoughtItemModal/ThoughtItemModal";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const JournalPage = (props) => {
  return (
    <EditModeProvider>
      <SheetProvider>
        <ThoughtItemModalProvider>
          <Main />
        </ThoughtItemModalProvider>
      </SheetProvider>
    </EditModeProvider>
  );
};

const Main = () => {
  //   const params = useParams();
  //   const { sheet, handleGetSheet } = useSheet();
  return (
    <>
      <Header />
      <Flex
        p="4"
        flexDirection="column"
        experimental_spaceY={["4", "6", "8"]}
        maxW="1360"
        marginX="auto"
      >
        <Flex>
          <ThoughtsCard />
          <Box w={[0, 8]} />
        </Flex>
        <Popup />
        <ThoughtItemModal />
      </Flex>
    </>
  );
};
JournalPage.routeName = "/journal";
export default JournalPage;
