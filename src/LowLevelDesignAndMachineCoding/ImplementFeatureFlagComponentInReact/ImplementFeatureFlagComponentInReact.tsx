import { useContext } from "react";
import { FeatureFlagContext } from "./FeatureFlagContext";

const ImplementFeatureFlagComponentInReact = () => {
  const features = useContext(FeatureFlagContext);
  return (
    <div>
      {features.darkMode ? " in Dark Mode " : " in Light Mode"}
    </div>
  );
};

export default ImplementFeatureFlagComponentInReact;