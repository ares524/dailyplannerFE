import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import { useEditMode } from "../../contexts/EditModeContext";
import TodaysTodoCard from "./MenuCard";

const Popup = (props) => {
  const { editMode, sectionName, handleDismiss } = useEditMode();

  const handleClose = () => {
    handleDismiss();
    window.location.href = "/journal";
  };

  const renderContent = () => {
    switch (sectionName) {
      case "TODAYS_THOUGHT":
        return <TodaysTodoCard />;
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
