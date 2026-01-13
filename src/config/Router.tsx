import { Routes, Route } from "react-router";
import LandingScreen from "../screens/LandingScreen/LandingScreen";
import ThrowErrorScreen from "../screens/ThrowErrorScreen/ThrowErrorScreen";
import DebounceSearchBar from "../screens/Debouncing/DebounceSearchBar";
import UseReducerHook from "../screens/UseReducerHook/UseReducerHook";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingScreen />} />
      <Route path="/throw-error" element={<ThrowErrorScreen />} />
      <Route path="/debouncing" element={<DebounceSearchBar />} />
      <Route path="/use-reducer-hook" element={<UseReducerHook />}/>
    </Routes>
  );
};

export default Router;
