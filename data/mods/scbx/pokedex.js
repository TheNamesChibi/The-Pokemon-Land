'use strict';

/**@type {{[k: string]: ModdedTemplateData}} */
let BattlePokedex = {
	/*
	// Example
	speciesid: {
		inherit: true, // Always use this, makes the pokemon inherit its default values from the parent mod (gen7)
		baseStats: {hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100}, // the base stats for the pokemon
	},
	*/
	// Narcia
	sylveon: {
		inherit: true,
		baseStats: {hp: 95, atk: 65, def: 65, spa: 130, spd: 110, spe: 60},
	},
	// Joe
	mawilemega: {
		inherit: true,
		baseStats: {hp: 50, atk: 125, def: 105, spa: 55, spd: 95, spe: 50},
	},
	// Doug Funny
	dewott: {
		inherit: true,
		baseStats: {hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100},
	},
	// Amy Lou
	latiasmega: {
		inherit: true,
		baseStats: {hp: 80, atk: 130, def: 100, spa: 160, spd: 120, spe: 110},
	},
	// Ashtar
	absol: {
		inherit: true,
        baseStats: {hp: 65, atk: 75, def: 60, spa: 130, spd: 60, spe: 75},
	},
	absolmega: {
		inherit: true,
		abilities: {0: 'One-Winged Angel'},
		types: ['Dark', 'Flying', 'Fire'],
		baseStats: {hp: 65, atk: 125, def: 60, spa: 160, spd: 60, spe: 175},
	},
	// Opal
	sableyemega: {
		inherit: true,
		abilities: {0: 'Triage'},
		baseStats: {hp: 50, atk: 130, def: 125, spa: 170, spd: 125, spe: 110},
	},
};

exports.BattlePokedex = BattlePokedex;
