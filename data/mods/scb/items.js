'use strict';

/**@type {{[k: string]: ModdedItemData}} */
let BattleItems = {
  // Kassandra
	falsemiragiumz: {
		id: "falsemiragiumz",
		name: "Falsemiragium Z",
		isNonstandard: "Custom",
		onTakeItem: false,
		zMove: "False Mirage",
		zMoveFrom: ["Blizzard", "Thunder", "Fire Blast", "Hydro Pump", "Hurricane", "Psychic", "Play Rough", "Outrage", "Dark Pulse"],
		itemUser: ["Liepard"],
		gen: 7,
		desc: "If held by a Liepard with Blizzard, Thunder, Fire Blast, Hydro Pump, Hurricane, Psychic, Play Rough, Ourage or Dark Pulse, it can use False Mirage.",
	},
  // Disto
	destructiumz: {
		id: "destructiumz",
		name: "Destructium Z",
		isNonstandard: "Custom",
		onTakeItem: false,
		zMove: "All-Force Destruction",
		zMoveFrom: ["Destruction Power"],
		itemUser: ["Hydreigon"],
		gen: 7,
		desc: "If held by a Hydreigon with Destruction Power, it can use All-Force Destruction.",
	},
	//Choice Spike
	choicespike: {
		id: "choicespike",
		name: "Choice Spike",
		fling: {
			basePower: 10,
		},
		onStart: function (pokemon) {
			if (pokemon.volatiles['choicelock']) {
				this.debug('removing choicelock: ' + pokemon.volatiles.choicelock);
			}
			pokemon.removeVolatile('choicelock');
		},
		onModifyMove: function (move, pokemon) {
			pokemon.addVolatile('choicelock');
		},
		isChoice: true,
		desc: "Makes the user can only select the first move it executes.",
	},
	// Willy
	lgbtnecklace: {
		id: "lgbtnecklace",
		name: "LGBT Necklace",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onAttractPriority: -100,
		onAttract(target, source) {
			this.debug('attract intercepted: ' + target + ' from ' + source);
			if (!source || source === target) return;
			if (!source.volatiles.reverseattract) source.addVolatile('reverseattract', target);
		},
		gen: 7,
		desc: "If holder becomes infatuated, the other Pokemon also becomes infatuated.",
	},
	// Kris
	soulorb: {
		id: "soulorb",
		name: "Soul Orb",
		fling: {
			basePower: 30,
		},
		onBasePowerPriority: 6,
		onBasePower(basePower, user, target, move) {
			if (move && (user.baseTemplate.num === 150) && (move.type === 'Psychic')) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		gen: 7,
		itemUser: ["Mewtwo"],
		desc: "If held by a Mewtwo, its Psychic-type moves have 1.2x power.",
	},
	// Gizmo
	rustedcomputer: {
		id: "rustedcomputer",
		name: "Rusted Computer",
		fling: {
			basePower: 100,
		},
		onStart(pokemon) {
			pokemon.side.addSideCondition('powerboost');
		},
		gen: 8,
		itemUser: ["Yamper"],
		desc: "If held by a Yamper, this item activates Power Boost for 5 turns upon switching in.",
	},
	// Seraphi Man
	enternalorb: {
		id: "enternalorb",
		name: "Enternal Orb",
		megaStone: "Eternatus-Eternamax",
		megaEvolves: "Eternatus",
		itemUser: ["Eternatus"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		isNonstandard: "Custom",
		desc: "If held by an Eternatus, this item allows it to Mega Evolve in battle.",
	},
};

exports.BattleItems = BattleItems;
