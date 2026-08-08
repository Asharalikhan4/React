import { lazy, Suspense, useState } from "react";
// import LazyLoadingChild2 from "./LazyLoadingChild2"; -> normal import
const LazyLoadingChild2 = lazy(() =>
  manualDelay(import("./LazyLoadingChild2")),
);

function manualDelay(promise) {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  }).then(() => promise);
}

const LazyLoadingChild1 = () => {
  console.log("LazyLoadingChild1");
  const [showMore, setShowMore] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-y-2">
      LazyLoadingChild1
      <label className="flex gap-2">
        <input type="checkbox" onClick={(e) => setShowMore(e.target.checked)} />
        Show More
      </label>
      {showMore && (
        <Suspense fallback={<h1>Loading...</h1>}>
          <LazyLoadingChild2 />
        </Suspense>
      )}
    </div>
  );
};

export default LazyLoadingChild1;
