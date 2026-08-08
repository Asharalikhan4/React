/*
- Question: create a hook in React to provide an abstraction over the asynchronous operation like handling its error state and providing option to refetch, etc. This is a simpler version of the React-Query's useQuery hook.

- useAsync(asyncFn, immediate) takes an async function and an immediate flag as input and it will provide an abstraction for complete async operation (API calls) in React, in return it will give the status, value, error, refetch.

• status: It will have one of the four values ["idle", "pending", "success", "error"] depending upon the current state of the asyncFn.
• value: If the state is success then this will have the value returned from the asyncFn.
• error: If the state is error then this will have the error returned from the asyncFn.
• refetch(): This function can be used to invoke the function again and refetch data.

- Based on the input and output, let's implement the useAsync() hook.

- We will be using useState to monitor the status, value, & error and useCallback() hook to create a memoized refetch() function.

- A memoized version of the callback that only changes if one of the dependencies has changed is what useCallback returns. To avoid needless renderings, this is helpful when delivering callbacks to optimised child components that rely on reference equality.

- At the end, we will pass the immediate flag that we took as input to the useEffect() hook that will trigger the refetch if the value of the immediate flag changes and is true

*/

import { useCallback, useEffect, useState } from "react";

export default function useAsync(asyncFn, immediate = false) {
  const [state, setState] = useState({
    status: "idle",
    value: null,
    error: null,
  });

  const refetch = useCallback(() => {
    setState({
      status: "pending",
      value: null,
      error: null,
    });

    asyncFn
      .then((response: any) => {
        setState({
          status: "success",
          value: response,
          error: null,
        });
      })
      .catch((error: any) => {
        setState({
          status: "error",
          value: null,
          error: error,
        });
      });
  }, [asyncFn]);

  useEffect(() => {
    if (immediate) {
      refetch();
    }
  }, [refetch, immediate]);

  const { status, value, error } = state;

  return { refetch, status, value, error };
}
