import "./App.css";

import { useEffect, useState } from "react";

const App = () => {
  const width = 8;
  const candyColor = ["blue", "green", "orange", "purple", "red", "yellow"];
  function range(start, end, step = 1) {
    const allNumbers = [start, end, step].every(Number.isFinite);

    if (!allNumbers) {
      throw new TypeError("range() expects only finite numbers as arguments.");
    }

    if (step <= 0) {
      throw new Error("step must be a number greater than 0.");
    }

    if (start > end) {
      step = -step;
    }

    const length = Math.floor(Math.abs((end - start) / step)) + 1;

    return Array.from(Array(length), (x, index) => start + index * step);
  }

  const [randomColorArrengement, setRandonColorArrengement] = useState([]);

  //Check functions
  const checkForColumOfThree = () => {
    for (let i = 0; i < 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = randomColorArrengement[i];
      if (
        columnOfThree.every(
          (square) => randomColorArrengement[square] === decidedColor
        )
      ) {
        columnOfThree.forEach(
          (square) => (randomColorArrengement[square] = "")
        );
      }
    }
  };

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const RowOfThree = [i, i + 1, i + 2];
      const decidedColor = randomColorArrengement[i];

      const notValid = [
        ...range(width - 2, width * width, width),
        ...range(width - 1, width * width, width),
      ];
      if (notValid.includes(i)) continue;

      if (
        RowOfThree.every(
          (square) => randomColorArrengement[square] === decidedColor
        )
      ) {
        RowOfThree.forEach((square) => (randomColorArrengement[square] = ""));
      }
    }
  };
  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const RowOfFour = [i, i + 1, i + 2];
      const decidedColor = randomColorArrengement[i];

      const notValid = [
        ...range(width - 1, width * width, width),
        ...range(width - 2, width * width, width),
        ...range(width - 3, width * width, width),
      ];

      if (notValid.includes(i)) continue;

      if (
        RowOfFour.every(
          (square) => randomColorArrengement[square] === decidedColor
        )
      ) {
        RowOfFour.forEach((square) => (randomColorArrengement[square] = ""));
      }
    }
  };

  const checkForColumOfFour = () => {
    for (let i = 0; i < 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = randomColorArrengement[i];
      if (
        columnOfFour.every(
          (square) => randomColorArrengement[square] === decidedColor
        )
      ) {
        columnOfFour.forEach((square) => (randomColorArrengement[square] = ""));
      }
    }
  };

  // Move functions
  const moveIntoSquareBellow = () => {
    for (let i = 0; i < 64 - width; i++) {
      const firstRow = range(0, width, 1);

      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && randomColorArrengement[i] === "") {
        let randomColor = Math.floor(Math.random() * candyColor.length);
        randomColorArrengement[i] = candyColor[randomColor];
      }
      if (randomColorArrengement[i + width] === "") {
        randomColorArrengement[i + width] = randomColorArrengement[i];
        randomColorArrengement[i] = "";
      }
    }
  };
  const createBoard = () => {
    const arrayOfColors = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColor[Math.floor(Math.random() * candyColor.length)];
      arrayOfColors.push(randomColor);
    }
    setRandonColorArrengement(arrayOfColors);
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumOfFour();
      checkForColumOfThree();
      checkForRowOfFour();
      checkForRowOfThree();
      moveIntoSquareBellow();
      setRandonColorArrengement([...randomColorArrengement]);
    }, 100);
    return () => clearInterval(timer);
  }, [
    checkForColumOfThree,
    checkForColumOfFour,
    checkForRowOfThree,
    checkForRowOfFour,
    moveIntoSquareBellow,
  ]);

  return (
    <div className="app">
      <div className="board">
        {randomColorArrengement.map((candyColor, index) => {
          return (
            <img
              key={index}
              alt={candyColor}
              style={{
                backgroundColor: candyColor,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
export default App;
