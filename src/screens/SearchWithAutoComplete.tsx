import { useState } from "react";

const ITEMS_API_URL = "https://demo.dataverse.org/api/search";
const DEBOUNCE_DELAY = 500;

const demo_data = ["Ashar", "Ali", "Khan"];

const SearchWithAutoComplete = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [suggestions, setSuggestions] = useState([]);

  async function suggestion(searchText: string) {
    try {
      const suggestionsApiRawResponse = await fetch(
        ITEMS_API_URL + `?q=${searchText}`,
      );
      const suggestionApiResponse = await suggestionsApiRawResponse.json();
      setSuggestions(suggestionApiResponse?.data?.items);
    } catch (error) {
      console.log("Error while fetching", error);
    }
  }
  
  function debounce(fn, delay) {
    return setTimeout(() => {
      
    }, delay); 
  }

  function handleSearchInput(e) {
    console.log(e.target.value);
    setSearchText(e.target.value);
    suggestion(searchText);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <input
        className="border-1 text-sm p-1 rounded-md"
        placeholder="Search here"
        value={searchText}
        onChange={(e) => handleSearchInput(e)}
      />
      <div className="bg-amber-100 w-fit px-4 py-1">
        {suggestions?.map((name) => (
          <div className="p-0.5 border-b-1 cursor-pointer">{name}</div>
        ))}
      </div>
    </div>
  );
};

export default SearchWithAutoComplete;
