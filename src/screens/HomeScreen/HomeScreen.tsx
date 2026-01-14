import { NavLink } from "react-router";
import { routes } from "../../constants";

const HomeScreen = () => {
  return (
    <div className="p-2">
      <div className="text-xl font-bold">This is Landing Screen, Below down are all the links for different pages</div>
      <div className="mt-2 italic flex flex-col gap-1">
        {
          routes.map((route) => (
            <NavLink key={route.id} to={route.path} className="hover:underline hover:text-blue-600">{route.name}</NavLink>
          ))
        }
      </div>
    </div>
  )
};


export default HomeScreen;