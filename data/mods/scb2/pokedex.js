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
// Erika
	eevee: {
		inherit: true,
        baseStats: {hp: 65, atk: 75, def: 70, spa: 65, spd: 85, spe: 75},
	}, 
  	// Mizzy
	wigglytuff: {
		inherit: true,
        baseStats: {hp: 85, atk: 130, def: 70, spa: 130, spd: 180, spe: 50},
	},
	// Felix
	meowth: {
		inherit: true,
        baseStats: {hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100},
	},
	// Abby
	altariamega: {
		inherit: true,
		types: ['Dragon', 'Fairy', 'Water'],
		abilities: {0: 'Liquid Voice'},
        baseStats: {hp: 90, atk: 100, def: 100, spa: 180, spd: 180, spe: 90},
	},
  	// Sedna
	marill: {
		inherit: true,
        baseStats: {hp: 95, atk: 140, def: 110, spa: 140, spd: 110, spe: 140},
	},
	// Sheka
	silvally: {
		inherit: true,
		baseStats: {hp: 120, atk: 120, def: 120, spa: 120, spd: 120, spe: 120},
	},
	// Shade Master
	giratina: {
		inherit: true,
        baseStats: {hp: 150, atk: 100, def: 180, spa: 100, spd: 180, spe: 90},
	},
	giratinaorigin: {
		inherit: true,
        baseStats: {hp: 150, atk: 180, def: 100, spa: 180, spd: 100, spe: 90},
	},
	// Kasandra
	liepard: {
		inherit: true,
        baseStats: {hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100},
	},
	// Blue
	mudkip: {
		inherit: true,
        baseStats: {hp: 85, atk: 150, def: 95, spa: 150, spd: 95, spe: 85},
	},
  	// Oblivia
	raichualola: {
		inherit: true,
		baseStats: {hp: 50, atk: 45, def: 70, spa: 130, spd: 90, spe: 180},
	},
  	// Nyra
	kangaskhanmega: {
		inherit: true,
		baseStats: {hp: 105, atk: 185, def: 100, spa: 60, spd: 100, spe: 130},
	},
  	// Alphus
	ninjask: {
		inherit: true,
		baseStats: {hp: 1, atk: 150, def: 45, spa: 150, spd: 50, spe: 180},
		maxHP: 1,
	},
	shedinja: {
		inherit: true,
       abilities: {0: 'Wonder Guard'},
		baseStats: {hp: 1, atk: 180, def: 45, spa: 180, spd: 50, spe: 150},
		maxHP: 1,
	},
 	// Lyrica
	articuno: {
		inherit: true,
		baseStats: {hp: 90, atk: 120, def: 180, spa: 120, spd: 180, spe: 110},
	},
  	// Blade
	typenull: {
		inherit: true,
		baseStats: {hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100},
	},
  	// Slashdown
	scizormega: {
		inherit: true,
		abilities: {0: 'Flash Fire'},
		baseStats: {hp: 50, atk: 180, def: 170, spa: 85, spd: 65, spe: 170},
	},
  	// Zicko
	aegislash: {
		inherit: true,
		baseStats: {hp: 255, atk: 50, def: 150, spa: 50, spd: 150, spe: 60},
	},
	aegislashblade: {
		inherit: true,
		baseStats: {hp: 60, atk: 150, def: 50, spa: 150, spd: 50, spe: 255},
	},
  	// Gyro
	sandslash: {
		inherit: true,
		baseStats: {hp: 75, atk: 130, def: 180, spa: 110, spd: 130, spe: 65},
	},
  	// Lorica
	sandshrewalola: {
		inherit: true,
		baseStats: {hp: 50, atk: 170, def: 200, spa: 95, spd: 120, spe: 40},
	},
  	// Merick
	marowakalola: {
		inherit: true,
        baseStats: {hp: 95, atk: 130, def: 100, spa: 130, spd: 100, spe: 95},
	},
  	// Jady
	snorlax: {
		inherit: true,
		baseStats: {hp: 255, atk: 110, def: 200, spa: 110, spd: 200, spe: 100},
	},
  	// Charlie
	furret: {
		inherit: true,
		baseStats: {hp: 85, atk: 97, def: 130, spa: 97, spd: 130, spe: 90},
	},
  	// Zig
	zigzagoon: {
		inherit: true,
		baseStats: {hp: 70, atk: 100, def: 70, spa: 60, spd: 60, spe: 110},
	},
	linoone: {
		inherit: true,
		types: ['Normal', 'Electric'],
		abilities: {0: 'Volt Shocker'}, //Permanent Ability
		baseStats: {hp: 78, atk: 140, def: 61, spa: 50, spd: 61, spe: 170},
	},
  	// Montgomery
	heracrossmega: {
		inherit: true,
        abilities: {0: 'Burning Heal'}, //Permanent Ability
	},
  	// Harold
	gengarmega: {
		inherit: true,
        abilities: {0: 'Magic Bounce'}, //Permanent Ability
	},
  	// Loretta
	meowsticf: {
		inherit: true,
        baseStats: {hp: 100, atk: 120, def: 100, spa: 120, spd: 100, spe: 170},
	},
  	// Roger
	meowstic: {
		inherit: true,
        baseStats: {hp: 100, atk: 100, def: 120, spa: 100, spd: 120, spe: 170},
	},
	// Bink
	mankey: {
		inherit: true,
        baseStats: {hp: 40, atk: 170, def: 120, spa: 35, spd: 45, spe: 130},
	},
	// Pupeye
	passimian: {
		inherit: true,
        baseStats: {hp: 100, atk: 180, def: 170, spa: 100, spd: 110, spe: 180},
	},
	// Boomer
	noivern: {
		inherit: true,
        baseStats: {hp: 100, atk: 110, def: 110, spa: 180, spd: 170, spe: 180},
	},
	// Maggie 64
	magikarp: {
		inherit: true,
        baseStats: {hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100},
	},
	// Silvereye
	sableye: {
		inherit: true,
        baseStats: {hp: 255, atk: 130, def: 175, spa: 130, spd: 175, spe: 170},
	},
	// Riana
	ribombee: {
		inherit: true,
        baseStats: {hp: 100, atk: 120, def: 80, spa: 140, spd: 90, spe: 180},
	},
	// Danon
	rattata: {
		inherit: true,
        baseStats: {hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100},
	},
	// Angel
	sylveon: {
		inherit: true,
        baseStats: {hp: 100, atk: 150, def: 110, spa: 150, spd: 110, spe: 100},
	},
  	// Zatch
	necrozma: {
		inherit: true,
		baseStats: {hp: 120, atk: 120, def: 120, spa: 120, spd: 120, spe: 120},
	},
	necrozmaduskmane: {
		inherit: true,
		baseStats: {hp: 100, atk: 170, def: 140, spa: 100, spd: 100, spe: 80},
	},
	necrozmadawnwings: {
		inherit: true,
		baseStats: {hp: 100, atk: 100, def: 100, spa: 170, spd: 140, spe: 80},
	},
	necrozmaultra: {
		inherit: true,
    abilities: {0: 'Prism Power'},
		baseStats: {hp: 140, atk: 140, def: 140, spa: 140, spd: 140, spe: 140},
	},
  	// Omega Sheron
	rayquazamega: {
		inherit: true,
		abilities: {0: 'Overdrive'},
		baseStats: {hp: 160, atk: 160, def: 160, spa: 160, spd: 160, spe: 160},
	},
};

exports.BattlePokedex = BattlePokedex;
