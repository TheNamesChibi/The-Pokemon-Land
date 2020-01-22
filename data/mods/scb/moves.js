'use strict';

// Used for one of the special moves
const RandomSCBTeams = require('./random-teams');
/** @type {typeof import('../../../sim/pokemon').Pokemon} */
const Pokemon = require(/** @type {any} */ ('../../../.sim-dist/pokemon')).Pokemon;

/** @type {{[k: string]: ModdedMoveData}} */
let BattleMovedex = {
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
		secondary: {
			chance: 50,
			boosts: {
				spa: -2,
			},
		},
		target: "normal",
		gmaxPower: 170,
		type: "Water",
	},
	gmaxaquasrevenge: {
		accuracy: true,
		basePower: 1,
		category: "Special",
		shortDesc: "Foes:-2 Spe,-SpD. BP scales with base move's BP.",
		id: "gmaxaquasrevenge",
		isNonstandard: "Custom",
		name: "G-Max Aqua's Revenge",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Mew",
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Surf', target);
			this.add('-anim', source, 'Steam Eruption', target);
		},
		onHit(target, source, move) {
			for (let pokemon of target.side.active) {
				this.boost({spe: -2, spd: -2}, pokemon, source, move);
			}
           if (source.name === 'Aqua') this.add(`raw|<b>Aqua:</b> And all the nice water splashed out of nowhere!`);
		},
		secondary: null,
		target: "normal",
		type: "Water",
	},
// Static
	pikapower: {
		accuracy: 95,
		basePower: 100,
		category: "Special",
		desc: " Raises the user's Speed by 1 stage if this move knocks out the target.",
		shortDesc: "Raises user's Speed by 1 if this KOes the target.",
		id: "pikapower",
		name: "Pika Power!",
		isNonstandard: "Custom",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Charge', target);
			this.add('-anim', source, 'Electrify', target);
			this.add('-anim', source, 'Thunder', target);
		},
		onAfterMoveSecondarySelf: function (pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) this.boost({spe: 1}, pokemon, pokemon, move);
		},
		secondary: null,
		target: "normal",
		type: "Electric",
	},
