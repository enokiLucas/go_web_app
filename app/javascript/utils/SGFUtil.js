import { EDGE_MARGIN, LENGTH_SQUARE } from './constants.js'

export function convertToSGFPosition(x, y, boardSize) {
	const lettersSGF = "abcdefghijklmnopqrstuvwxyz";

	const boardX = (x - EDGE_MARGIN) / LENGTH_SQUARE;
	const boardY = (y - EDGE_MARGIN) / LENGTH_SQUARE;

	const sgfX = lettersSGF.charAt(boardX);
	const sgfY = lettersSGF.charAt(boardY);

	return `${sgfX}${sgfY}`;
}

export function getPlayerSGFColor(player) {
	return player === 'black' ? 'B' : 'W';
}
