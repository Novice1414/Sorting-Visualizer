export const getBubbleSortAnims = (items: number[]) => {
  const new1Arr = [...items];
  const anim1Arr: number[][] = [];
  for (let i = 1; i < new1Arr.length; i++) {
    for (let j = 0; j < new1Arr.length; j++) {
      if (new1Arr[j] > new1Arr[j + 1]) {
        anim1Arr.push([j + 1, j]);
        const tmp = new1Arr[j];
        new1Arr[j] = new1Arr[j + 1];
        new1Arr[j + 1] = tmp;
        j--;
      }
    }
  }
  return { new1Arr, anim1Arr };
};
