import { useMemo, useState } from "react";
import CustomInput from "../../../components/CustomInput/CustomInput";
import CustomButton from "../../../components/CustomButton/CustomButton";

const UseMemoHook = () => {
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [counter, setCounter] = useState<number>(0);

  const sum = useMemo(() => {
    console.log("useMemo called");
    return num1 + num2;
  }, [num1, num2]);

  return (
    <div className="space-y-4">
      <div>useMemo Hook</div>
      <div>
        Counter {counter}
      </div>
      <div className="flex items-center">
        <CustomInput value={num1} onChange={(e) => setNum1(Number(e.target.value))} />
        <CustomInput value={num2} onChange={(e) => setNum2(Number(e.target.value))} />
        <div>Total: {sum}</div>
      </div>
      <CustomButton onClick={() => setCounter((prev) => prev+1)}>Refresh</CustomButton>
    </div>
  );
};

export default UseMemoHook;
