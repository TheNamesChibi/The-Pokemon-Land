'use strict';

// Used for one of the special moves
const randomSCBXTeams = require('./random-teams');
/** @type {typeof import('../../../sim/pokemon').Pokemon} */
const Pokemon = require(/** @type {any} */ ('../../../.sim-dist/pokemon')).Pokemon;

/** @type {{[k: string]: ModdedMoveData}} */
let BattleMovedex = {
// Smash
	ultimaterandom: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Uses Shell Smash, then uses one of the high-BP moves. Recycles an item.",
		shortDesc: "Shell Smash, random move, Recycle.",
		id: "ultimaterandom",
		name: "Ultimate Random",
		pp: 10,
		priority: 0,
		flags: {},
		isNonstandard: "Custom",
		onHit(pokemon) {
			this.useMove("shellsmash", pokemon);
			this.useMove(["vcreate", "prismaticlaser", "roaroftime", "headsmash", "seedflare", "dragonascent", "originpulse", "mindblown", "eruption", "waterspout", "precipiceblades", "photongeyser", "sunsteelstrike", "moongeistbeam", "blastburn", "hydrocannon", "frenzyplant", "volttackle", "rockwrecker", "hyperbeam", "gigaimpact", "psystrike", "fleurcannon", "boomburst", "overheat", "psychoboost", "doomdesire", "leafstorm", "futuresight", "lightofruin", "shadowforce", "spacialrend", "crushgrip", "magmastorm", "lightofruin", "boltstrike", "blueflare", "fusionbolt", "fusionflare", "freezeshock", "iceburn", "dracometeor", ][this.random(42)], pokemon);
			if (pokemon.item || !pokemon.lastItem) return false;
			let item = pokemon.lastItem;
			pokemon.lastItem = '';
			this.add('-item', pokemon, this.dex.getItem(item), '[from] move: Recycle');
			pokemon.setItem(item);
		},
		secondary: null,
		target: "self",
		type: "Normal",
	},

// Kal
	horridscream: {
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "No additional effect.",
		shortDesc: "Always goes first.",
		id: "horridscream",
		name: "Horrid Scream",
		pp: 10,
		priority: 1,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		isNonstandard: "Custom",
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Boomburst", target);
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
	},

// Willy
	reverseattraction: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "Causes the target of the same gender to become infatuated. Fails if used against the Pokemon of the different gender, a Pokémon with the Oblivious Ability, or a Pokémon with the Aroma Veil Ability. 50% chance to raise the user's Attack by 2 stages.",
		shortDesc: "A target of the same gender gets infatuated. May raises Atk by 2.",
		id: "reverseattraction",
		name: "Reverse Attraction",
		isNonstandard: "Custom",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Play Rough", target);
		},
		onHit(target, source) {
			target.addVolatile('reverseattract', source);
		},
		secondary: {
			chance: 50,
			self: {
				boosts: {
					atk: 2,
				},
			},
		},
		target: "normal",
		type: "Fairy",
	},
	
// Narcia
	magicalswirl: {
		accuracy: 100,
		basePower: 95,
		category: "Special",
		desc: "Every Pokemon in the user's party is cured of its major status condition. If the user has not fainted, the user clears the negative boosts on itself and resets all of the target's postitive stat boosts to 0. The user restores 1/2 of its maximum HP, rounded half up.",
		shortDesc: "Cures the user's party of all status conditions.",
		id: "magicalswirl",
		isNonstandard: "Custom",
		name: "Magical Swirl",
		pp: 10,
		priority: 0,
		flags: {protect: 1, heal: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Sparkly Swirl", target);
		},
		self: {
			onHit(pokemon, source, move) {
				this.add('-activate', source, 'move: Aromatherapy');
				for (const ally of source.side.pokemon) {
					if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
						continue;
					}
					ally.cureStatus();
				}
			},
		},
		onHit: function (target, source) {
            // Clearing Positives for targets
				let boosts = {};
				for (let i in target.boosts) {
					// @ts-ignore
					if (target.boosts[i] > 0) {
						boosts[i] = 0;
					}
				}
			target.setBoost(boosts);
			this.add('-clearpositiveboost', target, '[silent]');
            // Clearing Negatives
				let boosts2 = {};
				for (let i in source.boosts2) {
					// @ts-ignore
					if (source.boosts2[i] < 0) {
						boosts2[i] = 0;
					}
				}
				source.setBoost(boosts2);
				this.add('-clearnegativeboost', source, '[silent]');
			},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			this.heal(pokemon.maxhp / 2, pokemon, pokemon, move);
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
	},

