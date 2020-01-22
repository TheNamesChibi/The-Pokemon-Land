'use strict';

/**@type {{[k: string]: this.dex.get}} */
let BattleItems = {
	celebiumz: {
		id: "celebiumz",
		name: "Celebium Z",
		isNonstandard: "Custom",
		onTakeItem: false,
		zMove: "Make It Better",
		zMoveFrom: "Psychic",
		zMoveUser: ["Celebi"],
		gen: 7,
		desc: "If held by a Celebi with Psychic, it can use Make It Better.",
	},
};

exports.BattleItems = BattleItems;
