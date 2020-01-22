'use strict';

/** @typedef {{[name: string]: SCBOSet}} SCBOSets */
/**
 * @typedef {Object} SCBOSet
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
class RandomSCBOTeams extends RandomTeams {
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
	randomSCBOTeam(options = {}) {
		/** @type {PokemonSet[]} */
		let team = [];
		/** @type {SCBOSets} */
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
			'Static': {
				species: 'Pikachu', ability: 'Lightning Rod', item: 'Zap Plate', gender: 'M',
				moves: [['Splishy Splash', 'Floaty Fall', 'Zippy Zap'], 'Nasty Plot', 'Grass Knot'],
				signatureMove: 'Pika Power!',
				evs: {spa: 252, spd: 4, spe: 252}, nature: 'Modest',
			},
			'Erika': {
				species: 'Eevee', ability: 'Adaptability', item: 'Leftovers', gender: 'F',
				moves: ['Protect', 'Wish', ['Sizzly Slide', 'Bouncy Bubble', 'Buzzy Buzz', 'Glitzy Glow', 'Baddy Bad', 'Freezy Frost', 'Sappy Seed', 'Sparkly Swirl']],
				signatureMove: 'Evo-Impact',
				evs: {hp: 252, def: 4, spe: 252}, nature: 'Jolly',
			},
			'Aqua': {
				species: 'Mew', ability: 'Primordial Sea', item: 'Leftovers', gender: 'M',
				moves: [['Origin Pulse', 'Psystrike', 'Freeze Dry', 'Ice Beam'], 'Recover', 'Calm Mind'],
				signatureMove: 'Aqua Sphere',
				evs: {hp: 252, def: 4, spd: 252}, nature: 'Calm', shiny: true,
			},
			'Mizzy': {
				species: 'Wigglytuff', ability: 'Neuroforce', item: 'Expert Belt', gender: 'F',
				moves: ['Dazzling Gleam', ['Ice Beam', 'Thunderbolt', 'Flamethrower'], 'Calm Mind'],
				signatureMove: 'Prism Rocket',
				evs: {hp: 252, spd: 4, spa: 252}, nature: 'Rash',
			},
			'Zena': {
				species: 'Zygarde', ability: 'Power Construct', item: 'Leftovers', gender: 'F',
				moves: [['Thousand Arrows', 'Thousand Waves', 'Core Enforcer'], 'Close Combat', ['Cosmic Power', 'Work Up', 'Noble Roar']],
				signatureMove: 'Titan Force',
				evs: {hp: 252, def: 4, atk: 252}, nature: 'Adamant',
			},
			'Kyle': {
				species: 'Cacturne', ability: 'Desert Cactus', item: 'Big Root', gender: 'M',
				moves: [['Psychic', 'Cross Chop', 'Ice Punch'], 'Seed Flare', ['Flamethrower', 'Bullet Punch']],
				signatureMove: 'Desert Drain',
				evs: {hp: 252, atk: 4, spa: 252}, nature: 'Rash',
			},
			'Serene Star': {
				species: 'Sandslash-Alola', ability: 'Snow Power!', item: 'Icy Rock', gender: 'F',
				moves: [['Cross Chop', 'Zen Headbutt'], ['Ice Punch', 'Blizzard', 'Icicle Crash'], 'Liquidation'],
				signatureMove: 'Snow Dance',
				evs: {atk: 252, hp: 4, def: 252}, nature: 'Brave', shiny: true,
			},
			'Goby': {
				species: 'Dedenne', ability: 'Simple', item: 'Red Card', gender: 'M',
				moves: ['Dazzling Gleam', ['Calm Mind', 'Quiver Dance', 'Work Up'], ['Power Trip', 'Stored Power']],
				signatureMove: 'Electro Flash',
				evs: {atk: 252, spe: 4, spa: 252}, nature: 'Serious',
			},
			'The Hound': {
				species: 'Houndoom', ability: 'Flash Fire', item: 'Houndoominite', gender: 'F',
				moves: [['Night Daze', 'Dark Pulse'], ['Overheat', 'Flamethrower', 'Blue Flare'], 'Solar Beam'],
				signatureMove: 'Dark Flare',
				evs: {atk: 252, spe: 4, spa: 252}, nature: 'Modest',
			},
			'Felix': {
				species: 'Meowth', ability: 'Lucky Number Seven', item: 'Felixium Z', gender: 'M',
				moves: ['Baton Pass', ['Play Rough', 'Zen Headbutt'], ['Night Slash', 'Slash', 'Pay Day']],
				signatureMove: 'Metronome', // Base move for custom Z-move
				evs: {spe: 252, hp: 4, atk: 252}, nature: 'Docile',
			},
			'Chuck': {
				species: 'Skuntank', ability: 'Prankster', item: 'Air Balloon', gender: 'M',
				moves: ['Encore', 'Torment', 'Soak'],
				signatureMove: 'Frenzy Dance',
				evs: {atk: 252, hp: 4, spe: 252}, nature: 'Jolly',
			},
			'Abby': {
				species: 'Altaria', ability: 'Liquid Voice', item: 'Mystic Water', gender: 'F',
				moves: ['Hyper Voice', ['Dragon Pulse', 'Dragon Breath'], ['Quiver Dance', 'Calm Mind']],
				signatureMove: 'Mermaid Whirl',
				evs: {spa: 252, spd: 252, hp: 4}, nature: 'Rash',
			},
         'Nappa': {
				species: 'Gallade', ability: 'Hero\'s Will', item: 'Life Orb', gender: 'M',
				moves: [['Blaze Kick', 'Thunder Punch'], 'Psycho Cut', 'Shift Gear'],
				signatureMove: 'Hero\'s Sword',
				evs: {atk: 252, spe: 4, spa: 252}, nature: 'Adamant', shiny: true,
			},
			'Gidget': {
				species: 'Ditto', ability: 'Limber', item: 'Metal Powder', gender: 'F',
				moves: ['Transform', 'Baton Pass', 'Psych Up'],
				signatureMove: 'Gidgetblast',
				evs: {hp: 252, spa: 4, spe: 252}, nature: 'Timid',
			},
           'Sedna': {
				species: 'Marill', ability: 'Air Lock', item: 'Sitrus Berry', gender: 'F',
				moves: [['Play Rough', 'Dazzling Gleam'], 'Dragon Pulse', ['Aqua Tail', 'Surf']],
				signatureMove: 'Sky Dance',
				evs: {spa: 252, spe: 4, atk: 252}, nature: 'Quiet',
			},
			'Skyla': {
				species: 'Lugia', ability: 'Psychic Shield', item: 'Leftovers', gender: 'F',
				moves: ['Aeroblast', ['Dazzling Gleam', 'Psychic', 'Water Pulse'], ['Quiver Dance', 'Calm Mind']],
				signatureMove: 'Lugia\'s Song',
				evs: {def: 252, spa: 4, spd: 252}, nature: 'Lax', shiny: true,
			},
			'Kris Tami': {
				species: 'Mewtwo', ability: 'Chaos Innation', item: 'Mewtwonite Y', gender: 'F',
				moves: ['Dark Pulse', ['Thunderbolt', 'Ice Beam', 'Flamethrower'], ['Quiver Dance', 'Calm Mind']],
				signatureMove: 'Psycho Flare',
				evs: {spa: 252, spe: 252, hp: 4}, nature: 'Rash',
			},
			'Sekka': {
				species: 'Silvally', ability: 'RKS System', item: 'Normalium Z', gender: 'F',
				moves: [['Outrage', 'Play Rough', 'Extreme Speed'], ['Ice Beam', 'Thunderbolt', 'Flamethrower'], 'Multi-Attack'],
				signatureMove: 'Type Change',
				evs: {atk: 252, spe: 4, spa: 252}, nature: 'Serious',
			},
            'Leonas': {
				species: 'Serperior', ability: 'Contrary', item: 'Leftovers', gender: 'M',
				moves: ['V-Create', ['Draco Meteor', 'Leaf Storm', 'Overheat', 'Fleur Cannon', 'Psycho Boost'], ['Close Combat', 'Superpower']],
				signatureMove: 'Turn Over',
				evs: {spa: 252, spe: 4, atk: 252}, nature: 'Modest',
			},
			'Anabelle': {
				species: 'Starmie', ability: 'Psychic Surge', item: 'Terrain Extender', gender: 'F',
				moves: [['Psystrike', 'Psychic'], ['Ice Beam', 'Surf', 'Dazzling Gleam'], 'Water Pulse'],
				signatureMove: 'Fairy Pulse',
				evs: {spa: 252, spe: 4, spd: 252}, nature: 'Rash',
			},
			'Crystal': {
				species: 'Suicune', ability: 'Misty Guard', item: 'Sitrus Berry', gender: 'F',
				moves: [['Water Pulse', 'Surf'], ['Bouncy Bubble', 'Psychic', 'Dazzling Gleam'], 'Freeze Dry'],
				signatureMove: 'Crystal Boom',
				evs: {spa: 252, spd: 4, spe: 252}, nature: 'Timid', shiny: true
			},
			'Speedy': {
				species: 'Jolteon', ability: 'Galvanize', item: 'Focus Sash', gender: 'M',
				moves: [['Extreme Speed', 'Quick Attack'], ['Grass Knot', 'Aqua Tail', 'Ice Shard'], 'Endeavor'],
				signatureMove: 'Charge Spin',
				evs: {atk: 252, def: 4, spe: 252}, nature: 'Jolly',
			},
			'Gold Ho-Oh': {
				species: 'Ho-Oh', ability: 'Mountaineer', item: 'Gold Ho-Ohnium Z', gender: 'M',
				moves: ['Sunny Day', ['Wish', 'Recover', 'Healing Wish'], ['Wild Charge', 'Earthquake', 'Power Whip']],
				signatureMove: 'Sacred Fire',
				evs: {atk: 252, def: 4, spd: 252}, nature: 'Adamant', shiny: true,
			},
         'AJ The Keldeo': {
				species: 'Keldeo', ability: 'Justified', item: 'Payapa Berry', gender: 'M',
				moves: ['Water Pulse', ['Ice Beam', 'Earth Power', 'Dark Pulse'], ['Secret Sword', 'Sacred Sword']],
				signatureMove: 'Oblivion Sword',
				evs: {spa: 252, atk: 4, spe: 252}, nature: 'Modest',
			},	
         'Shade Master': {
				species: 'Giratina', ability: 'Dimensional Change', item: 'Red Card', gender: 'M',
				moves: ['Shadow Force', ['Outrage', 'Water Pulse', 'Stone Edge'], 'Recover'],
				signatureMove: 'Black Wing',
				evs: {atk: 252, hp: 4, def: 252}, nature: 'Brave',
			},	
         'Bulk-Up Man': {
				species: 'Rhydon', ability: 'Earth Force', item: 'Snowball', gender: 'M',
				moves: ['Stone Edge', 'Bulk-Up', ['Fire Punch', 'Ice Punch', 'Thunder Punch']],
				signatureMove: 'Gaia Gaizer',
				evs: {atk: 252, spd: 4, def: 252}, nature: 'Brave',
			},	
         'Gemini': {
				species: 'Porygon-Z', ability: 'Protean', item: 'Weakness Policy', gender: 'N',
				moves: ['Cosmic Power', ['Flamethrower', 'Thunderbolt', 'Ice Beam'], 'Recover'],
				signatureMove: 'Power Launcher',
				evs: {def: 252, spa: 4, spd: 252}, nature: 'Gentle',
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
		'Copy Katt': {
				species: 'Mimikyu', ability: 'Disguise', item: 'Lum Berry', gender: 'F',
				moves: ['Swords Dance', 'Shadow Sneak', ['Mimic', 'Mirror Move', 'Me First', 'Copycat']],
				signatureMove: 'Clone Copy',
				evs: {hp: 252, atk: 4, spe: 252}, nature: 'Hasty', shiny: true
			},
		'Blue': {
				species: 'Mudkip', ability: 'Drizzle', item: 'Splash Plate', gender: 'M',
				moves: ['Quiver Dance', 'Rest', 'Sleep Talk'],
				signatureMove: 'Blue Shower',
				evs: {spd: 252, hp: 4, spa: 252}, nature: 'Calm',
			},
		'Blaze': {
				species: 'Flareon', ability: 'Destiny\'s Fire', item: 'Heat Rock', gender: 'F',
				moves: ['Sunny Day', 'Solar Blade', 'Earthquake'],
				signatureMove: 'Atomic Fire',
				evs: {atk: 252, hp: 4, spe: 252}, nature: 'Calm',
			},
		'River': {
				species: 'Vaporeon', ability: 'Hydration', item: 'Damp Rock', gender: 'F',
				moves: ['Rain Dance', 'Earth Power', 'Freeze Dry'],
				signatureMove: 'Wave Bomb',
				evs: {spa: 252, hp: 4, spd: 252}, nature: 'Calm',
			},
		'Forte': {
				species: 'Regigigas', ability: 'Quick Start', item: 'Sitrus Berry', gender: 'M',
				moves: ['Belly Drum', ['Iron Head', 'Stone Edge', 'Ice Punch'], 'Dizzy Punch'],
				signatureMove: 'Forte Crush',
				evs: {atk: 252, def: 4, spe: 252}, nature: 'Brave',
			},
		'Oblivia': {
				species: 'Raichu-Alola', ability: 'Speed Boost', item: 'Aloraichium Z', gender: 'F',
				moves: ['Thunderbolt', ['Water Pulse', 'Flamethrower', 'Ice Beam', 'Giga Drain', 'Dazzling Gleam', 'Earth Power', 'Air Slash'], 'Tail Glow'],
				signatureMove: 'FUN!!!',
				evs: {spa: 252, hp: 4, spe: 252}, nature: 'Jolly',
			},
		'Nyra': {
				species: 'Kangaskhan', ability: 'Misty Surge', item: 'Kangaskhanite', gender: 'F',
				moves: ['Extreme Speed', ['Night Shade', 'Seismic Toss', 'Psywave'], 'Nature\'s Madness'],
				signatureMove: 'Rickroll Punch',
				evs: {atk: 252, hp: 4, spe: 252}, nature: 'Naughty',
			},
		'White': {
				species: 'Victini', ability: 'Instant Victory', item: 'Firium Z', gender: 'M',
				moves: ['V-Create', ['Psychic', 'Psystrike', 'Psycho Boost'], ['Bolt Strike', 'Glaciate', 'Blue Flare']],
				signatureMove: 'Natural Room',
				evs: {atk: 252, hp: 4, spa: 252}, nature: 'Naughty', shiny: true
			},
		'Alphus': {
				species: 'Ninjask', ability: 'Shock Puppet', item: 'Protective Pads', gender: 'M',
				moves: [['Lunge', 'X-Scissor', 'Bug Buzz'], ['Blue Flare', 'Bolt Strike', 'Steam Eruption', 'Glaciate', 'Foul Play', 'Play Rough', 'Iron Head', 'Photon Geyser', 'Aeroblast'], 'Haze'],
				signatureMove: 'Miracle Hold',
				evs: {atk: 252, spe: 4, spa: 252}, nature: 'Naughty', shiny: true
			},
		'Lyrica': {
				species: 'Articuno', ability: 'Aurora Surge', item: 'Leftovers', gender: 'F',
				moves: [['Ice Beam', 'Ice Hammer', 'Freeze Dry'], 'Thousand Arrows', 'Water Spout'],
				signatureMove: 'Shift Attack',
				evs: {atk: 252, spe: 4, spa: 252}, nature: 'Jolly'
			},
		'Blade': {
				species: 'Type: Null', ability: 'Protean', item: 'Weakness Policy', gender: 'M',
				moves: [['Extreme Speed', 'Crush Claw'], 'Outrage', ['Psychic', 'Play Rough']],
				signatureMove: 'Multi-Attack Burst',
				evs: {def: 252, spe: 4, spd: 252}, nature: 'Serious'
			},
		'Slashdown': {
				species: 'Scizor', ability: 'Flash Fire', item: 'Scizorite', gender: 'M',
				moves: ['Foul Play', 'Anchor Shot', 'Fire Lash'],
				signatureMove: 'Power Control',
				evs: {atk: 252, def: 4, spe: 252}, nature: 'Naughty'
			},
		'Zicko': {
				species: 'Aegislash', ability: 'Stance Change', item: 'Ironizer', gender: 'M',
				moves: ['Swords Dance', 'Recover', 'King\'s Shield'],
				signatureMove: 'Iron Sword',
				evs: {atk: 252, spe: 4, spa: 252}, nature: 'Docile'
			},
		'Gyro': {
				species: 'Sandslash', ability: 'Fur Coat', item: 'Defense Claw', gender: 'M',
				moves: ['Leaf Blade', 'Sacred Fire', 'Thousand Arrows'],
				signatureMove: 'Escape Thrust',
				evs: {atk: 252, hp: 4, def: 252}, nature: 'Impish'
			},
		'Merick': {
				species: 'Marowak-Alola', ability: 'Shadow Tag', item: 'Weakness Policy', gender: 'M',
				moves: ['Shadow Strike', 'Cosmic Power', 'Revelation Dance'],
				signatureMove: 'Prestige',
				evs: {atk: 252, spe: 4, spa: 252}, nature: 'Naughty'
			},
		'Lorica': {
				species: 'Sandshrew-Alola', ability: 'Frost Touch', item: 'Fireball', gender: 'F',
				moves: ['Ice Punch', 'Rest', 'Sleep Talk'],
				signatureMove: 'Part Of Your World',
				evs: {atk: 252, hp: 4, def: 252}, nature: 'Lax'
			},
		'Gyl': {
				species: 'Entei', ability: 'Fire Aura', item: ['Passho Berry', 'Firium Z'], gender: 'M',
				moves: ['Horn Leech', ['Thousand Arrows', 'Thousand Waves'], ['Swords Dance', 'Dragon Dance', 'Knock Off', 'Fire Lash']],
				signatureMove: 'Fire Rage',
				evs: {atk: 252, hp: 4, spe: 252}, nature: 'Adamant'
			},
		'Jady': {
				species: 'Snorlax', ability: 'Extreme Thick Fat', item: 'Chople Berry', gender: 'M',
				moves: ['Work Up', ['Stone Edge', 'Megahorn', 'Poison Jab'], ['Psychic', 'Water Pulse', 'Flamethrower']],
				signatureMove: 'Coverage',
				evs: {def: 252, hp: 4, spd: 252}, nature: 'Docile'
			},
		'Adelaide': {
				species: 'Lumineon', ability: 'Soul-Heart', item: 'Rindo Berry', gender: 'F',
				moves: ['Quiver Dance', ['Air Slash', 'Air Cutter', 'Tailwind'], 'Water Pulse'],
				signatureMove: 'Frost Wind',
				evs: {spa: 252, spd: 4, spe: 252}, nature: 'Modest'
			},
		'Waylon': {
				species: 'Skarmory', ability: 'Dragon\'s Edge', item: ['Choice Spike', 'Choice Specs', 'Choice Band', 'Choice Scarf'], gender: 'M',
				moves: ['Trick', ['Roost', 'Recover', 'Dragon Dance', 'Dragon Dance'], ['Steel Wing', 'King\'s Shield']], // Dragon Dance there is listed twice for 50% chance to get it,
				signatureMove: 'Dragon Wing',
				evs: {atk: 252, spe: 4, def: 252}, nature: 'Lax'
			},
		'Charlie': {
				species: 'Furret', ability: 'Prankster', item: 'Leftovers', gender: 'M',
				moves: ['Recover', 'Topsy-Turvy', 'Baton Pass'],
				signatureMove: 'Cool Drink',
				evs: {def: 252, spe: 4, spd: 252}, nature: 'Bashful'
			},
		'Zig': {
				species: 'Zigzagoon', ability: 'Volt Shocker', item: ['Terrain Extender', 'Chople Berry'], gender: 'M',
				moves: ['Extreme Speed', 'Anchor Shot', 'Slack Off'],
				signatureMove: 'Zig-Zap Goon',
				evs: {atk: 252, def: 4, spe: 252}, nature: 'Adamant'
			},
		'Poppy Seed': {
				species: 'Butterfree', ability: 'Weak Binder', item: 'Weakness Policy', gender: 'F',
				moves: ['Baton Pass', ['Powder', 'Aqua Jet', 'Earth Power', 'Ancient Power', 'Ice Beam'], 'Air Slash'],
				signatureMove: 'Bug Crash',
				evs: {atk: 252, spe: 4, spa: 252}, nature: 'Serious', shiny: true
			},
		'Mirica': {
				species: 'Celebi', ability: 'Star Aura', item: 'Rockium Z', gender: 'F',
				moves: [['Seed Flare', 'Giga Drain', 'Petal Dance'], 'Power Gem', ['Moongeist Beam', 'Moonblast']],
				signatureMove: 'Galaxy Dance',
				evs: {spa: 252, spe: 4, spd: 252}, nature: 'Bashful', shiny: true
			},
		'Montgomery': {
				species: 'Heracross', ability: 'Guts', item: 'Heracronite', gender: 'M',
				moves: [['Megahorn', 'Fell Stinger'], 'Stone Edge', ['Meteor Mash', 'Sunsteel Strike']],
				signatureMove: 'Power Burn',
				evs: {atk: 252, def: 4, spe: 252}, nature: 'Adamant'
			},
		'Harold': {
				species: 'Gengar', ability: 'Magic Bounce', item: 'Gengarite', gender: 'M',
				moves: ['Sludge Wave', ['Ice Beam', 'Focus Blast', 'Earth Power'], 'Nasty Plot',],
				signatureMove: 'Blast of Shadows',
				evs: {spa: 252, spd: 4, spe: 252}, nature: 'Modest'
			},
		'Loretta': {
				species: 'Meowstic-F', ability: 'Cute Body', item: 'Big Root', gender: 'F',
				moves: ['Cosmic Power', 'Play Rough', ['Water Pulse', 'Ice Punch']],
				signatureMove: 'Power Burst',
				evs: {atk: 252, spe: 4, spa: 252}, nature: 'Jolly'
			},
		'Roger': {
				species: 'Meowstic', ability: 'Cute Body', item: 'Big Root', gender: 'M',
				moves: ['Work Up', 'Dazzling Gleam', ['Water Pulse', 'Ice Punch']],
				signatureMove: 'Power Blow',
				evs: {def: 252, spe: 4, spd: 252}, nature: 'Jolly'
			},
		'Cyborg': {
				species: 'Genesect', ability: 'Flash Fire', item: ['Douse Drive', 'Chill Drive', 'Burn Drive', 'Shock Drive'], gender: 'M',
				moves: ['Techno Blast', 'Shift Gear', ['Blaze Kick', 'Fire Punch']],
				signatureMove: 'Tri Missle',
				evs: {atk: 252, spe: 4, spa: 252}, nature: 'Jolly', shiny: true
			},
		'Distro': {
				species: 'Hydreigon', ability: 'Vile Twist', item: 'Destructium Z', gender: 'M',
				moves: [['Dark Pulse', 'Night Daze'], 'Nasty Plot', ['Thunder', 'Fire Blast', 'Hurricane', 'Blizzard', 'Hydro Pump']],
				signatureMove: 'Destruction Power',
				evs: {spe: 252, hp: 4, spa: 252}, nature: 'Modest', shiny: true
			},
		'Bink': {
				species: 'Mankey', ability: 'Huge Fist', item: 'Quick Claw', gender: 'M',
				moves: ['Ice Punch', 'Thunder Punch', 'Fire Punch'],
				signatureMove: 'Pain Punch',
				evs: {atk: 252, hp: 4, spe: 252}, nature: 'Adamant'
			},
		'Lyoko': {
				species: 'Xerneas', ability: 'Survivalist', item: 'Leftovers', gender: 'F',
				moves: ['Quiver Dance', ['Thunderbolt', 'Flamethrower', 'Earth Power', 'Ice Beam', 'Giga Drain', 'Aura Sphere', 'Water Pulse', 'Dark Pulse', 'Dragon Pulse'], 'Moonblast'],
				signatureMove: 'Primordial Song',
				evs: {spa: 252, hp: 4, spe: 252}, nature: 'Mild'
			},
		'Bonky': {
				species: 'Bewear', ability: 'Unaware', item: ['Binding Band', 'Grip Claw'], gender: 'M',
				moves: ['Extreme Speed', ['Power-Up Punch', 'Zen Headbutt'], ['Shadow Punch', 'Ice Punch', 'Thunder Punch', 'Sucker Punch', 'Fire Punch']],
				signatureMove: 'Bear Hug',
				evs: {atk: 252, def: 4, spe: 252}, nature: 'Adamant'
			},
		'Simpson': {
				species: 'Kyurem', ability: 'Pure Crystal', item: 'Life Orb', gender: 'M',
				moves: ['Work Up', ['Fusion Flare', 'Fusion Bolt'], ['Ice Burn', 'Glaciate', 'Freeze Shock']],
				signatureMove: 'Basting Rush',
				evs: {atk: 252, spe: 4, spa: 252}, nature: 'Docile'
			},
		'Pupeye': {
				species: 'Passimian', ability: 'Exposed Power', item: 'Nakam Berry', gender: 'M',
				moves: ['Baton Pass', ['Anchor Shot', 'Mega Punch', 'Sucker Punch', 'Ice Punch'], 'Recycle'],
				signatureMove: 'Energy Punch',
				evs: {atk: 252, hp: 4, spe: 252}, nature: 'Naughty'
			},
		'Boomer': {
				species: 'Noivern', ability: 'Amplifier', item: 'Secret Scarf', gender: 'M',
				moves: ['Disarming Voice', 'Relic Song', 'Snarl', 'Sparkling Aria', 'Hyper Voice', 'Chatter'],
				signatureMove: 'Noble Screech',
				evs: {spa: 252, hp: 4, spe: 252}, nature: 'Hasty'
			},
		'Maggie 64': {
				species: 'Magikarp', ability: 'Faint Evasion', item: 'Leftovers', gender: 'F',
				moves: [['Thunderbolt', 'Dazzling Gleam', 'Dark Pulse', 'Dragon Pulse', 'Ice Beam', 'Flamethrower', 'Water Pulse', 'Giga Drain', 'Psychic'], 'Cosmic Power', ['Body Slam', 'Mach Punch', 'Wing Attack', 'Poison Jab', 'Earthquake', 'Rock Slide', 'X-Scissor', 'Shadow Punch', 'Heavy Slam']],
				signatureMove: 'Ready to Troll',
				evs: {def: 252, spe: 4, spd: 252}, nature: 'Bashful', shiny: true
			},
		'Silvereye': {
				species: 'Sableye', ability: 'Pure Silver', item: 'Darkinium Z', gender: 'M',
				moves: ['Power Trip', ['Cosmic Power', 'Work Up'], 'Dark Pulse'],
				signatureMove: 'Eye of Dark Silver',
				evs: {hp: 252, spe: 252, atk: 4}, nature: 'Hasty'
			},
		'Nigel': {
				species: 'Kyogre-Primal', ability: 'Aquatic Domain', item: 'Mystic Water', gender: 'M',
				moves: ['Origin Pulse', ['Calm Mind', 'Quiver Dance'], 'Thunder'],
				signatureMove: 'Water Termination',
				evs: {spa: 252, spd: 252, spe: 4}, nature: 'Modest'
			},
		'Riana': {
				species: 'Ribombee', ability: 'Magic Assemble', item: 'Fairium Z', gender: 'F',
				moves: ['Recover', ['Bug Buzz', 'Dazzling Gleam', 'Earth Power', 'Ice Beam'], 'Quiver Dance'],
				signatureMove: 'Shining Light',
				evs: {spe: 252, hp: 252, spd: 4}, nature: 'Timid', shiny: true
			},
		'Angel': {
				species: 'Sylveon', ability: 'Pixilate', item: 'Pixie Plate', gender: 'F',
				moves: ['Fake Out', ['Extreme Speed', 'Boomburst'], 'Tail Glow'],
				signatureMove: 'Heaven\'s Wrath',
				evs: {spa: 252, atk: 252, spe: 4}, nature: 'Mild', shiny: true
			},
		'Gerald': {
				species: 'Groudon-Primal', ability: 'Fiery Domain', item: 'Charcoal', gender: 'M',
				moves: ['Precipice Blades', ['Bulk Up', 'Coil'], 'Solar Blade'],
				signatureMove: 'Fire Domination',
				evs: {atk: 252, def: 252, spe: 4}, nature: 'Adamant'
			},
		'Danon': {
				species: 'Rattata', ability: 'Lucky Body', item: 'Multi-Belt', gender: 'M',
				moves: ['Extreme Speed', ['Flamethrower', 'Thunderbolt', 'Ice Beam'], 'Metronome'],
				signatureMove: 'Mystery Gift',
				evs: {hp: 252, atk: 4, spe: 252}, nature: 'Jolly'
			},
		'Frog': {
				species: 'Politoed', ability: 'Hydration', item: 'Damp Rock', gender: 'M',
				moves: ['Protect', ['Toxic', 'Hypnosis'], 'Rain Dance'],
				signatureMove: 'Aquatic Echo',
				evs: {hp: 4, spa: 252, spd: 252}, nature: 'Gentle'
			},
		'Millennium': {
				species: 'Arceus', ability: 'Color Aura', item: 'Normal Jewel', gender: 'N',
				moves: [['Flamethrower', 'Flare Blitz', 'Fire Blast'], ['Thunderbolt', 'Volt Tackle', 'Thunder'], ['Water Pulse', 'Steam Eruption', 'Hydro Pump']],
				signatureMove: 'Color Shift',
				evs: {spa: 252, hp: 4, spd: 252}, ivs: {hp: 31, def: 31, spd: 31, spa: 31, def: 31, spe: 31}, nature: 'Serious', shiny: true
			},
			'Zatch': {
				species: 'Necrozma', ability: 'Prism Armor', item: 'Zatchium Z', gender: 'N',
				moves: [['Sunsteel Strike', 'Moongeist Beam'], ['Photon Geyser', 'Prismatic Laser'], ['Spacial Rend', 'Roar of Time', 'Shadow Force',]],
				signatureMove: 'Z-Raider',
				evs: {hp: 4, atk: 252, spa: 252}, ivs: {hp: 31, def: 31, spd: 31, spa: 31, def: 31, spe: 31}, nature: 'Serious', shiny: true
			},
		'Omega Sheron': {
				species: 'Rayquaza', ability: 'Overdrive', item: 'Leftovers', gender: 'N',
				moves: [['Outrage', 'Dragon Claw'], 'Dragon Ascent', ['Recover', 'Roost', 'Shore Up']],
				signatureMove: 'Double Dragon',
				evs: {atk: 252, spe: 4, spa: 252}, ivs: {hp: 31, def: 31, spd: 31, spa: 31, def: 31, spe: 31}, nature: 'Docile', shiny: true
			},
		};
		let pool = Object.keys(sets);
		/** @type {{[type: string]: number}} */
		let typePool = {};
		let depth = 0;
		if (options.inBattle) this.allXfix = false;
		while (pool.length && team.length < 6) {
			if (depth >= 200) throw new Error(`Infinite loop in Super Cast Bros team generation.`);
			depth++;
			let name = this.allXfix ? 'xfix' : this.sampleNoReplace(pool);
			let scboSet = sets[name];

			if (!this.allXfix) {
				// Enforce typing limits
				let types = this.dex.getTemplate(scboSet.species).types;
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
				species: scboSet.species,
				item: Array.isArray(scboSet.item) ? this.sampleNoReplace(scboSet.item) : scboSet.item,
				ability: Array.isArray(scboSet.ability) ? this.sampleNoReplace(scboSet.ability) : scboSet.ability,
				moves: [],
				nature: Array.isArray(scboSet.nature) ? this.sampleNoReplace(scboSet.nature) : scboSet.nature,
				gender: scboSet.gender,
				evs: {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0},
				ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
				level: scboSet.level || 100,
				happiness: typeof scboSet.happiness === 'number' ? scboSet.happiness : 255,
				shiny: typeof scboSet.shiny === 'number' ? this.randomChance(1, scboSet.shiny) : scboSet.shiny,
			};
			if (scboSet.ivs) {
				for (let iv in scboSet.ivs) {
					// IVs from the set override the default of 31, assume the hardcoded IVs are legal
					// @ts-ignore StatsTable has no index signature
					set.ivs[iv] = scboSet.ivs[iv];
				}
			}
			if (scboSet.evs) {
				for (let ev in scboSet.evs) {
					// EVs from the set override the default of 0, assume the hardcoded EVs are legal
					// @ts-ignore StatsTable has no index signature
					set.evs[ev] = scboSet.evs[ev];
				}
			} else {
				set.evs = {hp: 84, atk: 84, def: 84, spa: 84, spd: 84, spe: 84};
			}
			while (set.moves.length < 3 && scboSet.moves.length > 0) {
				let move = this.sampleNoReplace(scboSet.moves);
				if (Array.isArray(move)) move = this.sampleNoReplace(move);
				set.moves.push(move);
			}
			set.moves.push(scboSet.signatureMove);
			if (name === 'Millennium' && this.dex.getItem(set.item).onPlate) {
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

module.exports = RandomSCBOTeams;
