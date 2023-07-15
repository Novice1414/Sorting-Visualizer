import React, { useContext } from "react";
import { Algo, Context } from "../utils/AlgoContext";

const Nav = () => {
  const { sort, settings, setSettings } = useContext(Context);

  const onArrayChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!setSettings) return;
    setSettings((c) => ({ ...c, arrayLen: +e.target.value * 5 }));
  };

  const onDelayChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!setSettings) return;
    setSettings((c) => ({ ...c, delay: +e.target.value }));
  };

  const onAlgoChange = (type: Algo) => {
    if (!setSettings) return;
    setSettings((c) => ({ ...c, algoType: type }));
  };

  return (
    <nav className="realtive row-span-3 sm:row-span-2 w-screen bg-gradient-to-r from-slate-900 to-slate-900 grid grid-rows-2 pb-4">
      <div
        className="flex items-center justify-center w-full my-2 gap-5
"
      >
        <div className="flex gap-2">
          <button
            className={`px-4 py-3 bg-gradient-to-r from-slate-800 to-slate-700 rounded-sm text-gray-200 text-sm hover:font-medium active:scale-95  focus:text-indigo-400${
              settings.algoType === "bubble sort" && "text-indigo-400"
            }`}
            onClick={() => onAlgoChange("bubble sort")}
          >
            Bubble Sort
          </button>

          <button
            className={`px-4 py-3 bg-gradient-to-r from-slate-800 to-slate-700 rounded-sm text-gray-200 text-sm hover:font-medium active:scale-95  focus:text-indigo-400${
              settings.algoType === "merge sort" && "text-indigo-400"
            }`}
            onClick={() => onAlgoChange("merge sort")}
          >
            Merge Sort
          </button>

          <button
            className={`px-4 py-3 bg-gradient-to-r from-slate-800 to-slate-700 rounded-sm text-gray-200 text-sm hover:font-medium active:scale-95 focus:text-indigo-400 ${
              settings.algoType === "insertion sort" && "text-indigo-400"
            }`}
            onClick={() => onAlgoChange("insertion sort")}
          >
            Insertion Sort
          </button>
          <button
            className={`px-4 py-3 bg-gradient-to-r from-slate-800 to-slate-700 rounded-sm text-gray-200 text-sm hover:font-medium active:scale-95${
              settings.algoType === "heap sort" && "text-indigo-400"
            }`}
            onClick={() => onAlgoChange("heap sort")}
          >
            Heap Sort
          </button>

          <button
            className={`px-4 py-3 bg-gradient-to-r from-slate-800 to-slate-700 rounded-sm text-gray-200 text-sm hover:font-medium  active:scale-95 focus:text-indigo-400${
              settings.algoType === "quick sort" && "text-indigo-400"
            }`}
            onClick={() => onAlgoChange("quick sort")}
          >
            Quick Sort
          </button>
        </div>
        <button
          className="px-5 py-2 bg-black rounded-lg text-indigo-400"
          onClick={() => sort(settings.algoType)}
        >
          Sort &rarr;
        </button>
      </div>
      <div className="justify-center p-0 sm:ml-5 ">
        <div className="flex flex-col items center w-full pb-0 text-white ">
          <label htmlFor="items_amount">
            Array Length: {settings.arrayLen}
          </label>
          <input
            type="range"
            name="items_amount"
            id="items_amount"
            className="w-full max-w-2xl"
            defaultValue={25}
            min={1}
            onChange={onArrayChange}
          />
          <label htmlFor="delay">Delay: {settings.delay}</label>
          <input
            type="range"
            name="delay"
            id="delay"
            className="w-full max-w-2xl"
            defaultValue={15}
            min={1}
            onChange={onDelayChange}
          />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