// Erika
	evormation: {
		accuracy: true,
		category: "Status",
		desc: "The user transforms into a different Pokemon, and it uses a move dependent on the Pokemon: Vaporeon (Mist and Water Pulse), Jolteon (Agility and Thunderbolt), Flareon (Wish and Flamethrower), Espeon (Calm Mind and Psychic), Umbreon (Moonlight and Dark Pulse), Leafeon (Swords Dance and Leaf Storm), Glaceon (Double Team and Ice Beam), and Sylveon (Charm and Moonblast). Reverts to an Eevee at the end of the turn.",
		shortDesc: " For turn: transforms, uses linked moves.",
		id: "evormation",
		name: "Evormation",
		isNonstandard: "Custom",
		pp: 10,
		priority: 0,
		flags: {mirror: 1, protect: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onHit(target, source, move) {
			let baseForme = source.template.id;
			/** @type {{[forme: string]: string[]}} */
			let formes = {
				vaporeon: ['Mist', 'Water Pulse'],
				jolteon: ['Agility', 'Thunderbolt'],
				flareon: ['Wish', 'Flare Blitz'],
				espeon: ['Calm Mind', 'Psychic'],
				umbreon: ['Moonlight', 'Dark Pulse'],
				leafeon: ['Swords Dance', 'Leaf Blade'],
				glaceon: ['Double Team', 'Ice Beam'],
				sylveon: ['Charm', 'Moonblast'],
			};
			let forme = Object.keys(formes)[this.random(5)];
			source.formeChange(forme, this.dex.getAbility('adaptability'), true);
			this.useMove(formes[forme][0], source, target);
			this.useMove(formes[forme][1], source, target);
			source.formeChange(baseForme, this.dex.getAbility('adaptability'), true);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	// Drew
	superdance: {
		accuracy: 100,
		basePower: 85,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.willMove(target)) {
				this.debug('Superdance damage boost');
				return move.basePower * 2;
			}
			this.debug('Superdance NOT boosted');
			return move.basePower;
		},
		category: "Physical",
		desc: "If the user moves before the target, this move's power is doubled. If the user is either Dracozolt, Arctozolt, Dracovish, or Arctovish, this move will be either Dragon, Electric, Water, and Ice type respectively. This move fails if the user is not a Dracozolt, an Arctozolt, a Dracovish, or an Arctovish.",
		shortDesc: "2x if the user moves first; Type depends on user's form.",
		id: "superdance",
		name: "Superdance",
		isNonstandard: "Custom",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		mindBlownRecoil: true,
		onTryMove(pokemon, target, move) {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			source.addVolatile('superdance');
			this.add('-anim', source, "Teeter Dance", target);
			this.add('-anim', source, "Teeter Dance", target);
			this.add('-anim', source, "Rapid Spin", target);
		},
		onTryHit(target, source) {
			if (source.name !== 'Drew') {
				this.add('-fail', source);
				this.hint("Only Drew can use Superdance.");
				return null;
			}
		},
		onModifyMove(move, pokemon) {
			if (pokemon.template.species === 'Dracozolt' && move.type !== 'Dragon') {
				move.type = "Dragon";
			} else if (pokemon.template.species === 'Arctozolt' && move.type !== 'Electric') {
				move.type = "Electric";
			} else if (pokemon.template.species === 'Dracovish' && move.type !== 'Water') {
				move.type = "Water";
			} else if (pokemon.template.species === 'Arctovish' && move.type !== 'Ice') {
				move.type = "Ice";
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
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
		boosts: {
			atk: 1,
			spa: 1,
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Flying",
	},
// Jason
	auralife: {
		accuracy: 90,
		basePower: 130,
		category: "Special",
		desc: "Has a 100% chance to lower the target's Special Defense by 2 stages.",
		shortDesc: "100% chance to lower the target's Sp. Def by 2.",
		id: "auralife",
		name: "Aura Life",
		isNonstandard: "Custom",
		pp: 5,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Geomancy", target);
			this.add('-anim', source, "Flash", target);
			this.add('-anim', source, "Aura Sphere", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				spd: -2,
			},
		},
		target: "normal",
		type: "Steel",
	},
	// Disto
	destructionpower: {
		accuracy: true,
		basePower: 160,
		basePowerCallback: function (pokemon, target) {
			if (this.randomChance(30, 100)) {
				return 9999;
			}
			return 160;
		},
		category: "Special",
		desc: "Has a 30% chance to have this move's base power to become 9999. Leaves the target with at least 1 HP. This move and its effects ignore the types and Abilities of other Pokemon. Ignores the target's stat stage changes, including evasiveness. Hits adjacent foes. This move can hit a Fairy-type target no matter what this move's type is.",
		shortDesc: "Leaves foe with 1 HP; %30: BP 9999.",
		id: "destructionpower",
		isNonstandard: "Custom",
		name: "Destruction Power",
		pp: 5,
		priority: 0,
		flags: {authentic: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Explosion", source);
			this.add('-anim', source, "Dragon Rage", target);
		},
		secondary: null,
		noFaint: true,
		ignoreDefensive: true,
		ignoreEvasion: true,
		ignoreAbility: true,
		ignoreImmunity: {'Dragon': true},
		target: "normal",
		type: "Dragon",
	},
	// Used for Distro's Ability
	puredarkness: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, all the moves will turn into a Dark-type. If this move is used during the effect, the effect ends.",
		shortDesc: "5 Turns: All moves turns Dark.",
		id: "puredarkness",
		name: "Pure Darkness",
		isNonstandard: "Custom",
		pp: 5,
		priority: -7,
		flags: {mirror: 1},
		pseudoWeather: 'puredarkness',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 7;
				}
				return 5;
			},
			onStart: function (pokemon) {
				this.add('-fieldstart', 'move: Pure Darkness');
				this.add('message', `Darkness goes into the battlefield!`);
			},
			onModifyMovePriority: -99,
			onModifyMove: function (move) {
            move.type = 'Dark';
			},
			onRestart: function (target, source) {
				this.field.removePseudoWeather('pureparkness');
			},
			//////
			onResidualOrder: 23,
			onEnd: function () {
				this.add('-fieldend', 'move: Pure Darkness');
				this.add('message', `The darkness disappeared!`);
			},
		},
		secondary: null,
		target: "all",
		type: "Dark",
	},
	allforcedestruction: {
		accuracy: true,
		basePower: 999999,
		category: "Special",
		desc: "This move always goes first. Ignores the target's stat stage changes, including evasiveness. Cannot miss. Clears the both the terrain and weather first before using the move. This move and its effects ignore the types and Abilities of other Pokemon. KO's the target when hit, but hurts itself in a process.",
		shortDesc: "Always first;Can't Miss;Clears Terrain/Weather;KOs Foe/hurts user.",
		id: "allforcedestruction",
		isNonstandard: "Custom",
		name: "All-Force Destruction",
		pp: 1,
        noPPBoosts: true,
		priority: 2,
		flags: {authentic: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.field.clearWeather();
			this.field.clearTerrain();
			this.add('-anim', source, "Charge", source);
			this.add(`raw|<b>Disto:</b> Gary, prepare to activate my secret weapon!`);
			this.add(`raw|<b>Gary:</b> I'm on it, sir.`);
			this.add('-anim', source, "Flash", source);
			this.add(`raw|<b>Disto:</b> Destruction Power Activate!`);
			this.add('-anim', source, "Hyper Beam", target);
			this.add('-anim', source, "Explosion", target);
		},
		onHit: function (target, source, move) {
			this.add('-ohko');
			target.faint();
			this.directDamage(source.maxhp / 2, source, source);
			this.add('-message', `${source.name} is severely hurt by its own force!`);
		},
		secondary: null,
		isZ: "destructiumz",
		ignoreDefensive: true,
		ignoreEvasion: true,
		ignoreAbility: true,
		ignoreImmunity: true,
		target: "allAdjacentFoes",
		type: "Dark",
	},
// Gary
	aerialdestruction: {
		accuracy: 100,
		basePower: 200,
		category: "Physical",
		desc: "If this move is successful, the user must recharge on the following turn and cannot select a move.",
		shortDesc: "User cannot move next turn.",
		id: "aerialdestruction",
		name: "Aerial Destruction",
		isNonstandard: "Custom",
		pp: 5,
		priority: 0,
		flags: {recharge: 1, contact: 1, protect: 1, mirror: 1},
		self: {
			volatileStatus: 'mustrecharge',
		},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Brave Bird", target);
			this.add('-anim', target, "Explosion", target);
		},
		secondary: null,
		target: "normal",
		type: "Flying",
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
		volatileStatus: 'smackdown',
		ignoreImmunity: {'Ground': true},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Ground",
	},
