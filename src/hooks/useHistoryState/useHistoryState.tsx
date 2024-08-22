import { useCallback, useReducer, useRef } from "react";

const initialState = {
  past: [],
  present: null,
  future: [],
};

type UndoAction = {
  type: "UNDO";
};

type RedoAction = {
  type: "REDO";
};

type SetAction = {
  type: "SET";
  newPresent: unknown;
};

type ClearAction = {
  type: "CLEAR";
  initialPresent: unknown;
};

type HistoryAction = UndoAction | RedoAction | SetAction | ClearAction;

type HistoryState = {
  past: unknown[];
  future: unknown[];
  present: unknown;
};

const reducer = (state: HistoryState, action: HistoryAction) => {
  const { past, present, future } = state;

  if (action.type === "UNDO") {
    return {
      past: past.slice(0, past.length - 1),
      present: past[past.length - 1],
      future: [present, ...future],
    };
  } else if (action.type === "REDO") {
    return {
      past: [...past, present],
      present: future[0],
      future: future.slice(1),
    };
  } else if (action.type === "SET") {
    const { newPresent } = action;

    if (action.newPresent === present) {
      return state;
    }

    return {
      past: [...past, present],
      present: newPresent,
      future: [],
    };
  } else if (action.type === "CLEAR") {
    return {
      ...initialState,
      present: action.initialPresent,
    };
  } else {
    throw new Error("Unsupported action type");
  }
};

export default function useHistoryState(initialPresent = {}) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    present: initialPresent,
  });

  const initialPresentRef = useRef(initialPresent);

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => {
    if (canUndo) {
      dispatch({ type: "UNDO" });
    }
  }, [canUndo]);

  const redo = useCallback(() => {
    if (canRedo) {
      dispatch({ type: "REDO" });
    }
  }, [canRedo]);

  const set = useCallback((newPresent: unknown) => {
    dispatch({ type: "SET", newPresent });
  }, []);

  const clear = useCallback(() => {
    dispatch({ type: "CLEAR", initialPresent: initialPresentRef.current });
  }, []);

  return {
    state: state.present,
    canUndo: canUndo,
    canRedo: canRedo,
    set: set,
    undo: undo,
    redo: redo,
    clear: clear,
  };
}
