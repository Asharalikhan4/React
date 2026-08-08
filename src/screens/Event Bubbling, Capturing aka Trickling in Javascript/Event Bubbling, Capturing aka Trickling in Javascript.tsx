const EventBubblingAndCapturingAkaTrickling = () => {
  return (
    <div
      style={{
        minHeight: "100px",
        minWidth: "100px",
        padding: "30px",
        border: "1px solid black",
      }}
      onClick={() => {
        console.log("Grand Parent Clicked.")
      }}
    >
      <div
        style={{
          minHeight: "100px",
          minWidth: "100px",
          padding: "30px",
          border: "1px solid black",
        }}
        onClick={() => {
          console.log("Parent Clicked.")
        }}
      >
        <div
          style={{
            minHeight: "100px",
            minWidth: "100px",
            padding: "30px",
            border: "1px solid black",
          }}
          onClick={() => {
            console.log("Child Clicked.")
          }}
        ></div>
      </div>
    </div>
  );
};

export default EventBubblingAndCapturingAkaTrickling;
