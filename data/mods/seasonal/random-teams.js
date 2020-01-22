'use strict';

const RandomTeams = require('../../random-teams');

class randomSeasonalMeleeTeams extends RandomTeams {
	randomSeasonalMeleeTeam() {
		let team = [];
		let variant = (this.random(2) === 1);
		let sets = {
			'Eevee General': {
				species: 'Eevee', ability: 'Prankster', item: 'Eviolite', gender: 'M',
				moves: ['extremespeed', 'swordsdance', ['milkdrink', 'knockoff', 'encore'][this.random(3)]],
				signatureMove: "Admin Things",
				evs: {hp:252, def:4, spe: 252}, nature: 'Jolly',
			},
			'scpinion': {
				species: 'Slowbro', ability: 'Unaware', item: 'Slowbronite',
				moves: ['slackoff', 'amnesia', 'steameruption'],
				signatureMove: "LOL! Room",
				evs: {hp:248, def:136, spd:124}, ivs: {spe:0}, nature: 'Relaxed',
			},
			'Scyther NO Swiping': {
				species: 'Scyther', ability: 'Technician', item: 'Razor Claw', gender: 'M',
				moves: ['leafblade', 'honeclaws', 'nightslash'],
				signatureMove: "Sniper Swipes",
				evs: {atk:252, def:4, spe:252}, nature: 'Jolly',
			},
			'shrang': {
				species: 'Gyarados', ability: 'Aerilate', item: 'Leftovers', gender: 'F',
				moves: ['dragondance', 'earthquake', 'stoneedge'],
				signatureMove: '.banword',
				evs: {atk:252, def:4, spe:252}, nature: 'Jolly',
			},
			'Sigilyph': {
				species: 'Sigilyph', ability: 'Magic Guard', item: 'Life Orb', gender: 'M', shiny: true,
				moves: ['aeroblast', 'blueflare', 'nightdaze'],
				signatureMove: 'Gamma Ray Burst',
				evs: {spa:252, spd:4, spe:252}, ivs: {atk:0}, nature: 'Timid',
			},
			'sirDonovan': {
				species: 'Togetic', ability: 'Gale Wings', item: 'Eviolite', gender: 'M',
				moves: ['roost', 'hurricane', 'charm'],
				signatureMove: "Ladies First",
				evs: {hp:252, spa:252, spe:4}, nature: 'Modest',
			},
			'Skitty': {
				species: 'Audino', ability: 'Intimidate', item: 'Audinite', gender: 'M',
				moves: ['acupressure', 'recover', ['taunt', 'cosmicpower', 'magiccoat'][this.random(3)]],
				signatureMove: "Ultimate Dismissal",
				evs: {hp:252, def:252, spd:4}, nature: 'Bold',
			},
			'Snobalt': {
				species: 'Voodoom', ability: 'Mountaineer', item: 'Life Orb', gender: 'M',
				moves: ['paleowave', 'darkpulse', 'quiverdance'],
				signatureMove: 'Cap Bust',
				evs: {def:4, spa:252, spe:252}, nature: 'Timid',
			},
			'Snowy': {
				species: 'Snover', ability: 'Holy Hail', item: 'Focus Sash', gender: 'F',
				moves: ['blizzard', 'gigadrain', 'leechseed'],
				signatureMove: 'Hail Whitequeen',
				evs: {spa:252, spd:4, spe:252}, nature: 'Modest',
			},
			'SolarisFox': {
				species: 'Delphox', ability: 'Klutz', item: ['Choice Scarf', 'Choice Band', 'Choice Specs', 'Assault Vest', 'Lagging Tail', 'Flame Orb', 'Toxic Orb'][this.random(7)], gender: 'M',
				moves: ['trick', 'lavaplume', 'psyshock'],
				signatureMove: "Wonder Bark",
				evs: {hp:40, spa:216, spe:252}, ivs: {atk:0}, nature: 'Timid',
			},
			'Sonired': {
				species: 'Anorith', ability: 'Sniper', item: 'Choice Band', gender: ['M', 'F', 'N'][this.random(3)],
				moves: ['stoneedge', 'megahorn', 'knockoff'],
				signatureMove: "God Turn",
				evs: {def:4, atk:252, spe:252}, nature: 'Jolly',
			},
			'SpaceBass': {
				species: 'Foongus', ability: 'Prankster', item: 'Eviolite', gender: 'M',
				moves: ['batonpass', 'ingrain', 'substitute'],
				signatureMove: "Army of Mushrooms",
				evs: {hp:252, def:128, spd:128}, nature: 'Sassy',
			},
			'sparktrain': {
				species: 'Seel', ability: 'Regenerator', item: 'Life Orb', gender: 'M',
				moves: ['fakeout', 'extremespeed', 'precipiceblades'],
				signatureMove: 'Pill Frenzy',
				evs: {hp:232, atk:252, spd:24}, nature: 'Adamant',
			},
			'SpecsMegaBeedrill': {
				species: 'Weedle', ability: 'Shield Dust', item: 'Focus Sash', gender: 'M',
				moves: ['blueflare', 'earthpower', 'sludgewave'],
				signatureMove: "High Five",
				evs: {def:4, spa:252, spe:252}, nature: 'Timid',
			},
			'Spy': {
				species: 'Hydreigon', ability: 'Mega Launcher', item: 'Life Orb', gender: 'M',
				moves: ['dragonpulse', 'darkpulse', 'aurasphere', 'originpulse', 'autotomize'],
				signatureMove: "Mineral Pulse",
				evs: {hp:4, spa:252, spe:252}, nature: 'Timid',
			},
			'Starmei': {
				species: 'Staryu', ability: 'Parental Bond', item: 'Leftovers', shiny: true,
				moves: ['cosmicpower', 'recover', 'nuzzle'],
				signatureMove: "RKO Outta Nowhere",
				evs: {hp:248, def:4, spe:252}, nature: 'Timid',
			},
			'Steamroll': {
				species: 'Growlithe', ability: 'Adaptability', item: 'Life Orb', gender: 'M',
				moves: ['flareblitz', 'wildcharge', 'superpower'],
				signatureMove: "Conflagration",
				evs: {atk:252, def:4, spe:252}, nature: 'Adamant',
			},
			'Sunfished': {
				species: 'Stunfisk', ability: 'Killjoy', item: 'Leftovers', gender: 'M',
				moves: ['simplebeam', 'discharge', 'earthpower'],
				signatureMove: "Flat Joke",
				evs: {hp:4, def:252, spd:252}, nature: 'Modest',
			},
			'Sweep': {
				species: 'Omastar', ability: 'Soundproof', item: 'Mystic Water', gender: 'M',
				moves: ['earthpower', 'shellsmash', 'icebeam'],
				signatureMove: '(wave(',
				evs: {spa:252, spd:4, spe:252}, nature: 'Modest',
			},
			'talkingtree': {
				species: 'Trevenant', ability: 'Harvest', item: ['sitrusberry', 'custapberry'][this.random(2)], gender: 'M',
				moves: ['woodhammer', 'shadowforce', ['shadowsneak', 'leechseed', 'refresh', 'poweruppunch'][this.random(3)]],
				signatureMove: 'I Want You Back',
				evs: {hp:252, atk:156, def:32, spd:72}, ivs: {spa:1, spe:9}, nature: 'Brave',
			},
			'Temporaryanonymous': {
				species: 'Doublade', ability: 'Tough Claws', item: 'Eviolite', gender: 'M',
				moves: ['swordsdance', ['xscissor', 'sacredsword', 'knockoff'][this.random(3)], 'geargrind'],
				signatureMove: "SPOOPY EDGE CUT",
				evs: {hp:252, atk:252, def:4}, nature: 'Adamant',
			},
			'Teremiare': {
				species: 'Zorua', ability: 'Multiscale', item: 'Red Card', gender: ['M', 'F', 'N'][this.random(3)], shiny: true,
				moves: ['encore', 'foulplay', 'batonpass'],
				signatureMove: "Broken Mirror",
				evs: {hp:252, spa:4, spe:252}, ivs: {atk:0}, nature: 'Timid',
			},
			'The Immortal': {
				species: 'Blastoise', ability: 'Magic Bounce', item: 'Blastoisinite', gender: 'M',
				moves: ['shellsmash', 'steameruption', 'dragontail'],
				signatureMove: "Sleep Walk",
				evs: {hp:252, def:4, spd:252}, nature: 'Sassy',
			},
			'TONE114': {
				species: 'Clawitzer', ability: 'Mega Launcher', item: 'Life Orb', gender: 'M',
				moves: ['icebeam', 'darkpulse', 'aurasphere'],
				signatureMove: "Desolation Pulse",
				evs: {spa:252, spd:4, spe:252}, nature: 'Modest',
			},
			'Trickster': {
				species: 'Whimsicott', ability: 'Illuminate', item: 'Quick Claw', gender: 'M',
				moves: ['substitute', 'sing', 'gigadrain'],
				signatureMove: "Sacred Spear Explosion",
				evs: {hp:252, def:4, spe:252}, nature: 'Timid',
			},
			'unfixable': {
				species: 'Cacnea', ability: 'Water Absorb', item: 'Eviolite', gender: 'F',
				moves: variant ? ['spikes', 'seedbomb', 'swordsdance'] : ['spikes', 'bulletseed', 'destinybond'],
				signatureMove: 'SPIKEY RAIN',
				evs: {atk:252, def:4, spd:252}, nature: variant ? 'Adamant' : 'Jolly',
			},
			'urkerab': {
				species: 'Skuntank', ability: 'Sniper', item: 'Razor Claw', gender: 'M',
				moves: ['nightslash', 'drillrun', 'crosspoison'],
				signatureMove: 'Holy Orders',
				evs: {hp:248, atk:228, def:24, spd:8}, nature: 'Careful',
			},
			'useless trainer': {
				species: 'Scatterbug', ability: 'Sturdy', item: 'Altarianite', gender: 'M',
				moves: ['stickyweb', 'stringshot', 'tackle'],
				signatureMove: 'Of Curse',
				evs: {atk:252, spa:252, spe:4}, nature: 'Serious',
			},
			'Vapo': {
				species: 'Vaporeon', ability: 'Primordial Sea', item: 'Splash Plate', gender: 'M',
				moves: ['scald', 'waterspout', 'icebeam'],
				signatureMove: "Wetwork",
				evs: {hp:252, def:4, spa:252}, ivs: {spe:0}, nature: 'Quiet',
			},
			'Vexen IV': {
				species: 'Politoed', ability: 'Sap Sipper', item: 'Life Orb', gender: 'M',
				moves: ['scald', 'gigadrain', 'thunderbolt'],
				signatureMove: "Debilitate",
				evs: {hp:248, def:8, spa:252}, nature: 'Modest',
			},
			'Winry': {
				species: 'Buizel', ability: 'Water Veil', item: 'Life Orb', gender: 'F', shiny: true,
				moves: ['watershuriken', ['jumpkick', 'iciclecrash'][this.random(2)], 'waterfall'],
				signatureMove: 'Fight to the Death',
				evs: {atk:252, def:4, spe:252}, nature: 'Jolly',
			},
			'xfix': {
				species: 'Xatu', ability: 'Magic Bounce', item: 'Focus Sash', gender: 'M',
				moves: ['substitute', 'thunderwave', 'roost'],
				signatureMove: '(Glitch Dimension)',
				evs: {hp:252, spd:252, def:4}, nature: 'Calm',
			},
			'xJoelituh': {
				species: 'Marowak', ability: 'Skill Link', item: 'Thick Club', gender: 'M',
				moves: ['bonerush', 'armthrust', 'rockblast'],
				signatureMove: "xHaxlituh",
				evs: {atk:252, spd:4, spe:252}, nature: 'Adamant',
			},
			'xShiba': {
				species: 'Fletchinder', ability: 'Gale Wings', item: 'Eviolite', gender: 'F',
				moves: ['dragonascent', 'sacredfire', 'roost'],
				signatureMove: "Go Inda Like Linda",
				evs: {hp:248, atk:252, spe:8}, nature: 'Adamant',
			},
			'Zarel': {
				species: 'Meloetta', ability: 'Serene Grace', item: '', gender: 'F',
				moves: ['lunardance', 'fierydance', 'perishsong', 'petaldance', 'quiverdance'],
				signatureMove: "Relic Song Dance",
				evs: {hp:4, atk:252, spa:252}, nature: 'Quiet',
			},
			'Zebraiken': {
				species: 'zebstrika', ability: 'Compound Eyes', item: 'Life Orb', gender: 'M',
				moves: ['thunder', ['fire blast', 'focusblast', 'highjumpkick', 'headsmash'][this.random(3)], ['blizzard', 'iciclecrash', 'sleeppowder'][this.random(3)]],
				signatureMove: "bzzt",
				evs: {atk:4, spa:252, spe:252}, nature: 'Hasty',
			},
			'Zero Lux Given': {
				species: 'Luxray', ability: 'Guts', item: 'Flame Orb', gender: 'M',
				moves: ['fusionbolt', 'facade', 'iciclespear'],
				signatureMove: "Pun Ray",
				evs: {atk:252, def:4, spe:252}, ivs: {spa:0}, nature: 'Adamant',
			},
			'Zodiax': {
				species: 'Gallade', ability: 'Defiant', item: 'Fighting Gem', gender: 'M',
				moves: ['thunderwave', 'agility', 'zenheadbutt'],
				signatureMove: "Standing Full",
				evs: {atk:252, def:4, spe:252}, nature: 'Jolly',
			},
		};
		// Generate the team randomly.
let pool = Object.keys(sets);
		/** @type {{[type: string]: number}} */
		let typePool = {};
		while (pool.length && team.length < 6) {
			let name = this.sampleNoReplace(pool);
			let ssbmSet = sets[name];
			// Enforce typing limits
			let types = this.getTemplate(ssbmSet.species).types;
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
				species: ssbmSet.species,
				item: Array.isArray(ssbmSet.item) ? this.sampleNoReplace(ssbmSet.item) : ssbmSet.item,
				ability: Array.isArray(ssbmSet.ability) ? this.sampleNoReplace(ssbmSet.ability) : ssbmSet.ability,
				moves: [],
				nature: Array.isArray(ssbmSet.nature) ? this.sampleNoReplace(ssbmSet.nature) : ssbmSet.nature,
				gender: ssbmSet.gender,
				evs: {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0},
				ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
				level: ssbmSet.level || 100,
				shiny: ssbmSet.shiny,
			};
			if (ssbmSet.ivs) {
				for (let iv in ssbmSet.ivs) {
					// IVs from the set override the default of 31, assume the hardcoded IVs are legal
					// @ts-ignore StatsTable has no index signature
					set.ivs[iv] = ssbmSet.ivs[iv];
				}
			}
			if (ssbmSet.evs) {
				for (let ev in ssbmSet.evs) {
					// EVs from the set override the default of 0, assume the hardcoded EVs are legal
					// @ts-ignore StatsTable has no index signature
					set.evs[ev] = ssbmSet.evs[ev];
				}
			} else {
				set.evs = {hp: 84, atk: 84, def: 84, spa: 84, spd: 84, spe: 84};
			}
			while (set.moves.length < 3 && ssbmSet.moves.length > 0) {
				let move = this.sampleNoReplace(ssbmSet.moves);
				if (Array.isArray(move)) move = this.sampleNoReplace(move);
				set.moves.push(move);
			}
			set.moves.push(ssbmSet.signatureMove);
			if (name === 'Maxim' && set.item === 'Choice Scarf') set.moves[3] = 'Meteor Mass';
			team.push(set);
		}
		return team;
	}
}

module.exports = randomSeasonalMeleeTeams;