// Artie
	magmahammer: {
		accuracy: 90,
		basePower: 100,
		category: "Special",
		desc: "Lowers the user's Speed by 1 stage.",
		shortDesc: "Lowers the user's Speed by 1.",
		id: "magmahammer",
		name: "Magma Hammer",
		isNonstandard: "Custom",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Hammer Arm", target);
			this.add('-anim', target, "Pyro Ball", target);
		},
		secondary: null,
		target: "normal",
		type: "Fire",
	},
// Max
		forcewin20: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Confuses the target and subjects it to the effects of Taunt, Torment, Heal Block, Embargo, and Encore. 10% chance to forcibly give the user's trainer the win. This move and its effects ignore the Abilities of other Pokemon.",
		shortDesc: "Dominates foe.",
		id: "forcewin20",
		name: "Forcewin 2.0",
		isNonstandard: "Custom",
		pp: 5,
		priority: -2,
		flags: {authentic: 1},
		onTryMovePriority: 100,
		onTryMove: function (pokemon, target, move) {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Entrainment", source);
			this.add('-anim', source, "Hyper Voice", source);
			this.add('-anim', source, "Lock On", target);
		},
		onHit: function (target, source) {
			target.addVolatile('taunt', source);
			target.addVolatile('embargo', source);
			target.addVolatile('torment', source);
			target.addVolatile('confusion', source);
			target.addVolatile('healblock', source);
			target.addVolatile('encore', source);
		},
		secondary: {
			chance: 10,
		    onHit: function (target, source) {
			if (source.name === 'Max') this.add(`raw|<b>Max:</b> Finally...`);
			if (source.name === 'Max') this.add(`raw|<b>Max:</b> A pure win!`);
			this.win(source.side);
			}
		},
		ignoreAbility: true,
		target: "normal",
		type: "???",
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
			target.faint();
			source.faint();
		},
		secondary: null,
		target: "allAdjacent",
		type: "???",
	},
	// Kasandra
	falsemirage: {
		accuracy: true,
		category: "Special",
		basePower: 1,
		desc: "The user creates a substitute to take its place in battle. This substitute is a Pokemon selected from a broad set of Random-Eligable Pokemon able to learn the move chosen as this move's base move. Upon the substitutes creation, this Pokemon's ability is suppressed until it switches out. The substitute Pokemon is generated with a Random Battle moveset with maximum PP that is added (except for duplicates) to the user's moveset; these additions are removed when this substitute is no longer active. The substitute uses its species's base stats, types, ability, and weight but retains the user's max HP, stat stages, gender, level, status conditions, trapping, binding, and pseudo-statuses such as confusion. Its HP is 100% of the user's maximum HP. When this substitute falls to zero HP, it breaks, and the user reverts to the state in which it used this move. This substitute absorbs indirect damage and authentic moves but does not reset the counter of bad poison when broken and cannot be transfered through Baton Pass. Transforming into this substitute will not fail. If the user switches out while the substitute is up, the substitute will be removed and the user will revert to the state in which it used this move. This move's properties are based on the move False Mirage is inheriting from.",
		shortDesc: "Uses a Random Battle Pokemon as a Substitute.",
		id: "falsemirage",
		name: "False Mirage",
		isNonstandard: "Custom",
		pp: 1,
		priority: 0,
		flags: {},
		onModifyMove(move) {
			// @ts-ignore Hack for Kasandra's Z move
			move.type = move.baseMove ? move.baseMove.type : move.type;
			// @ts-ignore Hack for Kasandra's Z move
			move.basePower = move.baseMove ? move.baseMove.basePower : move.basePower;
			// @ts-ignore Hack for Kasandra's Z move
			move.category = move.baseMove ? move.baseMove.category : move.category;
			// @ts-ignore Hack for Kasandra's Z move
			this.mirageMove = move.baseMove;
		},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source, move) {
			let zmove = this.dex.getMove(this.zMoveTable[move.type]);
			this.add('-anim', source, zmove.name, target);
			this.add('-anim', source, "Transform", source);
		},
		onAfterMoveSecondarySelf(pokemon, move) {
			/** @type {{[move: string]: string[]}} */
			let mirages = {
				blizzard: ['Ninetales-Alola', 'Glalie', 'Froslass', 'Sandslash-Alola', 'Jynx', 'Vanilluxe', 'Glaceon', 'Beartic', 'Dewgong', 'Cloyster', 'Cryogonal', 'Avalugg', 'Mamoswine', 'Delibird', 'Walrein', 'Weavile', 'Abomasnow', 'Aurorus', 'Crabominable', 'Articuno', 'Regice', 'Kyurem', 'Mr. Rime', 'Darmanitan-Galar', 'Frosmoth', 'Eiscue', 'Arctozolt', 'Arctovish'],
				thunder: ['Raichu', 'Raichu-Alola', 'Electrode', 'Ampharos', 'Electivire', 'Jolteon', 'Manectric', 'Plusle', 'Minun', 'Luxray', 'Pachirisu', 'Zebstrika', 'Eelektross', 'Xurkitree', 'Zeraora', 'Magnezone', 'Zapdos', 'Rotom', 'Rotom-Wash', 'Rotom-Mow', 'Rotom-Heat', 'Rotom-Frost', 'Rotom-Fan', 'Emolga', 'Thundurus', 'Thundurus-Therian', 'Heliolisk', 'Dedenne', 'Oricorio-Pom-Pom', 'Togedemaru', 'Tapu Koko', 'Golem-Alola', 'Lanturn', 'Galvantula', 'Stunfisk', 'Zekrom', 'Boltund', 'Toxtricity', 'Pincurchin', 'Morpeko', 'Dracozolt', 'Arctozolt'],
				fireblast: ['Charizard', 'Ninetales', 'Arcanine', 'Rapidash', 'Flareon', 'Typhlosion', 'Magcargo', 'Magmotar', 'Entei', 'Marowak-Alola', 'Blaziken', 'Torkoal', 'Infernape', 'Emboar', 'Simisear', 'Darmanitan', 'Heatmor', 'Delphox', 'Talonflame', 'Incineroar', 'Moltres', 'Ho-Oh', 'Camerupt', 'Heatran', 'Pyroar', 'Volcanion', 'Oricorio', 'Turtonator', 'Blacephalon', 'Houndoom', 'Rotom-Heat', 'Victini', 'Chandelure', 'Volcarona', 'Reshiram', 'Salazzle', 'Cinderace', 'Coalossal', 'Centiskorch', 'Darmanitan-Zen-Galar'],
				hydropump: ['Blastoise', 'Golduck', 'Poliwrath', 'Politoed', 'Dewgong', 'Cloyster', 'Kingler', 'Kingdra', 'Seaking', 'Gyarados', 'Starmie', 'Vaporeon', 'Feraligatr', 'Octillery', 'Suicune', 'Swampert', 'Wailord', 'Crawdaunt', 'Milotic', 'Huntail', 'Gorebyss', 'Bibarel', 'Luvdisc', 'Kyogre', 'Empoleon', 'Floatzel', 'Gastrodon', 'Gastrodon-East', 'Lumineon', 'Phione', 'Manaphy', 'Samurott', 'Simipour', 'Seismitoad', 'Basculin', 'Basculin-Blue-Striped', 'Alomomola', 'Greninja', 'Clawitzer', 'Primarina', 'Wishiwashi', 'Pyukumuku', 'Tentacruel', 'Slowbro', 'Slowking', 'Lapras', 'Lanturn', 'Quagsire', 'Qwilfish', 'Corsola', 'Mantine', 'Ludicolo', 'Pelipper', 'Sharpedo', 'Whiscash', 'Relicanth', 'Palkia', 'Carracosta', 'Swanna', 'Jellicent', 'Keldeo', 'Araquanid', 'Bruxish', 'Tapu Fini', 'Omastar', 'Kabutops', 'Walrein', 'Rotom-Wash', 'Barbaracle', 'Volcanion', 'Toxapex', 'Golisopod', 'Inteleon', 'Drednaw', 'Cramorant', 'Barraskewda', 'Dracovish', 'Arctovish'],
				hurricane: ['Tornadus', 'Tornadus-Therian', 'Noivern', 'Pidgeot', 'Fearow', 'Crobat', 'Farfetch\'d', 'Dodrio', 'Charizard', 'Butterfree', 'Gyarados', 'Dragonite', 'Aerodactyl', 'Articuno', 'Zapdos', 'Moltres', 'Noctowl', 'Ledian', 'Xatu', 'Jumpluff', 'Togekiss', 'Yanmega', 'Honchkrow', 'Gliscor', 'Delibird', 'Mantine', 'Skarmory', 'Lugia', 'Ho-Oh', 'Beautifly', 'Swellow', 'Masquerain', 'Ninjask', 'Peliper', 'Salamence', 'Altaria', 'Tropius', 'Rayquaza', 'Staraptor', 'Mothim', 'Vespiquen', 'Chatot', 'Drifblim', 'Rotom-Fan', 'Shaymin-Sky', 'Unfezant', 'Swoobat', 'Sigilyph', 'Archeops', 'Swanna', 'Emolga', 'Braviary', 'Mandibuzz', 'Thundurus', 'Thundurus-Therian', 'Landorus', 'Landorus-Therian', 'Talonflame', 'Hawlucha', 'Vivillon', 'Yveltal', 'Toucannon', 'Oricorio', 'Oricorio-Pom-Pom', 'Oricorio-Pa\'u', 'Oricorio-Sensu', 'Minior', 'Celesteela', 'Corviknight', 'Cramorant'],
				psychic: ['Alakazam', 'Hypno', 'Espeon', 'Mewtwo', 'Mew', 'Unown', 'Wobbuffet', 'Grumpig', 'Deoxys', 'Chimecho', 'Uxie', 'Mesprit', 'Azelf', 'Cresselia', 'Musharna', 'Gothitelle', 'Reuniclus', 'Beheeyem', 'Meowstic-F', 'Solgaleo', 'Lunala', 'Necrozma', 'Mr. Mime', 'Xatu', 'Lugia', 'Celebi', 'Gardevoir', 'Gallade', 'Victini', 'Swoobat', 'Sigilyph', 'Hoopa', 'Hoopa-Unbound', 'Oricorio-Pa\'u', 'Tapu Lele', 'Slowbro', 'Slowking', 'Exeggutor', 'Girafarig', 'Raichu-Alola', 'Starmie', 'Jynx', 'Medicham', 'Lunatone', 'Solrock', 'Claydol', 'Metagross', 'Latias', 'Latios', 'Jirachi', 'Bronzong', 'Meloetta', 'Delphox', 'Malamar', 'Oranguru', 'Bruxish', 'Orbeetle', 'Hatterene', 'Mr. Rime', 'Indeedee-F'],
				playrough: ['Clefable', 'Togekiss', 'Granbull', 'Florges', 'Aromatisse', 'Slurpuff', 'Sylveon', 'Xerneas', 'Comfey', 'Wigglytuff', 'Azumarill', 'Gardevoir', 'Mawile', 'Mr. Mime', 'Ninetales-Alola', 'Whimsicott', 'Dedenne', 'Carbink', 'Diancie', 'Ribombee', 'Shiinotic', 'Tapu Koko', 'Tapu Lele', 'Tapu Bulu', 'Tapu Fini', 'Magearna', 'Hatterene', 'Grimmsnarl', 'Alcremie', 'Zacian-Crowned', 'Rapidash-Galar', 'Weezing-Galar'],
				outrage: ['Dragonite', 'Salamence', 'Kingdra', 'Haxorus', 'Druddigon', 'Goodra', 'Kommo-O', 'Latias', 'Latios', 'Rayquaza', 'Garchomp', 'Reshiram', 'Zekrom', 'Kyurem', 'Zygarde', 'Dialga', 'Palkia', 'Giratina', 'Exeggutor-Alola', 'Hydreigon', 'Dragalge', 'Tyrantrum', 'Noivern', 'Turtonator', 'Drampa', 'Guzzlord', 'Naganadel', 'Flapple', 'Appletun', 'Dracozolt', 'Dracovish', 'Duraludon', 'Dragapult', 'Eternatus'],
				darkpulse: ['Persian-Alola', 'Mightyena', 'Umbreon', 'Absol', 'Darkrai', 'Zoroark', 'Raticate-Alola', 'Honchkrow', 'Weavile', 'Houndoom', 'Sableye', 'Scrafty', 'Bisharp', 'Mandibuzz', 'Hydreigon', 'Malamar', 'Yveltal', 'Guzzlord', 'Muk-Alola', 'Tyranitar', 'Drapion', 'Cacturne', 'Crawdaunt', 'Sharpedo', 'Skuntank', 'Spiritomb', 'Krookodile', 'Greninja', 'Pangoro', 'Hoopa-Unbound', 'Incineroar', 'Thievul', 'Grimmsnarl', 'Obstagoon', 'Morpeko'],
			};
			// @ts-ignore Hack for Kasandra's Z move
			const baseMove = this.mirageMove ? this.mirageMove.id : 'darkpulse';
			const pool = mirages[baseMove];
			if (!pool) throw new Error(`SCB: Unable to find fake mirage movepool for the move: "${baseMove}".`); // Should never happen
			const mirage = mirages[baseMove][this.random(pool.length)];
			// Generate new set
			const generator = new RandomSCBTeams('gen8randombattle', this.prng);
			let set = generator.randomSet(mirage);
			// Suppress Ability now to prevent starting new abilities when transforming
			pokemon.addVolatile('gastroacid', pokemon);
			// Tranform into it
			pokemon.formeChange(set.species);
			for (let newMove of set.moves) {
				let moveTemplate = this.dex.getMove(newMove);
				if (pokemon.moves.includes(moveTemplate.id)) continue;
				pokemon.moveSlots.push({
					move: moveTemplate.name,
					id: moveTemplate.id,
					pp: ((moveTemplate.noPPBoosts || moveTemplate.isZ) ? moveTemplate.pp : moveTemplate.pp * 8 / 5),
					maxpp: ((moveTemplate.noPPBoosts || moveTemplate.isZ) ? moveTemplate.pp : moveTemplate.pp * 8 / 5),
					target: moveTemplate.target,
					disabled: false,
					disabledSource: '',
					used: false,
				});
			}
			// Update HP
			// @ts-ignore Hack for Kasandra's Z Move
			pokemon.m.mirageHP = pokemon.hp;
			pokemon.heal(pokemon.maxhp - pokemon.hp, pokemon);
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
			this.add('message', `${pokemon.name} pretends to be a ${set.species}!`);
		},
		isZ: "falsemiragiumz",
		secondary: null,
		target: "normal",
		type: "Dark",
	},
