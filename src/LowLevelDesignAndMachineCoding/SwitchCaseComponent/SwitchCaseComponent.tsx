import CustomCase from "./components/CustomCase";
import CustomSwitch from "./components/CustomSwitch";
import DefaultCase from "./components/DefaultCase";

const SwitchCaseComponent = () => {
  return (
    // <div>Switch case components</div>
    <CustomSwitch value="1000">
      <CustomCase value={(e) => e < 10}><div>Hello 20</div></CustomCase>
      <CustomCase value="20">Hello 20</CustomCase>
      <CustomCase value="30">Hello 30</CustomCase>
      <CustomCase value="10"><div>Hello 10</div></CustomCase>
      <DefaultCase>Hello 40</DefaultCase>
    </CustomSwitch>
  );
};

export default SwitchCaseComponent;