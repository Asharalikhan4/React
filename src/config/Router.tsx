import { Routes, Route } from "react-router";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import ThrowErrorScreen from "../screens/ThrowErrorScreen/ThrowErrorScreen";
import DebounceSearchBar from "../screens/Debouncing/DebounceSearchBar";
import UseReducerHook from "../screens/UseReducerHook/UseReducerHook";
import UsePreviousHook from "../screens/UsePreviousHook/UsePreviousHook";
import UseAsyncHook from "../screens/Hooks/UseAsyncHook/UseAsyncHook";
import UseStateHook from "../screens/ReactDefaultHooks/UseStateHook/UseStateHook";
import UseEffectHook from "../screens/ReactDefaultHooks/UseEffectHook/UseEffectHook";
import UseMemoHook from "../screens/ReactDefaultHooks/UseMemoHook/UseMemoHook";
import MemoApi from "../screens/ReactDefaultApi's/MemoApi/MemoApi";
import Throttling from "../screens/Throttling/Throttling";
import UseRefHook from "../screens/ReactDefaultHooks/UseRefHook/UseRefHook";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/throw-error" element={<ThrowErrorScreen />} />
      <Route path="/debouncing" element={<DebounceSearchBar />} />
      <Route path="/use-reducer-hook" element={<UseReducerHook />} />
      <Route path="/use-previous-hook" element={<UsePreviousHook />} />
      <Route path="/use-async-hook" element={<UseAsyncHook />} />
      <Route path="/use-state-hook" element={<UseStateHook />} />
      <Route path="/use-effect-hook" element={<UseEffectHook />} />
      <Route path="/use-memo-hook" element={<UseMemoHook />} />
      <Route path="/memo-api" element={<MemoApi />} />
      <Route path="/throttling" element={<Throttling />} />
      <Route path="/use-ref-hook" element={<UseRefHook />} />
    </Routes>
  );
};

export default Router;