// Lynda
	snowfall: {
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "Summons Hail and Aurora Veil after doing damage. Has a 40% chance to raise the user's Special Attack and Speed by 1 stage.",
		shortDesc: "Summons Hail and Aurora Veil.",
		id: "snowfall",
		name: "Snowfall",
		isNonstandard: "Custom",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Max Hailstorm", target);
		},
		onAfterMoveSecondarySelf(source) {
			this.field.setWeather('hail');
			source.side.addSideCondition('auroraveil');
		},
		secondary: {
			chance: 40,
			self: {
				boosts: {
					spa: 1,
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Ice",
	},
// Bonky
	bearhug: {
		accuracy: 85,
		basePower: 160,
		category: "Physical",
		desc: "Prevents the target from switching for four or five turns (seven turns if the user is holding Grip Claw). Causes damage to the target equal to 1/8 of its maximum HP (1/6 if the user is holding Binding Band), rounded down, at the end of each turn during effect. Both of these effects persist for their normal duration even if the user switches out or faints. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Parting Shot, U-turn, or Volt Switch. The effect ends if the target leaves the field or uses Rapid Spin or Substitute successfully. This effect is not stackable or reset by using this or another binding move.",
		shortDesc: "Traps/damages for 4-5 turns, even if user returns.",
		id: "bearhug",
		isNonstandard: "Custom",
		name: "Bear Hug",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		volatileStatus: 'bearhug',
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Bind", target);
		},
		effect: {
			duration: 5,
			durationCallback: function (target, source) {
				if (source.hasItem('gripclaw')) {
					this.debug('bearhug grip claw duration boost');
					return 8;
				}
				return this.random(5, 7);
			},
			onStart: function () {
				this.add('-message', 'It was hugged by a bear hug!');
			},
			onResidualOrder: 11,
			onResidual: function (pokemon, source) {
				if (this.effectData.source.hasItem('bindingband')) {
					this.debug('bearhug binding band damage boost');
					this.damage(pokemon.maxhp / 6);
				} else {
					this.damage(pokemon.maxhp / 8);
				}
			},
			onEnd: function () {
				this.add('-message', 'It is now freed from a bear hug!');
			},
			onTrapPokemon: function (pokemon) {
				pokemon.tryTrap();
			},
		},
		target: "normal",
		type: "Fighting",
	},
// Simmons
	supernaturalimpact: {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		desc: "Until they switch out, Pokemon hit by this move will turn all their moves into Psychic-type moves and have all their secondary move effects deleted.",
		shortDesc: "Turns foe's moves into Psychic-type; Deletes secondaries.",
		id: "supernaturalimpact",
		name: "Supernatural Impact",
		isNonstandard: "Custom",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Max Darkness', target);
			this.add('-anim', source, 'Double-Edge', target);
		},
		volatileStatus: 'supernaturalimpact',
		effect: {
			noCopy: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Supernatural Impact');
				this.add('-message', `Showers of mysterious, magical powders scattered everywhere!`);
			},
			onFoeTryMove(target, source, move) {
				if (move.secondaries && move.category !== 'Status') {
					this.debug('Supernatural Impact secondary effects suppression');
					delete move.secondaries;
				}
			},
	    	onModifyMove(move, pokemon, target) {
			move.type = 'Psychic';
    		},
		},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
