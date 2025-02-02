import { useEffect } from "react";

export const useOnClickOutside = (
  refs: React.RefObject<HTMLElement>[],
  handler: () => void
) => {
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        refs.every((ref) => !ref.current?.contains(e.target as Node))
      ) {
        handler();
      }
    };

    window.addEventListener("click", (e) => close(e));

    return () => {
      window.removeEventListener("click", (e) => close(e));
    };
  }, [refs, handler]);
};
