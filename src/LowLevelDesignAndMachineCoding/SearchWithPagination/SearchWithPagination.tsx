import { useEffect, useState } from "react";
import { TODOS_API_URL } from "../../constants";

interface TodoType {
  userId: number
}

const SearchWithPagingation = () => {
  const [todos, setTodos] = useState([]);
  
  const makeApiCall = async () => {
    try {
      const response = await fetch(`${TODOS_API_URL}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setTodos((prev) => [...prev, ...data])
    } catch (error) {
      console.error("API Call Failed:", {
        message: error.message,
        name: error.name,
      });
    }
  };

  useEffect(() => {
    makeApiCall();
  }, []);

  return (
    <div>
      <div>
        <label htmlFor="page">Page</label>
        <select
          id="page"
          onChange={(e) => {
            setPage(e.target.value);
          }}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
        </select>
        <input
          placeholder="Enter beer name"
          // onChange={(e) => setBeerName(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchWithPagingation;
