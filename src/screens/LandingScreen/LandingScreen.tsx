import { NavLink } from "react-router";

const LandingScreen = () => {
  return (
    <div>
      <div className="text-xl font-bold">This is Landing Screen, Below down are all the links for different pages</div>
      <div className="mt-2 italic flex flex-col gap-1">
        <NavLink to="/throw-error" className="hover:underline hover:text-blue-600">Throw Error Screen</NavLink>
        <NavLink to="/debouncing" className="hover:underline hover:text-blue-600">Deboucing</NavLink>
        <NavLink to="/use-reducer-hook" className="hover:underline hover:text-blue-600">Use Reducer Hook</NavLink>
      </div>
    </div>
  )
};


export default LandingScreen;