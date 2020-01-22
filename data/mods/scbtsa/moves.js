'use strict';

// Used for one of the special moves
const randomSCBTSATeams = require('./random-teams');
/** @type {typeof import('../../../sim/pokemon').Pokemon} */
const Pokemon = require(/** @type {any} */ ('../../../.sim-dist/pokemon')).Pokemon;

/** @type {{[k: string]: ModdedMoveData}} */
let BattleMovedex = {
// Amida
	wondergift: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "This move replaces every non-fainted member of the opponents's team with a Super Cast Bros. 2 set that is randomly selected from all sets, except those with Wonder Gift. Remaining HP and PP percentages, as well as status conditions, are transferred onto the replacement sets. The move failed if the user is not Amida.",
		shortDesc: "May",
		id: "wondergift",
		name: "Wonder Gift",
		isNonstandard: "Custom",
		pp: 2,
		noPPBoosts: true,
		priority: 0,
		flags: {},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Teeter Dance', source);
			this.add('-anim', source, 'Double Team', source);
			this.add('-anim', source, 'Present', target);
		},
		onHit(target, source) {
			if (source.name === 'Amida') this.add(`raw|<b>Amida:</b> Here's a gift for you!`);
			// Store percent of HP left, percent of PP left, and status for each pokemon on the user's team
			let carryOver = [];
			let currentTeam = target.side.pokemon;
			for (let pokemon of currentTeam) {
				carryOver.push({
					hp: pokemon.hp / pokemon.maxhp,
					status: pokemon.status,
					statusData: pokemon.statusData,
					pp: pokemon.moveSlots.slice().map(m => {
						return m.pp / m.maxpp;
					}),
				});
				// Handle pokemon with less than 4 moves
				while (carryOver[carryOver.length - 1].pp.length < 4) {
					carryOver[carryOver.length - 1].pp.push(1);
				}
			}
			// Generate a new team
			let team = this.teamGenerator.getTeam({name: target.side.name});
			// Overwrite un-fainted pokemon other than the user
			for (let i = 0; i < currentTeam.length; i++) {
				if (currentTeam[i].fainted || !currentTeam[i].hp || currentTeam[i].position === target.position) continue;
				let set = team.shift();
				let oldSet = carryOver[i];
				// @ts-ignore
				if (set.name === 'amida') {
					// No way am I allowing 2 of this mon on one team
					set = team.shift();
				}

				// Bit of a hack so client doesn't crash when formeChange is called for the new pokemon
				let effect = this.effect;
				this.effect = /** @type {Effect} */ ({id: ''});
				// @ts-ignore
				let pokemon = new Pokemon(set, target.side);
				this.effect = effect;

				pokemon.hp = Math.floor(pokemon.maxhp * oldSet.hp) || 1;
				pokemon.status = oldSet.status;
				if (oldSet.statusData) pokemon.statusData = oldSet.statusData;
				for (const [j, moveSlot] of pokemon.moveSlots.entries()) {
					moveSlot.pp = Math.floor(moveSlot.maxpp * oldSet.pp[j]);
				}
				pokemon.position = currentTeam[i].position;
				currentTeam[i] = pokemon;
			}
			this.add('message', `${source.name} shifted ${target.side.name}'s team away!`);
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
	},
	// Haze
	powerbomb: {
		accuracy: true,
		basePower: 200,
		category: "Physical",
		desc: "Has a 100% chance to burn the foe.",
		shortDesc: "100% chance to burn the foe.",
		id: "powerbomb",
		name: "Power Bomb",
		isNonstandard: "Custom",
		pp: 5,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1, defrost: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Seed Bomb", target);
			this.add('-anim', target, "Explosion", target);
		},
        onHit(target, source) {
			if (source.name === 'Haze') this.add(`raw|<b>Haze:</b> Head's up! Have a Power Bomb!`);
		},
		secondary: {
			chance: 100,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
	},
