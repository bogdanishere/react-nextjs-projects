import { create } from "zustand";
import { persist } from "zustand/middleware";
import { item } from "../lib/constants";

interface ItemProps {
  id: number;
  name: string;
  packed: boolean;
}

interface StateProps {
  items: ItemProps[];
}

interface ActionsProps {
  handleRemoveAllItems: () => void;
  handleResetToDefault: () => void;
  handleMarkAllAsPacked: () => void;
  handleMarkAllAsUnpacked: () => void;
  handleAddNewItem: (name: string) => void;
  handleToggleItem: (id: number) => void;
  handleRemoveItem: (id: number) => void;
}

export const useItemsStore = create<StateProps & ActionsProps>()(
  persist(
    (set) => ({
      items: item,
      handleRemoveAllItems: () => {
        set(() => ({
          items: [],
        }));
      },
      handleResetToDefault: () => {
        set(() => ({
          items: item,
        }));
      },
      handleMarkAllAsPacked: () => {
        set((state) => ({
          items: state.items.map((item) => ({ ...item, packed: true })),
        }));
      },
      handleMarkAllAsUnpacked: () => {
        set((state) => ({
          items: state.items.map((item) => ({ ...item, packed: false })),
        }));
      },
      handleAddNewItem: (name: string) => {
        set((state) => ({
          items: [
            ...state.items,
            {
              id: new Date().getTime(),
              name,
              packed: false,
            },
          ],
        }));
      },
      handleToggleItem: (id: number) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, packed: !item.packed } : item
          ),
        }));
      },
      handleRemoveItem: (id: number) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
    }),
    {
      name: "items",
    }
  )
);
