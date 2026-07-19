import { useEffect, useRef } from "react";

const detectChanges = (prevDeps, deps) => {
  if (prevDeps === null || prevDeps.length !== deps.length) {
    return false;
  }

  for (let i = 0; i < deps.length; i++) {
    if (prevDeps[i] !== deps[i]) return false;
  }

  return true;
};

export default function useMemoHookPolyfill(callback, deps) {
  const memoizedRef = useRef("");

  if (
    !memoizedRef.current ||
    !detectChanges(memoizedRef?.current?.deps, deps)
  ) {
    memoizedRef.current = {
      value: callback(),
      deps: deps,
    };
  }

  useEffect(() => {
    return () => {
      memoizedRef.current = null;
    };
  }, []);

  return memoizedRef.current.value;
};
