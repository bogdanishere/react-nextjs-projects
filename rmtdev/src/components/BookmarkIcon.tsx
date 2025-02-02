import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarks } from "../hooks/useBookmarks";

type BookmarkIconProps = {
  id: number;
};

export default function BookmarkIcon({ id }: BookmarkIconProps) {
  const { bookmarkedIds, handleToggleBookmark } = useBookmarks();

  return (
    <button
      className="bookmark-btn"
      onClick={(e) => {
        handleToggleBookmark(id);
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <BookmarkFilledIcon
        className={bookmarkedIds.includes(id) ? "filled" : ""}
      />
    </button>
  );
}
