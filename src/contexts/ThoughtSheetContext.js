import { createContext, useCallback, useContext, useReducer } from "react";
import { useMutation } from "react-apollo";
import {
  createThoughtItemMutation,
  deleteThoughtItemMutation,
  toggleThoughtItemCompletedMutation,
  updateSheetMutation,
  updateThoughtItemMutation,
  updateThoughtOptionsMutation,
} from "../mutations";
import { sheetQueryStr } from "../queries";
import { get } from "../util/api";

const SheetContext = createContext();

function sheetReducer(state, action) {
  switch (action.type) {
    case "RECEIVE_SHEET":
      return {
        ...action.sheet,
        thoughts: {
          today: action.sheet.thoughts.today || { items: [] },
          tomorrow: action.sheet.thoughts.tomorrow || { items: [] },
          work: action.sheet.thoughts.work || { items: [] },
          art: action.sheet.thoughts.art || { items: [] },
        },
      };
    case "UPDATE_SHEET":
      return { ...state, ...action.data };
    default:
      return state;
  }
}

export const SheetProvider = (props) => {
  const [sheet, dispatch] = useReducer(sheetReducer, {
    reading: {},
    accountability: {},
    thoughts: {
      today: {
        items: [],
      },
      tomorrow: {
        items: [],
      },
      work: {
        items: [],
      },
      art: {
        items: [],
      },
    },
  });
  const value = { sheet, dispatch };

  return <SheetContext.Provider value={value} {...props} />;
};

export function useSheet() {
  const context = useContext(SheetContext);
  console.log(context);
  if (!context) throw new Error("Please use useSheet within SheetProvider");
  const [updateSheet] = useMutation(updateSheetMutation);
  const [createThoughtItem] = useMutation(createThoughtItemMutation);
  const [updateThoughtItem] = useMutation(updateThoughtItemMutation);
  const [deleteThoughtItem] = useMutation(deleteThoughtItemMutation);
  const [updateThoughtOptions] = useMutation(updateThoughtOptionsMutation);
  const [toggleThoughtItemCompleted] = useMutation(
    toggleThoughtItemCompletedMutation
  );
  const { sheet, dispatch } = context;

  const handleGetSheet = useCallback(
    async (id) => {
      try {
        const data = await get(sheetQueryStr, { id });
        if (data && data.sheet && data.sheet._id) {
          dispatch({ type: "RECEIVE_SHEET", sheet: data.sheet });
        } else {
          window.location.href = "/";
        }
      } catch (e) {
        console.log(e);
      }
    },
    [dispatch]
  );

  const handleUpdateSheet = async (id, data) => {
    try {
      const result = await updateSheet({
        variables: {
          id,
          ...data,
        },
      });
      if (result.data.updateSheet.id) {
        dispatch({ type: "UPDATE_SHEET", data });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleCreateThoughtItem = async ({ id, type, ...thoughtItem }) => {
    try {
      // console.log('aa: ', sheet);
      const result = await createThoughtItem({
        variables: {
          id,
          sheetId: sheet._id,
          type,
          ...thoughtItem,
        },
      });
      if (result.data.createThoughtItem._id) {
        handleGetSheet(sheet._id);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateThoughtItem = async (thoughtItem) => {
    try {
      const result = await updateThoughtItem({
        variables: {
          ...thoughtItem,
        },
      });
      if (result.data.updateThoughtItem._id) {
        handleGetSheet(sheet._id);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteThoughtItem = async (id) => {
    try {
      const result = await deleteThoughtItem({
        variables: {
          id,
        },
      });
      if (result.data.deleteThoughtItem.result) {
        handleGetSheet(sheet._id);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateThoughtOptions = async ({ id, ...options }) => {
    try {
      const result = await updateThoughtOptions({
        variables: {
          id,
          ...options,
        },
      });
      if (result.data.updateThoughtOptions._id) {
        handleGetSheet(sheet._id);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleToggleThoughtItemCompleted = async (id) => {
    try {
      const result = await toggleThoughtItemCompleted({
        variables: {
          id,
        },
      });
      if (result.data.toggleThoughtItemCompleted.result) {
        handleGetSheet(sheet._id);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return {
    sheet,
    handleGetSheet,
    handleUpdateSheet,
    handleCreateThoughtItem,
    handleUpdateThoughtItem,
    handleDeleteThoughtItem,
    handleUpdateThoughtOptions,
    handleToggleThoughtItemCompleted,
  };
}
