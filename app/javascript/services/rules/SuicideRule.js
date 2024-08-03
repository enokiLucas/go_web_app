import { hasLiberties, identifyGroups } from '../../utils/RulesUtil.js';

class SuicideRule {
	constructor() {}

	// Method to check if a specific move by a player results in a suicide
	checkForSuicide(x, y, player, simulatedMatrix) {
		// Identify the group for the newly placed stone, considering stones of the same color
		const groups = identifyGroups(x, y, simulatedMatrix, false);

		// If the identified group (or groups) has no liberties, the move is considered suicide
		// This assumes 'identifyGroups' returns an array of groups, each being an array of positions
		for (let group of groups) {
			if (!hasLiberties(group, simulatedMatrix)) {
				return true; // The move results in a group without liberties, hence suicide
			}
		}

		return false; // The move does not result in suicide
	}
}

export const suicideRule = new SuicideRule();
