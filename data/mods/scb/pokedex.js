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
	// Static
	pikachu: {
		inherit: true,
        baseStats: {hp: 45, atk: 80, def: 50, spa: 75, spd: 60, spe: 120},
	},
	pikachugmax: {
		inherit: true,
        baseStats: {hp: 45, atk: 80, def: 50, spa: 75, spd: 60, spe: 120},
	},
// Erika
	eevee: {
		inherit: true,
        baseStats: {hp: 65, atk: 75, def: 70, spa: 65, spd: 85, spe: 75},
	}, 
	eeveegmax: {
		inherit: true,
        baseStats: {hp: 65, atk: 75, def: 70, spa: 65, spd: 85, spe: 75},
	}, 
	// Aqua
  	mew: {
		inherit: true,
		otherFormes: ["mewgmax"],
	},
  	mewgmax: {
		num: 151,
		species: "Mew-Gmax",
		baseSpecies: "Mew",
		forme: "Gmax",
		formeLetter: "G",
		types: ["Psychic"],
		baseStats: {hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100},
        abilities: {0: "Synchronize"}, // Ability change only for Aqua
		// TODO
		heightm: 0,
		weightkg: 0,
		color: "Blue", // Color change only for Aqua
		eggGroups: ["Undiscovered"],
	},
  	// Mizzy
	wigglytuff: {
		inherit: true,
        baseStats: {hp: 85, atk: 130, def: 70, spa: 130, spd: 180, spe: 50},
	},
  	// Drew
	dracozolt: {
		inherit: true,
        baseStats: {hp: 90, atk: 130, def: 120, spa: 80, spd: 70, spe: 75},
	},
	arctozolt: {
		inherit: true,
        baseStats: {hp: 90, atk: 130, def: 120, spa: 90, spd: 80, spe: 55},
	},
	dracovish: {
		inherit: true,
        baseStats: {hp: 90, atk: 130, def: 120, spa: 70, spd: 80, spe: 75},
	},
	arctovish: {
		inherit: true,
        baseStats: {hp: 90, atk: 130, def: 120, spa: 80, spd: 90, spe: 55},
	},
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
  	// Jason
	duraludon: {
		inherit: true,
        baseStats: {hp: 70, atk: 130, def: 200, spa: 150, spd: 110, spe: 85},
        otherFormes: ["duraludongmax"],
	},
  	// Gary
	corviknight: {
		inherit: true,
        baseStats: {hp: 98, atk: 87, def: 105, spa: 53, spd: 85, spe: 67},
        otherFormes: ["corviknightgmax"],
	},
  	// Lynda
	snom: {
		inherit: true,
        baseStats: {hp: 70, atk: 65, def: 60, spa: 90, spd: 125, spe: 65},
	},
  	// Simmons
	obstagoon: {
		inherit: true,
        baseStats: {hp: 93, atk: 120, def: 120, spa: 60, spd: 81, spe: 95},
	},
  	// Bullet
	perrserker: {
		inherit: true,
        baseStats: {hp: 70, atk: 130, def: 110, spa: 50, spd: 60, spe: 50},
	},
	//Gizmo
	yamper: {
		inherit: true,
		baseStats: {hp: 69, atk: 132, def: 60, spa: 90, spd: 60, spe: 121},
		otherFormes: ["yampergmax"],
	},
	//Puff
	wooloo: {
		inherit: true,
		baseStats: {hp: 72, atk: 80, def: 120, spa: 60, spd: 120, spe: 88},
	},
  	yampergmax: {
		num: 835,
		species: "Yamper-Gmax",
		baseSpecies: "Yamper",
		forme: "Gmax",
		formeLetter: "G",
		types: ["Electric"],
		baseStats: {hp: 69, atk: 132, def: 60, spa: 90, spd: 60, spe: 121}, // Stat change only for Gizmo
		abilities: {0: "Ball Fetch"},
		// TODO
		heightm: 0,
		weightkg: 0,
		color: "Yellow",
		eggGroups: ["Field"],
	},
	//Seraphi Man
	eternatus: {
		inherit: true,
		otherFormes: ["eternatuseternamax"],
	},
	eternatuseternamax: {
		num: 890,
		species: "Eternatus-Eternamax",
		types: ["Poison", "Dragon"],
		gender: "N",
		baseStats: {hp: 255, atk: 115, def: 250, spa: 125, spd: 250, spe: 130},
		abilities: {0: "Wonder Guard"}, //Ability change only for Seraphi Man
		// TODO
		heightm: 0,
		weightkg: 0,
		color: "Purple",
		eggGroups: ["Undiscovered"],
	},
};

exports.BattlePokedex = BattlePokedex;