// Simpson
	bastingrush: {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		desc: "The target's ability is changed to Slow Start if this move hits. Lowers the user's Attack and Special Attack by 1 stage. This move's category becomes Special if the user is Kyurem-White.",
		shortDesc: "Changes foe's ability to Slow Start; Lowers the user's Atk/Spa by 1.",
		id: "bastingrush",
		name: "Basting Rush",
		isNonstandard: "Custom",
		pp: 5,
		flags: {protect: 1, mirror: 1, contact: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Dragon Rush', target);
		},
		onHit: function (pokemon) {
			if (pokemon.ability === 'slowstart') return;
			let oldAbility = pokemon.setAbility('slowstart');
			if (oldAbility) {
				this.add('-ability', pokemon, 'Slow Start', '[from] move: Basting Rush');
				return;
			}
			return false;
		},
		onModifyMove: function (move, pokemon) {
			if (pokemon.template.baseSpecies == 'Kyurem-White') move.category = 'Special';
		},
		self: {
			boosts: {
				atk: -1,
				spa: -1,
			},
		},
		target: "normal",
		type: "Dragon",
	},
// Oblivia
	fun: {
		basePower: 100,
		accuracy: 100,
		category: "Special",
		desc: "Summons Gravity after doing damage and boosts the user's Speed by two stages.",
		shortDesc: "Sets Gravity after dmg; raises Spe. by 2.",
		id: "fun",
		name: "FUN!!!",
		isNonstandard: "Custom",
		pp: 10,
		priority: 0,
		flags: {mirror: 1, protect: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Moonlight', source);
			this.add('-anim', source, 'Gravity', source);
			this.add('-anim', source, 'Moonblast', target);
		},
		onAfterMoveSecondarySelf: function () {
			this.field.addPseudoWeather('gravity');
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 2,
				},
			},
		},
		target: "normal",
		type: "Psychic",
	},
