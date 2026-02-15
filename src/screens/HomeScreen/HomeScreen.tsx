import { NavLink } from "react-router";
import { routes } from "../../constants";
import { FaSun, FaMoon } from "react-icons/fa";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const HomeScreen = () => {
  const { theme, toggleTheme } = useContext(AppContext);
  
  console.log("theme", theme)
  
  return (
    <div className="p-2">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold">
          This is Landing Screen, Below down are all the links for different
          pages
        </div>
        <div onClick={toggleTheme} className="cursor-pointer">
          {theme === "light" ? <FaSun size={22} /> : <FaMoon size={22} />}
        </div>
      </div>
      <div className="mt-2 italic flex flex-col gap-1">
        {routes.map((route) => (
          <NavLink
            key={route.id}
            to={route.path}
            className="hover:underline hover:text-blue-600"
          >
            {route.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
