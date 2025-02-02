import { useMemo, useState } from "react";
import Select from "react-select";
import { useItemsStore } from "../stores/itemsStore";
// import { useItems } from "../lib/useItems";

export default function ItemList() {
  // const { items } = useItems();
  const items = useItemsStore((state) => state.items);
  const [sortBy, setSortBy] = useState("default");

  const sortedItems = useMemo(
    () =>
      [...items].sort((a, b) => {
        if (sortBy === "packed") {
          return Number(b.packed) - Number(a.packed);
        }

        if (sortBy === "unpacked") {
          return Number(a.packed) - Number(b.packed);
        }
        return 0;
      }),
    [items, sortBy]
  );

  const options = [
    { value: "default", label: "Sort by default" },
    { value: "packed", label: "Sort by packed" },
    { value: "unpacked", label: "Sort by unpacked" },
  ];
  return (
    <ul className="item-list">
      {items.length === 0 && <EmptyView />}
      {items.length > 0 && (
        <section className="sorting">
          <Select
            options={options}
            defaultValue={options[0]}
            onChange={(option) => option && setSortBy(option.value)}
          />
        </section>
      )}
      {sortedItems.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </ul>
  );
}

interface ItemProps {
  item: {
    id: number;
    name: string;
    packed: boolean;
  };
}

function Item({ item }: ItemProps) {
  // const { handleToggleItem, handleRemoveItem } = useItems();
  const handleToggleItem = useItemsStore((state) => state.handleToggleItem);
  const handleRemoveItem = useItemsStore((state) => state.handleRemoveItem);
  return (
    <li className="item">
      <label>
        <input
          type="checkbox"
          checked={item.packed}
          onChange={() => handleToggleItem(item.id)}
        />
        {item.name}
      </label>
      <button onClick={() => handleRemoveItem(item.id)}>❌</button>
    </li>
  );
}

function EmptyView() {
  return (
    <section className="empty-state">
      <h3>Empty Packing List</h3>
      <p>Start by adding some items you absolutely don&apos;t want to forget</p>
    </section>
  );
}
