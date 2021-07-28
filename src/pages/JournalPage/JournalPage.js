import { useMutation } from "react-apollo";
import Header from "../../components/Header/Header";
import { Box, Flex } from "@chakra-ui/react";
import ThoughtsCard from "./MenuCard";
import { EditModeProvider } from "../../contexts/EditModeContext";
import { SheetProvider, useSheet } from "../../contexts/SheetContext";
import Popup from "./Popup";
import { ThoughtItemModalProvider } from "../../contexts/ThoughtItemModalContext";
import ThoughtItemModal from "../../components/ThoughtItemModal/ThoughtItemModal";
import { useEffect } from "react";

import { checkOrCreateSheetMutation } from "../../mutations";

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
  const [checkOrCreateSheet] = useMutation(checkOrCreateSheetMutation);
  const { sheet, handleGetSheet } = useSheet();
  useEffect(() => {
    const today = new Date();
    checkOrCreateSheet({ variables: { day: today.toDateString() } })
      .then((res) => {
        if (res.data.checkOrCreateSheet.id) {
          handleGetSheet(res.data.checkOrCreateSheet.id);
        }
      })
      .catch(console.log);
  }, [checkOrCreateSheet, handleGetSheet]);

  if (!sheet) return <div>Loading...</div>;
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
