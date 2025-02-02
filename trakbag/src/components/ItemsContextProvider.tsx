import { createContext, useEffect, useState } from "react";
import { item } from "../lib/constants";

interface Item {
  id: number;
  name: string;
  packed: boolean;
}

interface ItemsContextType {
  items: Item[];
  handleAddNewItem: (name: string) => void;
  handleMarkAllAsPacked: () => void;
  handleMarkAllAsUnpacked: () => void;
  handleRemoveAllItems: () => void;
  handleResetToDefault: () => void;
  handleToggleItem: (id: number) => void;
  handleRemoveItem: (id: number) => void;
  numberOfPackedItems: number;
  totalItems: number;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ItemsContext = createContext<ItemsContextType | undefined>(
  undefined
);

export default function ItemsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const itemsFromLocalStorage = JSON.parse(
    localStorage.getItem("items") || "[]"
  ) as {
    id: number;
    name: string;
    packed: boolean;
  }[];
  const [items, setItems] = useState(itemsFromLocalStorage || item);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const handleAddNewItem = (name: string) => {
    setItems((items) => [
      ...items,
      {
        id: new Date().getTime(),
        name,
        packed: false,
      },
    ]);
  };

  const handleMarkAllAsPacked = () => {
    setItems(items.map((item) => ({ ...item, packed: true })));
  };

  const handleMarkAllAsUnpacked = () => {
    setItems((items) => items.map((item) => ({ ...item, packed: false })));
  };

  const handleRemoveAllItems = () => {
    setItems([]);
  };

  const handleResetToDefault = () => {
    setItems(item);
  };

  const handleToggleItem = (id: number) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const numberOfPackedItems = items.filter((item) => item.packed).length;
  const totalItems = items.length;
  return (
    <ItemsContext.Provider
      value={{
        items,
        handleAddNewItem,
        handleMarkAllAsPacked,
        handleMarkAllAsUnpacked,
        handleRemoveAllItems,
        handleResetToDefault,
        handleToggleItem,
        handleRemoveItem,
        numberOfPackedItems,
        totalItems,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
}
