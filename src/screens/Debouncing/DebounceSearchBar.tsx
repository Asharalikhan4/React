/*
Debouncing -> it works on the concept of time difference between the two key pressess, like if i passed 200 then function will be executed on the time interval of 200,
- as we use setTimeout in this so what setTimeout do is it get executed after the time defined in it.
*/

import { useEffect, useState, useMemo } from "react";

const DebounceSearchBar = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const getData = () => {
    console.log("Fetching data");
  };

  const debounceFunction = (
    fn: (...args: any[]) => void,
    delayTime: number,
  ) => {
    let timer;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delayTime);
    };
  };

  const debouncedGetData = useMemo(() => debounceFunction(getData, 300), []);

  useEffect(() => {
    if (searchValue) {
      debouncedGetData();
    }
  }, [searchValue, debouncedGetData]);

  return (
    <div className="p-2">
      <input
        value={searchValue}
        className="border-2 py-1 px-2 rounded-2xl"
        placeholder="Enter"
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
    </div>
  );
};

export default DebounceSearchBar;
