import { TriangleDownIcon } from "@radix-ui/react-icons";
import BookmarksPopover from "./BookmarksPopover";
import { useRef, useState } from "react";
import { useOnClickOutside } from "../hooks/useOnClickOutside";

export default function BookmarksButton() {
  const [active, setActive] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setActive((prev) => !prev);
  };

  // useEffect(() => {
  //   console.log("active", active);
  //   if (!active) return;

  //   const close = (e: MouseEvent) => {
  //     if (
  //       e.target instanceof HTMLElement &&
  //       !buttonRef.current?.contains(e.target) &&
  //       !popoverRef.current?.contains(e.target)
  //     ) {
  //       setActive(false);
  //     }
  //   };

  //   window.addEventListener("click", (e) => close(e));

  //   return () => {
  //     window.removeEventListener("click", (e) => close(e));
  //   };
  // }, [active]);

  useOnClickOutside([buttonRef, popoverRef], () => setActive(false));

  return (
    <section>
      <button className="bookmarks-btn" onClick={handleClick} ref={buttonRef}>
        Bookmarks <TriangleDownIcon />
      </button>
      {active && <BookmarksPopover ref={popoverRef} />}
    </section>
  );
}
