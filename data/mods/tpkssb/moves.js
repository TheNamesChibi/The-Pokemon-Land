'use strict';

// Used for one of the special moves
const randomTPKSSBTeams = require('./random-teams');
/** @type {typeof import('../../../sim/pokemon').Pokemon} */
const Pokemon = require(/** @type {any} */ ('../../../.sim-dist/pokemon')).Pokemon;

/** @type {{[k: string]: ModdedMoveData}} */
let BattleMovedex = {
// jetou
	smashtrap: {
		accuracy: 100,
		basePower: 150,
		category: "Physical",
		desc: "Fails unless the user is hit by a special attack from an opponent this turn before it can execute the move. If the user was hit and has not fainted, it attacks immediately after being hit, and the effect ends. If the opponent's special attack had a secondary effect removed by the Sheer Force Ability, it does not count for the purposes of this effect.",
		shortDesc: "Physical version of Shell Trap.",
		id: "smashtrap",
		name: "Smash Trap",
		pp: 5,
		priority: -3,
		flags: {protect: 1},
		isNonstandard: "Custom",
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile('smashtrap');
			this.add('-message', `${pokemon.name} sets up a trap.`);
		},
		// TODO: In order to correct PP usage, after spread move order has been reworked,
		// switch this to `onTry` + add `this.attrLastMove('[still]');`.
		beforeMoveCallback(pokemon) {
			if (!pokemon.volatiles['smashtrap'] || !pokemon.volatiles['smashtrap'].gotHit) {
				this.add('cant', pokemon, 'Smash Trap', 'Smash Trap');
				this.add('-message', `${pokemon.name}'s Smash Trap didn't work.`);
				return true;
			}
			this.add('-message', `${pokemon.side.foe.active[0].name} gets SMASHED!`);
		},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Close Combat", target);
		},
		effect: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Smash Trap');
			},
			onHit(pokemon, source, move) {
				if (pokemon.side !== source.side && move.category === 'Special') {
					pokemon.volatiles['smashtrap'].gotHit = true;
				}
			},
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Fighting",
	},
// Lionyx
	armorup: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Lowers the user's Attack, Speed and Special Attack by 1 stage. Raises the user's Defense and Special Defense by 2 stages.",
		shortDesc: "Reverse version of Shell Smash.",
		id: "armorup",
		isNonstandard: "Custom",
		name: "Armor Up",
		pp: 25,
		priority: 0,
		flags: {snatch: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Harden", source);
			this.add('-anim', source, "Iron Defense", source);
		},
		boosts: {
			def: 2,
			spd: 2,
			atk: -1,
			spa: -1,
			spe: -1,
		},
		secondary: null,
		target: "self",
		type: "Steel",
	},
// Lady Monita
	sparksfly: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "Has a 30% chance to burn the target.",
		shortDesc: "30% chance to burn the target.",
		id: "sparksfly",
		isNonstandard: "Custom",
		name: "Sparks Fly",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Spark", target);
		},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "normal",
		type: "Electric",
	},
// taylor
	taylorlovesyoubomb: {
		accuracy: 85,
		basePower: 130,
		category: "Physical",
		desc: "Has a 30% chance to change the target's ability to Slow Start.",
		shortDesc: "30% chance to change the foe's ability to Slow Start.",
		id: "taylorlovesyoubomb",
		isNonstandard: "Custom",
		name: "Taylor Loves You Bomb",
		pp: 5,
		priority: 0,
		flags: {protect: 1, bullet: 1, mirror: 1, contact: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Fling', target);
			this.add('-anim', target, 'Explosion', target);
		},
		secondary: {
			chance: 30,
			onHit(pokemon) {
			if (pokemon.ability === 'slowstart') return;
			let oldAbility = pokemon.setAbility('slowstart');
			if (oldAbility) {
				this.add('-ability', pokemon, 'Slow Start', '[from] move: Taylor Loves You Bomb');
				return;
			}
			return false;
		},
		},
		target: "normal",
		type: "Fire",
	},
// aFkRchASTl
	oblivionbeam: {
		accuracy: 100,
		basePower: 90,
		basePowerCallback: function (pokemon, target) {
			if (target.hp * 2 <= target.maxhp) return 130;
			return 90;
		},
		category: "Special",
		desc: "The user recovers 3/4 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down. After a hit, if the user has not fainted the user is cured of any statuses, clear negative boosts on itself and resets all of the target's stat stages to 0. Base power is 130 if the target has less than or equal to half of its maximum HP remaining.",
		shortDesc: "Heals damages, clear neg. boosts and clears foe's boosts; 130 if half HP.",
		id: "oblivionbeam",
		isNonstandard: "Custom",
		name: "Oblivion Beam",
		pp: 20,
		priority: 1,
		drain: [3, 4],
		flags: {mirror: 1, heal: 1, protect: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flash Cannon", target);
		},
		onHit: function (target, source) {
			target.clearBoosts();
			this.add('-clearboost', target);
			source.cureStatus();
            // Clearing Negatives
				let boosts = {};
				for (let i in source.boosts) {
					// @ts-ignore
					if (source.boosts[i] < 0) {
						boosts[i] = 0;
					}
				}
				source.setBoost(boosts);
				this.add('-clearnegativeboost', source, '[silent]');
			},
		secondary: null,
		target: "normal",
		type: "Grass",
	},
