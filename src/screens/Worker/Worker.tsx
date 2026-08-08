import { useState, useEffect, useRef } from "react";

const Worker = () => {
  const [result, setResult] = useState(null);
  const workerRef = useRef(null);
  
  useEffect(() => {
    workerRef.current = new Worker(new URL("../workers/HeavyTask.js"));
    workerRef.current.onmessage = (event) => {
      setResult(event.data);
    };
    
    return () => {
      workerRef.current.terminate();
    };
  }, []);
  
  const runTask = () => {
    workerRef.current.postMessage(50);
  };
  
  return (
    <div>
      <button onClick={runTask}>Run Heavy Task</button>
      {result && <p>Result: {result}</p>}
    </div>
  )
};