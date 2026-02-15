
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Item, items as seedItems } from '../data/seedItems';

interface ItemsContextType {
    items: Item[];
    addItem: (item: Omit<Item, 'id'>) => void;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export function ItemsProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<Item[]>(seedItems);

    const addItem = (newItem: Omit<Item, 'id'>) => {
        const item: Item = {
            ...newItem,
            id: Date.now().toString(),
        };
        setItems((prev) => [item, ...prev]);
    };

    return (
        <ItemsContext.Provider value={{ items, addItem }}>
            {children}
        </ItemsContext.Provider>
    );
}

export function useItems() {
    const context = useContext(ItemsContext);
    if (context === undefined) {
        throw new Error('useItems must be used within an ItemsProvider');
    }
    return context;
}