// Aqua
	aquasphere: {
		accuracy: 100,
		basePower: 95,
		category: "Special",
		desc: "Has a 50% chance to lower the target's Special Attack by 2 stages.",
		shortDesc: "50% chance to lower the target's Sp. Atk by 2.",
		id: "aquasphere",
		name: "Aqua Sphere",
		isNonstandard: "Custom",
		pp: 15,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Surf', source);
			this.add('-anim', source, 'Liquidation', source);
			this.add('-anim', source, 'Aura Sphere', target);
		},
        onHit(target, source) {
			if (source.name === 'Aqua') this.add(`raw|<b>Aqua:</b> Aqua Sphere right ahead of ya!!`);
		},
		secondary: {
			chance: 50,
			boosts: {
				spa: -2,
			},
		},
		target: "normal",
		type: "Water",
	},
// Dynamo
	ironfangs: {
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		desc: "Has a 50% chance to flinch the target.",
		shortDesc: "50% chance to flinch the target.",
		id: "ironfangs",
		name: "Iron Fangs",
		isNonstandard: "Custom",
		pp: 15,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Iron Defense', source);
			this.add('-anim', source, 'Crunch', target);
		},
        onHit(target, source) {
			if (source.name === 'Dynamo') this.add(`raw|<b>Dynamo:</b> Bite hard.`);
		},
		secondary: {
			chance: 50,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Steel",
	},
// Mizzy
	prismrocket: {
		accuracy: 95,
		basePower: 85,
		category: "Physical",
		desc: "This move is a special attack if the user's Special Attack stat is greater than its Attack stat; otherwise, it is a physical attack. 50% chance to lower the target's Speed. This move is super-effective against any type. This move and its effects ignore the Abilities of other Pokemon.",
		shortDesc: "Spcl. if Sp.Atk > Atk. Always supereffective. Lwrs Spe.",
		id: "prismrocket",
		name: "Prism Rocket",
		isNonstandard: "Custom",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		ignoreImmunity: true,
		onModifyMove: function (move, pokemon, target) {
			if (pokemon.getStat('spa', false, true) > pokemon.getStat('atk', false, true)) move.category = 'Special';
		},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Geomancy', source);
			this.add('-anim', source, 'Extreme Evoboost', source);
			this.add('-anim', source, 'Comet Punch', target);
		},
		onEffectiveness: function (typeMod, target) {
			return 1;
		},
        onHit(target, source) {
			if (source.name === 'Mizzy') this.add(`raw|<b>Mizzy:</b> Take that!`);
		},
		secondary: {
			chance: 50,
			boosts: {
				spe: -1,
			},
		},
		ignoreAbility: true,
		target: "normal",
		type: "Psychic",
	},
// Sedna
	skydance: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Attack, Special Attack, and Speed by 1 stage.",
		shortDesc: "Raises the user's Attack, Special Attack, and Speed by 1.",
		id: "skydance",
		name: "Sky Dance",
		isNonstandard: "Custom",
		pp: 25,
		priority: 0,
		flags: {snatch: 1, dance: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Wing Attack", source);
		},
        onHit(target, source) {
			if (source.name === 'Sedna') this.add(`raw|<b>Sedna:</b> I'm always like this!`);
		},
		boosts: {
			atk: 1,
			spa: 1,
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Flying",
	},
