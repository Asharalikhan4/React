const ThrowErrorScreen = () => {
  
  throw new Error("This is an Error Screen");
  
  return (
    <div>
      Whenever this page get rendered this will throw an error.
    </div>
  );
};

export default ThrowErrorScreen;