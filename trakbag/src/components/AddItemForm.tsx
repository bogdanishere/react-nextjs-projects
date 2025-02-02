import { useRef, useState } from "react";
import Button from "./Button";
import { useItemsStore } from "../stores/itemsStore";
// import { useItems } from "../lib/useItems";

export default function AddItemForm() {
  // const { handleAddNewItem } = useItems();

  const handleAddNewItem = useItemsStore((state) => state.handleAddNewItem);
  const inputRef = useRef<HTMLInputElement>(null);
  const [itemText, setItemText] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!itemText.trim()) {
      inputRef.current?.focus();
      inputRef.current?.style.setProperty("border", "1px solid red");
      return;
    }
    handleAddNewItem(itemText);
    setItemText("");
    inputRef.current?.style.setProperty("border", "1px solid #ccc");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add an item</h2>
      <input
        ref={inputRef}
        type="text"
        autoFocus
        value={itemText}
        onChange={(e) => setItemText(e.target.value)}
        placeholder="Add item"
      />
      <Button type="submit">Add to list</Button>
    </form>
  );
}
