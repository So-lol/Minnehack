import React, { createContext, ReactNode, useContext, useReducer } from "react";
import { Item, MOCK_ITEMS } from "../constants/mockData";

type State = {
    items: Item[];
};

type Action = {
    type: "UPDATE_ITEM";
    payload: {
        id: string;
        patch: Partial<Item>;
    };
};

const ItemsContext = createContext<{
    state: State;
    updateItem: (id: string, patch: Partial<Item>) => void;
} | null>(null);

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "UPDATE_ITEM":
            return {
                ...state,
                items: state.items.map((item) =>
                    item.id === action.payload.id ? { ...item, ...action.payload.patch } : item
                ),
            };
        default:
            return state;
    }
};

export const ItemsProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, { items: MOCK_ITEMS });

    const updateItem = (id: string, patch: Partial<Item>) => {
        dispatch({ type: "UPDATE_ITEM", payload: { id, patch } });
    };

    return (
        <ItemsContext.Provider value={{ state, updateItem }}>
            {children}
        </ItemsContext.Provider>
    );
};

export const useItems = () => {
    const context = useContext(ItemsContext);
    if (!context) {
        throw new Error("useItems must be used within an ItemsProvider");
    }
    return context;
};
