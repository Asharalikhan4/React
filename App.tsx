// import { ImCancelCircle } from "react-icons/im";
// import { useState } from "react";

// const App = () => {
//   const [chips, setChips] = useState<string[]>([]);
//   const [chip, setChip] = useState<string>("");

//   const handleAddChip = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && chip.length > 0 && !chips.includes(chip)) {
//       setChips((prev) => [...prev, chip]);
//       setChip("");
//     }
//   };

//   const handleRemoveChip = (singleChip: string) => {
//     if (chips.length > 0) {
//       setChips([...chips.filter((chip: string) => chip !== singleChip)]);
//     }
//   };

//   return (
//     <div className="flex flex-col justify-center items-center h-screen">
//       <h3>Chips Input</h3>
//       <input
//         className="border-2 p-2"
//         placeholder="Type a chip and press enter"
//         value={chip}
//         onChange={(e) => setChip(e.target.value)}
//         onKeyDown={handleAddChip}
//       />
//       <div className="flex gap-2 mt-1">
//         {chips?.map((singleChip: string) => (
//           <div
//             key={singleChip}
//             className="bg-gray-400 rounded-full px-3 py-1 flex items-center gap-3"
//             onClick={() => {
//               handleRemoveChip(singleChip);
//             }}
//           >
//             {singleChip} <ImCancelCircle className="text-red-600 cursor-pointer"/>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default App;
//
//
import Router from "./src/config/Router";

const App = () => {
  return (
    <Router />
  );
};

export default App;
