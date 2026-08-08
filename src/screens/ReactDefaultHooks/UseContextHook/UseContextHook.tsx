import { createContext } from "react";

export type AppContextType = {
  theme: "light" | "dark"
  toggleTheme: () => void;
};

export const AppContext = createContext<AppContextType | null>(null);

const UseContextHook = () => {
  return (
    <div></div>
  );
};

export default UseContextHook;