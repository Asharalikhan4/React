import { useState, useEffect, useCallback } from "react";
import CustomInput from "../../../components/CustomInput/CustomInput";

const UseEffectHook = () => {
  const [name, setname] = useState({
    firstName: "Ashar",
    middleName: "Ali",
    lastName: "Khan",
  });

  const printName = useCallback(() => {
    console.log("Ashar Ali Khan useCallback");
  }, []);

  printName();

  useEffect(() => {
    console.log("Use Effect", name);

    return () => {
      console.log("useEffect return");
    };
  }, [printName]);

  return (
    <div>
      UseEffectHook
      <div>first Name:</div>
      <CustomInput
        value={name.firstName}
        onChange={(e) =>
          setname({
            ...name,
            firstName: e.target.value,
          })
        }
      />
    </div>
  );
};

export default UseEffectHook;
