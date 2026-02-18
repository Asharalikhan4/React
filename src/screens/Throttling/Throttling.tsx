/*
Throttling -> Throttling is a technique used to limit the rate at which a function is called. Throttling transforms a function such that it can only be called once in a specific interval of time.
*/

import { useCallback } from "react";
import CustomButton from "../../components/CustomButton/CustomButton";

const Throttling = () => {
  
  const throttleFunction = (fn: (...args: any[]) => void, delayTime: number) => {
    let lastCall = 0;
    return function (...args: (any[])) {
      const now = Date.now();
      if (now - lastCall < delayTime) {
        return;
      };
      lastCall = now;
      return fn(...args);
    };
  };
  
  const fetchApiCall = useCallback(() => {
    console.log("fetching api call");
  }, []);
  
  const throttleFetchApiCall = throttleFunction(fetchApiCall, 900);
  
  return (
    <div>
      Throttling
      <div>
        <CustomButton onClick={throttleFetchApiCall}>Make an Api Call</CustomButton>
      </div>
    </div>
  );
};

export default Throttling;