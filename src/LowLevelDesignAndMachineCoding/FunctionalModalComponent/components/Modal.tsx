import "../FunctionalModalComponent.css";

interface ModalTypes {
  modalVisibility: boolean;
  modalHeading?: string;
  modalText?: string;
  handleModalVisibility: () => void;
};

const Modal = ({
  modalVisibility,
  modalHeading = "Modal",
  modalText = "This is Modal",
  handleModalVisibility
}: ModalTypes) => {
  return (
    <>
      {modalVisibility ? (
        <>
          <div className="modal-backdrop" onClick={handleModalVisibility} />
          <div className={`modal-wrapper ${modalVisibility ? "active" : ""}`}>
            <div className="modal-heading">
              {" "}
              <h4>{modalHeading}</h4>
              <div onClick={handleModalVisibility} className="cross">X</div>
            </div>
            <h2>{modalText}</h2>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Modal;
