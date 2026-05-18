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

export const routes = [
  {
    id: 1,
    name: "Throw Error Screen",
    path: "/throw-error"
  },
  {
    id: 2,
    name: "Debouncing",
    path: "/debouncing"
  },
  {
    id: 3,
    name: "useReducer Hook",
    path: "/use-reducer-hook"
  },
  {
    id: 4,
    name: "useRef Hook",
    path: "/use-ref-hook"
  },
  {
    id: 5,
    name: "usePrevious Hook",
    path: "/use-previous-hook"
  },
  {
    id: 6,
    name: "useAsync Hook",
    path: "use-async-hook"
  },
  {
    id: 7,
    name: "useState Hook",
    path: "use-state-hook"
  },
  {
    id: 8,
    name: "useEffect Hook",
    path: "use-effect-hook"
  },
  {
    id: 9,
    name: "useMemo Hook",
    path: "use-memo-hook"
  },
  {
    id: 10,
    name: "Memo Api",
    path: "memo-api"
  },
  {
    id: 11,
    name: "Throttling",
    path: "throttling"
  },
  {
    id: 12,
    name: "Lazy Loading",
    path: "lazy-loading"
  },
  {
    id: 13,
    name: "useIdle Hook",
    path: "useIdleHook"
  },
  {
    id: 14,
    name: "Search With AutoComplete",
    path: "search-with-autocomplete"
  },
  {
    id: 15,
    name: "State Management",
    path: ""
  }
];


export const routesData = [
  {
    id: 1, 
    name: "Low-Level Design & Machine Coding",
    path: "/low-level-design-and-machine-coding",
    children: [
      {
        id: 1,
        name: "Implement Feature Flag Component in React",
        path: "implement-feature-flag-component-in-react"
      },
      {
        id: 4,
        name: "Switch-Case component in React",
        path: "switch-case-component-in-react"
      },
      {
        id: 5,
        name: "Create A Nested Checkbox Tree Component",
        path: "create-a-nested-checkbox-tree-component"
      },
      {
        id: 5,
        name: "Two Step Login Form",
        path: "two-step-login-form"
      },
      {
        id: 6,
        name: "ToDo List",
        path: "todo-list"
      }
    ]
  }
]