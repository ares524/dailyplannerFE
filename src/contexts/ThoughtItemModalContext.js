import { createContext, useCallback, useContext, useReducer } from "react";

const ThoughtItemModalContext = createContext();

function thoughtItemModalReducer(state, action) {
  switch (action.type) {
    case "OPEN_THOUGHT_ITEM_MODAL":
      return {
        isOpen: true,
        mode: action.mode,
        thoughtItem: action.thoughtItem || { title: "", actions: [] },
        callback: action.callback,
      };
    case "DISMISS_THOUGHT_ITEM_MODAL":
      return {
        isOpen: false,
      };
    default:
      return state;
  }
}

export const ThoughtItemModalProvider = (props) => {
  const [thoughtItemModal, dispatch] = useReducer(thoughtItemModalReducer, {
    thoughtItemModal: false,
  });
  const value = { thoughtItemModal, dispatch };
  return <ThoughtItemModalContext.Provider value={value} {...props} />;
};

export function useThoughtItemModal() {
  const context = useContext(ThoughtItemModalContext);
  if (!context)
    throw new Error(
      "Please use useThoughtItemModal within ThoughtItemModalProvider"
    );
  const { thoughtItemModal, dispatch } = context;
  const handleDismiss = useCallback(() => {
    dispatch({ type: "DISMISS_THOUGHT_ITEM_MODAL" });
  }, [dispatch]);
  const handleOpen = useCallback(
    (callback, options = { mode: "CREATE" }) => {
      const { mode, thoughtItem } = options;
      dispatch({
        type: "OPEN_THOUGHT_ITEM_MODAL",
        mode,
        thoughtItem,
        callback,
      });
    },
    [dispatch]
  );
  const handleSubmit = (thoughtItem) => {
    console.log(thoughtItem);
    thoughtItemModal.callback(thoughtItem);
    dispatch({ type: "DISMISS_THOUGHT_ITEM_MODAL" });
  };
  return {
    isOpen: thoughtItemModal.isOpen,
    text: thoughtItemModal.text,
    mode: thoughtItemModal.mode,
    thoughtItem: thoughtItemModal.thoughtItem,
    handleDismiss,
    handleOpen,
    handleSubmit,
  };
}
