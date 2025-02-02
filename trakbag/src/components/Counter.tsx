// import { useItems } from "../lib/useItems";
import { useItemsStore } from "../stores/itemsStore";

export default function Counter() {
  // const { totalItems, numberOfPackedItems } = useItems();
  const items = useItemsStore((state) => state.items);
  const totalItems = items.length;
  const numberOfPackedItems = items.filter((item) => item.packed).length;
  return (
    <p>
      <b>{numberOfPackedItems}</b> / {totalItems} items packed
    </p>
  );
}
