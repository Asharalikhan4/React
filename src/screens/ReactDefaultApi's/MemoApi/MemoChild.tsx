import { memo } from "react";

const MemoChild = ({ counter }: { counter: number }) => {
  console.log("Memo Api Child Component", counter);
  return (
    <div>
      Memo Child
    </div>
  );
};

export default memo(MemoChild);
// here in this function (memo) you can also provide a function which will the props and react will use that.

// if your're using React Compiler then there's no need of using memo() it will memoized on it's own.