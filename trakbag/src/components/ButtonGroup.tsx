// import { useItems } from "../lib/useItems";
import { useItemsStore } from "../stores/itemsStore";
import Button from "./Button";

export default function ButtonGroup() {
  // const {
  //   handleMarkAllAsPacked,
  //   handleMarkAllAsUnpacked,
  //   handleResetToDefault,
  //   handleRemoveAllItems,
  // } = useItems();

  const handleMarkAllAsPacked = useItemsStore(
    (state) => state.handleMarkAllAsPacked
  );
  const handleMarkAllAsUnpacked = useItemsStore(
    (state) => state.handleMarkAllAsUnpacked
  );
  const handleResetToDefault = useItemsStore(
    (state) => state.handleResetToDefault
  );
  const handleRemoveAllItems = useItemsStore(
    (state) => state.handleRemoveAllItems
  );

  const buttonGroups = [
    {
      text: "Mark all as complete",
      onClick: handleMarkAllAsPacked,
    },
    {
      text: "Mark all as incomplete",
      onClick: handleMarkAllAsUnpacked,
    },
    {
      text: "Reset to initial",
      onClick: handleResetToDefault,
    },
    {
      text: "Remove all items",
      onClick: handleRemoveAllItems,
    },
  ];
  return (
    <section className="button-group">
      {buttonGroups.map((button, index) => (
        <Button
          key={index + button.text}
          type="secondary"
          onClick={button.onClick}
        >
          {button.text}
        </Button>
      ))}
    </section>
  );
}