// Flapjack
	applejacksraid: {
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		desc: "Lowers the target's Defense by 1 stage. Until the target switches out, it takes 2x damage from Bug and Fire moves. Summons Sunny Day.",
		shortDesc: "-1 SpD. Target takes 2x damage from Bug/Fire moves;Sunny.",
		id: "applejacksraid",
		name: "Applejacks Raid",
		isNonstandard: "Custom",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Grav Apple", target);
			this.add('-anim', source, "Grav Apple", target);
			this.add('-anim', source, "Grav Apple", target);
		},
		boosts: {
			spd: -1,
		},
		volatileStatus: 'applejacksraid',
		effect: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Applejacks Raid');
				this.add('-message', `${pokemon.illusion ? pokemon.illusion.name : pokemon.name} is covered with sticky apples!`);
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (target.volatiles['applejacksraid'] && this.dex.getActiveMove(move).type === 'Bug') {
					// TODO: Figure out damage modifier
					return this.chainModify(2);
				}
				if (target.volatiles['applejacksraid'] && this.dex.getActiveMove(move).type === 'Fire') {
					// TODO: Figure out damage modifier
					return this.chainModify(2);
				}
			},
			onResidualOrder: 21,
			onEnd(pokemon) {
				this.add('-start', pokemon, 'Applejacks Raid');
				this.add('-message', `The apples fell off from ${pokemon.illusion ? pokemon.illusion.name : pokemon.name}!`);
			},
		},
		onAfterMoveSecondarySelf(source) {
			this.field.setWeather('sunnyday');
		},
		secondary: null,
		target: "normal",
		type: "Grass",
	},
// Blaze
	"atomicfire": {
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		desc: "Has a 50% chance to burn the target. This move's type effectiveness against Rock is changed to be super effective no matter what this move's type is.",
		shortDesc: "50% burn. Super effective on Rock. Thaws user.",
		id: "atomicfire",
		name: "Atomic Fire",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, defrost: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Overheat', source);
			this.add('-anim', source, 'Flare Blitz', target);
		},
		onEffectiveness: function (typeMod, target, type) {
			if (type === 'Rock') return 1;
		},
		secondary: {
			chance: 50,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
	},
