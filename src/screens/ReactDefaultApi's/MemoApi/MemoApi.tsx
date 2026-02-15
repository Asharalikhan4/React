import { useState } from "react";
import MemoChild from "./MemoChild";
import CustomButton from "../../../components/CustomButton/CustomButton";

const MemoApi = () => {
  const [counter, setCounter] = useState<number>(0);
  console.log("Memo Api Parent Component");
  const forceRerender = () => {
    setCounter((prev) => prev + 1);
  };

  return (
    <div>
      <div>Memo Api's</div>
      <div>
        <CustomButton onClick={forceRerender}>Re-Render</CustomButton>
      </div>
      Parent Component
      <MemoChild counter={10} />
    </div>
  );
};

export default MemoApi;