// Mikey
	exoboost: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Attack by 2 stages.",
		shortDesc: "Raises the user's Attack by 2.",
		id: "exoboost",
		isNonstandard: "Custom",
		name: "Exo Boost",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Synthesis", source);
			this.add('-anim', source, "Swords Dance", source);
		},
		boosts: {
			atk: 2,
			spe: 2,
			def: 2,
		},
		secondary: null,
		target: "self",
		type: "Fighting",
	},

// Lisa Palson
	xcreation: {
		accuracy: 100,
		basePower: 170,
		category: "Special",
		desc: "Lowers the user's Defense and Special Defense by 1 stage. This move's type effectiveness against Poison and Steel is changed to be super effective no matter what this move's type is.",
		shortDesc: "Lowers user's Defense, Sp. Def by 1. Supereffective against Poison/Steel.",
		id: "xcreation",
		name: "X Creation",
		pp: 5,
		priority: 10,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				def: -1,
				spd: -1,
			},
		},
		isNonstandard: "Custom",
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Fairy Lock", source);
			this.add('-anim', source, "Light of Ruin", target);
		},
		onEffectiveness: function (typeMod, target, type) {
			if (type === 'Poison') return 1;
			if (type === 'Steel') return 1;
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
	},

// Millie
	holysmokes: {
		basePower: 100,
		accuracy: 95,
		category: "Special",
		desc: "Has a 50% chance to badly poison the user and the target, unless the target is immune.",
		shortDesc: "50% chance to badly poison the user and the target.",
		id: "holysmokes",
		name: "HOLY SMOKES!",
		isNonstandard: "Custom",
		pp: 15,
		priority: 0,
		flags: {mirror: 1, protect: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Smog', target);
			this.add('-anim', source, 'Smog', target);
		},
		secondary: {
			chance: 50,
			status: 'tox',
	    	onHit(target, source) {
			let success = false;
			if (source.trySetStatus('tox', source)) success = true;
			return success;
		  },
		},
		target: "normal",
		type: "Poison",
	},

// Joe
	downthehatch: {
		basePower: 100,
		accuracy: 110,
		category: "Physical",
		desc: "Has a 30% chance to paralyze the target.",
		shortDesc: "30% chance to paralyze the target.",
		id: "downthehatch",
		name: "Down the Hatch",
		isNonstandard: "Custom",
		pp: 15,
		priority: 0,
		flags: {mirror: 1, protect: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Bullet Punch', target);
		},
		onHit(target, source) {
             if (source.name === 'Joe') this.add(`raw|<b>Joe:</b> Down the hatch!`);
		},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Steel",
	},

// Doug Funny
	itsallpower: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Taunts the foe, then uses Quiver Dance, Double Team, Coil, and uses Nature's Madness.",
		shortDesc: "Taunt + Quiver Dance + Double Team + Coil + Nature's Madness",
		id: "itsallpower",
		name: "It's All Power",
		pp: 20,
		priority: 0,
		flags: {},
		isNonstandard: "Custom",
		onHit(pokemon) {
			this.useMove("taunt", pokemon);
			this.useMove("quiverdance", pokemon);
			this.useMove("doubleteam", pokemon);
			this.useMove("coil", pokemon);
			this.useMove("naturesmadness", pokemon);
		},
		secondary: null,
		target: "self",
		type: "Normal",
	},
// Omar
	doh: {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		desc: "Has a 40% chance to lower the target's Defense by 2 stages.",
		shortDesc: "40% chance to lower the target's Def by 2.",
		id: "doh",
		name: "D'oh!",
		isNonstandard: "Custom",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Astonish', target);
		},
		secondary: {
			chance: 40,
			boosts: {
				def: -2,
			},
		},
		target: "normal",
		type: "Normal",
	},
// Amy Lou
	adragonsdream: {
		accuracy: 100,
		basePower: 130,
		category: "Special",
		desc: "Turns the foe into a Dragon/Psychic-type, then damaging it.",
		shortDesc: "Turns the foe into a Dragon/Psychic-type, then damaging it.",
		id: "adragonsdream",
		name: "A Dragon's Dream",
		isNonstandard: "Custom",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
            this.add('-anim', source, 'Moonblast', target);
            target.types = ['Dragon', 'Psychic'];
		    this.add('-start', target, 'typechange', 'Dragon/Psychic');
			this.add('-anim', source, 'Dragon Pulse', target);
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
	},
