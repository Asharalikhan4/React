import { useState } from "react";
import usePrevious from "../../customHooks/usePrevious";

const UsePreviousHook = () => {
  console.log("UsePreviousHook Render");
  const [count, setCount] = useState<number>(0);
  const prevCount: number = usePrevious(count);
  
  return (
    <div>
      <h1>usePrevious Hook</h1>
      <h1>
        Now: {count}, before: {prevCount}
      </h1>
      <div className="flex gap-2">
        <button onClick={() => setCount(prev => prev - 1)}>Decrement</button>
        <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
      </div>
    </div>
  );
};

export default UsePreviousHook;
