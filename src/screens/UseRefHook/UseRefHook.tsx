/*
- useRef is a React Hook that lets you reference a value that’s not needed for rendering.

- In React, useRef is a hook that creates a mutable reference object which persists for the full lifetime of a component. It is primarily used to store a value that you want to keep between renders but do not want to trigger a re-render when it changes.

- Feature/ 	useState/	useRef
Re-render/ Trigger	Updating state triggers a component re-render./	Updating a ref does not trigger a re-render.
Mutablity/	Immutable; must use a setter function (e.g., setCount)./	Mutable; you change the .current property directly.
Persistence/	Persists across renders./	Persists across renders.
UI Updates/	Used for values you want to show in the UI./	Used for "behind-the-scenes" data that doesn't impact the UI.
Updates/	Asynchronous/Batched updates./	Synchronous/Immediate updates.

- Key Uses of useRef
1. Direct DOM Access: This is the most common use case. By passing a ref object to the ref attribute of a JSX element, you can directly interact with the underlying DOM node (e.g., to focus an input, scroll to a position, or measure dimensions).
2. Storing Mutable Values: You can store values like timer IDs (setTimeout or setInterval), WebSocket connections, or external library instances that need to persist but don't affect what is rendered on the screen.
3. Tracking Previous State: Because it persists across renders without triggering a new one, it is often used to store the "previous" value of a prop or state for comparison in a useEffect hook. 

*/

import { useRef } from "react";

const UseRefHook = () => {
  
  const ref = useRef<number>(0);
  console.log("ref", ref);
  const handleIncCounterClick = () => {
    ref.current += 1;
    alert("you clicked the button " + ref.current + " times");
  };
  
  return (
    <div>
      <h1>useRef Hook</h1>
      <div>{ref?.current}</div>
      <button onClick={handleIncCounterClick}>Inc Counter</button>
    </div>
  );
};

export default UseRefHook;