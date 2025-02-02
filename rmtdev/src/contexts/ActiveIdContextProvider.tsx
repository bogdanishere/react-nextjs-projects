import { createContext, useEffect, useState } from "react";

type ActiveIdContextType = {
  activeId: number | null;
};

export const ActiveIdContext = createContext<ActiveIdContextType | null>(null);

export default function ActiveIdContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = window.location.hash.slice(1);
      setActiveId(+id);
    };

    handleHashChange(); // Initial call if there is a hash in the URL

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
  return (
    <ActiveIdContext.Provider value={{ activeId }}>
      {children}
    </ActiveIdContext.Provider>
  );
}
