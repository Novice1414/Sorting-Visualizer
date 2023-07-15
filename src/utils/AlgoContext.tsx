import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { getInsertionSortAnims } from "./algorithms/insertionSort";
import { getMergeSortAnims } from "./algorithms/mergeSort";
import { getHeapSortAnims } from "./algorithms/heapSort";
import { getQuickSortAnims } from "./algorithms/quickSort";
import { getBubbleSortAnims } from "./algorithms/bubbleSort";

const initVals: Settings = {
  algoType: "merge sort",
  arrayLen: 25,
  delay: 15,
};

export type Algo =
  | "bubble sort"
  | "merge sort"
  | "insertion sort"
  | "heap sort"
  | "quick sort";

interface Settings {
  algoType: Algo;
  arrayLen: number;
  delay: number;
}

type SettingsContext = {
  settings: Settings;
  setSettings?: React.Dispatch<React.SetStateAction<Settings>>;
  sort: (algoType: Algo) => void;
};

export const Context = createContext<SettingsContext>({
  settings: initVals,
  sort: (algoType) => {},
});

type Items = {
  items: number[];
  setItems?: React.Dispatch<React.SetStateAction<number[]>>;
};
export const ItemsContext = createContext<Items>({ items: [] });

interface Props {
  children: React.ReactNode;
}

const AlgoContext: React.FC<Props> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(initVals);
  const [items, setItems] = useState<number[]>([]);

  useEffect(() => {
    const ranNums = [];
    for (let i = 0; i < settings.arrayLen; i++) {
      ranNums.push(Math.floor(Math.random() * 540));
    }
    setItems(ranNums);
  }, [settings.arrayLen]);

  const sort = (algoType: Algo) => {
    switch (algoType) {
      case "bubble sort":
        const { new1Arr, anim1Arr } = getBubbleSortAnims(items);
        console.log(new1Arr);
        animateDivs(new1Arr, anim1Arr);
        break;
      case "insertion sort":
        console.log(algoType);
        const { newArr, animArr } = getInsertionSortAnims(items);
        // console.log(newArr);
        animateDivs(newArr, animArr);
        break;
      case "merge sort":
        const aux: number[] = [];
        const arr: number[][] = [];
        const nums = [...items];
        getMergeSortAnims(nums, aux, arr, 0, items.length - 1);
        animateMerge(nums, arr);
        console.log(nums);
        break;

      case "heap sort":
        const { heapSorted, heapSortAnims } = getHeapSortAnims(items);
        animateDivs(heapSorted, heapSortAnims);
        break;

      case "quick sort":
        const { quickSorted, quickSortAnims } = getQuickSortAnims(items);
        animateDivs(quickSorted, quickSortAnims);
        break;
      default:
        break;
    }
  };

  const animateMerge = (newArr: number[], arr: number[][]) => {
    arr.forEach(([newHeight, index], idx) => {
      const div = document.getElementById(`${index}`);

      if (!div) return;
      setTimeout(() => {
        div.style.backgroundColor = "#b041f0";
        div.style.height = `${newHeight / 7}%`;
        setTimeout(() => {
          div.style.backgroundColor = "#482";
          if (idx === arr.length - 1) {
            setItems(newArr);
          }
        }, settings.delay * 3);
      }, settings.delay * idx * 3);
    });
  };

  const animateDivs = (newArr: number[], arr: number[][]) => {
    arr.forEach(([first, second], idx) => {
      const div = document.getElementById(`${first}`);
      const div2 = document.getElementById(`${second}`);

      if (!div || !div2) return;
      setTimeout(() => {
        div.style.backgroundColor = "#b041f0";
        div2.style.backgroundColor = "#b041f0";
        const divHeight = div.style.height;
        div.style.height = div2.style.height;
        div2.style.height = divHeight;

        setTimeout(() => {
          div.style.backgroundColor = "#482";
          div2.style.backgroundColor = "#482";
          if (idx === arr.length - 1) {
            setItems(newArr);
          }
        }, settings.delay * 3);
      }, settings.delay * idx * 3);
    });
  };

  return (
    <ItemsContext.Provider value={{ items, setItems }}>
      <Context.Provider value={{ sort, settings, setSettings }}>
        {children}
      </Context.Provider>
    </ItemsContext.Provider>
  );
};

export default AlgoContext;
