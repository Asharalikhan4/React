import { useState, useEffect } from "react";

const IndexDB = () => {
  const [db, setDb] = useState(null);

  useEffect(() => {
    const request = indexedDB.open("MyDatabase", 1);

    request.onsuccess = (event) => {
      const instance = event.target.result;
      setDb(instance); // Save the connection
      console.log("DB Connected");
    };

    // This is the CLEANUP function (runs on unmount)
    return () => {
      if (db) {
        db.close();
        console.log("DB Connection Closed");
      }
    };
  }, [db]);

  return <h1 className="text-6xl">IndexDB</h1>;
};

export default IndexDB;
