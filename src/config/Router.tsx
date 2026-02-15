import { Routes, Route } from "react-router";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import ThrowErrorScreen from "../screens/ThrowErrorScreen/ThrowErrorScreen";
import DebounceSearchBar from "../screens/Debouncing/DebounceSearchBar";
import UseReducerHook from "../screens/UseReducerHook/UseReducerHook";
import UseRefHook from "../screens/UseRefHook/UseRefHook";
import UsePreviousHook from "../screens/UsePreviousHook/UsePreviousHook";
import UseAsyncHook from "../screens/Hooks/UseAsyncHook/UseAsyncHook";
import UseStateHook from "../screens/ReactDefaultHooks/UseStateHook/UseStateHook";
import UseEffectHook from "../screens/ReactDefaultHooks/UseEffectHook/UseEffectHook";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/throw-error" element={<ThrowErrorScreen />} />
      <Route path="/debouncing" element={<DebounceSearchBar />} />
      <Route path="/use-reducer-hook" element={<UseReducerHook />} />
      <Route path="/use-ref-hook" element={<UseRefHook />} />
      <Route path="/use-previous-hook" element={<UsePreviousHook />} />
      <Route path="/use-async-hook" element={<UseAsyncHook />} />
      <Route path="/use-state-hook" element={<UseStateHook />} />
      <Route path="/use-effect-hook" element={<UseEffectHook />} />
    </Routes>
  );
};

export default Router;
