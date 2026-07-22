import { useState } from "react";
import Modal from "./components/Modal";

const FunctionalModalComponent = () => {
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);

  function handleModalVisibility() {
    setModalVisibility((prev) => !prev);
  };
  
  return (
    <div>
      <button onClick={handleModalVisibility}>{modalVisibility ? "Hide Modal" : "Show Modal"}</button>
      <Modal modalVisibility={modalVisibility} handleModalVisibility={handleModalVisibility} modalHeading="New Modal" modalText="This is New Modal" />
    </div>
  );
};

export default FunctionalModalComponent;
