/*
- Optimizing performance often crops up in web application.  Well, there many things that need to be considered while optimizing an app.Excessively invoking the function majorly hampers the performance and considered as one of the key hurdles.
- Excessively invoking the function majorly hampers the performance and considered as one of the key hurdles.There are scenarios where we may invoke functions when it isn’t necessary. For example, consider a callback function that we want to  execute on the window resize. It does not make any sense to call the  function as we keep resizing.
- There are scenarios where we may invoke functions when it isn’t necessary. For example, consider a callback function that we want to  execute on the window resize. It does not make any sense to call the  function as we keep resizing.We need to execute the callback function only when the resizing is finished.
- We need to execute the callback function only when the resizing is finished.Debouncing and Throttling help us to gain control over the rate at which function is called or executes.
- Debouncing and Throttling help us to gain control over the rate at which function is called or executes.What exactly is debouncing
*/

/*
Debouncing -> it works on the concept of time difference between the two key pressess, like if i passed 200 then function will be executed on the time interval of 200,
- as we use setTimeout in this so what setTimeout do is it get executed after the time defined in it.

- debounce in layman language is if a function is debounce then it check after invoked that weather the given time has been passed or not from the last activity, if yes then it will get executed and if activity keep happening before the given time finished then it restart the timer again.
*/

import { useEffect, useState, useMemo, useCallback } from "react";
import CustomInput from "../../components/CustomInput/CustomInput";

const DebounceSearchBar = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const getData = useCallback((searchValue: string) => {
    console.log("Fetching data", searchValue);
  }, []);
  
  const debounceFunction = (fn: (...args: any[]) => void, delayTime: number) => {
    let timer: any;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delayTime);
    }
  };

  const debouncedGetData = useMemo(() => debounceFunction(getData, 300), [getData]);

  useEffect(() => {
    if (searchValue) {
      debouncedGetData(searchValue);
    }
  }, [searchValue, debouncedGetData]);

  return (
    <div className="p-2">
      <div>Debounce Search</div>
      <CustomInput
        value={searchValue}
        placeholder="Enter"
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
    </div>
  );
};

export default DebounceSearchBar;
