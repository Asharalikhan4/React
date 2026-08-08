import { ReactNode } from "react";

interface CustomCaseProps {
  children: ReactNode
};

const CustomCase = ({ children }: CustomCaseProps) => {
  return <div>{children}</div>;
};

export default CustomCase;
