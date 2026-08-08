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

  // Classic Debounce Function
  function debounceFunction<T extends (...args: any[]) => any>(fn: T, delay: number) {
    console.log("Debounce Function");
    let inDebounce: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: Parameters<T>) {
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
  };

  // Debounce with Leading and Trailing Options
  function debounceWithLeadingAndTrailing<T extends (...args: any[]) => any>(fn: T, delay: number, leading: boolean, trailing: boolean) {
    /*
    - If trailing is true then it will behave like the classical debounce.
    - If leading is true then it execute the function at the start,
    - If both are true then function will execute at start as well as at end.
    */
    let timeout;
    let isLeadingInvoked = false;

    return function (...args: Parameters<T>) {
      const context = this;
      if (timeout) {
        clearTimeout(timeout);
      };

      // handle leading
      if (leading && !timeout) {
        fn.apply(context, args);
        isLeadingInvoked = true;
      } else {
        isLeadingInvoked = false;
      }

      timeout = setTimeout(() => {
        if (trailing && !isLeadingInvoked) {
          fn.apply(context, args);
        }

        timeout = null;
      }, delay);
    };
  };

  const getData = useCallback((value: string) => {
    console.log("Search Value", value);
  }, []);

  const debouncedGetData = useMemo(
    () => debounceFunction(getData, 300),
    [getData],
  );

  useEffect(() => {
    debouncedGetData(searchValue);
  }, [searchValue, debouncedGetData]);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="mx-auto w-full max-w-3xl">
        <div className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Debounce Search
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Type to search. Results are fetched after you stop typing.
              </p>
            </div>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
              300ms debounce
            </span>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Search
            </label>
            <div className="relative">
              <CustomInput
                value={searchValue}
                placeholder="Start typing..."
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full"
              />
              {/*<div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                ⌘K
              </div>*/}
            </div>
            <p className="mt-2 text-xs text-slate-400">
              Debounced output logs to console only after typing pauses.
            </p>
          </div>

          <div className="mt-6 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-400">
              Live input
            </div>
            <div className="mt-1 text-lg font-semibold text-slate-800">
              {searchValue || "—"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebounceSearchBar;

const debounce = (func, delay) => {
  let inDebounce;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
};
