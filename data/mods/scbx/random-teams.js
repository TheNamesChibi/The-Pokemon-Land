'use strict';

/** @typedef {{[name: string]: SCBXSet}} SCBXSets */
/**
 * @typedef {Object} SCBXSet
 * @property {string} species
 * @property {string | string[]} ability
 * @property {string | string[]} item
 * @property {GenderName} gender
 * @property {(string | string[])[]} moves
 * @property {string} signatureMove
 * @property {{hp?: number, atk?: number, def?: number, spa?: number, spd?: number, spe?: number}=} evs
 * @property {{hp?: number, atk?: number, def?: number, spa?: number, spd?: number, spe?: number}=} ivs
 * @property {string | string[]} nature
 * @property {number=} level
 * @property {number=} happiness
 * @property {(number|boolean)=} shiny
 */

const RandomTeams = require('../../random-teams');
class RandomSCBXTeams extends RandomTeams {
	/**
	 * @param {Format | string} format
	 * @param {?PRNG | [number, number, number, number]} [prng]
	 */
	constructor(format, prng) {
		super(format, prng);
		this.allXfix = (this.random(500) === 360);
	}

	/**
	 * @param {{inBattle?: boolean}} options
	 */
	randomSCBXTeam(options = {}) {
		/** @type {PokemonSet[]} */
		let team = [];
		/** @type {SCBXSets} */
		let sets = {
			/*
			// Example:
			'Username': {
				species: 'Species', ability: 'Ability', item: 'Item', gender: '',
				moves: ['Move Name', ['Move Name', 'Move Name']],
				signatureMove: 'Move Name',
				evs: {stat: number}, ivs: {stat: number}, nature: 'Nature', level: 100, shiny: false,
			},
			// Species, ability, and item need to be captialized properly ex: Ludicolo, Swift Swim, Life Orb
			// Gender can be M, F, N, or left as an empty string
			// each slot in moves needs to be a string (the move name, captialized properly ex: Hydro Pump), or an array of strings (also move names)
			// signatureMove also needs to be capitalized properly ex: Scripting
			// You can skip Evs (defaults to 82 all) and/or Ivs (defaults to 31 all), or just skip part of the Evs (skipped evs are 0) and/or Ivs (skipped Ivs are 31)
			// You can also skip shiny, defaults to false. Level can be skipped (defaults to 100).
			// Nature needs to be a valid nature with the first letter capitalized ex: Modest
			*/
			// Please keep sets organized alphabetically based on staff member name!
			'Smash': {
				species: 'Rayquaza-Mega', ability: 'Mold Breaker', item: 'White Herb', gender: 'M',
				moves: ['Dragon Pulse', 'Nasty Plot', 'Flamethrower'],
				signatureMove: 'Ultimate Random',
				evs: {spa: 252, hp: 4, spe: 252}, nature: 'Naive', shiny: true,
			},
			'Kal': {
				species: 'Mismagius', ability: 'Magical Aura', item: 'Shell Bell', gender: 'M',
				moves: ['Nasty Plot', 'Dazzling Gleam', 'Dark Pulse'],
				signatureMove: 'Horrid Scream',
				evs: {spa: 252, hp: 4, spd: 252}, nature: 'Mild',
			},
			'Willy': {
				species: 'Nidoking', ability: 'Effiminate Charm', item: 'LGBT Necklace', gender: 'M',
				moves: ['Play Rough', 'Poison Jab', 'Recover'],
				signatureMove: 'Reverse Attraction',
				evs: {atk: 252, spe: 4, def: 252}, nature: 'Naughty', shiny: true,
			},
			'Narcia': {
				species: 'Sylveon', ability: 'Pixilate', item: 'Pixie Plate', gender: 'F',
				moves: [['Hyper Voice', 'Boomburst'], 'Judgment', 'Nasty Plot'],
				signatureMove: 'Magical Swirl',
				evs: {hp: 4, spa: 252, spd: 252}, ivs: {atk: 0}, nature: 'Modest',
			},
			'Mikey': {
				species: 'Flygon', ability: 'Pure Power', item: 'Life Orb', gender: 'M',
				moves: ['Megahorn', 'Dragon Hammer', 'Earthquake'],
				signatureMove: 'Exo Boost',
				evs: {def: 4, atk: 252, spe: 252}, nature: 'Adamant', shiny: true,
			},
			'Lisa Palson': {
				species: 'Victini', ability: 'Contrary', item: 'Situs Berry', gender: 'F',
				moves: ['V-create', 'Dragon Ascent', 'Superpower'],
				signatureMove: 'X Creation',
				evs: {hp: 4, atk: 252, spe: 252}, ivs: {atk: 31}, nature: 'Adamant',
			},
			'Millie': {
				species: 'Meganium', ability: 'Super Poison Heal', item: 'Leftovers', gender: 'F',
				moves: ['Giga Drain', 'Cosmic Power', 'Earth Power'],
				signatureMove: 'HOLY SMOKES!',
				evs: {hp: 4, def: 252, spd: 252}, nature: 'Docile',
			},
			'Joe': {
				species: 'Mawile-Mega', ability: 'Banana Aura', item: 'Life Orb', gender: 'M',
				moves: ['Swords Dance', 'Darkest Lariat', 'Extreme Speed'],
				signatureMove: 'Down the Hatch',
				evs: {spd: 4, atk: 252, def: 252}, nature: 'Adamant', shiny: true,
			},
			'Doug Funny': {
				species: 'Dewott', ability: 'Fur Coat', item: 'Eviolite', gender: 'M',
				moves: ['Moongeist Beam', 'Boomburst', 'Recover'],
				signatureMove: 'It\'s All Power',
				evs: {spe: 4, spd: 252, def: 252}, nature: 'Bashful',
			},
			'Omar': {
				species: 'Slaking', ability: 'Filter', item: 'Iapapa Berry', gender: 'M',
				moves: ['Swords Dance', 'Extreme Speed', 'Soak'],
				signatureMove: 'D\'oh!',
				evs: {def: 4, atk: 252, hp: 252}, nature: 'Naughty',
			},
			'Amy Lou': {
				species: 'Latias', ability: 'Misty Surge', item: 'Latiasite', gender: 'F',
				moves: ['Dragon Pulse', 'Quiver Dance', 'Psystrike'],
				signatureMove: 'A Dragon\'s Dream',
				evs: {hp: 4, spa: 252, spd: 252}, nature: 'Modest',
			},
			'Kris': {
				species: 'Mew', ability: 'Prism Magic', item: 'Soul Orb', gender: 'F',
				moves: ['Quiver Dance', 'Protect', 'Psystrike'],
				signatureMove: 'Magic Tricks',
				evs: {hp: 4, spa: 252, spe: 252}, ivs: {spa: 31}, nature: 'Mild',
			},
			'Aqua': {
				species: 'Mew', ability: 'Primordial Sea', item: 'Leftovers', gender: 'M',
				moves: [['Origin Pulse', 'Psystrike', 'Freeze Dry', 'Ice Beam'], 'Recover', 'Calm Mind'],
				signatureMove: 'Aqua\'s Revenge',
				evs: {hp: 252, def: 4, spd: 252}, nature: 'Calm', shiny: true,
			},
			'Ashtar': {
				species: 'Absol', ability: 'One-Winged Angel', item: 'Figy Berry', gender: 'M',
				moves: ['Nasty Plot', 'Flamethrower', 'Air Slash'],
				signatureMove: 'Dark Hurricane',
				evs: {atk: 4, spa: 252, spe: 252}, nature: 'Rash', shiny: true,
			},
			'Jethro': {
				species: 'Houndoom-Mega', ability: 'Soul-Heart', item: 'Choice Scarf', gender: 'M',
				moves: ['Mud Bomb', 'Earth Power', 'Dark Pulse'],
				signatureMove: 'Release the Hounds!',
				evs: {def: 4, spa: 252, spe: 252}, ivs: {atk: 0}, nature: 'Modest',
			},
			'Meddy': {
				species: 'Sandslash-Alola', ability: 'Super Blocker', item: 'Waterium Z', gender: 'F',
				moves: [['Iron Defense', 'King\'s Shield'], ['Ice Punch', 'Icicle Crash', 'Ice Hammer'], 'Rapid Spin'],
				signatureMove: 'Super Mega Smash',
				evs: {spd: 4, atk: 252, def: 252}, ivs: {spe: 0}, nature: 'Impish',
			},
			'Oscar': {
				species: 'Farfetch\'d', ability: 'Super Luck', item: 'Scope Lens', gender: 'M',
				moves: ['Flying Press', 'Swords Dance', 'Sacred Sword'],
				signatureMove: 'Lucky Strikes',
				evs: {hp: 4, atk: 252, spe: 252}, nature: 'Lonely', shiny: true,
			},
			'Opal': {
				species: 'Sableye', ability: 'Keen Eye', item: 'Sablenite', gender: 'F',
				moves: ['Tail Glow', ['Oblivion Wing', 'Draining Kiss', 'Giga Drain', 'Parabolic Charge', 'Bouncy Bubble'], 'Cosmic Power'],
				signatureMove: 'Sinister Drain',
				evs: {def: 4, spa: 252, spd: 252}, nature: 'Hardy',
			},
			'Frances': {
				species: 'Reshiram', ability: 'Therometer Boost', item: 'Light Clay', gender: 'M',
				moves: ['Spacial Rend', ['Blizzard', 'Freezy Frost'], 'Fusion Flare'],
				signatureMove: 'Freeze Flame',
				evs: {hp: 4, spa: 252, spe: 252}, nature: 'Mild',
			},
			'Exo': {
				species: 'Rotom', ability: 'Exoluck', item: 'Air Balloon', gender: 'M',
				moves: ['Thunderbolt', ['Shadow Ball', 'Moongeist Beam'], 'Sparkly Swirl'],
				signatureMove: 'Exo Activation',
				evs: {spd: 4, spa: 252, spe: 252}, nature: 'Modest',
			},
		};
		let pool = Object.keys(sets);
		/** @type {{[type: string]: number}} */
		let typePool = {};
		let depth = 0;
		if (options.inBattle) this.allXfix = false;
		while (pool.length && team.length < 6) {
			if (depth >= 200) throw new Error(`Infinite loop in Super Staff Bros team generation.`);
			depth++;
			let name = this.allXfix ? 'xfix' : this.sampleNoReplace(pool);
			let scbxSet = sets[name];

			if (!this.allXfix) {
				// Enforce typing limits
				let types = this.dex.getTemplate(scbxSet.species).types;
				let rejected = false;
				for (let type of types) {
					if (typePool[type] === undefined) typePool[type] = 0;
					if (typePool[type] >= 2) {
						// Reject
						rejected = true;
						break;
					}
				}
				if (rejected) continue;
				// Update type counts
				for (let type of types) {
					typePool[type]++;
				}
			}
			/** @type {PokemonSet} */
			let set = {
				name: name,
				species: scbxSet.species,
				item: Array.isArray(scbxSet.item) ? this.sampleNoReplace(scbxSet.item) : scbxSet.item,
				ability: Array.isArray(scbxSet.ability) ? this.sampleNoReplace(scbxSet.ability) : scbxSet.ability,
				moves: [],
				nature: Array.isArray(scbxSet.nature) ? this.sampleNoReplace(scbxSet.nature) : scbxSet.nature,
				gender: scbxSet.gender,
				evs: {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0},
				ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
				level: scbxSet.level || 100,
				happiness: typeof scbxSet.happiness === 'number' ? scbxSet.happiness : 255,
				shiny: typeof scbxSet.shiny === 'number' ? this.randomChance(1, scbxSet.shiny) : scbxSet.shiny,
			};
			if (scbxSet.ivs) {
				for (let iv in scbxSet.ivs) {
					// IVs from the set override the default of 31, assume the hardcoded IVs are legal
					// @ts-ignore StatsTable has no index signature
					set.ivs[iv] = scbxSet.ivs[iv];
				}
			}
			if (scbxSet.evs) {
				for (let ev in scbxSet.evs) {
					// EVs from the set override the default of 0, assume the hardcoded EVs are legal
					// @ts-ignore StatsTable has no index signature
					set.evs[ev] = scbxSet.evs[ev];
				}
			} else {
				set.evs = {hp: 84, atk: 84, def: 84, spa: 84, spd: 84, spe: 84};
			}
			while (set.moves.length < 3 && scbxSet.moves.length > 0) {
				let move = this.sampleNoReplace(scbxSet.moves);
				if (Array.isArray(move)) move = this.sampleNoReplace(move);
				set.moves.push(move);
			}
			set.moves.push(scbxSet.signatureMove);
			if (name === 'Arsenal' && this.dex.getItem(set.item).onPlate) {
				set.species = 'Arceus-' + this.dex.getItem(set.item).onPlate;
			}
			if (name === 'Gallant Spear' && set.item === 'Choice Band') set.moves[set.moves.indexOf('Recover')] = 'Aqua Tail';
			if (name === 'The Immortal' && set.item === 'Choice Scarf') set.moves[3] = 'Superpower';
			if (name === 'irritated' && !set.moves.includes('Double Iron Bash')) set.moves[this.random(3)] = 'Double Iron Bash';
			team.push(set);
			// Swap last and second to last sets if last set has an illusion variant
			if (team.length === 6 && set.ability.includes("Illusion")) {
				team[5] = team[4];
				team[4] = set;
			}
		}
		return team;
	}
}

module.exports = RandomSCBXTeams;