// Zodiac
	psyburst: {
		accuracy: 90,
		basePower: 130,
		category: "Special",
		desc: "As long as the target remains active, its evasiveness stat stage is ignored during accuracy checks against it if it is greater than 0, and Psychic-type attacks can hit if the target is a Dark-type and the target loses its type-based immunity to Psychic. Can hit even if the target has Foresight or Odor Sleuth applied to it.",
		shortDesc: "Hits Dark-type Pokémon. Evasiveness ignored.",
		id: "psyburst",
		name: "Psy Burst",
		isNonstandard: "Custom",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Psycho Boost", target);
		},
		onEffectiveness: function (typeMod, type, move) {
			if (move.type !== 'Psychic') return;
			let target = this.activeTarget;
			if (!target) return; // avoid crashing when called from a chat plugin
			if (!target.runImmunity('Psychic')) {
				if (target.hasType('Dark')) return 0;
			}
		},
        onHit(target, source) {
			if (source.name === 'Zodiac') this.add(`raw|<b>Zodiac:</b> The REAL Second Attack. :)`);
		},
		volatileStatus: 'miracleeye',
		effect: {
			noCopy: true,
			onStart: function (pokemon) {
				this.add('-start', pokemon, 'Psy Burst');
			},
			onNegateImmunity: function (pokemon, type) {
				if (pokemon.hasType('Dark') && ['Psychic'].includes(type)) return false;
			},
			onModifyBoost(boosts) {
				if (boosts.evasion && boosts.evasion > 0) {
					boosts.evasion = 0;
				}
			},
		},
		ignoreImmunity: {'Dark': true},
        secondary: null,
		target: "normal",
		type: "Psychic",
	},
// Vixie
	flowerdance: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Special Attack, Special Defense, and Speed by 2 stages, and the user restores 1/2 of its maximum HP, rounded half up.",
		shortDesc: "+Spa, +Spd, +Spe by 2. Restores HP.",
		id: "flowerdance",
		name: "Flower Dance",
		isNonstandard: "Custom",
		pp: 35,
		priority: 0,
		flags: {snatch: 1, dance: 1},
		heal: [1, 2],
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Flower Shield", source);
			this.add('-anim', source, "Quiver Dance", source);
		},
        onHit(target, source) {
			if (source.name === 'Vixie') this.add(`raw|<b>Vixie:</b> Flowers for me!`);
		},
		boosts: {
			spa: 2,
			spd: 2,
			spe: 2,
		},
		secondary: null,
		target: "self",
		type: "Fairy",
	},
// Bulk-Up Man
	gaiagaizer: {
		accuracy: 100,
		basePower: 130,
		category: "Physical",
		desc: "This move can hit airborne Pokemon, which includes Flying-type Pokemon, Pokemon with the Levitate Ability, Pokemon holding an Air Balloon, and Pokemon under the effect of Magnet Rise or Telekinesis. If the target is a Flying type and is not already grounded, this move deals neutral damage regardless of its other type(s). This move can hit a target using Bounce, Fly, or Sky Drop. If this move hits a target under the effect of Bounce, Fly, Magnet Rise, or Telekinesis, the effect ends. If the target is a Flying type that has not used Roost this turn or a Pokemon with the Levitate Ability, it loses its immunity to Ground-type attacks and the Arena Trap Ability as long as it remains active. During the effect, Magnet Rise fails for the target and Telekinesis fails against the target.",
		shortDesc: "Grounds adjacent foes. First hit neutral on Flying.",
		id: "gaiagaizer",
		isNonstandard: "Custom",
		name: "Gaia Gaizer",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Geomancy', source);
			this.add('-anim', source, 'Thousand Arrows', target);
		},
		onEffectiveness: function (typeMod, target, type, move) {
			if (move.type !== 'Ground') return;
			if (!target) return; // avoid crashing when called from a chat plugin
			// ignore effectiveness if the target is Flying type and immune to Ground
			if (!target.runImmunity('Ground')) {
				if (target.hasType('Flying')) return 0;
			}
		},
        onHit(target, source) {
			if (source.name === 'Bulk-Up Man') this.add(`raw|<b>Bulk-Up Man:</b> Bang!`);
		},
		volatileStatus: 'smackdown',
		ignoreImmunity: {'Ground': true},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Ground",
	},
