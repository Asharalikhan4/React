/*
- Question: create a hook in React that remembers the previous value of the state.
- usePrevious hook will take the current value as input and hold it and will return it whenever it will get a new value. For the initial render, it will return undefined as there will not be any previous value for it.
- To create the usePrevious hook we will need to use the useRef and useEffect hook together.

useRef
- Between renderings, you can maintain values using the useRef() Hook which means the value won’t change or be lost when the React components re-render. This will help us to persist the previous value.

useEffect()
- With the useEffect() hook, we can manage the side effects in the components during the lifecycle events. Thus we can create a new reference using useRef() and update its value inside the useEffect() whenever a new value is provided, at the end return the reference value.
*/

import { useEffect, useRef } from "react";

export default function usePrevious(value: any) {
  // create a new reference
  const ref = useRef();

  // store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // only re-run if value changes

  // return previous value (happens before update in useEffect above)
  return ref.current;
};
