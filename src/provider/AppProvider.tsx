import { ReactNode, useState } from "react";
import { AppContext } from "../context/AppContext";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  
  return (
    <AppContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};
