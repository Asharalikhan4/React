import { lazy, Suspense } from "react";
const LazyLoadingChild1 = lazy(() => import("./LazyLoadingChild1"));

const LazyLoading = () => {
  console.log("Lazy Loading Parent");
  return (
    <div>
      Lazy Loading
      <Suspense fallback={<h1>Loading...</h1>}>
        <LazyLoadingChild1 />
      </Suspense>
    </div>
  );
};

export default LazyLoading;
