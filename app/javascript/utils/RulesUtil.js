import { rulesControl } from '../services/RulesControl.js';
import { gameStateManager } from '../services/GameStateManager.js';

export function toggleColor(color) {
	// Utility to switch between 'black' and 'white'
	return color === 'black' ? 'white' : 'black';
}

export function isValidCoordinate(x, y) {
	const size = gameStateManager.boardSize;
	return x >= 0 && x < size && y >= 0 && y < size;
}

// Checks if a group has any liberties
export function hasLiberties(group, matrix) {
	// For each stone in the group, check if there are any adjacent empty points
	for (let {x, y} of group) {
		if (adjacentLiberties(x, y, matrix)) {
			return true; // Group has at least one liberty
		}
	}
	return false; // No liberties found, group is captured
}

// Determines if there are adjacent empty points around a stone
export function adjacentLiberties(x, y, matrix) {
	const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
	for (let [dx, dy] of directions) {
		const newX = x + dx;
		const newY = y + dy;
		if (isValidCoordinate(newX, newY) && matrix[newX][newY] === null) {
			return true; // Found an adjacent liberty
		}
	}
	return false;
}

	// Identifies groups of stones from a starting position. Can identify groups of the same color as the starting stone
	// or groups of the opposite color, based on the identifyOpposite flag.
export function identifyGroups(startX, startY, matrix, identifyOpposite = false) {
	// Determine the color of the group to identify: same as the starting point or opposite.
	const initialColor = matrix[startX][startY];
	const targetColor = identifyOpposite ? toggleColor(initialColor) : initialColor;
	const groups = []; // To store identified groups of stones.
	const visited = new Set(); // Keeps track of visited coordinates to avoid infinite loops.

	// Recursive function to explore and collect coordinates belonging to the same group.
	const exploreGroup = (x, y) => {
		// Return immediately if out of bounds or already visited.
		if (!isValidCoordinate(x, y) || visited.has(`${x},${y}`)) return;
		// Return if the current stone does not match the target color.
		const currentColor = matrix[x][y];
		if (currentColor !== targetColor) return;

		visited.add(`${x},${y}`); // Mark the current position as visited.
		let group = [{ x, y }]; // Initialize the group with the current stone.
		// Define possible directions to explore: up, right, down, left.
		const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];

		// Explore adjacent positions.
		directions.forEach(([dx, dy]) => {
			const newX = x + dx;
			const newY = y + dy;
			// Recursively explore if the adjacent stone matches the target color and is within bounds.
			if (isValidCoordinate(newX, newY) && matrix[newX][newY] === targetColor) {
				const adjacentGroup = exploreGroup(newX, newY);
				// Ensure that adjacentGroup is an array and not undefined
				if (adjacentGroup && adjacentGroup.length > 0) {
					group = group.concat(adjacentGroup);
				}
			}
		});

		return group; // Return the collected group of stones.
	};

	// Determine starting points for exploration based on identifyOpposite flag.
	const startPoints = identifyOpposite ?
	[[startX - 1, startY], [startX, startY - 1], [startX + 1, startY], [startX, startY + 1]] :
		[[startX, startY]];

	// Explore groups starting from specified points.
	startPoints.forEach(([x, y]) => {
		if (isValidCoordinate(x, y) && matrix[x][y] === targetColor && !visited.has(`${x},${y}`)) {
			const group = exploreGroup(x, y);
			// If a group is identified, add it to the groups array.
			if (group && group.length > 0) groups.push(group);
		}
	});

	return groups; // Return all identified groups.
}
