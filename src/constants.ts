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
    name: "Deboucing",
    path: "/deboucing"
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
  }
];