import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import { useEditMode } from "../../contexts/EditModeContext";
import ArtTodosCard from "./ArtTodosCard";
import AsleepCard from "./AsleepCard";
import AwakeCard from "./AwakeCard";
import GratefulForCard from "./GratefulForCard";
import HeaderCard from "./HeaderCard";
import TodaysTodoCard from "./TodaysTodoCard";
import TomorrowsTodoCard from "./TomorrowsTodosCard";
import WorkTodosCard from "./WorkTodosCard";
import ReadingCard from "./ReadingCard";
import ResearchCard from "./ResearchCard";
import AccountabilityCard from "./AccountabilityCard";
import AffirmationCard from "./AffirmationCard";
import CallSosCard from "./CallSos";
import TodaysTodoCards from "../JournalPage/MenuCard";

const Popup = (props) => {
  const { editMode, sectionName, handleDismiss } = useEditMode();

  const handleClose = () => {
    handleDismiss();
  };

  const renderContent = () => {
    switch (sectionName) {
      case "GRATEFUL_FOR":
        return <GratefulForCard />;
      case "HEADER":
        return <HeaderCard />;
      case "TOMORROWS_TODOS":
        return <TomorrowsTodoCard />;
      case "AWAKE":
        return <AwakeCard />;
      case "ASLEEP":
        return <AsleepCard />;
      case "TODAYS_TODOS":
        return <TodaysTodoCard />;
      case "TODAYS_THOUGHT":
        return <TodaysTodoCards />;
      case "WORK_TODOS":
        return <WorkTodosCard />;
      case "ART_TODOS":
        return <ArtTodosCard />;
      case "READING":
        return <ReadingCard />;
      case "RESEARCH":
        return <ResearchCard />;
      case "ACCOUNTABILITY":
        return <AccountabilityCard />;
      case "AFFIRMATION":
        return <AffirmationCard />;
      case "CALL_SOS":
        return <CallSosCard />;
      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={editMode && sectionName}
      onClose={handleClose}
      size="4xl"
      px="2"
    >
      <ModalOverlay backgroundColor="white" />
      <ModalContent>{renderContent()}</ModalContent>
    </Modal>
  );
};

export default Popup;
