const LocalStorage = () => {
  console.log("LocalStorage Screen");

  // Setting item in Local Storage
  localStorage.setItem("firstName", "Ashar");
  localStorage.setItem("lastName", "Ali Khan");
  

  // Getting a single item from Local Storage
  const name = localStorage.getItem("lastName");

  // Remove a single item from Local Storage
  localStorage.removeItem("lastName");

  // Clear Local Storage
  localStorage.clear();

  const localStorageData = { ...LocalStorage };
  console.log("Local Storage", localStorageData, localStorage);
  
  return (
    <h1 className="text-6xl">Local Storage</h1>
  );
};

export default LocalStorage;