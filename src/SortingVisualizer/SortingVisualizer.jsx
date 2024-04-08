import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMergeSortAnimations } from "../sortingAlgorithms/sortingAlgorithms.js";
import { getBubbleSortAnimations } from "../sortingAlgorithms/sortingAlgorithms.js";
import { getSelectionSortAnimations } from "../sortingAlgorithms/sortingAlgorithms.js";
import { getInsertionSortAnimations } from "../sortingAlgorithms/sortingAlgorithms.js";
import "./SortingVisualizer.css";

const ANIMATION_SPEED_MS = 2;
const NUMBER_OF_ARRAY_BARS = 100;
const PRIMARY_COLOR = "turquoise";
const SECONDARY_COLOR = "red";

function SortingVisualizer() {
  const [array, setArray] = useState([]);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const newArray = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      newArray.push(randomIntFromInterval(5, 550));
    }
    setArray(newArray);
  };

  const mergeSort = () => {
    const animations = getMergeSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  };

  const selectionSort = () => {
    const animations = getSelectionSortAnimations(array);
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animations.length; i++) {
      const [minIndex, currentIndex] = animations[i];
      const bar1 = arrayBars[minIndex];
      const bar2 = arrayBars[currentIndex];
      setTimeout(() => {
        // Highlight bars being compared
        bar1.classList.add("comparing");
        bar2.classList.add("comparing");
        setTimeout(() => {
          // Remove highlight after comparison
          bar1.classList.remove("comparing");
          bar2.classList.remove("comparing");
        }, 50); // Highlight duration
        const tempHeight = bar1.style.height;
        bar1.style.height = bar2.style.height;
        bar2.style.height = tempHeight;
      }, i * 60); // Adjust the speed of visualization by changing the delay
    }
  };

  const bubbleSort = () => {
    const animations = getBubbleSortAnimations(array);
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animations.length; i++) {
      const [a, b] = animations[i];
      const bar1 = arrayBars[a];
      const bar2 = arrayBars[b];
      setTimeout(() => {
        // Highlight bars being compared
        bar1.classList.add("comparing");
        bar2.classList.add("comparing");
        setTimeout(() => {
          // Remove highlight after comparison
          bar1.classList.remove("comparing");
          bar2.classList.remove("comparing");
        }, 50); // Highlight duration
        const tempHeight = bar1.style.height;
        bar1.style.height = bar2.style.height;
        bar2.style.height = tempHeight;
      }, i * 1); // Adjust the speed of visualization by changing the delay
    }
  };

  const insertionSort = () => {
    const animations = getInsertionSortAnimations(array);
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animations.length; i++) {
      const [currentIndex, keyIndex] = animations[i];
      const bar1 = arrayBars[currentIndex];
      const bar2 = arrayBars[keyIndex];
      setTimeout(() => {
        // Highlight bars being compared
        bar1.classList.add("comparing");
        bar2.classList.add("comparing");
        setTimeout(() => {
          // Remove highlight after comparison
          bar1.classList.remove("comparing");
          bar2.classList.remove("comparing");
        }, 50); // Highlight duration
        const tempHeight = bar1.style.height;
        bar1.style.height = bar2.style.height;
        bar2.style.height = tempHeight;
      }, i * ANIMATION_SPEED_MS); // Adjust the speed of visualization by changing the delay
    }
  };

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/dijkstras_path_finding_visualizer");
  };

  return (
    <div className="array-container">
      {array.map((value, idx) => (
        <div
          className="array-bar"
          key={idx}
          style={{
            backgroundColor: PRIMARY_COLOR,
            height: `${value}px`,
          }}
        ></div>
      ))}
      <button onClick={resetArray}>Generate New Array</button>
      <button onClick={mergeSort}>Merge Sort</button>
      <button onClick={selectionSort}>Selection Sort</button>
      <button onClick={insertionSort}>Insertion Sort</button>
      <button onClick={bubbleSort}>Bubble Sort</button>
      <button onClick={handleNavigate}>Dijkstras Algorithm</button>
      {/* Add any additional buttons or components here */}
    </div>
  );
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualizer;