// Kris
	magictricks: {
		accuracy: 100,
		basePower: 110,
		category: "Special",
		desc: "%100 chance to raise all of the user's stats, then use Baton Pass.",
		shortDesc: "%100 chance to raise all of the user's stats, then use Baton Pass.",
		id: "magictricks",
		name: "Magic Tricks",
		isNonstandard: "Custom",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Trick', target);
			this.add('-anim', source, 'Moonblast', target);
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			this.useMove("batonpass", pokemon);
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					atk: 1,
					spa: 1,
					def: 1,
					spd: 1,
					spe: 1,
					accuracy: 1,
					evasion: 1,
				},
			},
		},
		target: "normal",
		type: "Psychic",
	},
// Aqua
	aquasrevenge: {
		accuracy: 100,
		basePower: 140,
		category: "Special",
		desc: "Has a 100% chance to lower the target's Speed and Special Defense by 1 stage.",
		shortDesc: "100% chance to lower the target's Spe. and Special Def. by 1.",
		id: "aquasrevenge",
		isNonstandard: "Custom",
		name: "Aqua's Revenge",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Steam Eruption', target);
		},
		secondary: {
			chance: 100,
			boosts: {
				spd: -1,
				spe: -1,
			},
		},
		target: "normal",
		type: "Water",
	},
// Ashtar
	darkhurricane: {
		accuracy: 75,
		basePower: 110,
		basePowerCallback: function (pokemon, target) {
			if (pokemon.template.speciesid !== 'absolmega') {
				return 160;
			}
			return 75;
		},
		category: "Special",
		desc: "Has a 30% chance to flinch the target. If hit, the target's Ability is rendered ineffective as long as it remains active. If the target uses Baton Pass, the replacement will remain under this effect. If the target's Ability is Battle Bond, Comatose, Disguise, Multitype, Power Construct, RKS System, Schooling, Shields Down, Stance Change, or Zen Mode, this effect does not happen, and receiving the effect through Baton Pass ends the effect immediately. If the user is an Absol-Mega, this move has a power of 160. This move combines Flying in its type effectiveness against the target.",
		shortDesc: "30% chance to flinch the target. Nullifies the foe(s) Ability.",
		id: "darkhurricane",
		isNonstandard: "Custom",
		name: "Dark Hurricane",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Dark Void', target);
			this.add('-anim', source, 'Hurricane', target);
		},
		onHit(target) {
			target.addVolatile('gastroacid');
		},
		onAfterSubDamage(damage, target) {
			target.addVolatile('gastroacid');
		},
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.dex.getEffectiveness('Flying', type);
		},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Dark",
	},
// Jethro
	releasethehounds: {
		accuracy: 100,
		basePower: 170,
		category: "Special",
		desc: "Has a 100% chance to lower the target's Special Defense by 1 stage.",
		shortDesc: "100% chance to lower the foe(s) Sp. Def by 1.",
		id: "releasethehounds",
		isNonstandard: "Custom",
		name: "Release the Hounds!",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, authentic: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Dark Pulse', target);
			this.add('-anim', source, 'Dark Pulse', target);
			this.add('-anim', source, 'Dark Pulse', target);
		},
		secondary: {
			chance: 100,
			boosts: {
				spd: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Dark",
	},
// Meddy
	supermegasmash: {
		accuracy: 100,
		basePower: 150,
		category: "Physical",
		desc: "If this move is successful, the user must recharge on the following turn and cannot select a move.",
		shortDesc: "User cannot move next turn.",
		id: "supermegasmash",
		isNonstandard: "Custom",
		name: "Super Mega Smash",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, authentic: 1, recharge: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Iron Head', target);
			this.add('-anim', source, 'Giga Impact', target);
		},
		self: {
			volatileStatus: 'mustrecharge',
		},
		secondary: null,
		target: "normal",
		type: "Steel",
	},
