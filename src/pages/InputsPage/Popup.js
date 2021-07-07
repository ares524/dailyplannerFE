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
