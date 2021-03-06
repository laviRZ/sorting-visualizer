import React, { useState, useEffect, useRef } from "react";
import "./SortingVisualizer.css";

class Bar {
	constructor(value, className) {
		this.value = value;
		this.className = className;
	}
}

const SortingVisualizer = () => {
	const [getArray, setArray] = useState([Bar]); //array to hold the bars
	const [getSlider, setSlider] = useState(50);
	const [getDelay, setDelay] = useState(2);
	const [getTime, setTime] = useState(0);
	const delayRef = useRef(getDelay);
	useEffect(() => {
		delayRef.current = getDelay;
	}, [getDelay]);
	//reset the array at the start
	useEffect(() => {
		resetArray(10);
	}, []);

	//function to reset the array
	const resetArray = () => {
		const array = [];
		for (let i = 0; i < getSlider; i++) {
			array.push(new Bar(randomInt(20, 800), "array-bar"));
		}
		setArray(array);
	};
	//a delay function. use like this: `await timer(time to wait)`
	const timer = (delay) => {
		return new Promise((resolve) => setTimeout(resolve, delay));
	};

	//function to do buuble sort with given delay between each comparison
	const bubbleSort = async () => {
		let temp,
			array = Object.assign([], getArray); // defining a temporary variable, and a duplicate array the the bars array
		//looping from the array size to zero, in cycles
		for (let i = array.length; i > 0; i--) {
			//looping from the start of the section from the first loop to the end of it.
			for (let j = 0; j < i - 1; j++) {
				//changing the colors of the compared bares
				array[j].className = "array-bar compared-bar";
				array[j + 1].className = "array-bar compared-bar";
				setArray([...array]);
				if (delayRef.current > 0) await timer(delayRef.current / 2);
				//comparing and switching if needed
				if (array[j].value > array[j + 1].value) {
					temp = array[j].value;
					array[j].value = array[j + 1].value;
					array[j + 1].value = temp;
					setArray([...array]);

					if (delayRef.current > 0) await timer(delayRef.current / 2);
				}
				//updating the array and moving to the next pair
				array[j].className = "array-bar";
				array[j + 1].className = "array-bar";
				// Wait delay amount in ms before continuing, give browser time to render last update
			}
			array[i - 1].className = "array-bar completed-bar";
		}
		setArray([...array]);
		console.log("done.");
	};

	const combSort = async () => {
		let temp,
			startTime = new Date(),
			swapped,
			array = Object.assign([], getArray); // defining a temporary variable, and a duplicate array the the bars array
		//looping from the array size to zero, in cycles
		for (let i = array.length; i > 0; i = Math.floor(i / 1.3)) {
			//looping from the start of the section from the first loop to the end of it.
			swapped = false;
			for (let j = 0; j < array.length - i; j++) {
				//changing the colors of the compared bares
				array[j].className = "array-bar compared-bar";
				array[j + i].className = "array-bar compared-bar";
				setArray([...array]);
				if (delayRef.current > 0) await timer(delayRef.current / 2);
				//comparing and switching if needed
				if (array[j].value > array[j + i].value) {
					temp = array[j].value;
					array[j].value = array[j + i].value;
					array[j + i].value = temp;
					setArray([...array]);
					swapped = true;
					if (delayRef.current > 0) await timer(delayRef.current / 2);
				}
				//updating the array and moving to the next pair
				array[j].className = "array-bar";
				array[j + i].className = "array-bar";
				// Wait delay amount in ms before continuing, give browser time to render last update
			}
			//array[i - 1].className = "array-bar completed-bar";
			if (i === 1 && swapped) i = 2;
		}
		setArray([...array]);
	};

	const sliderUpdate = (e) => {
		setSlider(e.target.value);
		resetArray(getSlider);
	};
	const delayUpdate = (value) => {
		setDelay(value);
	};
	return (
		<>
			<div className="menu">
				<button onClick={() => resetArray()}>Geneate new array</button>
				<button onClick={() => bubbleSort()}>Do bubble sort</button>
				<button onClick={() => combSort()}>Do comb sort</button>
			</div>
			<h2 className="label">Time: {getTime}</h2>
			<div className="slide-container">
				<div className="size-slider-container">
					<h2 className="label">
						Array size:{" "}
						<span
							id="sizeValue"
							contentEditable="true"
							suppressContentEditableWarning={true}
							onKeyPress={(e) => resetArray(e.target.innerHTML)}
						>
							{getSlider}
						</span>
					</h2>
					<input
						type="range"
						min="3"
						max="250"
						value={getSlider}
						className="slider"
						id="sizeSlider"
						onChange={sliderUpdate}
					/>
				</div>

				<div className="delay-slider-container">
					<h2 className="label">
						Delay:{" "}
						<span
							suppressContentEditableWarning={true}
							id="delayValue"
							contentEditable="true"
							onKeyUp={(e) => {
								delayUpdate(e.target.innerHTML);
							}}
						>
							{getDelay}
						</span>
					</h2>
					<input
						type="range"
						min="0"
						max="1000"
						value={getDelay}
						className="slider"
						id="delaySlider"
						onChange={(e) => delayUpdate(e.target.value)}
					/>
				</div>
			</div>
			<div className="array-container">
				{getArray.map((bar, i) => (
					<div
						className={getArray[i].className}
						key={i}
						style={{ height: `${bar.value * 0.08}vh` }}
					></div>
				))}
			</div>
		</>
	);
};

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
export default SortingVisualizer;
