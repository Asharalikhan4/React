const SessionStorage = () => {
  console.log("SessionStorage Screen");

  // Setting item in Session Storage
  sessionStorage.setItem("firstName", "Ashar");
  sessionStorage.setItem("lastName", "Ali Khan");
  

  // Getting a single item from Session Storage
  const name = sessionStorage.getItem("lastName");

  // Remove a single item from Session Storage
  sessionStorage.removeItem("lastName");

  // Clear Session Storage
  sessionStorage.clear();

  const sessionStorageData = { ...sessionStorage };
  console.log("Session Storage", sessionStorageData, sessionStorage);
  
  return (
    <h1 className="text-6xl">Session Storage</h1>
  );
};

export default SessionStorage;