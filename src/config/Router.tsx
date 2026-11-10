import { Routes, Route, Navigate, useParams } from "react-router";
import AppLayout from "../components/Layout/AppLayout";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import TopicViewer from "../screens/TopicViewer/TopicViewer";
import ThrowErrorScreen from "../screens/ThrowErrorScreen/ThrowErrorScreen";
import Error404Screen from "../screens/Error404Screen/Error404Screen";

// Helper component for legacy redirect
const LegacyTopicRedirect = () => {
  const { slug } = useParams();
  return <Navigate to={`/topic/${slug}`} replace />;
};

const Router = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* Main Hub Dashboard */}
        <Route path="/" element={<HomeScreen />} />

        {/* Dynamic Topic Route (Handles both articles and interactive demos) */}
        <Route path="/topic/:slug" element={<TopicViewer />} />

        {/* Backward Compatibility for legacy paths */}
        <Route path="/low-level-design-and-machine-coding/:slug" element={<LegacyTopicRedirect />} />
        <Route path="/react-hooks/:slug" element={<LegacyTopicRedirect />} />
        <Route path="/abhibus/editable-todo-list" element={<Navigate to="/topic/editable-todo-list" replace />} />
        <Route path="/zampAi/nested-comments" element={<Navigate to="/topic/nested-comments" replace />} />
        <Route path="/thoughtspot/use-memo-polyfill" element={<Navigate to="/topic/use-memo-polyfill" replace />} />
        <Route path="/use-debounce-hook" element={<Navigate to="/topic/use-debounce-hook" replace />} />
        <Route path="/use-reducer-hook" element={<Navigate to="/topic/use-reducer-hook" replace />} />
        <Route path="/use-previous-hook" element={<Navigate to="/topic/use-previous-hook" replace />} />
        <Route path="/use-async-hook" element={<Navigate to="/topic/use-async-hook" replace />} />
        <Route path="/use-state-hook" element={<Navigate to="/topic/use-state-hook" replace />} />
        <Route path="/use-effect-hook" element={<Navigate to="/topic/use-effect-hook" replace />} />
        <Route path="/use-memo-hook" element={<Navigate to="/topic/use-memo-hook" replace />} />
        <Route path="/use-ref-hook" element={<Navigate to="/topic/use-ref-hook" replace />} />
        <Route path="/lazy-loading" element={<Navigate to="/topic/lazy-loading" replace />} />
        <Route path="/memo-api" element={<Navigate to="/topic/react-memo-api" replace />} />
        <Route path="/throttling" element={<Navigate to="/topic/throttling-demo" replace />} />
        <Route path="/useIdleHook" element={<Navigate to="/topic/use-idle-hook" replace />} />
        <Route path="/search-with-autocomplete" element={<Navigate to="/topic/search-with-autocomplete" replace />} />

        {/* Utility / Error testing screens */}
        <Route path="/throw-error" element={<ThrowErrorScreen />} />

        {/* 404 Fallback */}
        <Route path="*" element={<Error404Screen />} />
      </Route>
    </Routes>
  );
};

export default Router;
