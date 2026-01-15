import { useState } from "react";
import usePrevious from "../../customHooks/usePrevious";

const UsePreviousHook = () => {
  
  const [count, setCount] = useState(0);
  const prevCount: any = usePrevious(count);
  
  return (
    <div>
      <h1>usePrevious Hook</h1>
      <h1>
        Now: {count}, before: {prevCount}
      </h1>
      <div className="flex gap-2">
        <button onClick={() => setCount(count - 1)}>Decrement</button>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    </div>
  );
};

export default UsePreviousHook;
