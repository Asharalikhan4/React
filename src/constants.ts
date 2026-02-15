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
  }
];