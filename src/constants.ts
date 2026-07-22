export const useReducerNestedInitialState = {
  profile: { username: "Coder2026", email: "dev@example.com" },
  settings: {
    notifications: { email: true, sms: false },
    theme: "light",
  },
};

export const useReducerLinearInitialState = {
  name: "Ashar",
  number: "1234567890",
  email: "contactashar4@gmail.com",
  address: "test address"
};


export const routesData = [
  {
    id: 1,
    name: "React Hooks",
    path: "/react-hooks",
    children: [
      {
        id: 1,
        name: "useDebounce() hook",
        path: "use-debounce-hook"
      }
    ]
  },
  {
    id: 2,
    name: "Low-Level Design & Machine Coding",
    path: "/low-level-design-and-machine-coding",
    children: [
      {
        id: 1,
        name: "Implement Feature Flag Component in React",
        path: "implement-feature-flag-component-in-react"
      },
      {
        id: 2,
        name: "Implement Multi Stepper Component",
        path: "multi-stepper-component"
      },
      {
        id: 4,
        name: "Switch-Case component",
        path: "switch-case-component"
      },
      {
        id: 5,
        name: "Infinite Scroll In React",
        path: "infinite-scroll-in-react"
      },
      {
        id: 6,
        name: "Two Step Login Form",
        path: "two-step-login-form"
      },
      {
        id: 5,
        name: "Create A Nested Checkbox Tree Component",
        path: "create-a-nested-checkbox-tree-component"
      },
      {
        id: 6,
        name: "ToDo List",
        path: "todo-list"
      },
      {
        id: 7,
        name: "Search With Pagination",
        path: "/search-with-pagination"
      },
      {
        id: 9,
        name: "Responsive Slide Show",
        path: "responsive-slideshow"
      },
      {
        id: 12,
        name: "Functional Modal Component",
        path: "functional-modal-component"
      }
    ]
  },
  {
    id: 3,
    name: "Abhibus - SDE2",
    path: "/abhibus",
    children: [
      {
        id: 1,
        name: "Editable ToDo List",
        path: "editable-todo-list"
      }
    ]
  },
  {
    id: 4,
    name: "Zamp.ai",
    path: "/zampai",
    children: [
      {
        id: 1,
        name: "Nested Comments",
        path: "nested-comments"
      }
    ]
  },
  {
    id: 5,
    name: "ThoughtSpot",
    path: "/thoughtspot",
    children: [
      {
        id: 1,
        name: "useMemo() Hook Polyfill",
        path: "use-memo-polyfill"
      }
    ]
  }
];

export const TODOS_API_URL = "https://jsonplaceholder.typicode.com/todos";

export const BEERS_API_URL = ""