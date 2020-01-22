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
	// Lionyx
	sandslashalola: {
		inherit: true,
        baseStats: {hp: 75, atk: 100, def: 120, spa: 25, spd: 65, spe: 65},
	},
	// Lady Monita
	magnemite: {
		inherit: true,
        baseStats: {hp: 70, atk: 130, def: 90, spa: 70, spd: 115, spe: 120},
	},
	// taylor
	flareon: {
		inherit: true,
        baseStats: {hp: 65, atk: 130, def: 60, spa: 95, spd: 65, spe: 110},
	},
	// aFkRchASTl
	sceptilemega: {
		inherit: true,
		abilities: {0: "Speed Boost"},
	},
	// Vexen IV
	slowbro: {
		inherit: true,
        baseStats: {hp: 95, atk: 120, def: 180, spa: 130, spd: 180, spe: 30},
	},
	// KrisTami
	mewtwo: {
		inherit: true,
        baseStats: {hp: 120, atk: 145, def: 120, spa: 170, spd: 120, spe: 160},
	},
	// Blitzamirin
	absolmega: {
		inherit: true,
		abilities: {0: "Dark Aura"},
	},
};

exports.BattlePokedex = BattlePokedex;
