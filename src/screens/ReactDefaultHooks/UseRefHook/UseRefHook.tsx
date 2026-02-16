/*
-> useRef is a React Hook that lets you reference a value that’s not needed for rendering.

*/

import { useRef } from "react";
import CustomButton from "../../../components/CustomButton/CustomButton";

const UseRefHook = () => {
  
  const counterRef = useRef(10);
  
  const increaseCounterRef = () => {
    counterRef.current += 1;
    alert(counterRef.current);
  };
  
  console.log(counterRef);
  
  return (
    <div>
      <div>Use Ref Hook</div>
      <CustomButton onClick={increaseCounterRef}>Inc</CustomButton>
    </div>
  );
};

export default UseRefHook;