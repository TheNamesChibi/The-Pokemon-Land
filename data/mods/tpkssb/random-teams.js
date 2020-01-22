'use strict';

const RandomTeams = require('../../random-teams');

class randomTPKSSBTeams extends RandomTeams {
	randomTPKSSBTeam() {
		let team = [];
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
			'jetou': {
				species: 'Machoke', ability: 'Guts', item: 'Flame Orb', gender: 'M',
				moves: [['Swords Dance', 'Belly Drum'], 'Extreme Speed', 'Bullet Punch'],
				signatureMove: 'Smash Trap',
				evs: {atk: 252, spe: 252, def: 4}, nature: 'Lonely',
			},
			'Lionyx': {
				species: 'Sandslash-Alola', ability: 'Snow Warning', item: 'Light Clay', gender: 'M',
				moves: [['Aqua Tail', 'Ice Hammer', 'Meteor Mash'], 'Hail', 'Aurora Veil'],
				signatureMove: 'Armor Up',
				evs: {def: 252, spd: 252, spe: 4}, nature: 'Relaxed',
			},
			'Lady Monita': {
				species: 'Magnemite', ability: 'Levitate', item: 'Focus Sash', gender: 'F',
				moves: [['Swords Dance', 'Dragon Dance'], 'Explosion', 'Iron Head'],
				signatureMove: 'Sparks Fly',
				evs: {atk: 252, spa: 252, spe: 4}, nature: 'Naughty',
			},
			'taylor': {
				species: 'Flareon', ability: 'Pure Power', item: 'Toxic Orb', gender: 'M',
				moves: [['Fling', 'Switcheroo', 'Trick'], 'Refresh', 'Swords Dance'],
				signatureMove: 'Taylor Loves You Bomb',
				evs: {atk: 252, spe: 252, def: 4}, nature: 'Adamant',
			},
			'aFkRchASTl': {
				species: 'Sceptile', ability: 'Speed Boost', item: 'Sceptilite', gender: 'F',
				moves: [['Tail Glow', 'Nasty Plot'], 'Protect', 'Substitute'],
				signatureMove: 'Oblivion Beam',
				evs: {spa: 252, spe: 252, atk: 4}, nature: 'Mild',
			},
			'lost-link': {
				species: 'Darkrai', ability: 'Bad Dreams', item: 'Lum Berry', gender: 'M',
				moves: ['Nightmare', 'Psychic', 'Spore'],
				signatureMove: 'LOST-LINK',
				evs: {spa: 252, spe: 252, atk: 4}, nature: 'Modest',
			},
			'Vexen IV': {
				species: 'Slowbro', ability: 'Star Storm', item: 'Leftovers', gender: 'F',
				moves: ['Baton Pass', 'Recover', ['Water Pulse', 'Hydro Pump', 'Surf', 'Steam Eruption']],
				signatureMove: 'Makes Sense in Content',
				evs: {def: 252, spd: 252, spa: 4}, nature: 'Calm',
			},
			'Zalm': {
				species: 'Kartana', ability: 'Unburden', item: 'Sitrus Berry', gender: 'F',
				moves: ['Belly Drum', 'Sunsteel Strike', 'Power Whip'],
				signatureMove: 'Z-Turn',
				evs: {atk: 252, spe: 252, spa: 4}, nature: 'Naughty',
			},
			'Darnell': {
				species: 'Aegislash-Blade', ability: 'Huge Power', item: ['Shuca Berry', 'Steelium Z'], gender: 'M',
				moves: ['Sacred Sword', 'Shadow Strike', 'Meteor Mash'],
				signatureMove: 'Darnell: Powered Up',
				evs: {atk: 252, spe: 252, spa: 4}, nature: 'Lonely',
			},
			'Spydreigon': {
				species: 'Hydreigon', ability: 'Big Mental Power', item: 'Darkinium Z', gender: 'M',
				moves: ['Tail Glow', 'Vacuum Wave', 'Dragon Pulse'],
				signatureMove: 'Hydratic Pulse',
				evs: {spa: 252, atk: 252, spe: 4}, nature: 'Mild',
			},
			'Tenshi³': {
				species: 'Naganadel', ability: 'Magic Guard', item: 'Darkinium Z', gender: 'M',
				moves: ['Dark Pulse', 'Spacial Rend', 'Acid Spray'],
				signatureMove: 'Ultra Net',
				evs: {spa: 252, spe: 252, atk: 4}, nature: 'Modest',
			},
			'KrisTami': {
				species: 'Mewtwo', ability: 'Holy Force', item: ['Weakness Policy', 'Petaya Berry', 'Psychium Z'], gender: 'F',
				moves: ['Revelation Dance', ['Thunderbolt', 'Ice Beam', 'Flamethrower', 'Dazzling Gleam', 'Aura Sphere', 'Shadow Ball', 'Psystrike', 'Dark Pulse', 'Spacial Rend', 'Aeroblast', 'Hyper Beam', 'Bug Buzz', 'Flash Cannon', 'Earth Power', 'Power Gem', 'Sludge Wave', 'Seed Flare', 'Water Pulse'], 'Quiver Dance'],
				signatureMove: 'Weakness Analysis',
				evs: {spa: 252, spe: 252, atk: 4}, nature: 'Mild',
			},
			'bidoferz': {
				species: 'Pyroar', ability: 'Exhausted Pressure', item: 'Petaya Berry', gender: 'M',
				moves: [['Nasty Plot', 'Tail Glow'], 'Blue Flare', 'Psystrike'],
				signatureMove: 'The Circle of Life Roar',
				evs: {spa: 252, spe: 252, atk: 4}, nature: 'Modest',
			},
			'Blitzamirin': {
				species: 'Absol', ability: 'Dark Aura', item: 'Absolite', gender: 'M',
				moves: ['Flare Blitz', ['Swords Dance', 'Bulk Up', 'Coil'], 'Thousand Arrows'],
				signatureMove: 'Invertigo',
				evs: {atk: 252, spe: 252, spa: 4}, nature: 'Naughty',
			},
		};
		let pool = Object.keys(sets);
		/** @type {{[type: string]: number}} */
		let typePool = {};
		while (pool.length && team.length < 6) {
			let name = this.sampleNoReplace(pool);
			let tpkssbSet = sets[name];
			// Enforce typing limits
			let types = this.getTemplate(tpkssbSet.species).types;
			if (name === 'loss') types = ["Dragon", "Fairy", "Water"];
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
			/** @type {PokemonSet} */
			let set = {
				name: name,
				species: tpkssbSet.species,
				item: Array.isArray(tpkssbSet.item) ? this.sampleNoReplace(tpkssbSet.item) : tpkssbSet.item,
				ability: Array.isArray(tpkssbSet.ability) ? this.sampleNoReplace(tpkssbSet.ability) : tpkssbSet.ability,
				moves: [],
				nature: Array.isArray(tpkssbSet.nature) ? this.sampleNoReplace(tpkssbSet.nature) : tpkssbSet.nature,
				gender: tpkssbSet.gender,
				evs: {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0},
				ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
				level: tpkssbSet.level || 100,
				shiny: tpkssbSet.shiny,
			};
			if (tpkssbSet.ivs) {
				for (let iv in tpkssbSet.ivs) {
					// IVs from the set override the default of 31, assume the hardcoded IVs are legal
					// @ts-ignore StatsTable has no index signature
					set.ivs[iv] = tpkssbSet.ivs[iv];
				}
			}
			if (tpkssbSet.evs) {
				for (let ev in tpkssbSet.evs) {
					// EVs from the set override the default of 0, assume the hardcoded EVs are legal
					// @ts-ignore StatsTable has no index signature
					set.evs[ev] = tpkssbSet.evs[ev];
				}
			} else {
				set.evs = {hp: 84, atk: 84, def: 84, spa: 84, spd: 84, spe: 84};
			}
			while (set.moves.length < 3 && tpkssbSet.moves.length > 0) {
				let move = this.sampleNoReplace(tpkssbSet.moves);
				if (Array.isArray(move)) move = this.sampleNoReplace(move);
				set.moves.push(move);
			}
			set.moves.push(tpkssbSet.signatureMove);
			if (name === 'loseo' && set.item === 'Choice Scarf') set.moves[3] = 'Meteor Mass';
			team.push(set);
		}
		return team;
	}
}

module.exports = randomTPKSSBTeams;
