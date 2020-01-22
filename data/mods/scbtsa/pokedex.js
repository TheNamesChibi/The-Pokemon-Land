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
	// Dynamo
	shinx: {
		inherit: true,
        baseStats: {hp: 80, atk: 130, def: 79, spa: 95, spd: 79, spe: 100},
	},
  	// Sedna
	marill: {
		inherit: true,
        baseStats: {hp: 95, atk: 140, def: 110, spa: 140, spd: 110, spe: 140},
	},
  	// Zanna
	shuppet: {
		inherit: true,
		baseStats: {hp: 64, atk: 175, def: 75, spa: 93, spd: 83, spe: 175},
	},
  	// Gyro
	sandslash: {
		inherit: true,
		baseStats: {hp: 75, atk: 130, def: 180, spa: 110, spd: 130, spe: 65},
	},
  	// Flippit
	inkay: {
		inherit: true,
		baseStats: {hp: 86, atk: 92, def: 170, spa: 68, spd: 170, spe: 110},
	},
  	// Jill
	stunky: {
		inherit: true,
		baseStats: {hp: 103, atk: 110, def: 67, spa: 110, spd: 61, spe: 110},
	},
  	// Shinni
	togetic: {
		inherit: true,
		baseStats: {hp: 85, atk: 50, def: 95, spa: 130, spd: 115, spe: 170},
	},
  	// Alphus
	dialga: {
		inherit: true,
		baseStats: {hp: 120, atk: 120, def: 120, spa: 170, spd: 100, spe: 90},
	},
};

exports.BattlePokedex = BattlePokedex;
