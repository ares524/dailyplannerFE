import { createContext, useCallback, useContext, useReducer } from "react";
import { useMutation } from "react-apollo";
import {
  createTodoItemMutation,
  deleteTodoItemMutation,
  toggleTodoItemCompletedMutation,
  updateSheetMutation,
  updateTodoItemMutation,
  updateTodoOptionsMutation,
} from "../mutations";
import { sheetQueryStr } from "../queries";
import { get } from "../util/api";

const SheetContext = createContext();

function sheetReducer(state, action) {
  switch (action.type) {
    case "RECEIVE_SHEET":
      return {
        ...action.sheet,
        todos: {
          today: action.sheet.todos.today || { items: [] },
          tomorrow: action.sheet.todos.tomorrow || { items: [] },
          work: action.sheet.todos.work || { items: [] },
          art: action.sheet.todos.art || { items: [] },
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
    todos: {
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
  if (!context) throw new Error("Please use useSheet within SheetProvider");
  const [updateSheet] = useMutation(updateSheetMutation);
  const [createTodoItem] = useMutation(createTodoItemMutation);
  const [updateTodoItem] = useMutation(updateTodoItemMutation);
  const [deleteTodoItem] = useMutation(deleteTodoItemMutation);
  const [updateTodoOptions] = useMutation(updateTodoOptionsMutation);
  const [toggleTodoItemCompleted] = useMutation(
    toggleTodoItemCompletedMutation
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

  const handleCreateTodoItem = async ({ id, type, ...todoItem }) => {
    console.log(sheet._id);
    try {
      const result = await createTodoItem({
        variables: {
          id,
          sheetId: sheet._id,
          type,
          ...todoItem,
        },
      });
      if (result.data.createTodoItem._id) {
        handleGetSheet(sheet._id);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateTodoItem = async (todoItem) => {
    try {
      const result = await updateTodoItem({
        variables: {
          ...todoItem,
        },
      });
      if (result.data.updateTodoItem._id) {
        handleGetSheet(sheet._id);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteTodoItem = async (id) => {
    try {
      const result = await deleteTodoItem({
        variables: {
          id,
        },
      });
      if (result.data.deleteTodoItem.result) {
        handleGetSheet(sheet._id);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateTodoOptions = async ({ id, ...options }) => {
    try {
      const result = await updateTodoOptions({
        variables: {
          id,
          ...options,
        },
      });
      if (result.data.updateTodoOptions._id) {
        handleGetSheet(sheet._id);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleToggleTodoItemCompleted = async (id) => {
    try {
      const result = await toggleTodoItemCompleted({
        variables: {
          id,
        },
      });
      if (result.data.toggleTodoItemCompleted.result) {
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
    handleCreateTodoItem,
    handleUpdateTodoItem,
    handleDeleteTodoItem,
    handleUpdateTodoOptions,
    handleToggleTodoItemCompleted,
  };
}
