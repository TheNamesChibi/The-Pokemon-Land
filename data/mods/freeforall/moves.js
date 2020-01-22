'use strict';

// Used for one of the moves
/** @type {typeof import('../../../sim/pokemon').Pokemon} */
const Pokemon = require(/** @type {any} */ ('../../../.sim-dist/pokemon')).Pokemon;

/** @type {{[k: string]: ModdedMoveData}} */
let BattleMovedex = {
	noblesong: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Special Attack by two stages and removes infatuation from the user.",
		shortDesc: "Raises Special Attack by 2, removes attraction.",
		id: "noblesong",
		name: "Noble Song",
		isNonstandard: "Custom",
		pp: 5,
		priority: 0,
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Sing', source);
		},
		onHit(target, source, move) {
			this.boost({spa: 2}, source, source, this.dex.getActiveMove('Noble Song'));
			if (source.volatiles['attract']) {
				this.add('-activate', source, 'move: Noble Song');
				source.removeVolatile('attract');
				this.add('-end', source, 'move: Attract', '[from] move: Noble Song');
			}
		},
		flags: {mirror: 1, snatch: 1},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMoveBoost: {spe: 2},
	},
	blizzardtornado: {
		accuracy: 50,
		basePower: 120,
		category: "Special",
		desc: "Has a 100% chance to freeze the target. If the weather is Hail, this move had an accuracy of 80.",
		shortDesc: "100% chance to freeze the target. %80 accuracy in hail.",
		id: "blizzardtornado",
		name: "Blizzard Tornado",
		isNonstandard: "Custom",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Blizzard", target);
			this.add('-anim', source, "Whirlwind", target);
		},
		onModifyMove(move) {
			if (this.field.isWeather('hail')) move.accuracy = 80;
		},
		secondary: {
			chance: 100,
			status: 'frz',
		},
		target: "allAdjacentFoes",
		type: "Ice",
		zMovePower: 180,
	},
	releasetheflames: {
		accuracy: true,
		category: "Status",
		desc: "Burns all Pokemon on the field.",
		shortDesc: "Burns all Pokemon on the field.",
		id: "releasetheflames",
		name: "Release the Flames!",
		isNonstandard: "Custom",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Ember", target);
		},
		onHit(target, source) {
			let success = false;
			if (target.trySetStatus('brn', source)) success = true;
			if (source.trySetStatus('brn', source)) success = true;
			return success;
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		zMoveBoost: {spa: 1},
	},
	ensnare: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "Prevents the target from switching out. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Parting Shot, U-turn, or Volt Switch. If the target leaves the field using Baton Pass, the replacement will remain trapped. The effect ends if the user leaves the field.",
		shortDesc: "Prevents the target from switching out.",
		id: "ensnare",
		isNonstandard: "Custom",
		name: "Ensnare",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Pursuit", target);
		},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			},
		},
		target: "normal",
		type: "Dark",
		zMovePower: 170,
	},
	fetishbonanza: {
		accuracy: 100,
		basePower: 130,
		category: "Special",
		desc: "%50 chance to curse, badily poison and leech seeded the target. If this move is successful, the foe's move has its speed halved.",
		shortDesc: "%50: Curse, Toxic and Leech Seed; Foe's speed halved when hit.",
		id: "fetishbonanza",
		isNonstandard: "Custom",
		name: "Fetish Bonanza",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Shattered Psyche", target);
			this.add('-anim', source, "Fleur Cannon", target);
		},
		secondary: {
			chance: 50,
			onHit(target, source) {
					let result = this.random(3);
				if (result === 0) {
					target.addVolatile('curse');
				} else if (result === 1) {
					target.trySetStatus('tox', source);
				} else {
					target.addVolatile('leechseed');
				}
			},
		},
		target: "normal",
		type: "Fairy",
		zMovePower: 180,
	},
	pebblethrow: {
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		desc: "Hits two to five times. Has a 1/3 chance to hit two or three times, and a 1/6 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.",
		shortDesc: "Hits 2-5 times in one turn.",
		id: "pebblethrow",
		isNonstandard: "Custom",
		name: "Pebble Throw",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: [2, 5],
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Rock Blast", target);
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		zMovePower: 100,
	},
	heartattack: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "This move causes infatuation the foe.",
		shortDesc: "Causes infatuation.",
		id: "heartattack",
		isNonstandard: "Custom",
		name: "Heart Attack",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Heart Stamp", target);
		},
		onHit(target, source) {
			target.addVolatile('attract', source);
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		zMovePower: 170,
	},
	wondershift: {
		accuracy: 100,
		basePower: 70,
		category: "Special",
		desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members.",
		shortDesc: "User switches out when hit.",
		id: "wondershift",
		isNonstandard: "Custom",
		name: "Wonder Shift",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Kinesis", target);
			this.add('-anim', source, "Shattered Psyche", target);
		},
		onAfterMoveSecondarySelf(target, source) {
			this.add('-anim', target, "Teleport", target);
			this.add('raw|Teleport Out!');
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMovePower: 120,
	},
	shadowsofdoom: {
		accuracy: true,
		basePower: 0,
		damage: 9999999,
		category: "Special",
		desc: "Automatically knockouts the foes when it hits. Ignores abilities, type immunities, and evasion and defensive stats. User faints after using this move.",
		shortDesc: "Auto-KO's foes. User faints.",
		id: "shadowsofdoom",
		name: "SHADOWS-OF-DOOM",
		isNonstandard: "Custom",
		pp: 5,
		noPPBoosts: true,
		ignoreAbility: true,
		ignoreImmunity: true,
		ignoreEvasion: true,
		ignoreDefensive: true,
		priority: 0,
		breaksProtect: true,
		flags: {},
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Night Shade', source);
			this.add('-anim', source, 'Dark Void', target);
			this.add('-anim', source, 'Black Hole Eclipse', target);
		},
		onHit(target, source) {
			this.add('-ohko');
			target.faint();
			source.faint();
		},
		target: "allAdjacentFoes",
		type: "Dark",
		zMovePower: 255,
	},
	exopunch: {
		accuracy: 100,
		basePower: 65,
		category: "Physical",
		isNonstandard: "Custom",
		shortDesc: "No additional effect.",
		id: "exopunch",
		name: "Exo Punch",
		pp: 35,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Aura Sphere', source);
			this.add('-anim', source, 'Mach Punch', target);
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		zMovePower: 100,
	},
	aquarush: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		isNonstandard: "Custom",
		desc: "Summons Rain Dance after doing damage.",
		shortDesc: "Summons Rain Dance after doing damage.",
		id: "aquarush",
		name: "Aqua Rush",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Surf', target);
			this.add('-anim', source, 'Tackle', target);
		},
		onAfterMoveSecondarySelf() {
			this.field.setWeather('raindance');
		},
		secondary: null,
		target: "normal",
		type: "Water",
		zMovePower: 160,
	},
	fieryexplosion: {
		accuracy: 100,
		basePower: 180,
		isNonstandard: "Custom",
		category: "Special",
		desc: "Lowers the user's Special Defense by 1 stage.",
		shortDesc: "Lowers the user's Sp. Def by 1.",
		id: "fieryexplosion",
		name: "Fiery Explosion",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Fire Blast', target);
			this.add('-anim', source, 'Explosion', target);
		},
		self: {
			boosts: {
				spd: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		zMovePower: 250,
	},
	subzerosmash: {
		accuracy: 90,
		basePower: 150,
		isNonstandard: "Custom",
		category: "Physical",
		desc: "If this move is successful, the user must recharge on the following turn and cannot select a move.",
		shortDesc: "User cannot move next turn.",
		id: "subzerosmash",
		name: "Subzero Smash",
		pp: 5,
		priority: 0,
		flags: {recharge: 1, protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Subzero Slammer', target);
		},
		self: {
			volatileStatus: 'mustrecharge',
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		zMovePower: 190,
	},
	spectrumaticshot: {
		accuracy: 100,
		basePower: 130,
		category: "Special",
		desc: "Lowers the user's Speed, Attack and Special Special Attack by 1 stage.",
		shortDesc: "Lowers user's Speed, Atk. and Sp. Atk. by 1.",
		id: "spectrumaticshot",
		name: "Spectrumatic Shot",
		pp: 5,
		priority: 0,
		isNonstandard: "Custom",
		flags: {recharge: 1, protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Extreme Evoboost', target);
			this.add('-anim', source, 'Prismatic Laser', target);
		},
		self: {
			boosts: {
				spe: -1,
				atk: -1,
				spa: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		zMovePower: 190,
	},
	soulblast: {
		accuracy: 100,
		basePower: 130,
		category: "Special",
		desc: "Has a 10% chance to either transform the target into a user, or setting a weak trap on a target.",
		shortDesc: "10% chance to transform or weaktrap the foe.",
		id: "soulblast",
		name: "Soul Blast",
		pp: 5,
		priority: 0,
		isNonstandard: "Custom",
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Light of Ruin', target);
		},
		secondaries: [
			{
				chance: 10,
		onHit(target, pokemon) {
			if (!target.transformInto(pokemon)) {
				return false;
			}
		},
			}, {
				chance: 10,
				volatileStatus: 'weaktrap',
			},
		],
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMovePower: 180,
	},
	transbeam: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "This move causes the target to transform into a copy of a user.",
		shortDesc: "Causes the foe to transform.",
		id: "transbeam",
		isNonstandard: "Custom",
		name: "Trans Beam",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Simple Beam", target);
		},
		onHit(target, pokemon) {
			if (!target.transformInto(pokemon)) {
				return false;
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMoveEffect: 'heal',
	},
	powerblade: {
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		desc: "This move ignores type immunities of any Pokémon.",
		shortDesc: "This move ignores type immunities",
		id: "powerblade",
		isNonstandard: "Custom",
		name: "Power Blade",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Synthesis", source);
			this.add('-anim', source, "Sacred Sword", target);
		},
		ignoreImmunity: true,
		secondary: null,
		target: "normal",
		type: "Fighting",
		zMovePower: 150,
	},
	freezedrop: {
		accuracy: 70,
		category: "Status",
		desc: "Freezes the target. This move does not ignore type immunity.",
		shortDesc: "Freezes the target.",
		id: "freezedrop",
		isNonstandard: "Custom",
		name: "Freeze Drop",
		pp: 20,
		priority: 0,
        flags: {protect: 1, reflectable: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Icy Wind", target);
		},
		ignoreImmunity: false,
		status: 'frz',
		secondary: null,
		target: "normal",
		type: "Ice",
		zMoveBoost: {spd: 2},
	},
	illusionburst: {
		accuracy: 100,
		category: "Special",
		basePower: 90,
		desc: "The user creates an illusion of the legendary or mythical Pokémon to take its place in battle. The illusion uses its species's base stats, HP, types, ability, and weight but retains the user's stat stages, gender, level, status conditions, trapping, binding, and pseudo-statuses such as confusion. Its HP is 100% of the user's maximum HP. When this illusion falls to zero HP, it breaks, and the user reverts to the state in which it used this move. This illusion absorbs indirect damage and authentic moves but does not reset the counter of bad poison when broken and cannot be transfered through Baton Pass. Transforming into this illusion will not fail. If the user switches out while the illusion is up, the illusion will be removed and the user will revert to the state in which it used this move.",
		shortDesc: "Uses a legendary, mythical or Ultra Beast Pokémon as an illusion.",
		id: "illusionburst",
		name: "Illusion Burst",
		isNonstandard: true,
		pp: 10,
		priority: 2,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source, move) {
			this.add('-anim', source, 'Night Shade', source);
			this.add('-anim', source, "Night Daze", target);
			this.add('-anim', source, "Transform", source);
		},
		onHit: function (target, source, move) {
			/** @type {{[forme: string]: string[]}} */
			let formes = {
				'Articuno': ['Substitute', 'Roost', 'Freeze-Dry', 'Hurricane', 'Illusion Burst'],
				'Zapdos': ['Discharge', 'Roost', 'Heat Wave', 'Defog', 'Illusion Burst'],
				'Moltres': ['Hurricane', 'Fire Blast', 'Roost', 'U-turn', 'Illusion Burst'],
				'Mewtwo': ['Amnesia', 'Psychic', 'Blizzard', 'Rest', 'Illusion Burst'],
				'Mewtwo-Mega-X': ['Low Kick', 'Taunt', 'Ice Punch', 'Stone Edge', 'Illusion Burst'],
				'Mewtwo-Mega-Y': ['Psystrike', 'Ice Beam', 'Fire Blast', 'Aura Sphere', 'Illusion Burst'],
				'Mew': ['Nasty Plot', 'Psychic', 'Fire Blast', 'Aura Sphere', 'Illusion Burst'],
				'Raikou': ['Calm Mind', 'Thunderbolt', 'Hidden Power Ice', 'Aura Sphere', 'Illusion Burst'],
				'Entei': ['Sacred Fire', 'Extreme Speed', 'Stone Edge', 'Flare Blitz', 'Illusion Burst'],
				'Suicune': ['Calm Mind', 'Rest', 'Sleep Talk', 'Scald', 'Illusion Burst'],
				'Lugia': ['Roost', 'Toxic', 'Dragon Tail', 'Psychic', 'Illusion Burst'],
				'Ho-Oh': ['Sacred Fire', 'Recover', 'Toxic', 'Defog', 'Illusion Burst'],
				'Celebi': ['Nasty Plot', 'Giga Drain', 'Dazzling Gleam', 'Psychic', 'Illusion Burst'],
				'Latias': ['Calm Mind', 'Draco Meteor', 'Psyshock', 'Roost', 'Illusion Burst'],
				'Latias-Mega': ['Draco Meteor', 'Psychic', 'Thunderbolt', 'Roost', 'Illusion Burst'],
				'Latios': ['Draco Meteor', 'Psychic', 'Recover', 'Defog', 'Illusion Burst'],
				'Latios-Mega': ['Psychic', 'Earthquake', 'Draco Meteor', 'Recover', 'Illusion Burst'],
				'Regirock': ['Stealth Rock', 'Stone Edge', 'Earthquake', 'Toxic', 'Illusion Burst'],
				'Registeel': ['Seismic Toss', 'Toxic', 'Stealth Rock', 'Protect', 'Illusion Burst'],
				'Regice': ['Rock Polish', 'Ice Beam', 'Focus Blast', 'Thunderbolt', 'Illusion Burst'],
				'Groudon': ['Rock Polish', 'Fire Blast', 'Precipice Blades', 'Dragon Pulse', 'Illusion Burst'],
				'Groudon-Primal': ['Stealth Rock', 'Swords Dance', 'Precipice Blades', 'Fire Punch', 'Illusion Burst'],
				'Kyogre': ['Origin Pulse', 'Earthquake', 'Ice Beam', 'Thunder', 'Illusion Burst'],
				'Kyogre-Primal': ['Water Spout', 'Calm Mind', 'Origin Pulse', 'Ice Beam', 'Illusion Burst'],
				'Rayquaza': ['Dragon Dance', 'Dragon Ascent', 'Earthquake', 'Extreme Speed', 'Illusion Burst'],
				'Rayquaza-Mega': ['Draco Meteor', 'Dragon Ascent', 'V-create', 'Extreme Speed', 'Illusion Burst'],
				'Jirachi': ['Iron Head', 'U-turn', 'Healing Wish', 'Fire Punch', 'Illusion Burst'],
				'Deoxys': ['Psycho Boost', 'Taunt', 'Pursuit', 'Ice Beam', 'Illusion Burst'],
				'Deoxys-Attack': ['Psycho Boost', 'Superpower', 'Ice Beam', 'Dark Pulse', 'Illusion Burst'],
				'Deoxys-Defense': ['Spikes', 'Taunt', 'Recover', 'Toxic', 'Illusion Burst'],
				'Deoxys-Speed': ['Stealth Rock', 'Taunt', 'Magic Coat', 'Spikes', 'Illusion Burst'],
				'Uxie': ['Stealth Rock', 'Psyshock', 'Yawn', 'Memento', 'Illusion Burst'],
				'Mesprit': ['Stealth Rock', 'Psychic', 'U-turn', 'Thunder Wave', 'Illusion Burst'],
				'Azelf': ['Stealth Rock', 'Explosion', 'Taunt', 'Fire Blast', 'Illusion Burst'],
				'Palkia': ['Hydro Pump', 'Spacial Rend', 'Thunder', 'Focus Punch', 'Illusion Burst'],
				'Dialga': ['Stealth Rock', 'Draco Meteor', 'Fire Blast', 'Thunder', 'Illusion Burst'],
				'Regigigas': ['Thunder Wave', 'Knock Off', 'Return', 'Drain Punch', 'Illusion Burst'],
				'Giratina': ['Defog', 'Rest', 'Toxic', 'Roar', 'Illusion Burst'],
				'Giratina-Origin': ['Defog', 'Hex', 'Dragon Pulse', 'Thunder Wave', 'Illusion Burst'],
				'Heatran': ['Magma Storm', 'Earth Power', 'Taunt', 'Toxic', 'Illusion Burst'],
				'Cresselia': ['Moonlight', 'Psyshock', 'Moonblast', 'Toxic', 'Illusion Burst'],
				'Phione': ['Rain Dance', 'Heal Bell', 'Scald', 'U-turn', 'Illusion Burst'],
				'Manaphy': ['Tail Glow', 'Surf', 'Psychic', 'Rain Dance', 'Illusion Burst'],
				'Darkrai': ['Dark Void', 'Nasty Plot', 'Dark Pulse', 'Thunder', 'Illusion Burst'],
				'Shaymin': ['Seed Flare', 'Earth Power', 'Hidden Power Ice', 'Synthesis', 'Illusion Burst'],
				'Shaymin-Sky': ['Seed Flare', 'Air Slash', 'Earth Power', 'Healing Wish', 'Illusion Burst'],
				'Arceus': ['Swords Dance', 'Extreme Speed', 'Shadow Claw', 'Recover', 'Illusion Burst'],
				'Victini': ['V-create', 'Bolt Strike', 'U-turn', 'Zen Headbutt', 'Illusion Burst'],
				'Cobalion': ['Swords Dance', 'Iron Head', 'Close Combat', 'Stealth Rock', 'Illusion Burst'],
				'Terrakion': ['Close Combat', 'Stone Edge', 'Earthquake', 'Rock Slide', 'Illusion Burst'],
				'Virizion': ['Swords Dance', 'Leaf Blade', 'Close Combat', 'Stone Edge', 'Illusion Burst'],
				'Tornadus': ['Hurricane', 'Heat Wave', 'Superpower', 'Grass Knot', 'Illusion Burst'],
				'Tornadus-Therian': ['Hurricane', 'Knock Off', 'U-turn', 'Defog', 'Illusion Burst'],
				'Thundurus': ['Nasty Plot', 'Thunderbolt', 'Hidden Power Ice', 'Focus Blast', 'Illusion Burst'],
				'Thundurus-Therian': ['Agility', 'Thunderbolt', 'Hidden Power Ice', 'Nasty Plot', 'Illusion Burst'],
				'Reshiram': ['Blue Flare', 'Draco Meteor', 'Roost', 'Toxic', 'Illusion Burst'],
				'Zekrom': ['Hone Claws', 'Bolt Strike', 'Outrage', 'Substitute', 'Illusion Burst'],
				'Landorus': ['Earth Power', 'Rock Slide', 'Stealth Rock', 'Hidden Power Ice', 'Illusion Burst'],
				'Landorus-Therian': ['Earthquake', 'U-turn', 'Stone Edge', 'Defog', 'Illusion Burst'],
				'Kyurem': ['Substitute', 'Ice Beam', 'Earth Power', 'Roost', 'Illusion Burst'],
				'Kyurem-Black': ['Freeze Shock', 'Fusion Bolt', 'Ice Beam', 'Earth Power', 'Illusion Burst'],
				'Kyurem-White': ['Ice Burn', 'Draco Meteor', 'Fusion Flare', 'Roost', 'Illusion Burst'],
				'Keldeo': ['Calm Mind', 'Scald', 'Secret Sword', 'Taunt', 'Illusion Burst'],
				'Keldeo-Resolute': ['Hydro Pump', 'Secret Sword', 'Scald', 'Icy Wind', 'Illusion Burst'],
				'Meloetta': ['Celebrate', 'Psychic', 'Focus Blast', 'Hyper Voice', 'Illusion Burst'],
				'Meloetta-Pirouette': ['Hyper Voice', 'Psychic', 'Focus Blast', 'Shadow Ball', 'Illusion Burst'],
				'Genesect': ['U-turn', 'Iron Head', 'Extreme Speed', 'Explosion', 'Illusion Burst'],
				'Xerneas': ['Moonblast', 'Geomancy', 'Thunder', 'Focus Blast', 'Illusion Burst'],
				'Yveltal': ['Dark Pulse', 'Oblivion Wing', 'Taunt', 'Sucker Punch', 'Illusion Burst'],
				'Zygarde': ['Dragon Dance', 'Thousand Arrows', 'Substitute', 'Dragon Tail', 'Illusion Burst'],
				'Zygarde-10%': ['Dragon Dance', 'Thousand Arrows', 'Extreme Speed', 'Outrage', 'Illusion Burst'],
				'Zygarde-Complete': ['Rest', 'Sleep Talk', 'Thousand Arrows', 'Dragon Tail', 'Illusion Burst'],
				'Diancie': ['Stealth Rock', 'Moonblast', 'Heal Bell', 'Toxic', 'Illusion Burst'],
				'Diancie-Mega': ['Stealth Rock', 'Moonblast', 'Diamond Storm', 'Earth Power', 'Illusion Burst'],
				'Hoopa': ['Nasty Plot', 'Shadow Ball', 'Focus Blast', 'Substitute', 'Illusion Burst'],
				'Hoopa-Unbound': ['Hyperspace Fury', 'Gunk Shot', 'Fire Punch', 'Drain Punch', 'Illusion Burst'],
				'Volcanion': ['Steam Eruption', 'Fire Blast', 'Earth Power', 'Sludge Bomb', 'Illusion Burst'],
				'Tapu Koko': ['Thunderbolt', 'Defog', 'Roost', 'U-turn', 'Illusion Burst'],
				'Tapu Lele': ['Psychic', 'Moonblast', 'Taunt', 'Focus Blast', 'Illusion Burst'],
				'Tapu Bulu': ['Wood Hammer', 'Horn Leech', 'Superpower', 'Stone Edge', 'Illusion Burst'],
				'Tapu Fini': ['Scald', 'Defog', 'Moonblast', 'Taunt', 'Illusion Burst'],
				'Cosmog': ['Splash', 'Teleport', 'Illusion Burst'],
				'Cosmoem': ['Splash', 'Teleport', 'Cosmic Power', 'Illusion Burst'],
				'Solgaleo': ['Sunsteel Strike', 'Flare Blitz', 'Earthquake', 'Stone Edge', 'Illusion Burst'],
				'Lunala': ['Calm Mind', 'Moongeist Beam', 'Psyshock', 'Moonblast', 'Illusion Burst'],
				'Nihilego': ['Sludge Wave', 'Thunderbolt', 'Grass Knot', 'Stealth Rock', 'Illusion Burst'],
				'Buzzwole': ['Hammer Arm', 'Toxic', 'Roost', 'Earthquake', 'Illusion Burst'],
				'Pheromosa': ['U-turn', 'Low Kick', 'Ice Beam', 'Throat Chop', 'Illusion Burst'],
				'Xurkitree': ['Thunderbolt', 'Hidden Power Ice', 'Energy Ball', 'Tail Glow', 'Illusion Burst'],
				'Celesteela': ['Leech Seed', 'Protect', 'Heavy Slam', 'Flamethrower', 'Illusion Burst'],
				'Kartana': ['Swords Dance', 'Leaf Blade', 'Sacred Sword', 'Giga Impact', 'Illusion Burst'],
				'Guzzlord': ['Draco Meteor', 'Dark Pulse', 'Fire Blast', 'Heavy Slam', 'Illusion Burst'],
				'Necrozma': ['Stealth Rock', 'Photon Geyser', 'Heat Wave', 'Calm Mind', 'Illusion Burst'],
				'Necrozma-Dusk-Mane': ['Swords Dance', 'Photon Geyser', 'Earthquake', 'Stone Edge', 'Illusion Burst'],
				'Necrozma-Dawn-Wings': ['Calm Mind', 'Photon Geyser', 'Moongeist Beam', 'Moonlight', 'Illusion Burst'],
				'Necrozma-Ultra': ['Dragon Pulse', 'Calm Mind', 'Photon Geyser', 'Moongeist Beam', 'Illusion Burst'],
				'Magearna': ['Shift Gear', 'Calm Mind', 'Fleur Cannon', 'Focus Blast', 'Illusion Burst'],
				'Magearna-Original': ['Volt Switch', 'Fleur Cannon', 'Focus Blast', 'Iron Head', 'Illusion Burst'],
				'Marshadow': ['Spectral Thief', 'Close Combat', 'Shadow Sneak', 'Hidden Power Ice', 'Illusion Burst'],
				'Poipole': ['Sludge Wave', 'Charm', 'Dragon Pulse', 'Nasty Plot', 'Illusion Burst'],
				'Naganadel': ['Draco Meteor', 'Sludge Wave', 'Nasty Plot', 'Fire Blast', 'Illusion Burst'],
				'Stakataka': ['Trick Room', 'Gyro Ball', 'Stone Edge', 'Earthquake', 'Illusion Burst'],
				'Blacephalon': ['Fire Blast', 'Shadow Ball', 'Hidden Power Ground', 'Trick', 'Illusion Burst'],
				'Zeraora': ['Plasma Fists', 'Close Combat', 'Grass Knot', 'Knock Off', 'Illusion Burst'],
				'Meltan': ['Thunderbolt', 'Flash Cannon', 'Toxic', 'Protect', 'Illusion Burst'],
				'Melmetal': ['Double Iron Bash', 'Earthquake', 'Thunder Punch', 'Ice Punch', 'Illusion Burst'],
			};
			let forme = Object.keys(formes)[this.random(106)];
			source.formeChange(forme);
            source.addVolatile('illusionmode');
			// Update movepool
			source.moveSlots = [];
			if (!formes[forme]) throw new Error(`Can't find moveset for the forme: "${forme}".`); // should never happen
			for (const [i, moveid] of formes[forme].entries()) {
				let move = this.dex.getMove(moveid);
                 if (!move.id) continue;
				source.moveSlots.push({
					move: move.name,
					id: move.id,
					pp: ((move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5),
					maxpp: ((move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5),
					target: move.target,
					disabled: false,
					disabledSource: '',
					used: false,
				});
				source.moves.push(move.id);
			}
			source.illusionHP = source.hp;
			source.heal(source.maxhp - source.hp, source, move);
			this.add('-heal', source, source.getHealth, '[silent]');
			this.add('-message', `${source.name} illusionized itself to ${forme}\!`);
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		zMovePower: 180,
	},
	rainbowpower: {
		accuracy: true,
		category: "Status",
		desc: "The user gains a random typing.",
		shortDesc: "Gains a random tryping.",
		id: "rainbowpower",
		isNonstandard: "Custom",
		name: "Rainbow Power",
		pp: 20,
		priority: 0,
        flags: {protect: 1, reflectable: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Geomancy", source);
			this.add('-anim', source, "Cosmic Power", source);
		},
		onHit: function (target, source) {
			const allTypes = ['Normal', 'Fire', 'Fighting', 'Water', 'Flying', 'Grass', 'Poison', 'Electric', 'Ground', 'Psychic', 'Rock', 'Ice', 'Bug', 'Dragon', 'Ghost', 'Dark', 'Steel', 'Fairy'];
			const type1 = allTypes[this.random(18)];
			const type2 = allTypes[this.random(18)];
			if (type1 === type2) {
				source.types = [type1];
				this.add('-start', source, 'typechange', `${type1}`);
			} else {
				source.types = [type1, type2];
				this.add('-start', source, 'typechange', `${type1}/${type2}`);
			}
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMoveBoost: {atk: 2, def: 2, spa: 2, spd: 2, spe: 2},
	},
	wondersword: {
		accuracy: true,
		basePower: 160,
		category: "Physical",
		desc: "This attack charges on the first turn and executes on the second. If the user is holding a Power Herb, the move completes in one turn. This move ignores type immunities and abilities of any Pokémon. This move is super-effective against any type. Can gaurantee to hit a Pokémon with Divine Shield. Cannot miss.",
		shortDesc: "Charges turn 1. Hits turn 2. Supereffective.",
		id: "wondersword",
		isNonstandard: "Custom",
		name: "Wonder Sword",
		pp: 5,
		priority: 0,
		flags: {charge: 1, contact: 1, protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove(attacker, defender, move) {
			this.attrLastMove('[still]');
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-anim', attacker, "Synthesis", attacker);
			this.add('-message', `${attacker.name}'s blade becomes cloaked with a bright light!`);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Extreme Evoboost", source);
			this.add('-anim', source, "Secret Sword", target);
		},
		onEffectiveness: function (typeMod, target) {
			return 1;
		},
		ignoreImmunity: true,
		ignoreAbility: true,
		secondary: null,
		target: "normal",
		type: "Fairy",
		zMovePower: 250,
	},
	necromancy: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Attack, Defense, and Speed by 2 stages. This attack charges on the first turn and executes on the second. If the user is holding a Power Herb, the move completes in one turn.",
		shortDesc: "Charges, then raises Atk, Def, Spe by 2 turn 2.",
		id: "necromancy",
		isNonstandard: "Custom",
		name: "Necromancy",
		pp: 5,
		priority: 0,
		flags: {charge: 1, nonsky: 1},
		onTryMovePriority: 100,
		onTryMove(attacker, defender, move) {
			this.attrLastMove('[still]');
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-anim', attacker, "Black Hole Eclipse", attacker);
			this.add('-message', `${attacker.name} is absorbing darkness!`);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Malicious Moonsault", source);
		},
		boosts: {
			atk: 2,
			def: 2,
			spe: 2,
		},
		secondary: null,
		target: "self",
		type: "Dark",
		zMoveBoost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1},
	},
	beverynice: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Lowers the target's Special Attack by 1 stage.",
		shortDesc: "Lowers the target's Special Attack by 1.",
		id: "beverynice",
		isNonstandard: "Custom",
		name: "Be Very Nice",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, mirror: 1, authentic: 1},
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Play Nice", source);
		},
		boosts: {
			spa: -1,
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMoveBoost: {spd: 1},
	},
	playhard: {
		accuracy: 95,
		basePower: 120,
		category: "Physical",
		desc: "Has a 30% chance to lower the target's Attack by 2 stages.",
		shortDesc: "30% chance to lower the target's Attack by 2.",
		id: "playhard",
		isNonstandard: "Custom",
		name: "Play Hard",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Double-Edge", source);
		},
		secondary: {
			chance: 30,
			boosts: {
				atk: -2,
			},
		},
		target: "normal",
		type: "Fairy",
		zMovePower: 160,
	},
	tripleslam: {
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		desc: "Hits three times. If the first hit breaks the target's substitute, it will take damage for the second hit.",
		shortDesc: "Hits 3 times in one turn.",
		id: "tripleslam",
		isNonstandard: "Custom",
		name: "Triple Slam",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Heavy Slam", target);
		},
		multihit: 3,
		secondary: null,
		target: "normal",
		type: "Normal",
		zMovePower: 110,
	},
	lightningofdestiny: {
		accuracy: 100,
		basePower: 135,
		category: "Special",
		desc: "This attack charges on the first turn and executes on the second. Power is halved if the weather is Hail, Sunny Day, Desolate Land, or Sandstorm. If the user is holding a Power Herb or the weather is Primordial Sea or Rain Dance, the move completes in one turn.",
		shortDesc: "Charges turn 1. Hits turn 2. No charge in rain.",
		id: "lightningofdestiny",
		name: "Lightning of Destiny",
		isNonstandard: "Custom",
		pp: 10,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove(attacker, defender, move) {
			this.attrLastMove('[still]');
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-anim', attacker, "Charge", attacker);
			this.add('-message', `${attacker.name} became charged in the storm!`);
			if (this.field.isWeather(['raindance', 'primordialsea'])) {
				this.attrLastMove('[still]');
				this.add('-anim', attacker, "Charge", attacker);
				this.add('-anim', attacker, "Flash", attacker);
				return;
			}
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Thunder", target);
		},
		onBasePower(basePower, pokemon, target) {
			if (this.field.isWeather(['sunnyday', 'desolateland', 'sandstorm', 'hail'])) {
				this.debug('weakened by weather');
				return this.chainModify(0.5);
			}
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		zMovePower: 200,
	},
	theshadowfalls: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "Sets up darkness on the opposing side of the field, turning each opposing Pokemon that switches in and their moves into a Dark-type, even when it's a Flying-type Pokemon or has the Levitate Ability. Can be removed from the opposing side if a Dark-type Pokemon, an Arceus or a Silvally switches in. Rapid Spin and Defog will not end the Shadow Falls condition.",
		shortDesc: "Turns foes into a Dark-type on switch-in.",
		id: "theshadowfalls",
		name: "The Shadow Falls!",
		isNonstandard: "Custom",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Night Shade", target);
		},
		sideCondition: 'theshadowfalls',
		effect: {
			onStart(side) {
				this.add('-message', `Darkness started to engulf around ${side.name}'s team!`);
			},
			onSwitchIn: function (pokemon) {
				if (pokemon.hasType('Dark') ||
				    pokemon.template.speciesid === 'arceus' ||
				    pokemon.template.speciesid === 'arceusfighting' ||
				    pokemon.template.speciesid === 'arceusflying' ||
				    pokemon.template.speciesid === 'arceuspoison'||
				    pokemon.template.speciesid === 'arceusground'||
				    pokemon.template.speciesid === 'arceusrock'||
				    pokemon.template.speciesid === 'arceusbug'||
				    pokemon.template.speciesid === 'arceusghost'||
				    pokemon.template.speciesid === 'arceussteel'||
				    pokemon.template.speciesid === 'arceusunknown'||
				    pokemon.template.speciesid === 'arceusfire'||
				    pokemon.template.speciesid === 'arceuswater'||
				    pokemon.template.speciesid === 'arceuselectric'||
				    pokemon.template.speciesid === 'arceuspsychic'||
				    pokemon.template.speciesid === 'arceusice'||
				    pokemon.template.speciesid === 'arceusdragon'||
				    pokemon.template.speciesid === 'arceusdark'||
				    pokemon.template.speciesid === 'arceusfairy'||
					pokemon.template.speciesid === 'silvally' ||
                    pokemon.template.speciesid === 'silvallyfighting' ||
				    pokemon.template.speciesid === 'silvallyflying' ||
				    pokemon.template.speciesid === 'silvallypoison'||
				    pokemon.template.speciesid === 'silvallyground'||
				    pokemon.template.speciesid === 'silvallyrock'||
				    pokemon.template.speciesid === 'silvallybug'||
				    pokemon.template.speciesid === 'silvallyghost'||
				    pokemon.template.speciesid === 'silvallysteel'||
				    pokemon.template.speciesid === 'silvallyfire'||
				    pokemon.template.speciesid === 'silvallywater'||
				    pokemon.template.speciesid === 'silvallyelectric'||
				    pokemon.template.speciesid === 'silvallypsychic'||
				    pokemon.template.speciesid === 'silvallyice'||
				    pokemon.template.speciesid === 'silvallydragon'||
				    pokemon.template.speciesid === 'silvallydark'||
				    pokemon.template.speciesid === 'silvallyfairy') {
					this.add('-message', `The darkness disappeared!`);
					pokemon.side.removeSideCondition('theshadowfalls');
				} else {
                  pokemon.types = ['Dark'];
                  this.add('-start', pokemon, 'typechange', 'Dark');
				}
			},
			onModifyMovePriority: -99,
			onModifyMove(move) {
				move.type = 'Dark';
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Dark",
		zMoveBoost: {spa: 2},
	},
	sharpedges: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Attack by 3 stages.",
		shortDesc: "Raises the user's Atk by 3.",
		id: "sharpedges",
		isNonstandard: "Custom",
		name: "Sharp Edges",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Sharpen", source);
		},
		boosts: {
			atk: 3,
		},
		secondary: null,
		target: "self",
		type: "Fighting",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Cool",
	},
	rubberguard: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Special Defense by 3 stages.",
		shortDesc: "Raises the user's Special Defense by 3.",
		id: "rubberguard",
		isNonstandard: "Custom",
		name: "Rubber Guard",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Crafty Shield", source);
		},
		boosts: {
			spd: 3,
		},
		secondary: null,
		target: "self",
		type: "Fairy",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Cute",
	},
	quickaslightning: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Speed by 3 stages.",
		shortDesc: "Raises the user's Speed by 3.",
		id: "quickaslightning",
		isNonstandard: "Custom",
		name: "Quick as Lightning",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Charge", source);
			this.add('-anim', source, "Spark", source);
		},
		boosts: {
			spe: 3,
		},
		secondary: null,
		target: "self",
		type: "Electric",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Cool",
	},
	balefulforce: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "The foe will be forced to switch out after using their move on the next turn if its move is successful.",
		shortDesc: "The foe will switch out after using its move.",
		id: "balefulforce",
		name: "Baleful Force",
		isNonstandard: "Custom",
		pp: 20,
		priority: 6,
		flags: {snatch: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Boomburst", source);
		},
		sideCondition: "balefulforce",
		effect: {
			duration: 5,
			onStart(target, source) {
				this.add('-message', `${target.active[0].name}is forced to switch out next turn!`);
			},
			onModifyMove(move) {
				move.forceSwitch = true;
			},
			onBeforeMove(target, source, move) {
				this.add('-message', `${target.name} is forcing to switch out!`);
			},
		},
		forceSwitch: true,
		secondary: null,
		target: "self",
		type: "Dark",
		zMoveBoost: {spe: 12},
		contestType: "Clever",
	},
	fullhazards:{
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Sets up all hazards.",
		shortDesc: "Sets up all hazards.",
		id: "fullhazards",
		isNonstandard: "Custom",
		name: "Full Hazards",
		pp: 15,
		priority: 0,
		flags: {reflectable: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
          this.useMove('spikes', source, target);
          this.useMove('spikes', source, target);
          this.useMove('spikes', source, target);
          this.useMove('spikes', source, target);
          this.useMove('toxicspikes', source, target);
          this.useMove('toxicspikes', source, target);
          this.useMove('stickyweb', source, target);
          this.useMove('stealthrock', source, target);
		},
		secondary: null,
		target: "foeSide",
		type: "Ground",
		zMoveBoost: {evasion: 2},
		contestType: "Clever",
	},
	makeitbetter: {
		accuracy: true,
		basePower: 195,
		category: "Special",
		desc: "This move restore the user and its allies' HP and PP to the max and the statuses cured after the damage.",
		shortDesc: "Fully restores the user and its allies' HP and PP to the max and status cured after the damage.",
		id: "makeitbetter",
		name: "Make It Better",
		isNonstandard: "Custom",
		pp: 1,
		priority: 0,
		flags: {},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Fleur Cannon", source);
		},
		self: {
			onHit: function (pokemon, source, move) {
		    	this.attrLastMove('[still]');
				source.heal(source.maxhp);
				this.add('-heal', source, source.getHealth);
					for (const moveSlot of source.moveSlots) {
						moveSlot.pp = moveSlot.maxpp;
					}
				for (const ally of source.side.pokemon) {
					ally.heal(ally.maxhp);
					ally.cureStatus();
					for (const moveSlot of ally.moveSlots) {
						moveSlot.pp = moveSlot.maxpp;
					}
				this.add('message', `Every Pokémon in ${source.name}'s bench are fully healed!`);

				}
			},
		},
		isZ: "celebiumz",
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Beautiful",
	},
	ultimateclash: {
		accuracy: true,
		basePower: 999999999999999999999999,
		isNonstandard: "Custom",
		category: "Special",
		desc: "Nearly always goes first. This move does not check accuracy. Pokemon with the Sturdy Ability are immune. The user faints unless this move misses or there is no target.",
		shortDesc: "OHKOs targets. User faints.",
		id: "ultimateclash",
		name: "Ultimate Clash",
		pp: 5,
		priority: 2,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Dark Void", target);
			this.add('-anim', source, "Dark Pulse", target);
		},
		onHit(target, source) {
			this.add('-ohko');
			target.faint();
			source.faint();
		},
		selfdestruct: "ifHit",
		secondary: null,
		target: "normal",
		type: "Dark",
		zMovePower: 190,
		contestType: "Cool",
	},
	smashup: {
		accuracy: true,
		basePower: 130,
		isNonstandard: "Custom",
		category: "Physical",
		desc: "Does many things.",
		shortDesc: "Does many things.",
		id: "smashup",
		name: "Smash Up",
		pp: 5,
		priority: 2,
		flags: {protect: 1, contact: 1, mirror: 1, authentic: 1},
		drain: [4, 5],
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Embargo", source);
			this.add('-anim', source, "Hidden Power", source);
			this.add('-anim', source, "Dragon Ascent", target);
		},
		secondary: {
			chance: 30,
			self: {
				boosts: {
					atk: 1,
					def: 1,
					spa: 1,
					spd: 1,
					spe: 1,
				},
			},
		},
        ignoreAbility: true,
        ignoreImmunity: true,
		target: "normal",
		type: "Fighting",
		zMovePower: 230,
		contestType: "Cool",
	},
	// Modifications
		"spikes": {
        inherit: true,
		accuracy: true,
		desc: "Sets up a hazard on the opposing side of the field, damaging each opposing Pokemon that switches in, unless it is a Flying-type Pokemon or has the Levitate Ability. Can be used up to four times before failing. Opponents lose 1/8 of their maximum HP with one layer, 1/6 of their maximum HP with two layers, and 1/4 of their maximum HP with three layers, all rounded down. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin or Defog successfully, or is hit by Defog.",
		shortDesc: "Hurts grounded foes on switch-in. Max 4 layers.",
		effect: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'Spikes');
				this.effectData.layers = 1;
			},
			onRestart(side) {
				if (this.effectData.layers >= 6) return false;
				this.add('-sidestart', side, 'Spikes');
				this.effectData.layers++;
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				let damageAmounts = [0, 3, 4, 6, 8]; // 1/8, 1/6, 1/4, 1/2
				this.damage(damageAmounts[this.effectData.layers] * pokemon.maxhp / 24);
			},
		},
	},
};

exports.BattleMovedex = BattleMovedex;
