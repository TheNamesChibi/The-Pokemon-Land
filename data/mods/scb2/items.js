'use strict';

/**@type {{[k: string]: ModdedItemData}} */
let BattleItems = {
	// Felix
	felixiumz: {
		id: "felixiumz",
		name: "Felixium Z",
		isNonstandard: "Custom",
		onTakeItem: false,
		zMove: "The Magic Bag of Tricks",
		zMoveFrom: "Metronome",
		itemUser: ["Meowth"],
		gen: 7,
		desc: "If held by a Meowth with Metronome, it can use The Magic Bag of Tricks.",
	},
	// Abby
	mysticwater: {
		inherit: true,
		megaStone: "Altaria-Mega",
		megaEvolves: "Altaria",
		itemUser: ["Altaria"],
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		fling: undefined, // Cannot be flung now since its a mega stone
		desc: "If held by an Altaria, this item allows it to Mega Evolve in battle.",
	},
	// Slashdown
	scizorite: {
        inherit: true,
        megaStone: false, // Is no longer a Mega Stone.
		onSwitchIn: function (pokemon) {
			if (pokemon.isActive && pokemon.baseTemplate.species === 'Scizor') {
				this.insertQueue({pokemon: pokemon, choice: 'runPrimal'});
			}
		},
		onPrimal: function (pokemon) {
			pokemon.formeChange('Scizor-Mega', this.effect, true);
		},
		onTakeItem: function (item, source) {
			if (source.baseTemplate.baseSpecies === 'Scizor') return false;
			return true;
		},
		itemUser: ["Scizor"],
		desc: "If held by a Scizor, this item triggers its Primal Reversion in battle.",
	},
  // Zicko
	ironizer: {
		id: "ironizer",
		name: "Ironizer",
		isNonstandard: "Custom",
		fling: {
			basePower: 130,
		},
		onModifySpDPriority: 2,
		onModifySpD: function (spd, pokemon) {
			if (pokemon.baseTemplate.species === 'Aegislash') {
				return this.chainModify(1.5);
			}
		},
		onModifyDefPriority: 2,
		onModifyDef: function (def, pokemon) {
			if (pokemon.baseTemplate.species === 'Aegislash') {
				return this.chainModify(1.5);
			}
		},
		onModifyAtkPriority: 2,
		onModifyAtk: function (atk, pokemon) {
			if (pokemon.baseTemplate.species === 'Aegislash-Blade') {
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 2,
		onModifySpA: function (spa, pokemon) {
			if (pokemon.baseTemplate.species === 'Aegislash-Blade') {
				return this.chainModify(1.5);
			}
		},
		itemUser: ["Aegislash," "Aegislash-Blade"],
		desc: "If held by an Aegislash, its Def and Sp. Def are multiplied by 1.5. If held by its Blade Forme, its Atk and Sp. Atk are also multiplied by 1.5.",
		shortDesc: "If held by Aegislash forms, stats are doubled.",
	},
  // Gold Ho-Oh
	goldhoohniumz: {
		id: "goldhoohniumz",
		name: "Gold Ho-Ohnium Z",
		isNonstandard: "Custom",
		onTakeItem: false,
		zMove: "Golden Passion",
		zMoveFrom: "Sacred Fire",
		itemUser: ["Ho-Oh"],
		gen: 7,
		desc: "If held by a Ho-Oh with Sacred Fire, it can use Golden Passion.",
	},
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
	//Gyro
	defenseclaw: {
		id: "defenseclaw",
		name: "Defense Claw",
		isNonstandard: "Custom",
		fling: {
			basePower: 170,
		},
		onModifySpDPriority: 2,
		onModifySpD: function (spd, pokemon) {
			if (pokemon.baseTemplate.species === 'Sandslash') {
				return this.chainModify(2);
			}
		},
		onModifyDefPriority: 2,
		onModifyDef: function (def, pokemon) {
			if (pokemon.baseTemplate.species === 'Sandslash') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Sandslash"],
		desc: "If held by a Sandslash, its Def and Sp. Def are doubled",
		shortDesc: "If held by a Sandslash, its Def and Sp. Def stats are doubled.",
	},
	//Item used for Gyro's Escape Thrust
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
	//Lorica
	fireball: {
		id: "fireball",
		name: "Fireball",
		fling: {
			basePower: 30,
		},
		onAfterDamage: function (damage, target, source, move) {
			if (move.type === 'Fire' && target.useItem()) {
				this.boost({atk: 2});
			}
		},
		desc: "Raises holder's Attack by 2 stages if hit by a Fire-type attack. Single use.",
	},
  // Jady
	fatblobofclay: {
		id: "fatblobofclay",
		name: "Fat Blob of Clay",
		isNonstandard: "Custom",
		fling: {
			basePower: 170,
		},
		onModifySpDPriority: 2,
		onModifySpD: function (spd, pokemon) {
			if (pokemon.baseTemplate.species === 'Snorlax') {
				return this.chainModify(2);
			}
		},
		onModifyDefPriority: 2,
		onModifyDef: function (def, pokemon) {
			if (pokemon.baseTemplate.species === 'Snorlax') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Snorlax"],
		desc: "If held by a Snorlax, its Def and Sp. Def are doubled",
		shortDesc: "If held by a Snorlax, its Def and Sp. Def stats are doubled.",
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
  // Pupeye
	nakamberry: {
		id: "nakamberry",
		name: "Nakam Berry",
		isBerry: true,
		isNonstandard: "Custom",
		naturalGift: {
			basePower: 170,
			type: "Dragon",
		},
		onUpdate: function (pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 && pokemon.hasAbility('gluttony'))) {
				pokemon.eatItem();
			}
		},
		onTryEatItem: function (item, pokemon) {
			if (!this.runEvent('TryHeal', pokemon)) return false;
		},
		onEat: function (pokemon) {
			this.heal(pokemon.maxhp);
		},
		desc: "Fully restores maximum HP when at 1/4 max HP or less. Single use.",
	},
  // Boomer
	secretscarf: {
		id: "secretscarf",
		name: "Secret Scarf",
		fling: {
			basePower: 100,
		},
		onModifySpePriority: 1,
		onModifySpe: function (spe) {
			return this.chainModify(2);
		},
		onDisableMove: function (pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				if (this.dex.getMove(moveSlot.move).category === 'Status' || this.dex.getMove(moveSlot.move).category === 'Physical') {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		num: 640,
		gen: 6,
		desc: "Holder's Speed is doubled, but it can only select special moves.",
	},
	// Danon
	multibelt: {
		id: "multibelt",
		name: "Multi-Belt",
		isNonstandard: "Custom",
		fling: {
			basePower: 180,
		},
		onStart: function (pokemon) {
			const allTypes = ['Fire', 'Fighting', 'Water', 'Flying', 'Grass', 'Poison', 'Electric', 'Ground', 'Psychic', 'Rock', 'Ice', 'Bug', 'Dragon', 'Ghost', 'Dark', 'Steel', 'Fairy'];
			const type1 = allTypes[this.random(17)];
			pokemon.types = [type1];
			this.add('-start', pokemon, 'typechange', `${type1}`);
		},
		onModifyMove(move, pokemon) {
			if (move.id === 'extremespeed') {
			let type = pokemon.types[0];
			if (type === "Bird") type = "???";
			move.type = type;
			}
		},
		desc: "The user gains a random type upon entering the battle. The move Extreme Speed also changes its type to match the user.",
		shortDesc: "The user and Extreme Speed gains a random type.",
	},
  // Millennium
	normaljewel: {
		isNonstandard: "Custom",
		id: "normaljewel",
		name: "Normal Jewel",
		desc: "Holder's Multi-Breaker is Normal type.",
		onPlate: 'Normal',
		onTakeItem: function (item, pokemon, source) {
			if ((source && source.baseTemplate.num === 493) || pokemon.baseTemplate.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus",
	},
	fightingjewel: {
		isNonstandard: "Custom",
		id: "fightingjewel",
		name: "Fighting Jewel",
		desc: "Holder's Multi-Breaker is Fighting type.",
		onPlate: 'Fighting',
		onTakeItem: function (item, pokemon, source) {
			if ((source && source.baseTemplate.num === 493) || pokemon.baseTemplate.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Fighting",
	},
	flyingjewel: {
		isNonstandard: "Custom",
		id: "flyingjewel",
		name: "Flying Jewel",
		desc: "Holder's Multi-Breaker is Flying type.",
		onPlate: 'Rock',
		onTakeItem: function (item, pokemon, source) {
			if ((source && source.baseTemplate.num === 493) || pokemon.baseTemplate.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Flying",
	},
	poisonjewel: {
		isNonstandard: "Custom",
		id: "poisonjewel",
		name: "Poison Jewel",
		desc: "Holder's Multi-Breaker is Poison type.",
		onPlate: 'Poison',
		onTakeItem: function (item, pokemon, source) {
			if ((source && source.baseTemplate.num === 493) || pokemon.baseTemplate.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Poison",
	},
		groundjewel: {
		isNonstandard: "Custom",
		id: "groundjewel",
		name: "Ground Jewel",
		desc: "Holder's Multi-Breaker is Ground type.",
		onPlate: 'Ground',
		onTakeItem: function (item, pokemon, source) {
			if ((source && source.baseTemplate.num === 493) || pokemon.baseTemplate.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Ground",
	},
		rockjewel: {
		isNonstandard: "Custom",
		id: "rockjewel",
		name: "Rock Jewel",
		desc: "Holder's Multi-Breaker is Rock type.",
		onPlate: 'Rock',
		onTakeItem: function (item, pokemon, source) {
			if ((source && source.baseTemplate.num === 493) || pokemon.baseTemplate.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Rock",
	},
		bugjewel: {
		isNonstandard: "Custom",
		id: "bugjewel",
		name: "Bug Jewel",
		desc: "Holder's Multi-Breaker is Bug type.",
		onPlate: 'Bug',
		onTakeItem: function (item, pokemon, source) {
			if ((source && source.baseTemplate.num === 493) || pokemon.baseTemplate.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Bug",
	},
		ghostjewel: {
		isNonstandard: "Custom",
		id: "ghostjewel",
		name: "Ghost Jewel",
		desc: "Holder's Multi-Breaker is Ghost type.",
		onPlate: 'Ghost',
		onTakeItem: function (item, pokemon, source) {
			if ((source && source.baseTemplate.num === 493) || pokemon.baseTemplate.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Ghost",
	},
		steeljewel: {
		isNonstandard: "Custom",
		id: "steeljewel",
		name: "Steel Jewel",
		desc: "Holder's Multi-Breaker is Steel type.",
		onPlate: 'Steel',
		onTakeItem: function (item, pokemon, source) {
			if ((source && source.baseTemplate.num === 493) || pokemon.baseTemplate.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Steel",
	},
		firejewel: {
		isNonstandard: "Custom",
		id: "firejewel",
		name: "Fire Jewel",
		desc: "Holder's Multi-Breaker is Fire type.",
		onPlate: 'Fire',
		onTakeItem: function (item, pokemon, source) {
			if ((source && source.baseTemplate.num === 493) || pokemon.baseTemplate.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Fire",
	},
		waterjewel: {
		isNonstandard: "Custom",
		id: "waterjewel",
		name: "Water Jewel",
		desc: "Holder's Multi-Breaker is Water type.",
		onPlate: 'Water',
		onTakeItem: function (item, pokemon, source) {
			if ((source && source.baseTemplate.num === 493) || pokemon.baseTemplate.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Water",
	},
		grassjewel: {
		isNonstandard: "Custom",
		id: "grassjewel",
		name: "Grass Jewel",
		desc: "Holder's Multi-Breaker is Grass type.",
		onPlate: 'Grass',
		onTakeItem: function (item, pokemon, source) {
			if ((source && source.baseTemplate.num === 493) || pokemon.baseTemplate.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Grass",
	},
		electricjewel: {
		isNonstandard: "Custom",
		id: "electricjewel",
		name: "Electric Jewel",
		desc: "Holder's Multi-Breaker is Electric type.",
		onPlate: 'Electric',
		onTakeItem: function (item, pokemon, source) {
			if ((source && source.baseTemplate.num === 493) || pokemon.baseTemplate.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Electric",
	},
		psychicjewel: {
		isNonstandard: "Custom",
		id: "psychicjewel",
		name: "Psychic Jewel",
		desc: "Holder's Multi-Breaker is Psychic type.",
		onPlate: 'Psychic',
		onTakeItem: function (item, pokemon, source) {
			if ((source && source.baseTemplate.num === 493) || pokemon.baseTemplate.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Psychic",
	},
		icejewel: {
		isNonstandard: "Custom",
		id: "icejewel",
		name: "Ice Jewel",
		desc: "Holder's Multi-Breaker is Ice type.",
		onPlate: 'Ice',
		onTakeItem: function (item, pokemon, source) {
			if ((source && source.baseTemplate.num === 493) || pokemon.baseTemplate.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Ice",
	},
		dragonjewel: {
		isNonstandard: "Custom",
		id: "dragonjewel",
		name: "Dragon Jewel",
		desc: "Holder's Multi-Breaker is Dragon type.",
		onPlate: 'Dragon',
		onTakeItem: function (item, pokemon, source) {
			if ((source && source.baseTemplate.num === 493) || pokemon.baseTemplate.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Dragon",
	},
		darkjewel: {
		isNonstandard: "Custom",
		id: "darkjewel",
		name: "Dark Jewel",
		desc: "Holder's Multi-Breaker is Dark type.",
		onPlate: 'Dark',
		onTakeItem: function (item, pokemon, source) {
			if ((source && source.baseTemplate.num === 493) || pokemon.baseTemplate.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Dark",
	},
		fairyjewel: {
		isNonstandard: "Custom",
		id: "fairyjewel",
		name: "Fairy Jewel",
		desc: "Holder's Multi-Breaker is Fairy type.",
		onPlate: 'Fairy',
		onTakeItem: function (item, pokemon, source) {
			if ((source && source.baseTemplate.num === 493) || pokemon.baseTemplate.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Fairy",
	},
  // Zatch
	zatchiumz: {
		id: "zatchiumz",
		name: "Zatchium Z",
		isNonstandard: "Custom",
		onTakeItem: false,
		zMove: "World of Light",
		zMoveFrom: "Z-Raider",
		itemUser: ["Necrozma-Ultra"],
		gen: 7,
		desc: "If held by an Ultra Necrozma with Z-Raider, it can use World of Light.",
	},
  // Used for Shekka's Move
	normalmemory: {
		isNonstandard: "Custom",
		id: "normalmemory",
		name: "Normal Memory",
		desc: "Holder's Multi-Attack is Normal type.",
		onPlate: 'Normal',
		onTakeItem: function (item, pokemon, source) {
			if ((source && source.baseTemplate.num === 773) || pokemon.baseTemplate.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally",
	},
};

exports.BattleItems = BattleItems;
