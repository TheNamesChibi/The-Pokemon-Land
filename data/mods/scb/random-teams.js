'use strict';

/** @typedef {{[name: string]: SCBGSet}} SCBGSets */
/**
 * @typedef {Object} SCBGSet
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
class RandomSCBTeams extends RandomTeams {
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
	randomSCBTeam(options = {}) {
		/** @type {PokemonSet[]} */
		let team = [];
		/** @type {SCBSets} */
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
			'Aqua': {
				species: 'Mew', ability: 'Primordial Sea', item: 'Leftovers', gender: 'M',
				moves: [['Origin Pulse', 'Psystrike', 'Freeze Dry', 'Ice Beam'], 'Recover', 'Calm Mind'],
				signatureMove: 'Aqua Sphere',
				evs: {hp: 252, def: 4, spd: 252}, nature: 'Calm', shiny: true,
			},
			'Static': {
				species: 'Pikachu', ability: 'Lightning Rod', item: 'Zap Plate', gender: 'M',
				moves: [['Splishy Splash', 'Floaty Fall', 'Zippy Zap'], 'Nasty Plot', 'Grass Knot'],
				signatureMove: 'Pika Power!',
				evs: {spa: 252, spd: 4, spe: 252}, nature: 'Modest',
			},
			'Erika': {
				species: 'Eevee', ability: 'Adaptability', item: 'Leftovers', gender: 'F',
				moves: ['Protect', 'Wish', ['Sizzly Slide', 'Bouncy Bubble', 'Buzzy Buzz', 'Glitzy Glow', 'Baddy Bad', 'Freezy Frost', 'Sappy Seed', 'Sparkly Swirl']],
				signatureMove: 'Evormation',
				evs: {hp: 252, def: 4, spe: 252}, nature: 'Jolly',
			},
			'Drew': {
				species: 'Arctozolt', ability: 'Fossil Change', item: 'Eject Pack', gender: 'M',
				moves: ['Sticky Web', ['Bolt Beak', 'Fishious Rend'], ['Dragon Claw', 'Ice Punch'],],
				signatureMove: 'Superdance',
				evs: {atk: 252, spe: 252, def: 4}, nature: 'Jolly',
			},
			'Dynamo': {
				species: 'Shinx', ability: 'Levitate', item: 'Quick Claw', gender: 'M',
				moves: [['Ice Fang', 'Fire Fang'], 'Thunder Fang', 'Psychic Fangs'],
				signatureMove: 'Iron Fangs',
				evs: {spe: 252, spa: 4, atk: 252}, nature: 'Calm', shiny: true,
			},
			'Mizzy': {
				species: 'Wigglytuff', ability: 'Neuroforce', item: 'Expert Belt', gender: 'F',
				moves: ['Dazzling Gleam', ['Ice Beam', 'Thunderbolt', 'Flamethrower'], 'Calm Mind'],
				signatureMove: 'Prism Rocket',
				evs: {hp: 252, spd: 4, spa: 252}, nature: 'Rash',
			},
           'Sedna': {
				species: 'Marill', ability: 'Air Lock', item: 'Terrain Extender', gender: 'F',
				moves: [['Play Rough', 'Dazzling Gleam'], 'Dragon Pulse', ['Aqua Tail', 'Surf']],
				signatureMove: 'Sky Dance',
				evs: {spa: 252, spe: 4, atk: 252}, nature: 'Quiet',
			},
			'Jason': {
				species: 'Duraludon', ability: 'Magic Bounce', item: 'Heavy-Duty Boots', gender: 'M',
				moves: ['Steel Beam', 'Tail Glow', 'Core Enforcer'],
				signatureMove: 'Aura Life',
				evs: {spa: 252, def: 252, hp: 4}, nature: 'Modest',
			},
	    	'Distro': {
				species: 'Hydreigon', ability: 'Vile Twist', item: 'Destructium Z', gender: 'M',
				moves: [['Dark Pulse', 'Night Daze'], 'Nasty Plot', ['Thunder', 'Fire Blast', 'Hurricane', 'Blizzard', 'Hydro Pump']],
				signatureMove: 'Destruction Power',
				evs: {spe: 252, hp: 4, spa: 252}, nature: 'Modest', shiny: true
			},
			'Gary': {
				species: 'Corviknight', ability: 'Mirror Armor', item: 'Flying Gem', gender: 'M',
				moves: ['Steel Wing', 'Swords Dance', 'Shadow Strike'],
				signatureMove: 'Aerial Destruction',
				evs: {atk: 252, def: 252, hp: 4}, nature: 'Lax',
			},
         'Bulk-Up Man': {
				species: 'Rhydon', ability: 'Earth Force', item: 'Snowball', gender: 'M',
				moves: ['Stone Edge', 'Bulk-Up', ['Fire Punch', 'Ice Punch', 'Thunder Punch']],
				signatureMove: 'Gaia Gaizer',
				evs: {atk: 252, spd: 4, def: 252}, nature: 'Brave',
			},	
			'Artie': {
				species: 'Centiskorch', ability: 'Blaziate', item: 'Flame Plate', gender: 'M',
				moves: ['Extreme Speed', 'Fake Out', 'Megahorn'],
				signatureMove: 'Magma Hammer',
				evs: {atk: 252, hp: 252, def: 4}, nature: 'Brave',
			},
         'Max': {
				species: 'Umbreon', ability: 'Magic Bounce', item: 'Leftovers', gender: 'M',
				moves: ['Coil', 'Quiver Dance', 'Power Trip'],
				signatureMove: 'Forcewin 2.0',
				evs: {def: 252, hp: 4, spd: 252}, nature: 'Lax',
			},
         'Naru': {
				species: 'Espeon', ability: 'Aroma Veil', item: 'Lum Berry', gender: 'M',
				moves: ['Psychic', 'Celebrate', 'Dazzling Gleam'],
				signatureMove: 'Surprise, Pal!',
				evs: {hp: 252, spa: 4, spe: 252}, nature: 'Calm',
			},
         'Kasandra': {
				species: 'Liepard', ability: 'Illusion', item: 'Falsemiragium Z', gender: 'F',
				moves: [['Blizzard', 'Thunder', 'Fire Blast', 'Hydro Pump', 'Hurricane'], ['Psychic', 'Play Rough'], 'Outrage'],
				signatureMove: 'Dark Pulse',
				evs: {atk: 252, def: 4, spe: 252}, nature: 'Hasty', shiny: true,
			},
			'Lynda': {
				species: 'Frosmoth', ability: 'Crystal Body', item: 'Icy Rock', gender: 'F',
				moves: ['Dazzling Gleam', 'Blizzard', 'Bug Buzz'],
				signatureMove: 'Snowfall',
				evs: {spa: 252, spd: 252, hp: 4}, nature: 'Mild',
			},
	    	'Bonky': {
				species: 'Bewear', ability: 'Unaware', item: ['Binding Band', 'Grip Claw'], gender: 'M',
				moves: ['Extreme Speed', ['Power-Up Punch', 'Zen Headbutt'], ['Shadow Punch', 'Ice Punch', 'Thunder Punch', 'Sucker Punch', 'Fire Punch']],
				signatureMove: 'Bear Hug',
				evs: {atk: 252, def: 4, spe: 252}, nature: 'Adamant'
			},
			'Simmons': {
				species: 'Obstagoon', ability: 'Neutralizing Gas', item: 'Choice Band', gender: 'M',
				moves: ['Trick', ['Octolock', 'Anchor Shot'], 'Swords Dance'],
				signatureMove: 'Supernatural Impact',
				evs: {def: 252, atk: 252, spe: 4}, nature: 'Impish',
			},
	    	'Simpson': {
				species: 'Kyurem', ability: 'Pure Crystal', item: 'Life Orb', gender: 'M',
				moves: ['Work Up', ['Fusion Flare', 'Fusion Bolt'], ['Ice Burn', 'Glaciate', 'Freeze Shock']],
				signatureMove: 'Basting Rush',
				evs: {atk: 252, spe: 252, hp: 4}, nature: 'Docile'
			},
		'Oblivia': {
				species: 'Raichu-Alola', ability: 'Speed Boost', item: 'Aloraichium Z', gender: 'F',
				moves: ['Thunderbolt', ['Water Pulse', 'Flamethrower', 'Ice Beam', 'Giga Drain', 'Dazzling Gleam', 'Earth Power', 'Air Slash'], 'Tail Glow'],
				signatureMove: 'FUN!!!',
				evs: {spa: 252, hp: 4, spe: 252}, nature: 'Jolly',
			},
			'Flapjack': {
				species: 'Flapple', ability: 'Harvest', item: 'Sitrus Berry', gender: 'M',
				moves: [['Hone Claws', 'Coil'], 'Dragon Claw', 'Substitute'],
				signatureMove: 'Applejacks Raid',
				evs: {atk: 252, hp: 252, spe: 4}, nature: 'Naughty',
			},
		'Blaze': {
				species: 'Flareon', ability: 'Destiny\'s Fire', item: 'Heat Rock', gender: 'F',
				moves: ['Sunny Day', 'Solar Blade', 'Earthquake'],
				signatureMove: 'Atomic Fire',
				evs: {atk: 252, hp: 4, spe: 252}, nature: 'Calm',
			},
			'Bogie': {
				species: 'Toxtricity', ability: 'Punk Rock', item: 'Throat Spray', gender: 'M',
				moves: ['Overdrive', 'Boomburst', 'Disarming Voice'],
				signatureMove: 'Tocks Rocks',
				evs: {spa: 252, hp: 252, spe: 4}, nature: 'Mild',
			},
			'Bullet': {
				species: 'Perrserker', ability: 'Full Metal Body', item: 'Occa Berry', gender: 'M',
				moves: ['Trick Room', ['Aqua Tail', 'Photon Geyser'], 'Gyro Ball'],
				signatureMove: 'Silver Slam',
				evs: {atk: 252, def: 252, hp: 4}, nature: 'Brave',
			},
           'Vixie': {
				species: 'Comfey', ability: 'Vitality', item: 'Misty Seed ', gender: 'F',
				moves: ['Aqua Ring', ['Fleur Cannon', 'Light of Ruin'], 'Baton Pass'],
				signatureMove: 'Flower Dance',
				evs: {spd: 252, spa: 4, spe: 252}, nature: 'Calm',
			},
			'Willby': {
				species: 'Cinderace', ability: 'Libero', item: 'Expert Belt', gender: 'M',
				moves: ['Thunder Punch', ['Aqua Tail', 'Ice Punch', 'Bullet Punch', 'Foul Play', 'Photon Geyser'], 'Pyro Ball'],
				signatureMove: 'Super Power Ball',
				evs: {atk: 252, spe: 252, hp: 4}, nature: 'Naughty',
			},
			'Kris': {
				species: 'Mewtwo', ability: 'Maximization', item: 'Soul Orb', gender: 'F',
				moves: ['Flamethrower', 'Thunderbolt', 'Ice Beam'],
				signatureMove: 'Dynamax Blaster',
				evs: {hp: 4, spa: 252, spe: 252}, ivs: {spa: 31}, nature: 'Mild',
			},
         'Tara': {
				species: 'Magearna', ability: 'Contrary', item: 'Sitrus Berry', gender: 'F',
				moves: ['Fleur Cannon', 'V-create', 'Stored Power'],
				signatureMove: 'Light Rain',
				evs: {spa: 252, hp: 4, spd: 252}, nature: 'Quiet',
			},
		'Flippit': {
				species: 'Inkay', ability: 'Contrary', item: 'Leftovers', gender: 'M',
				moves: [['Close Combat', 'V-create'], 'Recover', 'Octazooka'],
				signatureMove: 'Expedia',
				evs: {spd: 252, hp: 4, def: 252}, nature: 'Calm'
			},
		'Jay': {
				species: 'Dialga', ability: 'Magic Bounce', item: 'Adamant Orb', gender: 'M',
				moves: ['Tail Glow', 'Doom Desire', ['King\'s Shield', 'Spiky Shield']],
				signatureMove: 'Cosmic Force Storm',
				evs: {spa: 252, def: 4, hp: 252}, nature: 'Quiet'
			},
		'Zanna': {
				species: 'Shuppet', ability: 'Sight Seer', item: 'Spooky Plate', gender: 'F',
				moves: ['Shadow Sneak', 'Dragon Dance', 'Anchor Shot'],
				signatureMove: 'Normalizer',
				evs: {atk: 252, hp: 4, spe: 252}, nature: 'Naughty'
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
			'Ashtar': {
				species: 'Absol', ability: 'One-Winged Angel', item: 'Figy Berry', gender: 'M',
				moves: ['Nasty Plot', 'Flamethrower', 'Air Slash'],
				signatureMove: 'Dark Hurricane',
				evs: {atk: 4, spa: 252, spe: 252}, nature: 'Rash', shiny: true,
			},
			'Oscar': {
				species: 'Sirfetch\'d', ability: 'Scrappy', item: 'Focus Sash', gender: 'M',
				moves: ['Meteor Assault', 'Swords Dance', 'Sacred Sword'],
				signatureMove: 'Lance Jab',
				evs: {hp: 4, atk: 252, spe: 252}, nature: 'Lonely', shiny: true,
			},
			'Frances': {
				species: 'Reshiram', ability: 'Therometer Boost', item: 'Light Clay', gender: 'M',
				moves: ['Spacial Rend', ['Blizzard', 'Freezy Frost'], 'Fusion Flare'],
				signatureMove: 'Freeze Flame',
				evs: {hp: 4, spa: 252, spe: 252}, nature: 'Mild',
			},
			'Puff': {
				species: 'Wooloo', ability: 'Misty Surge', item: 'Eviolite', gender: 'F',
				moves: ['Substitute', 'Photon Geyser', 'Clear Smog',],
				signatureMove: 'Cotton Puff Dust',
				evs: {def: 252, spd: 252, hp: 4}, nature: 'Impish',
			},
			'Gizmo': {
				species: 'Yamper', ability: 'Huge Power', item: 'Rusted Computer', gender: 'M',
				moves: ['Aura Wheel', 'Extreme Speed', ['Play Rough', 'Behemoth Blade']],
				signatureMove: 'Computer Wiz Change',
				evs: {atk: 252, spe: 252, hp: 4}, nature: 'Naive',
			},
			'Seraphi Man': {
				species: 'Eternatus', ability: 'Pressure', item: 'Enternal Orb', gender: 'M',
				moves: ['Sludge Wave', ['Flamethrower', 'Thunderbolt', 'Ice Beam', 'Surf', 'Energy Ball'], 'Substitute'],
				signatureMove: 'Blast of Eternity',
				evs: {def: 252, spd: 252, hp: 4}, nature: 'Bashful',
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

module.exports = RandomSCBTeams;
