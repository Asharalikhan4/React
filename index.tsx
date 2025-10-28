import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import ErrorBoundary from "./src/config/ErrorBoundary";
import App from "./App";

const container = document.getElementById("app");
const root = createRoot(container);
root.render(
  <ErrorBoundary>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ErrorBoundary>,
);