// Bogie
	tocksrocks: {
		accuracy: 100,
		basePower: 140,
		category: "Special",
		desc: "If the target is a Steel-type and is immune to Poison due to its typing, this move deals neutral damage regardless of other types, and the target loses its type-based immunity to Poison.",
		shortDesc: "First hit neutral on Steel; removes its immunity.",
		id: "tocksrocks",
		name: "Tocks Rocks",
		isNonstandard: "Custom",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Overdrive", target);
			this.add('-anim', source, "Sludge Wave", target);
		},
		onEffectiveness(typeMod, target, type, move) {
			if (move.type !== 'Poison') return;
			if (!target) return; // avoid crashing when called from a chat plugin
			if (!target.runImmunity('Poison')) {
				if (target.hasType('Steel')) return 0;
			}
		},
		volatileStatus: 'tocksrocks',
		effect: {
			noCopy: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Tocks Rocks');
			},
			onNegateImmunity(pokemon, type) {
				if (pokemon.hasType('Steel') && type === 'Poison') return false;
			},
		},
		ignoreImmunity: {'Poison': true},
		secondary: null,
		target: "normal",
		type: "Poison",
	},
// Bullet
	silverslam: {
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon, target) {
			let power = (Math.floor(25 * target.getStat('spe') / pokemon.getStat('spe')) || 1);
			if (power > 150) power = 150;
			this.debug('' + power + ' bp');
			return power;
		},
		category: "Physical",
		desc: "Power is equal to (25 * target's current Speed / user's current Speed) + 1, rounded down, but not more than 150. If the user's current Speed is 0, this move's power is 1. Summons Trick Room unless Trick Room is already active.",
		shortDesc: "More power if slower; sets Trick Room.",
		id: "silverslam",
		name: "Silver Slam",
		isNonstandard: "Custom",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Iron Defense", source);
			this.add('-anim', source, "Iron Head", target);
		},
		onAfterMoveSecondarySelf(pokemon) {
			if (!this.field.pseudoWeather.trickroom) {
				this.field.addPseudoWeather('trickroom', pokemon);
			}
			this.add('-fieldactivate', 'move: Pay Day'); // Coins are scattered on the ground
		},
		secondary: null,
		target: "normal",
		type: "Steel",
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
// Willby
	superpowerball: {
		accuracy: 85,
		basePower: 160,
		category: "Special",
		desc: "If the target lost HP, the user takes recoil damage equal to 1/4 the HP lost by the target, rounded half up, but not less than 1 HP.",
		shortDesc: "Has 1/4 recoil.",
		id: "superpowerball",
		name: "Super Power Ball",
		isNonstandard: "Custom",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Pyro Ball", target);
			this.add('-anim', source, "Aura Sphere", target);
		},
		recoil: [1, 4],
		secondary: null,
		target: "normal",
		type: "Fighting",
	},
