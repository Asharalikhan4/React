/*
useReducer() Hook ->

- The useReducer hook is a React state management hook used as an alternative to useState, specifically designed for handling complex state logic. It centralizes state updates into a single function called a reducer, making state transitions more predictable and easier to debug.

- Core Concepts
The hook relies on four main building blocks:
1. State: The current data or value stored in your component.
2. Action: An object that describes what happened (e.g., { type: 'increment' }). It typically includes a type and an optional payload with data.
3. Reducer Function: A pure function that takes the current state and an action, then returns a new state.
4. Dispatch Function: A function you call to send an action to the reducer, triggering a state update.

Syntax
const [state, dispatch] = useReducer(reducer, initialState);

reducer: The function containing your update logic.
initialState: The value your state starts with.
state: The current state value.
dispatch: The function used to trigger updates.

When to Use it
- Complex State: When you have multiple related state variables (e.g., a form with many fields).
- Interdependent Logic: When the next state depends on the previous state or other state variables.
- Predictability: When you want to separate "what happened" (actions) from "how the state changes" (reducer logic).

Comparison: /useState vs. /useReducer
Feature 	/useState	/useReducer
Logic Placement	/Inside event handlers	/Centralized in a reducer function
Readability	/Best for simple updates	/Best for complex, multi-step updates
Debugging	/Harder to trace many separate setters	/Easier to log and trace specific actions
Testing	/Coupled to component rendering	/Reducer can be tested independently as a pure function
*/

import { useReducer } from "react";
import {
  useReducerLinearInitialState,
  useReducerNestedInitialState,
} from "../../constants";

const UseReducerHook = () => {
  function reducer(state, action) {
    switch (action.type) {
      case "SET_USERNAME":
        return {
          ...state,
          profile: { ...state.profile, username: action.payload },
        };
      case "SET_EMAIL":
        return {
          ...state,
          profile: {
            ...state.profile,
            email: action.payload,
          },
        };
      case "UPDATE_NOTIFICATION":
        return {
          ...state,
          settings: {
            ...state.settings,
            notifications: {
              ...state.settings.notifications,
              [action.field]: action.payload,
            },
          },
        };
      default:
        return state;
    }
  }

  function linearReducer(state, action) {
    switch (action.type) {
      case "UPDATE_FIELD":
        return {
          ...state,
          [action.field]: action.payload,
        };
      case "RESET_FORM":
        return useReducerLinearInitialState;
      default:
        return state;
    }
  }

  const handleChange = (e) => {
    linearDispatch({
      type: "UPDATE_FIELD",
      field: e.target.name, // Matches the key in the state object
      value: e.target.value,
    });
  };

  const [state, dispatch] = useReducer(reducer, useReducerNestedInitialState);
  const [linearState, linearDispatch] = useReducer(
    linearReducer,
    useReducerLinearInitialState,
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-lg border border-gray-200 p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          UseReducerHook
        </h1>
        <div className="space-y-2">
          <h4 className="text-2xl font-semibold text-gray-800 text-center">
            Account Settings ( Nested State )
          </h4>

          {/* Username */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={state.profile.username}
              onChange={(e) =>
                dispatch({ type: "SET_USERNAME", payload: e.target.value })
              }
              placeholder="Enter username"
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={state.profile.email}
              onChange={(e) =>
                dispatch({ type: "SET_EMAIL", payload: e.target.value })
              }
              placeholder="Enter email"
            />
          </div>

          {/* Notifications */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600
                          focus:ring-indigo-500"
              checked={state.settings.notifications.sms}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_NOTIFICATION",
                  field: "sms",
                  payload: e.target.checked,
                })
              }
            />
            <span className="text-sm text-gray-700">Enable SMS Alerts</span>
          </div>

          {/* Preview */}
          <div className="rounded-lg bg-gray-50 border border-gray-200 p-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Current State Preview
            </p>
            <pre className="text-xs text-gray-800 overflow-x-auto">
              {JSON.stringify(state, null, 2)}
            </pre>
          </div>
        </div>

        {/* Linear */}
        <div className="space-y-2">
          <h4 className="text-2xl font-semibold text-gray-800 text-center">
            Profile ( Linear State )
          </h4>

          {/* Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              name="name"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={linearState.name}
              onChange={handleChange}
              placeholder="Enter name"
            />
          </div>

          {/* Number */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Number</label>
            <input
              name="number"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={linearState.number}
              onChange={handleChange
              }
              placeholder="Enter Number"
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              name="email"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={linearState.email}
              onChange={handleChange
              }
              placeholder="Enter email"
            />
          </div>

          {/* Address */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Address</label>
            <input
              name="address"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={linearState.address}
              onChange={handleChange}
              placeholder="Enter address"
            />
          </div>

          <div className="rounded-lg bg-gray-50 border border-gray-200 p-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Linear State Preview
            </p>
            <pre className="text-xs text-gray-800 overflow-x-auto">
              {JSON.stringify(linearState, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseReducerHook;