// lost-link
	lostlink: {
		accuracy: 100,
		basePower: 130,
		category: "Special",
		id: "lostlink",
		isNonstandard: "Custom",
		name: "LOST-LINK",
		desc: "Summons Psychic Terrain.",
		shortDesc: "Summons Psychic Terrain.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Psystrike", target);
		},
		onAfterMoveSecondarySelf() {
			this.field.setTerrain('psychicterrain');
		},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
// Vexen IV
	makessenseincontent: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "makessenseincontent",
		name: "Makes Sense in Content",
		desc: "Raises the all of the user's stats by 2 stages with an exception of evasion. Has a 50% chance to summon either Safeguard or Mist.",
		shortDesc: "All stats +2; 50% chance to set Safeguard or Mist.",
		isNonstandard: "Custom",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Amnesia", source);
		},
		boosts: {
			atk: 2,
			spa: 2,
			spe: 2,
			def: 2,
			spd: 2,
			accuracy: 2,
		},
		secondary: {
			chance: 10,
			onHit(target, source) {
				let result = this.random(2);
				if (result === 0) {
					source.side.addSideCondition('safeguard', source);
				} else {
					source.side.addSideCondition('mist', source);
				}
			},
		},
		target: "self",
		type: "Psychic",
	},
// Zalm
	zturn: {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		id: "zturn",
		isNonstandard: "Custom",
		name: "Z-Turn",
		desc: "Can use Baton Pass after a damage.",
		shortDesc: "Nearly strikes first. Uses Baton Pass after a damage.",
		pp: 5,
		priority: 2,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "U-Turn", target);
		},
		onAfterMoveSecondarySelf(target, source) {
			this.useMove('batonpass', target);
		},
		secondary: null,
		target: "normal",
		type: "Steel",
	},
// Darnell
	darnellpoweredup: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "darnellpoweredup",
		isNonstandard: "Custom",
		name: "Darnell: Powered Up",
		desc: "Raises the user's Speed, Attack and Special Attack by 1 stage.",
		shortDesc: "Raises the user's Atk, Spe. and Sp. Atk. by 1",
		pp: 20,
		priority: 0,
		flags: {snatch: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Work Up", source);
			this.add('-anim', source, "Agility", source);
		},
		boosts: {
			atk: 1,
			spa: 1,
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Psychic",
	},
// Spydreigon 
	hydraticpulse: {
		accuracy: 100,
		basePower: 90,
		category: "Special",
		desc: "Has a 30% chance to raise the user's Special Attack by 2 stages.",
		shortDesc: "30% chance to raise the user's Sp. Atk by 2.",
		id: "hydraticpulse",
		name: "Hydratic Pulse",
		isNonstandard: "Custom",
		pp: 20,
		priority: 0,
		flags: {protect: 1, pulse: 1, mirror: 1, distance: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Dark Pulse', target);
		},
		secondary: {
			chance: 30,
			self: {
				boosts: {
					spa: 2,
				},
			},
		},
		target: "any",
		type: "Dark",
	},
// Tenshi³
	ultranet: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "If the target uses a damaging move this turn, it is prevented from executing and the target loses a half of its maximum HP.",
		shortDesc: "If using a damaging move, target loses 1/2 max HP.",
		id: "ultranet",
		name: "Ultra Net",
		pp: 20,
		priority: 1,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		volatileStatus: 'ultranet',
		effect: {
			duration: 1,
			onStart: function (pokemon, target) {
				this.add('-singleturn', target, 'move: Ultra Net');
			    this.attrLastMove('[still]');
			    this.add('-anim', target, "Sticky Web", pokemon);
                this.add('message', `An ultra net covered ${target.name} in hopes for damage.`);
			},
			onTryMovePriority: -1,
			onTryMove: function (pokemon, target, move) {
				if (move.category === 'Physical' || move.category === 'Special') {
					this.add('-activate', pokemon, 'move: Ultra Net');
			        this.attrLastMove('[still]');
			        this.add('-anim', pokemon, "Explosion", pokemon);
					this.add('message', `When ${pokemon.name} hits ${target.name} with a net, it exploded!`);
			 		this.damage(this.clampIntRange(Math.round(pokemon.maxhp / 2), 1));
					return false;
				}
			},
		},
		secondary: null,
		isNonstandard: "Custom",
		target: "normal",
		type: "Psychic",
	},
