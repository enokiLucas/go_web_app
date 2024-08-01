// Checks if the given coordinates (x, y) are within the boundaries of the board.
// The 'size' parameter is the length of one side of the square board.
export function isValidPosition(x, y, size) {
	return x >= 0 && x < size && y >= 0 && y < size;
}

// Check if a intersection is at the edge or not
//size = matrix.lenght
function nextDirection(x, y, size) {
	const directions = [];

	// Check if there is a valid space above the current point
	if (x > 0) {
		directions.push([-1, 0]);
	}

	// Check if there is a valid space to the right of the current point
	if (y < size - 1) {
		directions.push([0, 1]);
	}

	// Check if there is a valid space below the current point
	if (x < size - 1) {
		directions.push([1, 0]);
	}

	// Check if there is a valid space to the left of the current point
	if (y > 0) {
		directions.push([0, -1]);
	}

	return directions;
}



// Explores a territory starting from a specific point on the board (startX, startY)
// and determines if the territory is completely surrounded by stones of a single color.
export function exploreTerritory(matrix, startX, startY) {
	const size = matrix.length;  // Assuming a square board for simplicity
	const checked = new Set();  // To keep track of checked positions to prevent revisiting
	const stack = [[startX, startY]];  // Stack for depth-first search
	const territory = [];  // To store coordinates belonging to the territory
	let surroundingColor = null;  // To track the color of surrounding stones
	let isSurrounded = true;  // Flag to indicate if the territory is completely surrounded

	// Process each point in the stack until there are no more points to check
	while (stack.length > 0) {
		const [cx, cy] = stack.pop();  // Current point being processed
		const key = `${cx},${cy}`;  // Create a unique key for the current coordinates
		if (checked.has(key)) continue;  // Skip if already checked
		checked.add(key);  // Mark this point as checked

		// Only consider empty positions as part of the territory
		if (matrix[cx][cy] === null) {
			territory.push([cx, cy]);  // Add to territory list
			// Possible directions to move to from the current point
			const directions = nextDirection(startX, startY, size);

			// Explore all adjacent points
			for (let [dx, dy] of directions) {
				const nx = cx + dx, ny = cy + dy;  // Calculate next point coordinates
				// Check if the next point is within board limits
				if (isValidPosition(nx, ny, size)) {
					// If next point is empty and not checked, add to stack for further exploration
					if (matrix[nx][ny] === null && !checked.has(`${nx},${ny}`)) {
						stack.push([nx, ny]);
					} else if (matrix[nx][ny] !== null) {
						// If a stone is found, determine the surrounding color
						if (surroundingColor === null) {
							surroundingColor = matrix[nx][ny];  // Set surrounding color if not set
						} else if (surroundingColor !== matrix[nx][ny]) {
							isSurrounded = false;  // Mark as not surrounded if different colors found
						}
					}
				} else {
					isSurrounded = false;  // Edge of board treated as not surrounded
				}
			}
		}
	}

	// Return detailed information about the explored territory
	return {
		points: territory,  // List of points making up the territory
		surroundedBy: isSurrounded ? surroundingColor : null,  // Color of surrounding stones if completely surrounded
		isCompletelySurrounded: isSurrounded  // Whether the territory is completely surrounded
	};
}
