import { ReactNode } from "react";

interface DefaultCaseProps {
  children: ReactNode
};

const DefaultCase = ({ children }: DefaultCaseProps) => {
  return (
    <div>{children}</div>
  );
};

export default DefaultCase;