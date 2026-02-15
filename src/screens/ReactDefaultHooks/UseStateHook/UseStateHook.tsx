import { useState } from "react";
import CustomButton from "../../../components/CustomButton/CustomButton";

const UseStateHook = () => {
  const initialState = () => {
    console.log("initialState called");
    return 1;
  };

  const [counter, setCounter] = useState<number>(initialState);

  const handleIncrement = () => {
    setCounter(prev => prev + 1);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f9fafb, #eef2ff)",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "2rem 3rem",
          borderRadius: "14px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          textAlign: "center",
          minWidth: "260px",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>
          useState Hook
        </h2>

        <div
          style={{
            fontSize: "3rem",
            fontWeight: 700,
            marginBottom: "1.5rem",
            color: "#4f46e5",
          }}
        >
          {counter}
        </div>

        <CustomButton variant="secondary" onClick={handleIncrement}>
          Increment
        </CustomButton>
      </div>
    </div>
  );
};

export default UseStateHook;