// Oscar
	luckystrikes: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Uses Laser Focus, then selects two of the random moves that have the high critical hit ratio.",
		shortDesc: "Laser Focus + 2 High Critical Hit Moves.",
		id: "luckystrikes",
		name: "Lucky Strikes",
		pp: 20,
		priority: 0,
		flags: {},
		isNonstandard: "Custom",
		onHit(pokemon) {
			this.useMove("laserfocus", pokemon);
			this.useMove(["10000000voltthunderbolt", "aeroblast", "aircutter", "attackorder", "blazekick", "crabhammer", "crosschop", "crosspoison", "drillrun", "nightslash", "karatechop", "leafblade", "poisontail", "psychocut", "razorleaf", "shadowclaw", "slash", "spacialrend", "stoneedge", ][this.random(19)], pokemon);
			this.useMove(["10000000voltthunderbolt", "aeroblast", "aircutter", "attackorder", "blazekick", "crabhammer", "crosschop", "crosspoison", "drillrun", "nightslash", "karatechop", "leafblade", "poisontail", "psychocut", "razorleaf", "shadowclaw", "slash", "spacialrend", "stoneedge", ][this.random(19)], pokemon);
		},
		secondary: null,
		target: "self",
		type: "Normal",
	},
// Opal
	sinisterdrain: {
		accuracy: 100,
		basePower: 110,
		category: "Special",
		desc: "The user recovers 3/4 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down. This move will badly poison, summon the leech seed and sets curse on the foe at the same time.",
		shortDesc: "Recovers 75% + Leech Seed + Badly Poison + Curse.",
		id: "sinisterdrain",
		isNonstandard: "Custom",
		name: "Sinister Drain",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1, heal: 1},
		drain: [3, 4],
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Moongeist Beam', target);
		},
		onHit(target, source) {
			target.addVolatile('leechseed', source);
			target.addVolatile('curse', source);
			target.trySetStatus('tox', source);
		},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
// Frances
	freezeflame: {
		accuracy: 100,
		basePower: 140,
		category: "Special",
		desc: "Has a 30% chance to either burn or freeze the target.",
		shortDesc: "30% chance to either burn or freeze target.",
		id: "freezeflame",
		isNonstandard: "Custom",
		name: "Freeze Flame",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Ice Burn", target);
		},
		secondary: {
			chance: 30,
			onHit(target, source) {
				let result = this.random(2);
				if (result === 0) {
					target.trySetStatus('brn', source);
				} else {
					target.trySetStatus('frz', source);
				}
			},
		},
		target: "normal",
		type: "Ice",
	},
// Exo
	exoactivation: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Increases all the stats (except accuracy and evasion) by 1 stage. If this Pokemon is a Rotom, it will transform into one of the forms and uses a special move based on that form. Heat uses Overheat, Frost uses Blizzard, Mow uses Leaf Storm, Fan uses Air Slash, and Wash uses Hydro Pump.",
		shortDesc: "Raises all stats by 1. Rotom -> Frost/Fan/Heat/Mow/Wash.",
		id: "exoactivation",
		isNonstandard: "Custom",
		name: "Exo Activation",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Geomancy', source);
			this.add('-anim', source, 'Extreme Evoboost', source);
		},
		onHit(target, source, move) {
			target = source.side.foe.active[0];
			this.boost({atk: 1, spa: 1, spe: 1, def: 1, spd: 1}, source);

			let rotomforms = ['', '-Heat', '-Fan', '-Mow', '-Frost', '-Wash'];
			let rotoms = rotomforms[this.random(rotomforms.length)];
			source.formeChange(`Rotom${rotoms}`, move, true);
			// Display correct Rotom forms on client
			if (rotoms) {
				this.add('-formechange', source, `Rotom${rotoms}`);
			}

			switch (rotoms) {
			case '':
				this.useMove("Ominous Wind", source);
				break;
			case '-Heat':
				this.useMove("Overheat", source);
				break;
			case '-Fan':
				this.useMove("Air Slash", source);
				break;
			case '-Mow':
				this.useMove("Leaf Storm", source);
				break;
			case '-Frost':
				this.useMove("Blizzard", source);
				break;
			case '-Wash':
				this.useMove("Hydro Pump", source);
				break;
			default:
				throw new Error(`Invalid Rotom Forms for Exo Activation selected: ${rotoms}`);
			}
		},
		target: "self",
		type: "Normal",
	},
//////////////// Teleport: Modded to to match its Let's Go! counterpart
	"teleport": {
		inherit: true,
		desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members.",
		shortDesc: "User switches out.",
		priority: -6,
		selfSwitch: true,
		onTryHit: true,
	},
};

exports.BattleMovedex = BattleMovedex;