// Naru
	surprisepal: {
		accuracy: true,
		basePower: 0,
		category: "Special",
		desc: "Does not check accuracy. KOs the foes. The user faints afterwards.",
		shortDesc: "KOs the foes. User faints.",
		id: "surprisepal",
		name: "Surprise, Pal!",
		isNonstandard: "Custom",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: {authentic: 1},
		onTryMovePriority: 100,
		onTryMove: function (target, pokemon) {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-activate', source, 'move: Celebrate');
			this.add('-anim', source, 'Light of Ruin', target);
			this.add('-anim', target, 'Explosion', target);
			this.add('-anim', source, 'Explosion', source);
		},
		onHit: function (target, source) {
            if (source.name === 'Naru') this.add(`raw|<b>Naru:</b> Uh-oh! I'm doomed!`);
			target.faint();
			source.faint();
		},
		secondary: null,
		target: "allAdjacent",
		type: "???",
	},
// Arthur
	wondershift: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "This move replaces the user's movepool with Luster Purge, Searing Shot, Nasty Plot and Agility.",
		shortDesc: "Replaces user's moveset.",
		id: "wondershift",
		isNonstandard: "Custom",
		name: "Wonder Shift",
		pp: 35,
		priority: 0,
		flags: {},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Luster Purge', source);
			this.add('-anim', source, 'Aura Sphere', source);
		},
        onHit: function (pokemon, source) {
			if (source.name === 'Arthur') this.add(`raw|<b>Arthur:</b> I have known to become different!`);
			let newMovep = ['lusterpurge', 'searingshot', 'nastyplot', 'agility',
			];
				// Replace Moveset
				source.moveSlots = [];
				for (const [i, moveid] of newMovep.entries()) {
					const move = this.dex.getMove(moveid);
					if (!move.id) continue;
					source.moveSlots.push({
						move: move.name,
						id: move.id,
						pp: Math.floor(((move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5) * (source.ppPercentages ? source.ppPercentages[i] : 1)),
						maxpp: ((move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5),
						target: move.target,
						disabled: false,
						used: false,
					});
					source.moves.push(move.id);
				}
		},
		secondary: null,
		target: "self",
		type: "Psychic",
	},
// Tara
	lightrain: {
		accuracy: 100,
		category: "Status",
		desc: "Sets up light on the opposing side of the field, turning each opposing Pokemon that switches in and their moves into a Fairy-type, even when it's a Flying-type Pokemon or has the Levitate Ability. Can be removed from the opposing side if a Fairy-type Pokemon, an Arceus or a Silvally switches in. Rapid Spin and Defog will not end the Light Rain condition. While Light Rain is active, all the opponent's moves will become Special and gain a priority of -2.",
		shortDesc: "Switch-in: Foes, Fairy-type; All the foe's moves: Priority -2, Special",
		id: "lightrain",
		name: "Light Rain",
		isNonstandard: "Custom",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			if (source.name === 'Tara') this.add(`raw|<b>Tara:</b> Be there be light!`);
			this.add('-anim', source, "Flash", source);
		},
		sideCondition: 'lightrain',
		effect: {
			onStart(side) {
				this.add('-message', `Light has poured on ${side.name}'s team!`);
			},
			onSwitchIn: function (pokemon) {
				if (pokemon.hasType('Fairy') ||
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
					this.add('-message', `The light disappeared!`);
					pokemon.side.removeSideCondition('lightrain');
				} else {
                  pokemon.types = ['Fairy'];
                  this.add('-start', pokemon, 'typechange', 'Fairy');
				}
			},
			onModifyMovePriority: -99,
			onModifyMove(move) {
				move.type = "Fairy";
				move.category = "Special";
			},
			onModifyPriority: function (priority, pokemon, target, move) {
					return priority - 2;
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Fairy",
	},
	// Zanna
	normalizer: {
		accuracy: 100,
		category: "Status",
		desc: "All of the opponent's moves will become Normal-type for three turns.",
		shortDesc: "3 Turns: Foe's moves become Normal-type.",
		id: "normalizer",
		isNonstandard: "Custom",
		name: "Normalizer",
		pp: 15,
		priority: 0,
		flags: {},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			if (source.name === 'Tara') this.add(`raw|<b>Zanna:</b> You want to be normal? Here you go! :)`);
			this.add('-anim', source, "Entrainment", target);
			this.add('-anim', source, "Happy Hour", target);
		},
		volatileStatus: 'normalizer',
		effect: {
			duration: 3,
			onStart: function (pokemon) {
				this.add('-start', pokemon, 'Normalizer');
				this.add('message', 'Normalizing the opponent causes all of its moves to all turn into Normal-type!');
			},
			onModifyMove: function (move) {
				if (move.id !== 'struggle') {
					move.type = 'Normal';
				}
			},
			onEnd: function (pokemon) {
				this.add('-end', pokemon, 'Normalizer');
			},
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
// Gyro
	terrasmash: {
		accuracy: 100,
        basePower: 100,
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
		category: "Physical",
		id: "terrasmash",
		isNonstandard: "Custom",
		name: "Terra Smash",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Earthquake", target);
			this.add('-anim', source, "Dragon Hammer", target);
		},
        onHit: function (target, source) {
			if (source.name === 'Gyro') this.add(`raw|<b>Gyro:</b> It's time to Terra Smash it, y'all!`);
		},
		secondary: null,
		target: "normal",
		type: "Ground",
	},
// Flippit
	expedia: {
		accuracy: true,
        basePower: 0,
		desc: "Uses Taunt, and causes the opponent to become confused and paralyzed. Before the attack, the move resets the opponent's boosts to 0.",
		shortDesc: "Taunt; Foe: Clear boosts and parafusion.",
		category: "Status",
		id: "expedia",
		isNonstandard: "Custom",
		name: "Expedia",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Fake Out", source);
			target.clearBoosts();
			this.add('-clearboost', target);
		},
        onHit: function (target, source) {
			if (source.name === 'Flippit') this.add(`raw|<b>Flippit:</b> I'm-a hero!`);
			this.useMove('taunt', source, target);
			target.addVolatile('confusion', source);
			target.trySetStatus('par', source);
		},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
// Jill
	toilethumor: {
		accuracy: true,
        basePower: 0,
		desc: "Force-switch the opponent and badly poisons the incoming foe.",
		shortDesc: "Force-switch the opponent and badly poisons the incoming foe.",
		category: "Status",
		id: "toilethumor",
		isNonstandard: "Custom",
		name: "Toilet Humor",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Poison Gas", target);
		},
        onHit: function (target, source) {
			if (source.name === 'Jill') this.add(`raw|<b>Jill:</b> A fart times a thousand!`);
		},
		onTryHit(target, source, move) {
			target.side.addSlotCondition(target, 'toilethumor');
		},
		effect: {
			duration: 1,
			onSwitchIn(pokemon) {
				pokemon.trySetStatus('tox', pokemon, pokemon.side.foe.active[0], this.dex.getActiveMove('toilethumor'));
			},
		},
		forceSwitch: true,
		secondary: null,
		target: "normal",
		type: "Poison",
	},
// Shinni
	vroom: {
		accuracy: true,
        basePower: 0,
		desc: "The user is protected from most attacks made by other Pokemon during this turn. This move has a 1/X chance of being successful, where X starts at 1 and triples each time this move is successfully used. X resets to 1 if this move fails, if the user's last move used is not Baneful Bunker, Detect, Endure, King's Shield, Protect, Quick Guard, Spiky Shield, or Wide Guard, or if it was one of those moves and the user's protection was broken. Fails if the user moves last this turn. Raises the user's Speed, Defense and Special Defense by 2 stages.",
		shortDesc: "Prevents moves; Raises Spe., Spd. and Def. by 2 stages.",
		category: "Status",
		id: "vroom",
		isNonstandard: "Custom",
		name: "Vroom!",
		pp: 5,
		noPPBoosts: true,
		priority: 4,
		flags: {sound: 1},
		self: {boosts: {spd:2, def:2, spe:2}},
		stallingMove: true,
		volatileStatus: 'protect',
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(pokemon) {
			return !!this.willAct() && this.runEvent('StallMove', pokemon);
			this.add('-anim', pokemon, "Flame Burst", pokemon);
		},
		onHit(pokemon) {
			if (pokemon.name === 'Shinni') this.add(`raw|<b>Shinni:</b> Start your engines! Vrrrrrrrrrooom vroom!`);
			pokemon.addVolatile('stall');
		},
		secondary: null,
		target: "self",
		type: "Fire",
	},
// Alphus
	cosmicforcestorm: {
		accuracy: true,
        basePower: 130,
		desc: "Has a 30% chance to use Roar of Time on the foe.",
		shortDesc: "Has a 30% chance to use Roar of Time on the foe.",
		category: "Special",
		id: "cosmicforcestorm",
		isNonstandard: "Custom",
		name: "Cosmic Force Storm",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			if (source.name === 'Alphus') this.add(`raw|<b>Alphus:</b> Prepare to see this.`);
			this.add('-anim', source, "Moonblast", target);
			this.add('-anim', source, "Magma Storm", target);
		},
		secondary: {
			chance: 30,
			onHit(target, source) {
             if (source.name === 'Alphus') this.add(`raw|<b>Alphus:</b> I'll finish this off.`);
             this.useMove('roaroftime', source, target);
			},
		},
		target: "normal",
		type: "Steel",
	},
	// Modified Moves
	"gastroacid": {
		inherit: true,
		volatileStatus: 'gastroacid',
		onTryHit: function (pokemon) {
			let bannedAbilities = ['battlebond', 'comatose', 'coloraura', 'disguise', 'multitype', 'powerconstruct', 'rkssystem', 'schooling', 'shieldsdown', 'stancechange'];
			if (bannedAbilities.includes(pokemon.ability)) {
				return false;
			}
		},
		effect: {
			// Ability suppression implemented in Pokemon.ignoringAbility() within sim/pokemon.js
			onStart: function (pokemon) {
				this.add('-endability', pokemon);
				this.singleEvent('End', this.dex.getAbility(pokemon.ability), pokemon.abilityData, pokemon, pokemon, 'gastroacid');
			},
		},
	},
	// Cool Drink is immune to taunt
	"taunt": {
		inherit: true,
		volatileStatus: 'taunt',
		effect: {
			duration: 3,
			onStart: function (target) {
				if (target.activeTurns && !this.willMove(target)) {
					this.effectData.duration++;
				}
				this.add('-start', target, 'move: Taunt');
			},
			onResidualOrder: 12,
			onEnd: function (target) {
				this.add('-end', target, 'move: Taunt');
			},
			onDisableMove: function (pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.getMove(moveSlot.id).category === 'Status' && this.dex.getMove(moveSlot.id).id !== 'cooldrink') {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 5,
			onBeforeMove: function (attacker, defender, move) {
				if (!move.isZ && move.category === 'Status' && move.id !== 'cooldrink') {
					this.add('cant', attacker, 'move: Taunt', move);
					return false;
				}
			},
		},
	},
//////////////// Moves modded to match their Let's Go! counterparts
	"teleport": {
		inherit: true,
		desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members.",
		shortDesc: "User switches out.",
		priority: -6,
		selfSwitch: true,
		onTryHit: true,
	},
//////////////// Other Modded Moves
     /// Roar of Time modded to also hit Fairy-type Pokemon, breaks though protect and ignores abilities.
	"roaroftime": {
		inherit: true,
		breaksProtect: true,
		ignoreAbility: true,
		ignoreImmunity: {'Dragon': true},
	},
};

exports.BattleMovedex = BattleMovedex;
