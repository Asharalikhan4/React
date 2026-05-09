import { createContext, ReactNode, useState } from "react";

type FeatureFlagType = {
  darkMode: boolean;
  chatEnabled: boolean;
};

const INITIAL_VALUE: FeatureFlagType = {
  darkMode: true,
  chatEnabled: false
};

export const FeatureFlagContext = createContext<FeatureFlagType>(INITIAL_VALUE);

const FeatureFlagProvider = ({ children }: { children: ReactNode }) => {
  const [features, setFeatures] = useState<FeatureFlagType>(INITIAL_VALUE);
  return (
    <FeatureFlagContext.Provider value={features}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

export default FeatureFlagProvider;