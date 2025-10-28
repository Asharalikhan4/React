import { Routes, Route } from "react-router";
import LandingScreen from "../screens/LandingScreen/LandingScreen";
import ThrowErrorScreen from "../screens/ThrowErrorScreen/ThrowErrorScreen";
import DebounceSearchBar from "../screens/Debouncing/DebounceSearchBar";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingScreen />} />
      <Route path="/throw-error" element={<ThrowErrorScreen />} />
      <Route path="/debouncing" element={<DebounceSearchBar />} />
    </Routes>
  );
};

export default Router;
