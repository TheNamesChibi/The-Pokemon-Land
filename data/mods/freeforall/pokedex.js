'use strict';

/**@type {{[k: string]: ModdedTemplateData}} */
let BattlePokedex = {
	waylonsmithers: {
		species: "Waylon Smithers",
		types: ["Normal"],
		gender: "M",
		baseStats: {hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100},
		abilities: {0: "Cute Charm"},
		heightm: 0.7,
		weightkg: 21,
		color: "Gray",
		eggGroups: ["Undiscovered"],
	},
};

exports.BattlePokedex = BattlePokedex;
