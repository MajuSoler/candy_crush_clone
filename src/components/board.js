// import "../App.css";

import { useEffect, useState } from "react";

import blank from "../images/blank.png";
import blueCandy from "../images/blue-candy.png";
import greenCandy from "../images/green-candy.png";
import orangeCandy from "../images/orange-candy.png";
import purpleCandy from "../images/purple-candy.png";
import redCandy from "../images/red-candy.png";
import yellowCandy from "../images/yellow-candy.png";

export const Board = () => {
  //Original values of the game
  const width = 8;
  const candyColor = [
    blueCandy,
    greenCandy,
    orangeCandy,
    purpleCandy,
    redCandy,
    yellowCandy,
  ];

  //State control
  const [randomColorArrengement, setRandonColorArrengement] = useState([]);
  const [points, setPoints] = useState(0);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);

  //Reusable functions
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

  //Check for rows functions
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
        RowOfThree.forEach(
          (square) => (randomColorArrengement[square] = blank)
        );
        setPoints(points + 40);
        return true;
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
        RowOfFour.forEach((square) => (randomColorArrengement[square] = blank));

        setPoints(points + 80);
        return true;
      }
    }
  };

  //Check for colum functions
  const checkForColumOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = randomColorArrengement[i];
      if (
        columnOfThree.every(
          (square) => randomColorArrengement[square] === decidedColor
        )
      ) {
        columnOfThree.forEach(
          (square) => (randomColorArrengement[square] = blank)
        );
        setPoints(points + 40);
        return true;
      }
    }
  };
  const checkForColumOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = randomColorArrengement[i];
      console.log(decidedColor, "this is decided");
      if (
        columnOfFour.every(
          (square) => randomColorArrengement[square] === decidedColor
        )
      ) {
        columnOfFour.forEach(
          (square) => (randomColorArrengement[square] = blank)
        );
        setPoints(points + 80);
        return true;
      }
    }
  };

  // Move functions
  const moveIntoSquareBellow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = range(0, width, 1);

      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && randomColorArrengement[i] === blank) {
        let randomColor = Math.floor(Math.random() * candyColor.length);
        randomColorArrengement[i] = candyColor[randomColor];
      }
      if (randomColorArrengement[i + width] === blank) {
        randomColorArrengement[i + width] = randomColorArrengement[i];
        randomColorArrengement[i] = blank;
      }
    }
  };

  // To create the dragging movements

  const dragStart = (e) => {
    console.log(e.target);
    setSquareBeingDragged(e.target);
  };

  const dragDrop = (e) => {
    console.log(e.target);
    console.log("drag drop");
    setSquareBeingReplaced(e.target);
  };

  const dragEnd = (e) => {
    const squareBeingDraggedId = parseInt(
      squareBeingDragged.getAttribute("data-id")
    );
    const squareBeingReplacedId = parseInt(
      squareBeingReplaced.getAttribute("data-id")
    );

    //Checking for valid moves

    const validMoves = [
      squareBeingReplacedId - 1,
      squareBeingReplacedId - width,
      squareBeingReplacedId + 1,
      squareBeingReplacedId + width,
    ];

    const validMove = validMoves.includes(squareBeingDraggedId);
    const isAColumnOfFour = checkForColumOfFour();
    const isAColumnOfThree = checkForColumOfThree();
    const isARowOfFour = checkForRowOfFour();
    const isARowOfThree = checkForRowOfThree();

    if (validMove) {
      randomColorArrengement[squareBeingReplacedId] =
        squareBeingDragged.getAttribute("src");
      randomColorArrengement[squareBeingDraggedId] =
        squareBeingReplaced.getAttribute("src");
    }

    if (
      squareBeingReplacedId &&
      validMove &&
      (isAColumnOfFour || isAColumnOfThree || isARowOfFour || isARowOfThree)
    ) {
      console.log(validMove, "valid");
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
      randomColorArrengement[squareBeingReplacedId] =
        squareBeingReplaced.getAttribute("src");

      randomColorArrengement[squareBeingDraggedId] =
        squareBeingReplaced.getAttribute("src");
      randomColorArrengement([...randomColorArrengement]);
    }
  };

  // To create the board
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
    <div className="container">
      <div className="title">Points {points}</div>
      <div className="board">
        {randomColorArrengement.map((candyColor, index) => {
          return (
            <img
              key={index}
              alt={candyColor}
              src={candyColor}
              data-id={index}
              draggable={true}
              onDragStart={dragStart}
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDragEnter={(e) => {
                e.preventDefault();
              }}
              onDragLeave={(e) => {
                e.preventDefault();
              }}
              onDrop={dragDrop}
              onDragEnd={dragEnd}
            />
          );
        })}
      </div>
      <button
        className="button"
        onClick={() => {
          setPoints(0);
        }}>
        Clear Score
      </button>
    </div>
  );
};
export default Board;
