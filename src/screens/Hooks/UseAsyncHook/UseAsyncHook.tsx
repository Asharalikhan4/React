import useAsync from "../../../customHooks/useAsync";

const UseAsyncHook = () => {
  const fakeApiCall = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const rnd = Math.random() * 10;
        rnd <= 5 ? resolve("Success") : reject("Error");
      }, 1000);
    });
  };

  const { status, value, error } = useAsync(fakeApiCall, true);

  return (
    <div>
      <h1>UseAsyncHook</h1>
      <div>
        <div>Status: {status}</div>
        <div>Value: {value}</div>
        <div>error: {error}</div>
      </div>
    </div>
  );
};

export default UseAsyncHook;
