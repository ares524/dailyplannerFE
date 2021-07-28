import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Flex, VStack } from "@chakra-ui/react";
import Card from "../../components/Card/Card";
import ThoughtList from "../../components/ThoughtList/ThoughtList";
import { useEditMode } from "../../contexts/EditModeContext";
import { useThoughtItemModal } from "../../contexts/ThoughtItemModalContext";
import { useMutation, useQuery } from "react-apollo";
import { useSheet } from "../../contexts/SheetContext";
import omitDeep from "omit-deep";

import {
  createThoughtItemMutation,
  deleteThoughtItemMutation,
  toggleThoughtItemCompletedMutation,
  updateThoughtItemMutation,
} from "../../mutations";

import { journalsQuery, journalsQueryStr } from "../../queries";

import { get } from "../../util/api";

const ThoughtsCard = ({ type, ...props }) => {
  const { sheet, handleCreateTodoItem } = useSheet();

  const { data } = useQuery(journalsQuery, {
    fetchPolicy: "no-cache",
  });

  const [thoughts, setThoughts] = useState([]);
  const { editMode } = useEditMode();

  useEffect(() => {
    if (data) {
      setThoughts(data.journals || []);
    }
  }, [data]);

  const [createThoughtItem] = useMutation(createThoughtItemMutation);
  const [updateThoughtItem] = useMutation(updateThoughtItemMutation);
  const [deleteThoughtItem] = useMutation(deleteThoughtItemMutation);
  const [toggleThoughtItemCompleted] = useMutation(
    toggleThoughtItemCompletedMutation
  );

  const { handleOpen } = useThoughtItemModal();
  if (!thoughts) return null;

  const launchNewThoughtModal = () => {
    const id = thoughts._id;
    handleOpen(async (thoughtItem) => {
      try {
        const result = await createThoughtItem({
          variables: {
            id,
            type,
            ...thoughtItem,
          },
        });
        if (result) {
          const data = await get(journalsQueryStr);
          if (data && data.journals) {
            setThoughts(data.journals || []);
          } else {
            window.location.href = "/journal";
          }
        }
      } catch (e) {
        console.log(e);
      }
    });
  };

  const launchEditThoughtModal = (selectedThoughtItem) => {
    omitDeep(selectedThoughtItem, ["__typename"]);
    handleOpen(
      async (thoughtItem) => {
        try {
          const result = await updateThoughtItem({
            variables: {
              ...thoughtItem,
              id: selectedThoughtItem._id,
            },
          });
          if (result) {
            const data = await get(journalsQueryStr);
            if (data && data.journals) {
              setThoughts(data.journals || []);
            } else {
              window.location.href = "/journal";
            }
          }
        } catch (e) {
          console.log(e);
        }
      },
      { mode: "EDIT", thoughtItem: selectedThoughtItem }
    );
  };

  const handleToggleCompleted = async (thoughtItem) => {
    omitDeep(thoughtItem, ["__typename"]);
    try {
      const result = await toggleThoughtItemCompleted({
        variables: {
          id: thoughtItem._id,
        },
      });
      if (result) {
        const data = await get(journalsQueryStr);
        if (data && data.journals) {
          setThoughts(data.journals || []);
        } else {
          window.location.href = "/journal";
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const result = await deleteThoughtItem({
        variables: {
          id,
        },
      });
      if (result) {
        const data = await get(journalsQueryStr);
        if (data && data.journals) {
          setThoughts(data.journals || []);
        } else {
          window.location.href = "/journal";
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddToPlanner = async (param) => {
    await omitDeep(param.thought, ["__typename"]);
    const id = sheet.todos[param.type] ? sheet.todos[param.type]._id : null;
    handleCreateTodoItem({
      id,
      type: param.type,
      title: param.thought.items[0].title,
      actions: param.thought.items[0].actions,
    });
  };

  return (
    <Card
      title={props.title}
      sectionName={props.sectionName}
      rightIcon={true}
      rightIconClickHandler={launchNewThoughtModal}
      hideSaveBtn={true}
    >
      <VStack spacing={editMode ? "4" : ["1", "4"]}>
        <Flex width="100%" alignItems="center">
          <ThoughtList
            thoughts={thoughts}
            handleItemEdit={launchEditThoughtModal}
            toggleCompleted={handleToggleCompleted}
            handleDeleteItem={handleDeleteItem}
            handleAddToPlanner={handleAddToPlanner}
          />
        </Flex>
      </VStack>
    </Card>
  );
};

ThoughtsCard.propTypes = {
  type: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  startTime: PropTypes.bool,
  startTimeLabel: PropTypes.string,
  endTime: PropTypes.bool,
};

export default ThoughtsCard;
