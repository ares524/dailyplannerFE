import {
  useReducer,
  useCallback,
  useState,
  useEffect,
  createContext,
} from "react";
import PropTypes from "prop-types";
import { Input, Flex, Text, VStack, Divider, Button } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import Card from "../../components/Card/Card";
import ThoughtList from "../../components/ThoughtList/ThoughtList";
import { useEditMode } from "../../contexts/EditModeContext";
import { useSheet } from "../../contexts/ThoughtSheetContext";
import { useThoughtItemModal } from "../../contexts/ThoughtItemModalContext";
import { COLOR_THEME } from "../../util/constants";
import { useMutation, useQuery } from "react-apollo";
import omitDeep from "omit-deep";

import {
  createThoughtItemMutation,
  deleteThoughtItemMutation,
  toggleThoughtItemCompletedMutation,
  updateThoughtItemMutation,
  updateThoughtOptionsMutation,
} from "../../mutations";

import { journalsQuery, journalsQueryStr } from "../../queries";

import { get } from "../../util/api";

function journalReducer(state, action) {
  switch (action.type) {
    case "RECEIVE_JOURNAL":
      return {
        thoughts: {},
      };
    case "UPDATE_JOURNAL":
      return { ...state, ...action.data };
    default:
      return state;
  }
}
export const JournalProvider = (props) => {
  const [sheet, dispatch] = useReducer(journalReducer, {
    thoughts: {
      items: [],
    },
  });
  const value = { sheet, dispatch };

  return <JournalContext.Provider value={value} {...props} />;
};

const ThoughtsCard = ({ type, ...props }) => {
  const { data } = useQuery(journalsQuery, {
    fetchPolicy: "no-cache",
  });
  const [thoughts, setThoughts] = useState([]);

  useEffect(() => {
    console.log("Here: ", data);
    if (data) {
      setThoughts(data.journals || []);
    }
  }, [data]);

  // function removeTypename(data) {
  //   return typeof data === "object"
  //     ? objectKeyFilter(data, ["__typename"], true)
  //     : data;
  // }

  const { editMode } = useEditMode();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [createThoughtItem] = useMutation(createThoughtItemMutation);
  const [updateThoughtItem] = useMutation(updateThoughtItemMutation);
  const [deleteThoughtItem] = useMutation(deleteThoughtItemMutation);
  const [updateThoughtOptions] = useMutation(updateThoughtOptionsMutation);
  const [toggleThoughtItemCompleted] = useMutation(
    toggleThoughtItemCompletedMutation
  );

  const { handleOpen } = useThoughtItemModal();
  if (!thoughts) return null;

  const launchNewThoughtModal = () => {
    const id = thoughts._id;
    console.log("aa: ", id);
    handleOpen(async (thoughtItem) => {
      try {
        console.log(thoughtItem);
        const result = await createThoughtItem({
          variables: {
            id,
            type,
            ...thoughtItem,
          },
        });
        if (result) {
          const data = await get(journalsQueryStr);
          console.log(data);
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
    console.log("selectedThoughtItem: ", selectedThoughtItem);
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
            console.log(data);
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
    console.log(thoughtItem);
    omitDeep(thoughtItem, ["__typename"]);
    try {
      const result = await toggleThoughtItemCompleted({
        variables: {
          id: thoughtItem._id,
        },
      });
      if (result) {
        const data = await get(journalsQueryStr);
        console.log(data);
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
    console.log("delete: ", id);
    try {
      const result = await deleteThoughtItem({
        variables: {
          id,
        },
      });
      if (result) {
        const data = await get(journalsQueryStr);
        console.log(data);
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

  const handleUpdateOptions = async (key, value) => {
    try {
      const result = updateThoughtOptions({
        variables: {
          id: thoughts._id,
          [key]: value,
        },
      });
      if (result) {
        const data = await get(journalsQueryStr);
        console.log(data);
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

  const hasItems = thoughts._id && thoughts.items.length;
  const startTimeVisibility = hasItems && thoughts.items.startTime;
  const endTimeVisibility =
    startTimeVisibility && thoughts.items.startTime && thoughts.items.endTime;

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
          />
        </Flex>
        {startTimeVisibility && (
          <Divider
            pt="4"
            orientation="horizontal"
            display={editMode ? "inline-flex" : ["none", "inline-flex"]}
          />
        )}
        {startTimeVisibility && (
          <Flex width="100%" alignItems="center">
            <Text
              textTransform="uppercase"
              mr="4"
              fontSize={editMode ? "md" : ["xs", "md"]}
            >
              {props.startTimeLabel || "start time"}
            </Text>
            <Input
              flex="1"
              variant="flushed"
              placeholder="Flushed"
              type="time"
              display={editMode ? "inline-flex" : ["none", "inline-flex"]}
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            {!editMode && (
              <Text
                textTransform="uppercase"
                mr="4"
                fontSize={["xs", "md"]}
                display={["inline-flex", "none"]}
              >
                {sheet.todos[type].startTime}
              </Text>
            )}
            {editMode && (
              <Button
                ml="4"
                width="16"
                display={editMode ? "inline-flex" : ["none", "inline-flex"]}
                backgroundColor={`${COLOR_THEME}.500`}
                onClick={() => handleUpdateOptions("startTime", startTime)}
                disabled={!startTime}
              >
                <CheckIcon color="white" />
              </Button>
            )}
          </Flex>
        )}
        {endTimeVisibility && (
          <Flex width="100%" alignItems="center">
            <Text
              textTransform="uppercase"
              mr="4"
              fontSize={editMode ? "md" : ["xs", "md"]}
            >
              end time
            </Text>
            <Input
              flex="1"
              variant="flushed"
              placeholder="Flushed"
              type="time"
              display={editMode ? "inline-flex" : ["none", "inline-flex"]}
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
            {!editMode && (
              <Text
                textTransform="uppercase"
                mr="4"
                fontSize={["xs", "md"]}
                display={["inline-flex", "none"]}
              >
                {sheet.todos[type].endTime}
              </Text>
            )}
            {editMode && (
              <Button
                ml="4"
                width="16"
                display={editMode ? "inline-flex" : ["none", "inline-flex"]}
                backgroundColor={`${COLOR_THEME}.500`}
                onClick={() => handleUpdateOptions("endTime", endTime)}
                disabled={!endTime}
              >
                <CheckIcon color="white" />
              </Button>
            )}
          </Flex>
        )}
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
