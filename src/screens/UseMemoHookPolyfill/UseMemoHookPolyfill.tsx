import { useState } from "react";
import useMemoHookPolyfill from "../../customHooks/useMemoHookPolyfill";

const UseMemoHookPolyfill = () => {
  const [count, setCount] = useState(0);
  const [anotherValue, setAnotherValue] = useState(1);
  const memoizedValue = useMemoHookPolyfill(() => {
    return anotherValue + count;
  }, [anotherValue]);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Memoized: {memoizedValue}</p>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>
        Increase count
      </button>
      <button onClick={() => setAnotherValue((prevVal) => prevVal + 1)}>
        Increase Another count
      </button>
    </div>
  );
};

export default UseMemoHookPolyfill;
