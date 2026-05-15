import { useState } from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";

const TwoStepLoginForm = () => {
  const [step, setStep] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function verifyEmail() {
    if (email) {
      setStep(1);
    }
  };

  function changeEmail() {
    setStep(0);
  };

  function handleSubmit() {
    setEmail("");
    setPassword("");
    setStep(0);
  };

  return (
    <div className="mt-6">
      <div style={{ textAlign: "center" }}>
        <p className="text-3xl font-semibold">Sign In to continue to Gmail.</p>
      </div>
      {step === 0 ? (
        <div className="flex flex-col w-1/3 mx-auto gap-y-4 mt-2">
          <CustomInput
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <CustomButton onClick={verifyEmail}>Next</CustomButton>
        </div>
      ) : (
        <div className="flex flex-col w-1/3 mx-auto gap-y-4 mt-2">
          <CustomInput
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-between">
            <CustomButton onClick={changeEmail}>Change Email</CustomButton>
            <CustomButton onClick={handleSubmit}>Submit</CustomButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default TwoStepLoginForm;
