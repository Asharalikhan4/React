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
import SwitchCaseComponent from "../LowLevelDesignAndMachineCoding/SwitchCaseComponent/SwitchCaseComponent";
import TwoStepLoginForm from "../LowLevelDesignAndMachineCoding/TwoStepLoginForm/TwoStepLoginForm";
import TodoList from "../LowLevelDesignAndMachineCoding/ToDoList/ToDoList";
import SearchWithPagingation from "../LowLevelDesignAndMachineCoding/SearchWithPagination/SearchWithPagination";
import InfiniteScrollInReact from "../LowLevelDesignAndMachineCoding/InfiniteScrollInReact/InfiniteScrollInReact";
import ResponsiveSlideshow from "../LowLevelDesignAndMachineCoding/ResponsiveSlideshow/ResponsiveSlideshow";
import EditableToDoList from "../LowLevelDesignAndMachineCoding/EditableToDoList/EditableToDoList";
import CreateNestedCommentsInReact from "../LowLevelDesignAndMachineCoding/CreateNestedCommentsInReact/CreateNestedCommentsInReact";
import UseMemoHookPolyfill from "../screens/useMemoHookPolyfill/useMemoHookPolyfill";
import MultiStepperComponent from "../LowLevelDesignAndMachineCoding/MultiStepperComponent/MultiStepperComponent";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/throw-error" element={<ThrowErrorScreen />} />
      <Route path="/react-hooks/use-debounce-hook" element={<DebounceSearchBar />} />
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
      <Route
        path="low-level-design-and-machine-coding/multi-stepper-component"
        element={<MultiStepperComponent />}
      />
      <Route path="/low-level-design-and-machine-coding/switch-case-component"
        element={<SwitchCaseComponent />} />
      <Route path="/low-level-design-and-machine-coding/two-step-login-form"
        element={<TwoStepLoginForm />} />
      <Route path="/low-level-design-and-machine-coding/todo-list"
        element={<TodoList />} />
      <Route path="/low-level-design-and-machine-coding/search-with-pagination" element={<SearchWithPagingation />} />
      <Route path="/low-level-design-and-machine-coding/infinite-scroll-in-react" element={<InfiniteScrollInReact />} />
      <Route path="/low-level-design-and-machine-coding/responsive-slideshow" element={<ResponsiveSlideshow />} />
      <Route path="/abhibus/editable-todo-list" element={<EditableToDoList />} />
      <Route path="/zampAi/nested-comments" element={<CreateNestedCommentsInReact />} />
      <Route path="/thoughtspot/use-memo-polyfill" element={<UseMemoHookPolyfill />} />
    </Routes>
  );
};

export default Router;
