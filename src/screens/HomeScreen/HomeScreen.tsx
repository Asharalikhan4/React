import { NavLink } from "react-router";
import { routes, routesData } from "../../constants";
import { FaSun, FaMoon } from "react-icons/fa";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const HomeScreen = () => {
  // const { theme, toggleTheme } = useContext(AppContext);

  // console.log("theme", theme)

  type RouteNode = {
    id: number | string;
    name: string;
    path: string;
    children?: RouteNode[];
  };

  const trimSlashes = (value: string) => value.replace(/^\/+|\/+$/g, "");

  const buildPath = (parentPath: string, currentPath: string) => {
    const parent = trimSlashes(parentPath);
    const current = trimSlashes(currentPath);

    if (!parent && !current) {
      return "/";
    }
    if (!parent) {
      return `/${current}`;
    }
    if (!current) {
      return `/${parent}`;
    }
    return `/${parent}/${current}`;
  };

  const renderRouteTree = (nodes: RouteNode[], parentPath = "", depth = 0) => (
    <ul className={`${depth === 0 ? "mt-4" : "mt-1"} space-y-1`}>
      {nodes.map((node, index) => {
        const fullPath = buildPath(parentPath, node.path);
        const hasChildren = Boolean(node.children?.length);

        return (
          <li
            key={`${fullPath}-${node.id}-${index}`}
            style={{ paddingLeft: depth * 16 }}
            className="flex flex-col"
          >
            <NavLink
              to={fullPath}
              className="text-sm font-medium text-slate-700 hover:text-blue-600 hover:underline"
            >
              {node.name}
            </NavLink>
            {hasChildren
              ? renderRouteTree(node.children!, fullPath, depth + 1)
              : null}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="p-2">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold">
          This is Landing Screen, Below down are all the links for different
          pages
        </div>
        {/*<div onClick={toggleTheme} className="cursor-pointer">
          {theme === "light" ? <FaSun size={22} /> : <FaMoon size={22} />}
        </div>*/}
      </div>
      {/*<div className="mt-2 italic flex flex-col gap-1">
        {routes.map((route) => (
          <NavLink
            key={route.id}
            to={route.path}
            className="hover:underline hover:text-blue-600"
          >
            {route.name}
          </NavLink>
        ))}
      </div>*/}
      <div className="mt-6">
        {renderRouteTree(routesData)}
      </div>
    </div>
  );
};

export default HomeScreen;