// Kris
	dynamaxblaster: {
		accuracy: 100,
		basePower: 100,
		basePowerCallback(pokemon, target, move) {
			if (target.volatiles['dynamax']) {
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Special",
		desc: "Deals double damage against Dynamax and Gigantamax Pokemon. This move becomes a physical attack if the user's Attack is greater than its Special Attack, including stat stage changes. This move and its effects ignore the Abilities and Type Immunities of other Pokemon.",
		shortDesc: "Physical if user's Atk > Sp. Atk. Ignores Abilities/Immunities; +Dmg agst. Dymx./Ggtmx.",
		id: "dynamaxblaster",
		name: "Dynamax Blaster",
		isNonstandard: "Custom",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Photon Geyser", source);
			this.add('-anim', source, "Dynamax Cannon", target);
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		ignoreImmunity: true,
		ignoreAbility: true,
		secondary: null,
		target: "normal",
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
// Jay
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
// Puff
	cottonpuffdust: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Causes the target to become a Fairy type and raises the user's Defense and Special Defense by 1 stage. Fails if the target is an Arceus or a Silvally, or if the target is already purely Fairy type.",
		shortDesc: "Changes the target's type to Fairy; Def and SpD +1.",
		id: "cottonpuffdust",
		name: "Cotton Puff Dust",
		isNonstandard: "Custom",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, mystery: 1}, //This move is immune to Snatch.
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Cotton Spore", target);
			this.add('-anim', source, "Magic Powder", target);
		},
		onHit(target) {
			if (target.getTypes().join() === 'Fairy' || !target.setType('Fairy')) {
				// Soak should animate even when it fails.
				// Returning false would suppress the animation.
				this.add('-fail', target);
				return null;
			}
			this.add('-start', target, 'typechange', 'Fairy');
		},
		self: {
			boosts: {
			def: 1,
			spd: 1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
	},
// Gizmo
	computerwizchange: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user's third type and Extreme Speed becomes a random type. If the user uses Extreme Speed on the next turn, its power will be doubled.",
		shortDesc: "Changes the user and Extreme Speed's type to random type.",
		id: "computerwizchange",
		name: "Computer Wiz Change",
		isNonstandard: "Custom",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		volatileStatus: 'computerwizchange',
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Hyper Voice", source);
			this.add('-anim', source, "Transform", source);
		},
        secondary: null,
		target: "self",
		type: "Normal",
	},
	gmaxweirdosdomain: {
		accuracy: true,
		basePower: 1,
		category: "Physical",
		shortDesc: "Foes: Parafusion. BP scales with base move's BP.",
		id: "gmaxweirdosdomain",
		isNonstandard: "Custom",
		name: "G-Max Weirdo's Domain",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Yamper",
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Wild Charge', target);
			this.add('-anim', source, 'Volt Tackle', target);
		},
		onHit(target, source, move) {
			for (const pokemon of target.side.active) {
				pokemon.trySetStatus('par', source, move);
				pokemon.addVolatile('confusion', source, move);
			}
			if (source.name === 'Gizmo') this.add(`raw|<b>Gizmo:</b> This G-Max move is brought to you by The Weirdo's Domain!`);
		},	
		secondary: null,
		target: "normal",
		type: "Electric",
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
		desc: "Has a 30% chance to flinch the target. If hit, the target's Ability is rendered ineffective as long as it remains active. If the target uses Baton Pass, the replacement will remain under this effect. If the user is an Absol-Mega, this move has a power of 160. This move combines Flying in its type effectiveness against the target.",
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
// Oscar
	lancejab: {
		accuracy: 100,
        basePower: 90,
		desc: "Has a higher chance for a critical hit. Applies Foresight to the target. Hits Ghost-type Pokémon.",
		shortDesc: "High critical hit ratio. Applies Foresight to foe.",
		category: "Physical",
		id: "lancejab",
		isNonstandard: "Custom",
		name: "Lance Jab",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		critRatio: 2,
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Fury Attack", target);
			this.add('-anim', source, "Fury Attack", target);
		},
		onHit(target, source) {
				target.addVolatile('foresight');
		},
		secondary: null,
		ignoreImmunity: {'Fighting': true},
		target: "normal",
		type: "Fighting",
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
//Seraphi Man
	blastofeternity: {
		accuracy: true,
		basePower: 200,
		category: "Special",
		desc: "If this move is successful, the user must recharge for two turns and cannot select a move. This move is super-effective against any type. This move and its effects ignore the Abilities of other Pokemon. This move and its effects ignore the types and Abilities of other Pokemon. Cannot miss. Sets Legendary Terrain after the move.",
		shortDesc: "2 Turns: User cannot move; Super-effective.",
		id: "blastofeternity",
		isNonstandard: "Custom",
		name: "Blast of Eternity",
		pp: 5,
		priority: 0,
		flags: {recharge: 1, protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-activate', source, 'move: Celebrate');
			this.add('-anim', source, "Eternabeam", target);
			this.add('-anim', target, "Explosion", target);
		},
		onEffectiveness: function (typeMod, target) {
			return 1;
		},
		self: {
			volatileStatus: 'slowrecharge',
		},
		onAfterMoveSecondarySelf(pokemon) {
			if (!this.field.isTerrain('legendaryterrain')) {
				this.field.setTerrain('legendaryterrain', pokemon);
			}
		},
        secondary: null,
		ignoreDefensive: true,
		ignoreEvasion: true,
		ignoreAbility: true,
		ignoreImmunity: true,
		target: "allAdjacentFoes",
		type: "Dragon",
	},
//Move used for Seraphi Man's Ability
	"legendaryterrain": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the terrain becomes Legendary Terrain. During the effect, the power of Dragon-type attacks made by grounded Pokemon is multiplied by 1.5 and the power of Fairy-type attacks used against grounded Pokemon is multiplied by 0.5. It also had effects of Psychic Terrain, Electric Terrain, Grassy Terrain, Misty Terrain, and Aurora Veil. Camouflage transforms the user into a Dragon type, Nature Power becomes Dragon, and Secret Power has a 30% chance to raise the user's all stats (except acc/eva) by 1 stage. Fails if the current terrain is Legendary Terrain.",
		shortDesc: "5 turns. Grounded: +Dragon power, -Fairy power.",
		id: "legendaryterrain",
		name: "Legendary Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		isNonstandard: "Custom",
		terrain: 'legendaryterrain',
		effect: {
			duration: 5,
			durationCallback(source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onTryHitPriority: 4,
			onTryHit(target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable() || target.side === source.side) return;
				if (effect && (effect.priority <= 0.1 || effect.target === 'self')) {
					return;
				}
				this.add('-activate', target, 'move: Legendary Terrain');
				return null;
			},
			onSetStatus(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (effect && effect.status) {
					this.add('-activate', target, 'move: Misty Terrain');
				}
				return false;
			},
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Dragon' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('legendary terrain boost');
					return this.chainModify(1.5);
				}
				if (move.type === 'Fairy' && defender.isGrounded() && !defender.isSemiInvulnerable()) {
					this.debug('legendary terrain weaken');
					return this.chainModify(0.5);
				}
			},
			onTryAddVolatile(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (status.id === 'confusion') {
					if (effect.effectType === 'Move' && !effect.secondaries) this.add('-activate', target, 'move: Misty Terrain');
					return null;
				}
			},
			onTerrain(pokemon) {
				if (pokemon.isGrounded() && !pokemon.isSemiInvulnerable()) {
					this.debug('Pokemon is grounded, healing through Legendary Terrain.');
					this.heal(pokemon.maxhp / 4, pokemon, pokemon);
				}
			},
			onStart(battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Legendary Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Legendary Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd() {
				this.add('-fieldend', 'move: Legendary Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Dragon",
	},
//////////////// Moves Modded to add G-Max Power.
	"aurawheel": {
        inherit: true,
		gmaxPower: 170,
	},
	"originpulse": {
        inherit: true,
		gmaxPower: 170,
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
