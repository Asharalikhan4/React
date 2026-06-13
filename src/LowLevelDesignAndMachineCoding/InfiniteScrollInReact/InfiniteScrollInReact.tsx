/*
- To implement the infinite scroll, We will have to listen to the window’s scroll event and determine if the user has scrolled to the end.
*/
import { useEffect, useState } from "react";

const InfiniteScrollInReact = () => {
  const [count, setCount] = useState<number>(50);

  useEffect(() => {
    const onScroll = () => {
      console.log("Scrolled to End", window.innerHeight, window.scrollY, window.document.body.offsetHeight, window.innerHeight + window.scrollY >= window.document.body.offsetHeight);
      if (window.innerHeight + window.scrollY >= window.document.body.offsetHeight) {
        setCount((prev) => (
          prev + 50
        ));
      }
    };
    
    window.addEventListener("scroll", onScroll)

    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  
  const elements = [];
  
  for (let i = 0; i < count; i++) {
    elements.push(
      <div key={i}>{i}</div>
    )
  };
  
  return (
    <div>
      <h1 className="fixed bg-white p-2">No. of items in list {count}</h1>
      <div className="p-10">{elements}</div>
    </div>
  );
};

export default InfiniteScrollInReact;