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
import LazyLoading from "../screens/LazyLoadingScreen/LazyLoading";
import EventBubblingAndCapturingAkaTrickling from "../screens/Event Bubbling, Capturing aka Trickling in Javascript/Event Bubbling, Capturing aka Trickling in Javascript";
import UseIdleHook from "../screens/UseIdleHook/UseIdleHook";
import SearchWithAutoComplete from "../screens/SearchWithAutoComplete";
import CookiesSessionLocalStorageIndexdb from "../screens/StateManagement/CookiesSessionLocalStorageIndexdb";
import LocalStorage from "../screens/StateManagement/LocalStorage";
import SessionStorage from "../screens/StateManagement/SessionStorage";
import IndexDB from "../screens/StateManagement/IndexDB";
import CreateANestedCheckboxTreeComponent from "../LowLevelDesignAndMachineCoding/CreateANestedCheckboxTreeComponent";
import ImplementFeatureFlagComponentInReact from "../LowLevelDesignAndMachineCoding/ImplementFeatureFlagComponentInReact/ImplementFeatureFlagComponentInReact";
import FeatureFlagProvider from "../LowLevelDesignAndMachineCoding/ImplementFeatureFlagComponentInReact/FeatureFlagContext";
import SwitchCaseComponentInReact from "../LowLevelDesignAndMachineCoding/SwitchCaseComponentInReact/SwitchCaseComponentInReact";
import TwoStepLoginForm from "../LowLevelDesignAndMachineCoding/TwoStepLoginForm/TwoStepLoginForm";

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
      <Route path="/lazy-loading" element={<LazyLoading />} />
      <Route
        path="EventBubblingAndCapturingAkaTrickling"
        element={<EventBubblingAndCapturingAkaTrickling />}
      />
      <Route path="/useIdleHook" element={<UseIdleHook />} />
      <Route
        path="/search-with-autocomplete"
        element={<SearchWithAutoComplete />}
      />
      <Route
        path="/state-management/cookies-session-local-storage-indexdb"
        element={<IndexDB />}
      />
      <Route
        path="/low-level-design-and-machine-coding/create-a-nested-checkbox-tree-component"
        element={<CreateANestedCheckboxTreeComponent />}
      />
      <Route
        path="low-level-design-and-machine-coding/implement-feature-flag-component-in-react"
        element={<FeatureFlagProvider><ImplementFeatureFlagComponentInReact /></FeatureFlagProvider>}
      />
      <Route path="/low-level-design-and-machine-coding/switch-case-component-in-react"
        element={<SwitchCaseComponentInReact />} />
      <Route path="/low-level-design-and-machine-coding/two-step-login-form"
        element={<TwoStepLoginForm />} />
    </Routes>
  );
};

export default Router;
