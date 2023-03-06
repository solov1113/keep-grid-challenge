import { useState } from "react";
import styles from "./styles.module.css";

const initialState = [
	["", "", "", "", ""],
	["", "", "", "", ""],
	["", "green", "blue", "red", ""],
	["", "red", "gold", "green", ""],
	["", "", "", "", ""]
];

export default function App() {
	const [grid, setGrid] = useState(initialState);
	const [selectedColor, setSelectedColor] = useState("Green");

	const onAddRow = () => {
		// Your code here
		setGrid([
			...grid,
			Array(grid[0].length).fill("")
		]);
	};

	const onRemoveRow = () => {
		// Your code here
		if (grid.length > 1) {
			setGrid(grid.slice(0, -1));
		}
	};

	const onAddCol = () => {
		// Your code here
		setGrid(grid.map(item => [
			...item,
			""
		]));
	};

	const onRemoveCol = () => {
		// Your code here
		if (grid[0].length > 1) {
			setGrid(grid.map(item => item.slice(0, -1)));
		}
	};

	const onChangeCellColor = (row, col) => {
		// Your code here
		grid[row][col] = selectedColor.toLowerCase();
		setGrid([
			...grid
		]);
	};

	const onMoveDown = () => {
		// Your code here
		setGrid([
			grid[grid.length - 1],
			...grid.slice(0, -1)
		]);
	};

	const onMoveUp = () => {
		// Your code here
		setGrid([
			...grid.slice(1),
			grid[0]
		]);
	};

	const onMoveRight = () => {
		// Your code here
		setGrid(grid.map(item => [
			item[item.length - 1],
			...item.slice(0, -1)
		]));
	};
	
	const onMoveLeft = () => {
		// Your code here
		setGrid(grid.map(item => [
			...item.slice(1),
			item[0]
		]));
	};

	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<div className={styles.header}>
					<div className={styles.counter}>
						<h1>Rows: {grid.length}</h1>
						<button onClick={onRemoveRow}>Remove row</button>
						<button onClick={onAddRow}>Add row</button>
					</div>
					<div className={styles.counter}>
						<h1>Columns: {grid[0]?.length || 0}</h1>
						<button onClick={onRemoveCol}>Remove column</button>
						<button onClick={onAddCol}>Add column</button>
					</div>
				</div>
				<div className={styles.grid}>
					<div>
						<button onClick={onMoveLeft}>Shift Left</button>
					</div>
					<div className={styles.gridCenter}>
						<button className={styles.shiftButton} onClick={onMoveUp}>
							Shift up
						</button>
						{grid.map((row, rowIndex) => (
							<div key={rowIndex} className={styles.row}>
								{row.map((cell, cellIndex) => (
									<div
										key={cellIndex}
										className={styles.cell}
										style={{ backgroundColor: cell }}
										onClick={() => onChangeCellColor(rowIndex, cellIndex)}
									/>
								))}
							</div>
						))}
						<button className={styles.shiftButton} onClick={onMoveDown}>
							Shift down
						</button>
					</div>
					<div>
						<button onClick={onMoveRight}>Shift Right</button>
					</div>
				</div>
				<h2>Select a color</h2>
				<div className={styles.colors}>
					{["Green", "Blue", "Red", "Orange"].map((color) => {
						const isSelected = color === selectedColor;
						const boxShadow = isSelected ? `0px 0px 8px ${color}` : "none";
						return (
							<button
								key={color}
								className={styles.color}
								style={{ color, boxShadow }}
								onClick={() => setSelectedColor(color)}
							>
								{color}
							</button>
						);
					})}
				</div>
			</main>
		</div>
	);
}