// KrisTami
	weaknessanalysis: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user will change its type that matches one of the target's weaknesses and uses Imperfect Power. Fails if the target has no weaknesses",
		shortDesc: "Changes user/move type to a weakness of target.",
		id: "weaknessanalysis",
		name: "Weakness Analysis",
		isNonstandard: "Custom",
		pp: 25,
		priority: 2,
		flags: {authentic: 1, protect: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Extreme Evoboost", source);
		},
		onHit(target, source) {
			let targetTypes = target.getTypes(true).filter(type => type !== '???');
			if (!targetTypes.length) {
				if (target.addedType) {
					targetTypes = ['Normal'];
				} else {
					return false;
				}
			}
			let weaknesses = [];
			for (let type in this.data.TypeChart) {
				let typeMod = this.getEffectiveness(type, targetTypes);
				if (typeMod > 0 && this.getImmunity(type, target)) weaknesses.push(type);
			}
			if (!weaknesses.length) {
				return false;
			}
			let randomType = this.sample(weaknesses);
			source.types = [randomType];
			this.add('-start', source, 'typechange', `${randomType}`);
			this.useMove('imperfectpower', source, target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	imperfectpower: {
		accuracy: true,
		basePower: 130,
		category: "Special",
		desc: "Has a 30% chance to confuse the target and lower all of its stats (excluding accuracy and evasion) by 1 stage. The user recovers 3/4 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down. The user steals the foe's boosts. This move's type depends on the user's primary type. If the user's primary type is typeless, this move's type is the user's secondary type if it has one, otherwise the added type from Forest's Curse or Trick-or-Treat. This move is typeless if the user's type is typeless alone. Could clear terrains, weather and target's stat boosts. Ignores abilities, type immunities, defensives, evasions, etc.",
		shortDesc: "Does many things.",
		id: "imperfectpower",
		name: "Imperfect Power",
		isNonstandard: "Custom",
		pp: 10,
		priority: 0,
		flags: {authentic: 1, heal: 1},
		noSketch: true,
		drain: [3, 4],
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.field.clearWeather();
			this.field.clearTerrain();
			this.add('-anim', source, "Fairy Lock", source);
			this.add('-anim', source, "Fairy Lock", source);
			this.add('-anim', source, "Prismatic Laser", target);
		},
		onModifyMove(move, pokemon) {
			let type = pokemon.types[0];
			if (type === "Bird") type = "???";
			move.type = type;
		},
		secondary: {
			chance: 30,
			volatileStatus: 'confusion',
			boosts: {
				atk: -1,
				spa: -1,
				spe: -1,
				def: -1,
				spa: -1,
			},
		},
		ignoreEvasion: true,
		ignoreDefensive: true,
		ignoreAbility: true,
		ignoreImmunity: true,
		stealsBoosts: true,
		target: "normal",
		type: "Normal",
	},
// bidoferz
	thecircleofliferoar: {
		accuracy: true,
		basePower: 140,
		category: "Special",
		desc: "This move does not check accuracy. This move and its effects ignore the Abilities and Typings of other Pokemon.",
		shortDesc: "This move doesn't check accuracy. Ignores abilities and types.",
		id: "thecircleofliferoar",
		isNonstandard: "Custom",
		name: "The Circle of Life Roar",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Boomburst", target);
		},
		secondary: null,
		ignoreAbility: true,
		ignoreImmunity: true,
		target: "allAdjacent",
		type: "Normal",
	},
// Blitzamirin
	invertigo: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "Causes the target's positive stat stages become negative and vice versa if this move hits. Can hit even if all of the target's stat stages are 0.",
		shortDesc: "Causes the target's stat stages to invert.",
		id: "invertigo",
		isNonstandard: "Custom",
		name: "Invertigo",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, authentic: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Embargo", source);
			this.add('-anim', source, "Slam", target);
		},
		onHit(target) {
			for (let i in target.boosts) {
				// @ts-ignore
				if (target.boosts[i] === 0) continue;
				// @ts-ignore
				target.boosts[i] = -target.boosts[i];
			}
			this.add('-invertboost', target, '[from] move: Invertigo');
		},
		secondary: null,
		target: "normal",
		type: "Dark",
	},

// Mario's Food

// Zarel

// lifeisDANK

// useless trainer

// The Immortal

// Scrappie
//////////////// Moves modded to match their Let's Go! counterparts
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
