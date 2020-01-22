'use strict';

// Used for one of the special moves
const randomSCBOTeams = require('./random-teams');
/** @type {typeof import('../../../sim/pokemon').Pokemon} */
const Pokemon = require(/** @type {any} */ ('../../../.sim-dist/pokemon')).Pokemon;

/** @type {{[k: string]: ModdedMoveData}} */
let BattleMovedex = {
// Static
	pikapower: {
		accuracy: 85,
		basePower: 90,
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
	evoimpact: {
		accuracy: true,
		category: "Status",
		desc: "The user transforms into a different Pokemon, and it uses a move dependent on the Pokemon: Vaporeon (Water Pulse), Jolteon (Thunderbolt), Flareon (Flamethrower), Espeon (Psychic), Umbreon (Dark Pulse), Leafeon (Leaf Storm), Glaceon (Ice Beam), and Sylveon (Moonblast). Reverts to an Eevee at the end of the turn.",
		shortDesc: " For turn: transforms, uses linked move.",
		id: "evoimpact",
		name: "Evo-Impact",
		isNonstandard: "Custom",
		pp: 10,
		priority: 0,
		flags: {mirror: 1, protect: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onHit: function (target, source, move) {
			let baseForme = source.template.id;
			/** @type {{[forme: string]: string}} */
			let formes = {
				vaporeon: 'Water Pulse',
				jolteon: 'Thunderbolt',
				flareon: 'Flamethrower',
				espeon: 'Psychic',
				umbreon: 'Dark Pulse',
				leafeon: 'Leaf Storm',
				glaceon: 'Ice Beam',
				sylveon: 'Moonblast',
			};
			let forme = Object.keys(formes)[this.random(8)];
			source.formeChange(forme, this.dex.getAbility('quickstart'), true);
			this.useMove(formes[forme], source, target);
			source.formeChange(baseForme, this.dex.getAbility('quickstart'), true);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
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
		secondary: {
			chance: 50,
			boosts: {
				spa: -2,
			},
		},
		target: "normal",
		type: "Water",
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
// Zena
	titanforce: {
		accuracy: 100,
		basePower: 130,
		category: "Physical",
		desc: "Fails unless the user is a Ground type. If this move is successful, the user's Ground type becomes typeless as long as it remains active. Has a 100% chance to lower the target's Attack by 2 stages.",
		shortDesc: "User's Ground type becomes typeless; Lowers Attack.",
		id: "titanforce",
		name: "Titan Force",
		isNonstandard: "Custom",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function (pokemon, target, move) {
			this.attrLastMove('[still]');
			if (pokemon.hasType('Ground')) return;
			this.add('-fail', pokemon, 'move: Titan Force');
			this.attrLastMove('[still]');
			return null;
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Earthquake', target);
			this.add('-anim', source, 'Stomping Tantrum', target);
		},
		self: {
			onHit: function (pokemon) {
				pokemon.setType(pokemon.getTypes(true).map(type => type === "Ground" ? "???" : type));
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[from] move: Titan Force');
				this.add('-message', `${pokemon.name} Earth'd itself out!`);
			},
		},
		secondary: {
			chance: 100,
			boosts: {
				atk: -2,
			},
		},
		target: "normal",
		type: "Ground",
	},
// Kyle
	desertdrain: {
		accuracy: 100,
		basePower: 75,
		category: "Special",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of the damage dealt.",
		id: "desertdrain",
		name: "Desert Drain",
		isNonstandard: "Custom",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, heal: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Leech Life", target);
		},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Ground",
	},
// Serene Star
	snowdance: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "Has a 50% chance to raise the user's Attack by 1 stage.",
		shortDesc: "50% chance to raise the user's Attack by 1.",
		id: "snowdance",
		isNonstandard: "Custom",
		name: "Snow Dance",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, dance: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Teeter Dance", source);
			this.add('-anim', source, "Mist", source);
			this.add('-anim', source, "Powder Snow", source);
			this.add('-anim', source, "Slam", target);
		},
		secondary: {
			chance: 50,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
		target: "normal",
		type: "Ice",
	},
// Goby	
	electroflash: {
		accuracy: 90,
		basePower: 75,
		category: "Special",
		desc: "Has a 100% chance to raise the user's Special Attack by 1 stage.",
		shortDesc: "100% chance to raise the user's Special Attack by 1.",
		id: "electroflash",
		isNonstandard: "Custom",
		name: "Electro Flash",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Charge", source);
			this.add('-anim', source, "Electrify", source);
			this.add('-anim', source, "Flash", target);
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Electric",
	},
// The Hound
	darkflare: {
		accuracy: 85,
		basePower: 130,
		category: "Special",
		desc: "Summons Sunny Day after doing damage and combines Fire in its type effectiveness against the target.",
		shortDesc: "Summons Sunny Day. Combines Fire in its type effectiveness. Thaws user.",
		id: "darkflare",
		isNonstandard: "Custom",
		name: "Dark Flare",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, defrost: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Dark Pulse", source);
			this.add('-anim', source, "Overheat", target);
		},
		onAfterMoveSecondarySelf: function () {
			this.field.setWeather('sunnyday');
		},
		onEffectiveness: function (typeMod, type, move) {
			return typeMod + this.dex.getEffectiveness('Fire', type);
		},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
// Felix	
	themagicbagoftricks: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Causes the target to become confused and raises the user's Attack, Defense, Special Attack, Special Defense, Speed, Accuracy, and Evasion by 2 stages.",
		shortDesc: "Confuses adjacent Pokemon. Raises user's stats by 2.",
		id: "themagicbagoftricks",
		name: "The Magic Bag of Tricks",
		isNonstandard: "Custom",
		pp: 1,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Celebrate', source);
			this.add('-anim', source, 'Present', target);
			this.add('-anim', source, 'Teeter Dance', target);
		},
		onHit: function () {
			let messages = ["On with the show!",
				"YOU MESSED THEM ALL UP WITH CATS, POPEYES, DOUG, ANGELICA, AND LITTLE KIDDIE SHOWS!",
				"Your TROLLFACE!!!!",
				"Hello, immortal pineapple-and-banana-pepper-pizza!",
				"Holy spinach teeth?",
				"I’ve had all sorts of succotash",
				"Clone your fork",
				"Holy cheese and crackers!",
				"This is bananas: P-Q-L-E-F-E-T!",
				"This garbage attracts flies and huge roaches like crazy",
				"That's Nick's garbage!",
				"I WON'T OBEY A BUNCH OF CORN AND BEANS!",
				"Don't eat pigs, don't eat BATS, Don't eat beetles, flies or gnats.",
				"No Boogers In My Burgers!.",
				"Listen the moles, freckles, and warts thing is getting old...",
				"You can draw all the bubblegum and chocolate Pop Rocks you want.",
				"paper in your ear?",
				"*Creates blue zits, blackheads and abscesses*",
				"*poofs Pac-Man away*",
				"STOP SENDING YOUR WHITE KNIGHTS AFTER AKIRA!",
				"OH WOW A TWITTER THAT'S ALIVE!",
				"MEGA ROBOTS MOD!",
				"ALL OVER MY NEW SWEATER!",
				"*they get on my face* AHHH!",
				"EWWW!!! BOOGERS!!!",
				"I DON'T LIKE THE VOMIT THING, YOU DO!!!",
				"WHAT IS SO GREAT ABOUT WALMART ANYWAY!?",
				"I WOULDN'T EAT FACE MOLES!",
				"WHAT ARE SPINACH TEETH!?",
				"I HATE SUCCOTASH AND SPINACH! HERE!",
				"SUCCOTASH DOESN'T SCARE ME!",
				"Crackers don't scare me.",
				"I hate hamburgers.",
				"Wowsers indeed",
				"THERE'S A MACARONI ON MY HEAD!",
				"AAAAAAH! THEY'RE REAL!!!!",
				"LAND WITHOUT BRAINS IS MORE LIKE IT!!",
				"There's a car! There's a car! There's a car! There's a car!",
				"Bon appétit!",
				"AAAAAAAHHHH! FIRE!",
				"GOTTA SWEEP SWEEP SWEEP!",
				"TURN THE RECORD OVER!",
				"PASTAAAAAA!!!",
				"Donuts, Donuts, Donuts, Donuts!!",
				"AAEEOOO! KILLER TOFU!",
				"Garbage Attack!",
				"Holy cheesewhiskers!!",
				"Um, do you still like making dinosaurs out of cheese wax?",
				"People still say beeswax? How old are you again, five?",
				"Oh won't you have some waffles of mine!",
				"AHOY! SPINACH!",
				"Don't go I WILL KNOCK YOUR TEETH OUT!!!!",
				"Forks?! Come on! *Crowd is booing*",
				"Hide your bananas.",
				"OOH WAH AH AH AH!",
				"Stupid Storks and Sausages!",
				"Popcorn Shrimp?",
				"Bran Flakes?",
				"HOLY BANANAS!!!",
				"THATS ALL FOLKS!"][this.random(60)];

			this.add(`raw|<center><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Felix_the_cat.svg/975px-Felix_the_cat.svg.png" height="210" width="200"><br><h1>"${messages}"</h1>`);
		},
		volatileStatus: 'confusion',
		self: {
			boosts: {
			atk: 2,
			def: 2,
			spa: 2,
			spd: 2,
			spe: 2,
			evasion: 2,
			accuracy: 2,
			},
		},
		secondary: null,
		isZ: "felixiumz",
		target: "allAdjacent",
		type: "Normal",
	},
// Chuck
	frenzydance: {
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		desc: "Has a 30% chance to lower the target's Defense by 2 stages.",
		shortDesc: "30% chance to lower the target's Defense by 2.",
		id: "frenzydance",
		isNonstandard: "Custom",
		name: "Frenzy Dance",
		pp: 20,
		priority: 2,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Dragon Dance", source);
			this.add('-anim', source, "Night Slash", target);
		},
		onHit: function (target, source) {
			if (source.name === 'Chuck') {
			    this.add(`raw|<b>Chuck:</b> Bamm-Bamm-Bamm\!`);
			}
		},
		secondary: {
			chance: 30,
			boosts: {
				def: -2,
			},
		},
		target: "normal",
		type: "Dark",
	},
// Abby	
	mermaidwhirl: {
		accuracy: 90,
		basePower: 80,
		category: "Special",
		desc: "Summons Rain Dance after doing damage. If both the user and the target have not fainted, the target is forced to switch out and be replaced with a random unfainted ally. This effect fails if the target is under the effect of Ingrain, has the Suction Cups Ability, or this move hit a substitute.",
		shortDesc: "Forces the target to switch to a random ally. Summons Rain Dance.",
		id: "mermaidwhirl",
		isNonstandard: "Custom",
		name: "Mermaid Whirl",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		forceSwitch: true,
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Surf", source);
			this.add('-anim', source, "Whirlwind", target);
		},
		onAfterMoveSecondarySelf: function () {
			this.field.setWeather('raindance');
		},
		secondary: null,
		target: "normal",
		type: "Water",
	},
 // Nappa
	herossword: {
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		desc: "Ignores the target's stat stage changes, including evasiveness. This move's type effectiveness against Ghost is changed to be super effective no matter what this move's type is.",
		shortDesc: "Super effective on Ghost. Ignores stat stage changes.",
		id: "herossword",
		name: "Hero's Sword",
		isNonstandard: "Custom",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		ignoreEvasion: true,
		ignoreDefensive: true,
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Secret Sword", target);
		},
		onEffectiveness: function (typeMod, target, type) {
			if (type === 'Ghost') return 1;
		},
		ignoreImmunity: {'Fighting': true},
		secondary: null,
		target: "normal",
		type: "Fighting",
	},
// Gidget
	gidgetblast: {
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "This move's type changes to match the user's primary type. Has a 30% chance to lower the target's Special Defense by 1 stage.",
		shortDesc: "Shares user's type. 30% chance to lower the target's Sp. Def by 1.",
		id: "gidgetblast",
		isNonstandard: "Custom",
		name: "Gidget Blast",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove: function (move, pokemon) {
			let type = pokemon.types[0];
			if (type === "Bird") type = "???";
			move.type = type;
		},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source, move) {
			this.add('-anim', source, 'Geomancy', source);
			switch (move.type) {
			case 'Fire':
				this.add('-anim', source, 'Fire Blast', target);
				break;
			case 'Water':
				this.add('-anim', source, 'Hydro Pump', target);
				break;
			case 'Grass':
				this.add('-anim', source, 'Leaf Storm', target);
				break;
			}
		},
		secondary: {
			chance: 30,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Normal",
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
			this.add('-anim', source, "Wing Attack`", source);
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
// Skyla
	lugiassong: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Lowers the user's Speed by 1 stage. Raises the user's Defense and Special Defense by 2 stages.",
		shortDesc: "Lowers Spe by 1; raises SpD, Def by 2.",
		id: "lugiassong",
		isViable: true,
		name: "Lugia's Song",
		pp: 40,
		priority: 0,
		flags: {snatch: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Sing`", source);
			if (source.name === 'Skyla') {
			this.add(`raw|<b>Skyla:</b> 🎵You always love me more, miles away`);
			this.add(`raw|<b>Skyla:</b> I hear it in your voice, we're miles away`);
			this.add(`raw|<b>Skyla:</b> You're not afraid to tell me, miles away`);
			this.add(`raw|<b>Skyla:</b> I guess we're at our best when we're miles away🎵`);
			}
		},
		boosts: {
			def: 2,
			spd: 2,
			spe: -1,
		},
		secondary: null,
		target: "self",
		type: "Psychic",
	},
	// Kris Tami
	psychoflare: {
		accuracy: 100,
		basePower: 130,
		category: "Special",
		desc: "Has a 30% chance to summon Psychic Terrain.",
		shortDesc: "30% chance to summon Psychic Terrain.",
		id: "psychoflare",
		name: "Psycho Flare",
		isNonstandard: "Custom",
		pp: 5,
		priority: 0,
		flags: {mirror: 1, protect: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Psycho Boost", source);
		},
		secondary: {
			chance: 30,
			self: {
				onHit: function () {
					this.field.setTerrain('psychicterrain');
				},
			},
		},
		target: "normal",
		type: "Psychic",
	},
	// Sekka
	typechange: {
		accuracy: true,
		category: "Status",
		desc: "If the user is a Silvally, its item becomes a random Memory whose type matches one of the target's weaknesses, and it changes forme. The determined type of the move is used rather than the original type. Fails if the target has not made a move.",
		shortDesc: "Silvally: Changes user/move type to a weakness of target.",
		id: "typechange",
		isNonstandard: "Custom",
		name: "Type Change",
		pp: 15,
		priority: 0,
		flags: {},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Conversion", source);
		},
		onHit: function (target, source) {
			if (source.baseTemplate.baseSpecies !== 'Silvally') return false;
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
				let typeMod = this.dex.getEffectiveness(type, targetTypes);
				if (typeMod > 0 && this.dex.getImmunity(type, target)) weaknesses.push(type);
			}
			if (!weaknesses.length) {
				return false;
			}
			let randomType = this.sample(weaknesses);
			source.setItem(randomType + 'memory');
			this.add('-item', source, source.getItem(), '[from] move: Type Change');
			let template = this.dex.getTemplate('Silvally-' + randomType);
			source.formeChange(template, this.dex.getAbility('rkssystem'), true);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMoveEffect: 'heal',
	},
	// Leonas
	turnover: {
		accuracy: 100,
		basePower: 20,
		basePowerCallback: function (pokemon, target, move) {
			return move.basePower + 20 * pokemon.positiveBoosts();
		},
		category: "Special",
		desc: "Power is equal to 20+(X*20), where X is the user's total stat stage changes that are greater than 0.",
		shortDesc: "+20 power for stat boosts.",
		id: "turnover",
		name: "Turn Over",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Submission", target);
			this.add('-anim', source, "Flash Cannon", target);
		},
      isNonstandard: "Custom",
		secondary: null,
		target: "normal",
		type: "???",
	},
	// Anabelle
	fairypulse: {
		accuracy: 100,
		basePower: 85,
		category: "Special",
		desc: "Has a 40% chance to raise the user's Attack, Defense, Special Attack, Special Defense, and Speed by 1 stage.",
		shortDesc: "40% chance to raise all stats by 1 (not acc/eva).",
		id: "fairypulse",
		name: "Fairy Pulse",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Aromatic Mist", source);
			this.add('-anim', source, "Hyper Voice", target);
		},
		secondary: {
			chance: 40,
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
		isNonstandard: "Custom",
		target: "normal",
		type: "Fairy",
	},
	// Crystal
	crystalboom: {
		accuracy: 90,
		basePower: 110,
		category: "Special",
		desc: "Freezes the target and has a 50% chance to raise the user's Special Attack by 2 stages and Speed by 1 stage. If the target already has a status ailment, it is replaced with a freeze. Fails if the target is an Ice-type.",
		shortDesc: "50% chance to raise SpAtk by 2/Spe by 1.; replace status w/freeze",
		id: "crystalboom",
		name: "Crystal Boom",
		isNonstandard: "Custom",
		pp: 10,
		priority: 0,
		flags: {mirror: 1, protect: 1},
		onTryMovePriority: 100,
		onTryMove: function (pokemon, target, move) {
			this.attrLastMove('[still]');
			if (!pokemon.hasType('Ice') || target.hasType('Ice')) {
				this.add('-fail', pokemon, 'move: Crystal Boom');
				return null;
			}
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Mist", target);
			this.add('-anim', source, "Glaciate", target);
		},
		onHit: function (target, source) {
			target.setStatus('frz', source, null, true);
			// Cringy message
			if (this.random(5) === 1 || source.name === 'Crystal') this.add(`raw|<b>Crystal:</b> This is what you get! XD`);
		},
		secondary: {
			chance: 50,
			self: {
				boosts: {
					spa: 2,
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Ice",
	},
		// Speedy
	chargespin: {
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		desc: "Nearly always goes first. If this move is successful and the user has not fainted, the effects of Leech Seed and binding moves end for the user, and all hazards are removed from the user's side of the field. Has a 30% chance to paralyze the foe.",
		shortDesc: "Strike first. Free from hazds./trap/seed. 30% chance to par foe.",
		id: "chargespin",
		name: "Charge Spin",
		isNonstandard: "Custom",
		pp: 10,
		priority: 0,
		flags: {mirror: 1, protect: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Charge", source);
			this.add('-anim', source, "Rapid Spin", target);
		},
		self: {
			onHit: function (pokemon) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Charge Spin', '[of] ' + pokemon);
				}
				let sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Charge Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			},
		},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Electric",
	},
	// Gold Ho-Oh
	goldenpassion: {
		accuracy: true,
		basePower: 170,
		category: "Physical",
		desc: "Fully restores the user's HP if this move knocks out the target. Causes the target to become a Fire type when hit. Fails if the target is an Arceus or a Silvally.",
		shortDesc: "Restore if it KOs foe; changes foe's type to Fire. Thaws user.",
		id: "goldenpassion",
		name: "Golden Passion",
		isNonstandard: "Custom",
		pp: 1,
		priority: 0,
		flags: {defrost: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Charge", source);
			this.add('-anim', source, "Eruption", source);
			this.add('-anim', source, "V-Create", target);
		},
		onAfterMoveSecondarySelf: function (pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) this.heal(pokemon.maxhp, pokemon, pokemon, move);
		},
		onHit: function (target) {
			if (!target.setType('Fire')) {
				this.add('-fail', target);
				return null;
			}
			this.add('-start', target, 'typechange', 'Fire');
		},
		isZ: "goldhoohniumz",
		secondary: null,
		target: "normal",
		type: "Fire",
	},
// AJ The Keldeo
	oblivionsword: {
		accuracy: 100,
		basePower: 95,
		category: "Special",
		desc: "Has a 30% chance to cause the target to flinch. If this move is successful and the user is a Keldeo, it changes to Resolute Forme if it is currently in Ordinary Forme, or changes to Ordinary Forme if it is currently in Resolute Forme. This forme change does not happen if the Keldeo has the Sheer Force Ability. The Resolute Forme reverts to Ordinary Forme when Keldeo is not active. Fighting-type attacks can hit if the target is a Ghost-type and the target loses its type-based immunity to Normal and Fighting.",
		shortDesc: "30% chance to flinch. Keldeo transforms. Hits Ghosts.",
		id: "oblivionsword",
		isNonstandard: "Custom",
		name: "Oblivion Sword",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, authentic: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Judgment', source);
			this.add('-anim', source, 'Sacred Sword', target);
		},
		onEffectiveness: function (typeMod, type, move) {
			if (move.type !== 'Fighting') return;
			let target = this.activeTarget;
			if (!target) return; // avoid crashing when called from a chat plugin
			if (!target.runImmunity('Fighting')) {
				if (target.hasType('Ghost')) return 0;
			}
		},
		volatileStatus: 'foresight',
		effect: {
			noCopy: true,
			onStart: function (pokemon) {
				this.add('-start', pokemon, 'Oblivion Sword');
			},
			onNegateImmunity: function (pokemon, type) {
				if (pokemon.hasType('Ghost') && ['Normal', 'Fighting'].includes(type)) return false;
			},
		},
		ignoreImmunity: true,
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		onHit: function (target, pokemon, move) {
			if (pokemon.baseTemplate.baseSpecies === 'Keldeo' && !pokemon.transformed) {
				move.willChangeForme = true;
			}
		},
		onAfterMoveSecondarySelf: function (pokemon, target, move) {
			if (move.willChangeForme) {
				pokemon.formeChange(pokemon.template.speciesid === 'keldeoresolute' ? 'Keldeo' : 'Keldeo-Resolute', this.effect, false, '[msg]');
			}
		},
		target: "normal",
		type: "Fighting",
	},
// Shade Master
	blackwing: {
		accuracy: 80,
		basePower: 160,
		category: "Physical",
		desc: "Has a 100% chance to raise the user's Attack and Speed by 1 stage. If this attack is not successful, the user loses half of its maximum HP, rounded down, as crash damage, and all the boosted stats (including Attack) reset to 0. Pokemon with the Magic Guard Ability are unaffected by crash damage, but still reset its own boosted stats.",
		shortDesc: "Raises Atk.-Spe./Hurts if misses/Clear boosts.",
		id: "blackwing",
		isNonstandard: "Custom",
		name: "Black Wing",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Dark Pulse', source);
			this.add('-anim', source, 'Steel Wing', target);
		},
		hasCustomRecoil: true,
		onMoveFail: function (target, source, move) {
			this.damage(source.maxhp / 2, source, source, 'crash');
			source.clearBoosts();
			this.add('-clearboost', source);
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					atk: 1,
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Dark",
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
// Gemini
	powerlauncher: {
		accuracy: 85,
		basePower: 120,
		category: "Special",
		desc: "Has a 50% chance to disable the target's last move unless it was is already disabled.",
		shortDesc: "50% chance to disable move.",
		id: "powerlauncher",
		isNonstandard: "Custom",
		name: "Power Launcher",
		pp: 10,
		priority: 0,
		flags: {},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Flash', source);
			this.add('-anim', source, 'Photon Geyser', target);
		},
		secondary: {
			chance: 50,
			volatileStatus: 'disable',
		},
		target: "normal",
		type: "Normal",
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
			if (source.name === 'Max') this.add(`raw|<b>Max:</b> Yay Forcewin!`);
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
		onModifyMove: function (move) {
			// @ts-ignore Hack for Kasandra's Z move
			move.type = move.baseMove ? move.baseMove.type : move.type;
			// @ts-ignore Hack for Kasandra's Z move
			move.basePower = move.baseMove ? move.baseMove.basePower : move.basePower;
			// @ts-ignore Hack for Kasandra's Z move
			move.category = move.baseMove ? move.baseMove.category : move.category;
		},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source, move) {
			let zmove = this.dex.getMove(this.zMoveTable[move.type]);
			this.add('-anim', source, zmove.name, target);
			this.add('-anim', source, "Transform", source);
		},
		onHit: function (target, source, move) {
			/** @type {{[move: string]: string[]}} */
			let mirages = {
				blizzard: ['Ninetales-Alola', 'Glalie', 'Froslass', 'Sandslash-Alola', 'Jynx', 'Vanilluxe', 'Glaceon', 'Beartic', 'Dewgong', 'Cloyster', 'Cryogonal', 'Avalugg', 'Mamoswine', 'Delibird', 'Walrein', 'Weavile', 'Abomasnow', 'Aurorus', 'Crabominable', 'Articuno', 'Regice', 'Kyurem'],
				thunder: ['Raichu', 'Raichu-Alola', 'Electrode', 'Ampharos', 'Electivire', 'Jolteon', 'Manectric', 'Plusle', 'Minun', 'Luxray', 'Pachirisu', 'Zebstrika', 'Eelektross', 'Xurkitree', 'Zeraora', 'Magnezone', 'Zapdos', 'Rotom', 'Rotom-Wash', 'Rotom-Mow', 'Rotom-Heat', 'Rotom-Frost', 'Rotom-Fan', 'Emolga', 'Thundurus', 'Thundurus-Therian', 'Heliolisk', 'Dedenne', 'Oricorio-Pom-Pom', 'Togedemaru', 'Tapu Koko', 'Golem-Alola', 'Lanturn', 'Galvantula', 'Stunfisk', 'Zekrom'],
				fireblast: ['Charizard', 'Ninetales', 'Arcanine', 'Rapidash', 'Flareon', 'Typhlosion', 'Magcargo', 'Magmotar', 'Entei', 'Marowak-Alola', 'Blaziken', 'Torkoal', 'Infernape', 'Emboar', 'Simisear', 'Darmanitan', 'Heatmor', 'Delphox', 'Talonflame', 'Incineroar', 'Moltres', 'Ho-Oh', 'Camerupt', 'Heatran', 'Pyroar', 'Volcanion', 'Oricorio', 'Turtonator', 'Blacephalon', 'Houndoom', 'Rotom-Heat', 'Victini', 'Chandelure', 'Volcarona', 'Reshiram', 'Salazzle'],
				hydropump: ['Blastoise', 'Golduck', 'Poliwrath', 'Politoed', 'Dewgong', 'Cloyster', 'Kingler', 'Kingdra', 'Seaking', 'Gyarados', 'Starmie', 'Vaporeon', 'Feraligatr', 'Octillery', 'Suicune', 'Swampert', 'Wailord', 'Crawdaunt', 'Milotic', 'Huntail', 'Gorebyss', 'Bibarel', 'Luvdisc', 'Kyogre', 'Empoleon', 'Floatzel', 'Gastrodon', 'Gastrodon-East', 'Lumineon', 'Phione', 'Manaphy', 'Samurott', 'Simipour', 'Seismitoad', 'Basculin', 'Basculin-Blue-Striped', 'Alomomola', 'Greninja', 'Clawitzer', 'Primarina', 'Wishiwashi', 'Pyukumuku', 'Tentacruel', 'Slowbro', 'Slowking', 'Lapras', 'Lanturn', 'Quagsire', 'Qwilfish', 'Corsola', 'Mantine', 'Ludicolo', 'Pelipper', 'Sharpedo', 'Whiscash', 'Relicanth', 'Palkia', 'Carracosta', 'Swanna', 'Jellicent', 'Keldeo', 'Araquanid', 'Bruxish', 'Tapu Fini', 'Omastar', 'Kabutops', 'Walrein', 'Rotom-Wash', 'Barbaracle', 'Volcanion', 'Toxapex', 'Golisopod'],
				hurricane: ['Tornadus', 'Tornadus-Therian', 'Noivern', 'Pidgeot', 'Fearow', 'Crobat', 'Farfetch\'d', 'Dodrio', 'Charizard', 'Butterfree', 'Gyarados', 'Dragonite', 'Aerodactyl', 'Articuno', 'Zapdos', 'Moltres', 'Noctowl', 'Ledian', 'Xatu', 'Jumpluff', 'Togekiss', 'Yanmega', 'Honchkrow', 'Gliscor', 'Delibird', 'Mantine', 'Skarmory', 'Lugia', 'Ho-Oh', 'Beautifly', 'Swellow', 'Masquerain', 'Ninjask', 'Peliper', 'Salamence', 'Altaria', 'Tropius', 'Rayquaza', 'Staraptor', 'Mothim', 'Vespiquen', 'Chatot', 'Drifblim', 'Rotom-Fan', 'Shaymin-Sky', 'Unfezant', 'Swoobat', 'Sigilyph', 'Archeops', 'Swanna', 'Emolga', 'Braviary', 'Mandibuzz', 'Thundurus', 'Thundurus-Therian', 'Landorus', 'Landorus-Therian', 'Talonflame', 'Hawlucha', 'Vivillon', 'Yveltal', 'Toucannon', 'Oricorio', 'Oricorio-Pom-Pom', 'Oricorio-Pa\'u', 'Oricorio-Sensu', 'Minior', 'Celesteela'],
				psychic: ['Alakazam', 'Hypno', 'Espeon', 'Mewtwo', 'Mew', 'Unown', 'Wobbuffet', 'Grumpig', 'Deoxys', 'Chimecho', 'Uxie', 'Mesprit', 'Azelf', 'Cresselia', 'Musharna', 'Gothitelle', 'Reuniclus', 'Beheeyem 	Beheeyem', 'Meowstic-F', 'Solgaleo', 'Lunala', 'Necrozma', 'Mr. Mime', 'Xatu', 'Lugia', 'Celebi', 'Gardevoir', 'Gallade', 'Victini', 'Swoobat', 'Sigilyph', 'Hoopa', 'Hoopa-Unbound', 'Oricorio-Pa\'u', 'Tapu Lele', 'Slowbro', 'Slowking', 'Exeggutor', 'Girafarig', 'Raichu-Alola', 'Starmie', 'Jynx', 'Medicham', 'Lunatone', 'Solrock', 'Claydol', 'Metagross', 'Latias', 'Latios', 'Jirachi', 'Bronzong', 'Meloetta', 'Delphox', 'Malamar', 'Oranguru', 'Bruxish'],
				playrough: ['Clefable', 'Togekiss', 'Granbull', 'Florges', 'Aromatisse', 'Slurpuff', 'Sylveon', 'Xerneas', 'Comfey', 'Wigglytuff', 'Azumarill', 'Gardevoir', 'Mawile', 'Mr. Mime', 'Ninetales-Alola', 'Whimsicott', 'Dedenne', 'Carbink', 'Diancie', 'Ribombee', 'Shiinotic', 'Tapu Koko', 'Tapu Lele', 'Tapu Bulu', 'Tapu Fini', 'Magearna'],
				outrage: ['Dragonite', 'Salamence', 'Kingdra', 'Haxorus', 'Druddigon', 'Goodra', 'Kommo-O', 'Latias', 'Latios', 'Rayquaza', 'Garchomp', 'Reshiram', 'Zekrom', 'Kyurem', 'Zygarde', 'Dialga', 'Palkia', 'Giratina', 'Exeggutor-Alola', 'Hydreigon', 'Dragalge', 'Tyrantrum', 'Noivern', 'Turtonator', 'Drampa', 'Guzzlord', 'Naganadel'],
				darkpulse: ['Persian-Alola', 'Mightyena', 'Umbreon', 'Absol', 'Darkrai', 'Zoroark', 'Raticate-Alola', 'Honchkrow', 'Weavile', 'Houndoom', 'Sableye', 'Scrafty', 'Bisharp', 'Mandibuzz', 'Hydreigon', 'Malamar', 'Yveltal', 'Guzzlord', 'Muk-Alola', 'Tyranitar', 'Drapion', 'Cacturne', 'Crawdaunt', 'Sharpedo', 'Skuntank', 'Spiritomb', 'Krookodile', 'Greninja', 'Pangoro', 'Hoopa-Unbound', 'Incineroar'],
			};
			// @ts-ignore Hack for Kasandra's Z move
			const baseMove = move.baseMove ? move.baseMove.id : 'darkpulse';
			const pool = mirages[baseMove];
			if (!pool) throw new Error(`PKLand: Unable to find False Mirage movepool for the move: "${baseMove}".`); // Should never happen
			const mirage = mirages[baseMove][this.random(pool.length)];
			// Generate new set
			const generator = new randomSCBOTeams('gen7randombattle', this.prng);
			let set = generator.randomSet(mirage);
			// Suppress Ability now to prevent starting new abilities when transforming
			source.addVolatile('gastroacid', source);
			// Tranform into it
			source.formeChange(set.species, move);
			for (let newMove of set.moves) {
				let moveTemplate = this.dex.getMove(newMove);
				if (source.moves.includes(moveTemplate.id)) continue;
				source.moveSlots.push({
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
			source.mirageHP = source.hp;
			source.heal(source.maxhp - source.hp, source, move);
			this.add('-heal', source, source.getHealth, '[silent]');
			this.add('message', `${source.name} pretended to be a ${set.species}!`);
		},
		isZ: "falsemiragiumz",
		secondary: null,
		target: "normal",
		type: "Dark",
	},
// Copy Cat
	clonecopy: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "The user performs a move from a dependent PK Land member. Some moves can't be copied, however. Brutal Swing is a default move.",
		shortDesc: "Uses a move depending on a Pokémon.",
		id: "clonecopy",
		name: "Clone Copy",
		isNonstandard: "Custom",
		pp: 15,
		priority: 0,
		flags: {authentic: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source, move) {
			this.add('-anim', source, 'Geomancy', source);
		},
		onHit: function (target, source, move) {
			if (target.name === 'Static') {
			let move = this.dex.getActiveMove('pikapower');
			this.useMove(move, source, target);
			} else if (target.name === 'Aqua') {
			let move = this.dex.getActiveMove('aquasphere');
			this.useMove(move, source, target);
			} else if (target.name === 'Mizzy') {
			let move = this.dex.getActiveMove('prismrocket');
			this.useMove(move, source, target);
			} else if (target.name === 'Kyle') {
			let move = this.dex.getActiveMove('desertdrain');
			this.useMove(move, source, target);
			} else if (target.name === 'Serene Star') {
			let move = this.dex.getActiveMove('snowdance');
			this.useMove(move, source, target);
			} else if (target.name === 'Goby') {
			let move = this.dex.getActiveMove('electroflash');
			this.useMove(move, source, target);
			} else if (target.name === 'The Hound') {
			let move = this.dex.getActiveMove('darkflare');
			this.useMove(move, source, target);
			} else if (target.name === 'Abby') {
			let move = this.dex.getActiveMove('mermaidwhirl');
			this.useMove(move, source, target);
			} else if (target.name === 'Nappa') {
			let move = this.dex.getActiveMove('herossword');
			this.useMove(move, source, target);
			} else if (target.name === 'Kris Tami') {
			let move = this.dex.getActiveMove('psychoflare');
			this.useMove(move, source, target);
			} else if (target.name === 'Leonas') {
			let move = this.dex.getActiveMove('turnover');
			this.useMove(move, source, target);
			} else if (target.name === 'Anabelle') {
			let move = this.dex.getActiveMove('fairypulse');
			this.useMove(move, source, target);
			} else if (target.name === 'Speedy') {
			let move = this.dex.getActiveMove('chargespin');
			this.useMove(move, source, target);
			} else if (target.name === 'AJ The Keldeo') {
			let move = this.dex.getActiveMove('oblivionsword');
			this.useMove(move, source, target);
			} else if (target.name === 'Shade Master') {
			let move = this.dex.getActiveMove('blackwing');
			this.useMove(move, source, target);
			} else if (target.name === 'Bulk-Up Man') {
			let move = this.dex.getActiveMove('gaiagaizer');
			this.useMove(move, source, target);
			} else if (target.name === 'Gemini') {
			let move = this.dex.getActiveMove('powerlauncher');
			this.useMove(move, source, target);
			} else if (target.name === 'Blue') {
			let move = this.dex.getActiveMove('blueshower');
			this.useMove(move, source, target);
			} else if (target.name === 'Blaze') {
			let move = this.dex.getActiveMove('atomicfire');
			this.useMove(move, source, target);
			} else if (target.name === 'River') {
			let move = this.dex.getActiveMove('wavebomb');
			this.useMove(move, source, target);
			} else if (target.name === 'Forte') {
			let move = this.dex.getActiveMove('fortecrush');
			this.useMove(move, source, target);
			} else if (target.name === 'Oblivia') {
			let move = this.dex.getActiveMove('fun');
			this.useMove(move, source, target);
			} else if (target.name === 'Alphus') {
			let move = this.dex.getActiveMove('miraclehold');
			this.useMove(move, source, target);
			} else if (target.name === 'Lyrica') {
			let move = this.dex.getActiveMove('shiftattack');
			this.useMove(move, source, target);
			} else if (target.name === 'Slashdown') {
			let move = this.dex.getActiveMove('powercontrol');
			this.useMove(move, source, target);
			} else if (target.name === 'Zicko') {
			let move = this.dex.getActiveMove('ironsword');
			this.useMove(move, source, target);
			} else if (target.name === 'Gyl') {
			let move = this.dex.getActiveMove('firerage');
			this.useMove(move, source, target);
			} else if (target.name === 'Adelaide') {
			let move = this.dex.getActiveMove('frostwind');
			this.useMove(move, source, target);
			} else if (target.name === 'Mirica') {
			let move = this.dex.getActiveMove('galaxydance');
			this.useMove(move, source, target);
			} else if (target.name === 'Montgomery') {
			let move = this.dex.getActiveMove('powerburn');
			this.useMove(move, source, target);
			} else if (target.name === 'Harold') {
			let move = this.dex.getActiveMove('blastofshadows');
			this.useMove(move, source, target);
			} else {
			let move = this.dex.getActiveMove('brutalswing');
			this.useMove(move, source, target);
			}
		},
		secondary: null,
		target: "allAdjacent",
		type: "???",
	},
// Blue
  blueshower: {
		accuracy: 100,
		basePower: 90,
		category: "Special",
		desc: "Has a 50% chance to lower the target's Defense and Special Defense by 1 stage. This move's type effectiveness against Grass is changed to be super effective no matter what this move's type is.",
		shortDesc: "Chance to lower target's Def/SpDef by 1. Super effective on Grass.",
		id: "blueshower",
		isNonstandard: "Custom",
		name: "Blue Shower",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Origin Pulse', source);
			this.add('-anim', source, 'Water Spout', target);
		},
		onEffectiveness: function (typeMod, target, type) {
			if (type === 'Grass') return 1;
		},
		secondary: {
			chance: 50,
			boosts: {
				def: -1,
				spd: -1,
			},
		},
		target: "normal",
		type: "Water",
	},
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
	"wavebomb": {
		accuracy: 80,
		basePower: 85,
		category: "Special",
		desc: "Has a 70% chance to lower the target's speed by 2 stages and evasiveness by 1 stage.",
		shortDesc: "70% chc. to lower foe's Spe by 2 and Eva by 1.",
		id: "wavebomb",
		name: "Wave Bomb",
		pp: 5,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Water Pulse', source);
			this.add('-anim', source, 'Origin Pulse', source);
			this.add('-anim', source, 'Barrage', target);
		},
		secondary: {
			chance: 70,
			boosts: {
				spe: -2,
				evasion: -1,
			},
		},
		target: "normal",
		type: "Water",
	},
	fortecrush: {
		accuracy: 100,
		basePower: 150,
		basePowerCallback: function (pokemon, target, move) {
			if (!pokemon.item) {
				this.debug("Power and speed doubled for no item");
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Physical",
		shortDesc: "Power doubles if the user has no held item.",
		id: "fortecrush",
		isViable: true,
		name: "Forte Crush",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Explosion', source);
			this.add('-anim', source, 'Wring Out', target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
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
	// Nyra
	rickrollpunch: {
		accuracy: 100,
		basePower: 30,
		category: "Physical",
		desc: "This move hits 5 times. After the first hit, the user's Attack or Speed are raised by 1. After the second hit, the user gains the either a Psychic or Fairy type. After the third hit, three layers of Spikes or a Stealth Rock is added to the opponent's side of the field. After the fourth hit, either Gravity or Mist is summoned. After the fifth hit, the target is either confused or paralyzed. This move can hit a Ghost-type target no matter what this move's type is.",
		shortDesc: "Hits 5 times with various effects on each hit.",
		id: "rickrollpunch",
		name: "Rickroll Punch",
		isNonstandard: "Custom",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, authentic: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Explosion", source);
			this.add('-anim', source, "Dragon Dance", source);
			this.add('-anim', source, 'Mega Punch', target);
		},
		multihit: 5,
		onAfterHit: function (target, source, move) {
			// @ts-ignore hack for Nyra's move
			if (!move.curHits) move.curHits = 1;
			let option = this.random(2);
			this.add('-anim', source, 'Mega Punch', target);
			// @ts-ignore hack for Nyra's move
			switch (move.curHits) {
			case 1:
				if (option) {
					this.boost({atk: 1}, source);
				} else {
					this.boost({spe: 1}, source);
				}
				break;
			case 2:
				if (option) {
					if (!source.setType('Psychic')) {
						this.add('-fail', source, 'move: Type Shift');
					} else {
						this.add('-start', source, 'typechange', 'Psychic');
					}
				} else {
					if (!source.setType('Fairy')) {
						this.add('-fail', source, 'move: Type Shift');
					} else {
						this.add('-start', source, 'typechange', 'Fairy');
					}
				}
				break;
			case 3:
				if (option) {
					target.side.addSideCondition('spikes');
					target.side.addSideCondition('spikes');
					target.side.addSideCondition('spikes');
				} else {
					target.side.addSideCondition('stealthrock');
				}
				break;
			case 4:
				if (option) {
					this.field.addPseudoWeather('gravity');
				} else {
					source.side.addSideCondition('mist');
				}
				break;
			case 5:
				if (option) {
					target.addVolatile('confusion');
				} else {
					target.trySetStatus('par', source);
				}
				break;
			}
			// @ts-ignore hack for Nyra's move
			move.curHits++;
		},
		onHit: function (target, source) {
			let messages = ["MUST WATCH: Live footage of a REAL Pokémon living in Harlan, KY.",
				"Click here to see the 10 amazing facts about Pokémon.",
				"Mr. Burns and Waylon Smithers has left out from final ten episodes <i>The Simpsons</i> TV show - here's what happened",
				"Cut Man from Mega Man announced as a DLC playable fighter in the <i>Super Smash Bros. Ultimate</i>.",
				"Must see - Rare mental disease that can potentiality kill you in minutes.",
				"Horrifying dead dog in the sewers - Must watch.",
				"This cat gained an ability to fly like a bird. Click here to watch it.",
				"An MP3 sound off effect of a guy recieving negatives comments about Supernova-Skymancer found in few copies of <i>Pokémon Sword</i> and <i>Pokémon Shield</i>.",
				"Supernova-Skymancer and all the alt accounts finally banned on DeviantART - See the Kiwi Farms thread here.",
				"A perfect way to lose weight - by doing absolutely nothing."][this.random(10)];

			if (source.name === 'Nyra') this.add(`raw|<a href="https://www.youtube.com/watch?v=oHg5SJYRHA0"><b>${messages}</b></a>`);
		},
		secondary: null,
		ignoreImmunity: {'Normal': true},
		target: "normal",
		type: "Normal",
	},
	// White
	naturalroom: {
		accuracy: true,
		category: "Status",
		desc: "For five turns, all the the moves deal neutral damage.",
		shortDesc: "Five turns: Moves deal neutral damage.",
		id: "naturalroom",
		name: "Natural Room",
		isNonstandard: "Custom",
		pp: 5,
		priority: 0,
		flags: {},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Moonlight", source);
			this.add('-anim', source, "Psychic Terrain", source);
		},
		pseudoWeather: 'naturalroom',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 7;
				}
				return 5;
			},
		onEffectiveness: function (typeMod, target, type, move) {
			if (!target) return;
			if (!target.runImmunity(move.type)) return;
			return 0;
		},
			onStart: function (battle, source, effect) {
				this.add('-fieldstart', 'move: Natural Room');
				this.add('-message', `All the moves' effectivenesses assumed to their netrual state.`);
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function () {
				this.add('-fieldend', 'move: Natural Room');
				this.add('-message', `The Natural Room has lifted.`);
			},
		},
		secondary: null,
		target: "all",
		type: "Psychic",
	},
// Alphus
	miraclehold: {
		accuracy: 100,
		basePower: 170,
		category: "Special",
		desc: "Summons Negative Zone after doing damage. This move can hit a Dark-type target no matter what this move's type is.",
		shortDesc: "Summons Negative Zone; Hits Dark foes.",
		id: "miraclehold",
		name: "Miracle Hold",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Extreme Evoboost', source);
			this.add('-anim', source, 'Hyper Voice', source);
		},
		onAfterMoveSecondarySelf: function (source) {
			this.field.addPseudoWeather('negativezone', source);
		},
		ignoreImmunity: {'Psychic': true},
		secondary: null,
		target: "normal",
		type: "Psychic",
	},
	negativezone: {
		accuracy: true,
		category: "Status",
		desc: "For five turns, all the move's effectiveness is inverted.",
		shortDesc: "5 turns: Effectivenesses inverted.",
		id: "negativezone",
		name: "Negative Zone",
		pp: 5,
		priority: 0,
		flags: {protect: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Misty Terrain", source);
		},
		pseudoWeather: 'negativezone',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 7;
				}
				return 5;
			},
		onEffectiveness: function (typeMod, target, source, type, move) {
			return -typeMod;
		},
			onStart: function (battle, source, effect) {
				this.add('-fieldstart', 'move: Negative Zone');
				this.add('-message', `All the moves' effectivenesses are inverted!`);
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function () {
				this.add('-fieldend', 'move: Negative Zone');
				this.add('-message', `The Negative Zone has lifted.`);
			},
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
	},
	// Lyrica
	shiftattack: {
		accuracy: true,
		basePower: 160,
		category: "Physical",
		desc: "Does not check accuracy. When using a move, it replaces every non-fainted member of the user's team with a PK Land set that is randomly selected from all sets, except those with the move Shift Attack. Remaining HP and PP percentages, as well as status conditions, are transferred onto the replacement sets. If this move is successful, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if the move misses, if there are no unfainted party members or if the user is not Lyrica. This move summons Shift Heal after doing damage. This move can hit a Dark-type target no matter what this move's type is.",
		shortDesc: "Replaces team with random sets; switches.",
		id: "shiftattack",
		name: "Shift Attack",
		isNonstandard: "Custom",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, authentic: 1, heal: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Rapid Spin', source);
			this.add('-anim', source, 'Dragon Dance', source);
			this.add('-anim', source, 'Meteor Mash', target);
		},
		onTryHit: function (target, source) {
			if (source.name !== 'Lyrica') {
				this.add('-fail', source);
				this.add('-hint', 'Only Lyrica can use Shift Attack.');
				return null;
			}
		},
		onHit(target, source) {
			// Store percent of HP left, percent of PP left, and status for each pokemon on the user's team
			let carryOver = [];
			let currentTeam = source.side.pokemon;
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
			let team = this.teamGenerator.getTeam({name: source.side.name});
			// Overwrite un-fainted pokemon other than the user
			for (let i = 0; i < currentTeam.length; i++) {
				if (currentTeam[i].fainted || !currentTeam[i].hp || currentTeam[i].position === source.position) continue;
				let set = team.shift();
				let oldSet = carryOver[i];
				// @ts-ignore
				if (set.name === 'Lyrica') {
					// No way am I allowing 2 of this mon on one team
					set = team.shift();
				}

				// Bit of a hack so client doesn't crash when formeChange is called for the new pokemon
				let effect = this.effect;
				this.effect = /** @type {Effect} */ ({id: ''});
				// @ts-ignore
				let pokemon = new Pokemon(set, source.side);
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
			this.add('message', `${source.name} shifted ${source.side.name}'s team away!`);
		},
		onAfterMoveSecondarySelf: function (source) {
			source.side.addSideCondition('shiftheal');
		},
		selfSwitch: true,
		ignoreImmunity: {'Psychic': true},
		secondary: null,
		target: "allAdjacent",
		type: "Psychic",
	},
	// Used for Lyrica's Shift Attack
	shiftheal: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The Pokemon brought out to replace it has its HP and PP fully restored along with having any major status condition cured. The new Pokemon is sent out at the end of the turn, and the healing happens before hazards take effect. Fails if the user is the last unfainted Pokemon in its party.",
		shortDesc: "Replacement is fully healed, with PP.",
		id: "shiftheal",
		isViable: true,
		name: "Shift Heal",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		sideCondition: 'shiftheal',
		effect: {
			duration: 2,
			onStart: function (side, source) {
				this.debug('Shift Heal started on ' + side.name);
				this.effectData.positions = [];
				for (const i of side.active.keys()) {
					this.effectData.positions[i] = false;
				}
				this.effectData.positions[source.position] = true;
			},
			onRestart: function (side, source) {
				this.effectData.positions[source.position] = true;
			},
			onSwitchInPriority: 1,
			onSwitchIn: function (target) {
				const positions = /**@type {boolean[]} */ (this.effectData.positions);
				if (target.position !== this.effectData.sourcePosition) {
					return;
				}
				if (!target.fainted) {
					target.heal(target.maxhp);
					target.setStatus('');
					for (const moveSlot of target.moveSlots) {
						moveSlot.pp = moveSlot.maxpp;
					}
					this.add('-heal', target, target.getHealth, '[from] move: Shift Heal');
					positions[target.position] = false;
				}
				if (!positions.some(affected => affected === true)) {
					target.side.removeSideCondition('shiftheal');
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Psychic",
	},
	// Used for Lyrica's ability
	auroraterrain: {
		accuracy: true,
		category: "Status",
		desc: "For 5 turns, the terrain becomes Aurora Terrain. During the effect, the power of Ice-type attacks is doubled and the power of Fire-type attacks is multiplied by 0.5, even if the user or the target is not grounded. Moves of any Pokemon have their secondary effect chance tripled while Aurora Terrain is active. Fails if the current terrain is Aurora Terrain.",
		shortDesc: "5 turns:Scndry.chnce.trpld.,+Ice/-Fire power even if float.",
		id: "auroraterrain",
		name: "Aurora Terrain",
		isNonstandard: "Custom",
		pp: 10,
		priority: 0,
		flags: {},
		terrain: 'auroraterrain',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
		onModifyMovePriority: -2,
		onModifyMove: function (move) {
			if (move.secondaries) {
				this.debug('tripling secondary chance');
				for (const secondary of move.secondaries) {
					if (secondary.chance) secondary.chance *= 3;
				}
			}
		},
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Ice') {
					this.debug('aurora terrain boost');
					return this.chainModify(2);
				}
				if (move.type === 'Fire') {
					this.debug('aurora terrain weaken');
					return this.chainModify(0.2);
				}
			},
			onStart: function (battle, target, foe, side, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Aurora Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Aurora Terrain');
				}
			   target.clearBoosts();
			   this.add('-clearboost', target);
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function () {
				this.add('-fieldend', 'move: Aurora Terrain');
			},
		},
		secondary: null,
		target: "self",
		type: "Ice",
	},
	// Blade
	multiattackburst: {
		accuracy: 100,
		basePower: 10,
		multihit: 18,
		category: "Special",
		desc: "Hits 18 times and ignores type immunities. This move deals type/categories damages such as dealing a special Electric-type damage, a physical Flying-type damage, and so on. Fails unless the user is Blade.",
		shortDesc: "Hits 18 times.",
		id: "multiattackburst",
		name: "Multi-Attack Burst",
		isNonstandard: "Custom",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		ignoreImmunity: true,
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onTryHit: function (target, pokemon) {
			if (pokemon.name !== 'Blade') {
				this.add('-fail', pokemon);
				this.add('-hint', 'Only Blade can use Multi-Attack Burst.');
				return null;
			}
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Judgment', source);
			this.add('-anim', source, 'Prismatic Laser', source);
                this.add('-anim', source, 'Hyper Beam', target);
		},
		onHit: function (target, source, move, type) {
			// @ts-ignore hack for Blade's move
			if (!move.curHits) move.curHits = 1;
			// @ts-ignore hack for Blade's move
			switch (move.curHits) {
			case 1:
			if (!source.setType('Water')) {
				this.add('-fail', source, 'move: Type Shift');
			} else {
				this.add('-start', source, 'typechange', 'Water');
			}
                this.add('-anim', source, 'Water Gun', target);
				move.type = 'Water';
				move.category = 'Special';
				break;
			case 2:
			if (!source.setType('Fire')) {
				this.add('-fail', source, 'move: Type Shift');
			} else {
				this.add('-start', source, 'typechange', 'Fire');
			}
                this.add('-anim', source, 'Flamethrower', target);
				move.type = 'Fire';
				move.category = 'Special';
				break;
			case 3:
			if (!source.setType('Electric')) {
				this.add('-fail', source, 'move: Type Shift');
			} else {
				this.add('-start', source, 'typechange', 'Electric');
			}
                this.add('-anim', source, 'Thunderbolt', target);
				move.type = 'Electric';
				move.category = 'Special';
				break;
			case 4:
			if (!source.setType('Grass')) {
				this.add('-fail', source, 'move: Type Shift');
			} else {
				this.add('-start', source, 'typechange', 'Grass');
			}
                this.add('-anim', source, 'Razor Leaf', target);
				move.type = 'Grass';
				move.category = 'Special';
				break;
			case 5:
			if (!source.setType('Ice')) {
				this.add('-fail', source, 'move: Type Shift');
			} else {
				this.add('-start', source, 'typechange', 'Ice');
			}
                this.add('-anim', source, 'Ice Beam', target);
				move.type = 'Ice';
				move.category = 'Special';
				break;
			case 6:
			if (!source.setType('Psychic')) {
				this.add('-fail', source, 'move: Type Shift');
			} else {
				this.add('-start', source, 'typechange', 'Psychic');
			}
                this.add('-anim', source, 'Psychic', target);
				move.type = 'Psychic';
				move.category = 'Special';
				break;
			case 7:
			if (!source.setType('Dark')) {
				this.add('-fail', source, 'move: Type Shift');
			} else {
				this.add('-start', source, 'typechange', 'Dark');
			}
                this.add('-anim', source, 'Dark Pulse', target);
				move.type = 'Dark';
				move.category = 'Special';
				break;
			case 8:
			if (!source.setType('Dragon')) {
				this.add('-fail', source, 'move: Type Shift');
			} else {
				this.add('-start', source, 'typechange', 'Dragon');
			}
                this.add('-anim', source, 'Dragon Breath', target);
				move.type = 'Dragon';
				move.category = 'Special';
				break;
			case 9:
			if (!source.setType('Fairy')) {
				this.add('-fail', source, 'move: Type Shift');
			} else {
				this.add('-start', source, 'typechange', 'Fairy');
			}
                this.add('-anim', source, 'Moonblast', target);
				move.type = 'Fairy';
				move.category = 'Special';
				break;
			case 10:
			if (!source.setType('Fighting')) {
				this.add('-fail', source, 'move: Type Shift');
			} else {
				this.add('-start', source, 'typechange', 'Fighting');
			}
                this.add('-anim', source, 'Brick Break', target);
				move.type = 'Fighting';
				move.category = 'Physical';
				break;
			case 11:
			if (!source.setType('Flying')) {
				this.add('-fail', source, 'move: Type Shift');
			} else {
				this.add('-start', source, 'typechange', 'Flying');
			}
                this.add('-anim', source, 'Wing Attack', target);
				move.type = 'Flying';
				move.category = 'Physical';
				break;
			case 12:
			if (!source.setType('Bug')) {
				this.add('-fail', source, 'move: Type Shift');
			} else {
				this.add('-start', source, 'typechange', 'Bug');
			}
                this.add('-anim', source, 'Fell Stinger', target);
				move.type = 'Bug';
				move.category = 'Physical';
				break;
			case 13:
			if (!source.setType('Ground')) {
				this.add('-fail', source, 'move: Type Shift');
			} else {
				this.add('-start', source, 'typechange', 'Ground');
			}
                this.add('-anim', source, 'Earthquake', target);
				move.type = 'Ground';
				move.category = 'Physical';
				break;
			case 14:
			if (!source.setType('Rock')) {
				this.add('-fail', source, 'move: Type Shift');
			} else {
				this.add('-start', source, 'typechange', 'Rock');
			}
                this.add('-anim', source, 'Stone Edge', target);
				move.type = 'Rock';
				move.category = 'Physical';
				break;
			case 15:
			if (!source.setType('Ghost')) {
				this.add('-fail', source, 'move: Type Shift');
			} else {
				this.add('-start', source, 'typechange', 'Ghost');
			}
                this.add('-anim', source, 'Shadow Sneak', target);
				move.type = 'Ghost';
				move.category = 'Physical';
				break;
			case 16:
			if (!source.setType('Poison')) {
				this.add('-fail', source, 'move: Type Shift');
			} else {
				this.add('-start', source, 'typechange', 'Poison');
			}
                this.add('-anim', source, 'Poison Jab', target);
				move.type = 'Poison';
				move.category = 'Physical';
				break;
			case 17:
			if (!source.setType('Steel')) {
				this.add('-fail', source, 'move: Type Shift');
			} else {
				this.add('-start', source, 'typechange', 'Steel');
			}
                this.add('-anim', source, 'Iron Tail', target);
				move.type = 'Steel';
				move.category = 'Physical';
				break;
			case 18:
			if (!source.setType('Normal')) {
				this.add('-fail', source, 'move: Type Shift');
			} else {
				this.add('-start', source, 'typechange', 'Normal');
			}
                this.add('-anim', source, 'Multi-Attack', target);
				move.type = 'Normal';
				move.category = 'Physical';
				break;
			}
			// @ts-ignore hack for Blade's move
			move.curHits++;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	// Slashdown
	powercontrol: {
		accuracy: true,
		basePower: 130,
		category: "Physical",
		desc: "This move does not check accuracy. When it hits, the target's Ability is rendered ineffective as long as it remains active. If the target uses Baton Pass, the replacement will remain under this effect. If the target's Ability is Battle Bond, Comatose, Prism Power, Color Aura, Disguise, Multitype, Power Construct, RKS System, Schooling, Shields Down, or Stance Change, this effect does not happen, and receiving the effect through Baton Pass ends the effect immediately. Has a 50% chance to paralyze the target and %20 chance to make it inflicted with Lounge. This move can hit a Ground-type target no matter what this move's type is. The target with Lounge is unable to move for three turns.",
		shortDesc: "Nullifies abil. 100%:Para.,40%:Lounge.",
		id: "powercontrol",
		name: "Power Control",
		isNonstandard: "Custom",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function (pokemon, target, move) {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Plasma Fists", target);
		},
		onHit: function (target) {
			if (['battlebond', 'comatose', 'prismpower', 'coloraura', 'disguise', 'shockpuppet', 'multitype', 'powerconstruct', 'overdrive', 'rkssystem', 'schooling', 'shieldsdown', 'stancechange'].includes(target.ability)) return;
			target.addVolatile('gastroacid');
		},
		onAfterSubDamage: function (damage, target) {
			if (['battlebond', 'comatose', 'prismpower', 'coloraura', 'disguise', 'multitype', 'shockpuppet', 'powerconstruct', 'overdrive', 'rkssystem', 'schooling', 'shieldsdown', 'stancechange'].includes(target.ability)) return;
			target.addVolatile('gastroacid');
		},
		secondaries: [
			{
			chance: 50,
			status: 'par',
			}, {
			chance: 20,
			volatileStatus: 'lounge', //Lounge's effect will go in statuses.js
			},
		],
		ignoreImmunity: {'Electric': true},
		target: "allAdjacent",
		type: "Electric",
	},	
	// Zicko
	ironsword: {
		accuracy: 100,
		basePower: 170,
		category: "Physical",
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
		id: "ironsword",
		name: "Iron Sword",
		isNonstandard: "Custom",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Iron Defense", source);
			this.add('-anim', source, "Secret Sword", target);
		},
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	// Gyro
	escapethrust: {
		accuracy: 100,
		basePower: 110,
		category: "Physical",
		desc: "The user is replaced with another Pokemon in its party. The opponent is confused, weakened and trapped for 5 turns, and having its Accuracy and Evasion harshly lowered. This move fails unless the user already took damage this turn. After doing damage, the target's item is replaced with a Choice Scarf.",
		shortDesc: "User switches if hit; Confuses, weakened and traps; Acc. and Eva. lowered; Foe Item = Choice Spike.",
		id: "escapethrust",
		name: "Escape Thrust",
		isNonstandard: "Custom",
		pp: 15,
		priority: -3,
		flags: {contact: 1, protect: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			if (source.volatiles['escapethrust'] && source.volatiles['escapethrust'].gotHit) {
				this.add('-anim', source, "Brutal Swing", source);
				this.add('-anim', source, "Mega Punch", target);
			}
		},
		beforeTurnCallback: function (pokemon) {
			pokemon.addVolatile('escapethrust');
			this.add('-message', `${pokemon.name} is preparing to hit and run!`);
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Detect", pokemon);
		},
		beforeMoveCallback: function (pokemon) {
			if (!pokemon.volatiles['escapethrust'] || !pokemon.volatiles['escapethrust'].gotHit) {
				this.add('-fail', pokemon, 'move: Escape Thrust');
				this.add('-hint', 'Escape Thrust only works when Gyro is hit in the same turn the move is used.');
				return true;
			}
		},
		onHit: function (target, source) {
			    target.addVolatile('confusion');
			    target.addVolatile('weaktrap'); //Weak Trap's effect will go in statuses.js
                this.boost({evasion: -2}, target);
                this.boost({accuracy: -2}, target);
		},
		onAfterHit: function (target, source) {
			if (source.hp) {
				let item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: Escape Thrust', '[of] ' + source);
					target.setItem('choicespike');
					this.add('-message', target.name + ' obtained a Choice Spike.');
				}
			}
		},
		effect: {
			duration: 1,
			onStart: function (pokemon) {
				this.add('-singleturn', pokemon, 'move: Escape Thrust');
			},
			onHit: function (pokemon, source, move) {
				if (pokemon.side !== source.side) {
					pokemon.volatiles['escapethrust'].gotHit = true;
				}
			},
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	// Merick
	prestige: {
		accuracy: true,
		category: "Status",
		desc: "This move fails unless a foe uses a move on the user before the user can execute the move on the same turn. If this move is successful, the move raises the user's Attack, Defense, Special Attack and Special Defense by 2 stages, lowers the foe's Attack, Defense, Special Attack and Special Defense by 2 stages, renders the foe's Ability ineffective as long as it remains active, and the user gains a random typing.",
		shortDesc: "User must be hit by a move before moving.",
		id: "prestige",
		name: "Prestige",
		isNonstandard: "Custom",
		pp: 20,
		priority: -6,
		flags: {mirror: 1},
		beforeTurnCallback: function (pokemon) {
			pokemon.addVolatile('prestige');
			this.add('-message', `${pokemon.name} is going to show an honor.`);
		},
		beforeMoveCallback: function (pokemon) {
			if (pokemon.volatiles['prestige'] && !pokemon.volatiles['prestige'].gotHit) {
				this.add('cant', pokemon, 'Prestige', 'Prestige');
				this.add('-message', `${pokemon.name} eases itself.`);
				return true;
			}
			this.add('-message', `${pokemon.side.foe.active[0].name} was tricked!`);
		},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Parting Shot", target);
		},
		onHit: function (target, source) {
			this.boost({atk: -2, def: -2, spa: -2, spd: -2}, target);
			this.boost({atk: 2, def: 2, spa: 2, spd: 2}, source);
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
			if (['battlebond', 'comatose', 'prismpower', 'coloraura', 'disguise', 'shockpuppet', 'multitype', 'powerconstruct', 'overdrive', 'rkssystem', 'schooling', 'shieldsdown', 'stancechange'].includes(target.ability)) return;
			target.addVolatile('gastroacid');
		},
		effect: {
			duration: 1,
			onStart: function (pokemon) {
				this.add('-singleturn', pokemon, 'move: Prestige');
			},
			onHit: function (pokemon, source, move) {
				if (pokemon.side !== source.side) {
					pokemon.volatiles['prestige'].gotHit = true;
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	// Lorica
	partofyourworld: {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		desc: "Summons a rainbow for 5 turns. Has a 20% chance to lower the target's Special Attack, and a 10% chance to flinch it.",
		shortDesc: "Summons rainbow for 5 turns. 20% to lower SpAtk, 10% to flinch.",
		id: "partofyourworld",
		name: "Part Of Your World",
		isNonstandard: "Custom",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Bubble Beam", target);
			this.add('-anim', source, "Aqua Tail", target);
		},
		secondaries: [
			{
				chance: 10,
				volatileStatus: 'flinch',
			}, {
				chance: 20,
				boosts: {
					spa: -2,
				},
			},
		],
		onAfterMoveSecondarySelf: function (source) {
			source.side.addSideCondition('waterpledge');
		},
		target: "normal",
		type: "Water",
	},
// Gyl
	firerage: {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		desc: "Has a 100% chance to burn the target. Causes a sea of fire for 5 turns.",
		shortDesc: "100% chance to burn and traps the target. Thaws user.",
		id: "firerage",
		name: "Fire Rage",
		isNonstandard: "Custom",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, defrost: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Sacred Fire', source);
			this.add('-anim', source, 'Flame Charge', target);
		},
		onHit: function (target, source, move) {
			target.side.addSideCondition('firepledge');
		},
		secondary: {
			chance: 100,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
	},
// Jady
	coverage: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "If the target uses a Fighting-type move this turn, it is prevented from executing and the target loses a half of its maximum HP.",
		shortDesc: "If using a Fighting move, target loses 1/2 max HP.",
		id: "coverage",
		name: "Coverage",
		pp: 20,
		priority: 1,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		volatileStatus: 'coverage',
		effect: {
			duration: 1,
			onStart: function (pokemon, target) {
				this.add('-singleturn', target, 'move: Coverage');
			    this.attrLastMove('[still]');
			    this.add('-anim', target, "Barrier", target);
                this.add('message', `${target.name} is covered with an air-filled shell!`);
			},
			onTryMovePriority: -1,
			onTryMove: function (pokemon, target, move) {
				if (move.type === 'Fighting') {
					this.add('-activate', pokemon, 'move: Coverage');
			        this.attrLastMove('[still]');
			        this.add('-anim', pokemon, "Explosion", pokemon);
					this.add('message', `When ${pokemon.name} hits ${target.name}, it exploded!`);
			 		this.damage(this.clampIntRange(Math.round(pokemon.maxhp / 2), 1));
					return false;
				}
			},
		},
		secondary: null,
		isNonstandard: "Custom",
		target: "normal",
		type: "Normal",
	},
	// Adelaide
	frostwind: {
		accuracy: 85,
		basePower: 100,
		category: "Special",
		desc: "Has a 50% chance to freeze the target.",
		shortDesc: "50% chance to freeze the target.",
		id: "frostwind",
		name: "Frost Wind",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Frost Breath', target);
		},
		secondary: {
			chance: 50,
			status: 'frz',
		},
		isNonstandard: "Custom",
		target: "normal",
		type: "Ice",
	},
	// Waylon; Accuracy implemented in scripts.js.
	dragonwing: {
		accuracy: 75,
		basePower: 110,
		category: "Physical",
		desc: "Has a 100% chance to raise the user's Attack, Defense and Speed by 1 stage. If this user is a Dragon-type, this move does not check accuracy.",
		shortDesc: "100% chance to raise the user's Atk, Def and Spe by 1 stage. Dragon types can't miss.",
		id: "dragonwing",
		name: "Dragon Wing",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Outrage', source);
			this.add('-anim', source, 'Wing Attack', target);
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					atk: 1,
					def: 1,
					spe: 1,
				},
			},
		},
		isNonstandard: "Custom",
		target: "normal",
		type: "Dragon",
	},
	// Charlie
	cooldrink: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user gains a random typing and 3 moves based on that typing (2 physical moves and 1 status move). The user's attacks deal damage based off the user's Defense. If used again, returns the user to its original moveset and typing. This move fails if the user is not Charlie.",
		shortDesc: "Charlie: Gains 3 random moves and typing.",
		id: "cooldrink",
		name: "Cool Drink",
		isNonstandard: "Custom",
		pp: 20,
		priority: 0,
		flags: {},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Milk Drink", source);
		},
		onTryHit: function (target, source) {
			if (source.name !== 'Charlie') {
				this.add('-fail', source);
				this.add('-hint', 'Only Charlie can use Cool Drink.');
				return null;
			}
		},
		volatileStatus: 'cooldrink',
		effect: {
			noCopy: true,
			onStart: function (pokemon) {
				this.add('-start', pokemon, 'Cool Drink', '[silent]');
				this.add('-message', `${pokemon.name} drank some potion!`);
				const allTypes = ['Normal', 'Fire', 'Fighting', 'Water', 'Flying', 'Grass', 'Poison', 'Electric', 'Ground', 'Psychic', 'Rock', 'Ice', 'Bug', 'Dragon', 'Ghost', 'Dark', 'Steel', 'Fairy'];
				const type1 = allTypes[this.random(18)];
				const type2 = allTypes[this.random(18)];
				if (type1 === type2) {
					pokemon.types = [type1];
					this.add('-start', pokemon, 'typechange', `${type1}`);
				} else {
					pokemon.types = [type1, type2];
					this.add('-start', pokemon, 'typechange', `${type1}/${type2}`);
				}
				// @ts-ignore track percentages to keep Cool Drink from resetting pp
				pokemon.ppPercentages = pokemon.moveSlots.map(m =>
					m.pp / m.maxpp
				);
				// Get all possible moves sorted for convience in coding
				let newMovep = [];
				let statMove = [], offMove1 = [], offMove2 = [];
				for (const id in this.data.Movedex) {
					const move = this.data.Movedex[id];
					if (id !== move.id) continue;
					if (move.isZ || move.isNonstandard || !move.isViable || move.id === 'batonpass') continue;
					if (move.type && !pokemon.types.includes(move.type)) continue;
					// Time to sort!
					if (move.category === 'Status') statMove.push(move.id);
					if (move.category === 'Physical') {
						if (type1 === type2) {
							offMove1.push(move.id);
							offMove2.push(move.id);
						} else {
							if (move.type === type1) {
								offMove1.push(move.id);
							} else if (move.type === type2) {
								offMove2.push(move.id);
							}
						}
					}
				}
				const move1 = offMove1[this.random(offMove1.length)];
				offMove2 = offMove2.filter(move => move !== move1);
				if (!offMove2.length) offMove2 = ['revelationdance'];
				const move2 = offMove2[this.random(offMove2.length)];
				newMovep.push(move1);
				newMovep.push(move2);
				newMovep.push(!statMove.length ? 'recover' : statMove[this.random(statMove.length)]);
				newMovep.push('cooldrink');
				// Replace Moveset
				pokemon.moveSlots = [];
				for (const [i, moveid] of newMovep.entries()) {
					const move = this.dex.getMove(moveid);
					if (!move.id) continue;
					pokemon.moveSlots.push({
						move: move.name,
						id: move.id,
						// @ts-ignore hacky way to reduce Cool Drink's PP
						pp: Math.floor(((move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5) * (pokemon.ppPercentages ? pokemon.ppPercentages[i] : 1)),
						maxpp: ((move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5),
						target: move.target,
						disabled: false,
						used: false,
						virtual: true,
					});
					pokemon.moves.push(move.id);
				}
			},
			onModifyAtkPriority: 1,
			onModifyAtk: function (atk, pokemon) {
				return pokemon.getStat('def');
			},
			onRestart: function (pokemon) {
				this.add('-message', `${pokemon.name} turns back to normal!`);
				delete pokemon.volatiles['cooldrink'];
				this.add('-end', pokemon, 'Cool Drink', '[silent]');
				pokemon.types = ['Normal'];
				this.add('-start', pokemon, 'typechange', 'Normal');
				// @ts-ignore track percentages to keep Cool Drink from resetting pp
				pokemon.ppPercentages = pokemon.moveSlots.slice().map(m => {
					return m.pp / m.maxpp;
				});
				// Update movepool
				let newMovep = ['recover', 'topsyturvy', 'batonpass', 'cooldrink'];
				pokemon.moveSlots = [];
				for (const [i, moveid] of newMovep.entries()) {
					let move = this.dex.getMove(moveid);
					if (!move.id) continue;
					pokemon.moveSlots.push({
						move: move.name,
						id: move.id,
						// @ts-ignore hacky way to reduce Cool Drink's PP
						pp: Math.floor(((move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5) * (pokemon.ppPercentages ? pokemon.ppPercentages[i] : 1)),
						maxpp: ((move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5),
						target: move.target,
						disabled: false,
						used: false,
						virtual: true,
					});
					pokemon.moves.push(move.id);
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Normal",
	},
	// Zig
	"zigzapgoon": {
		accuracy: 100,
		basePower: 75,
		basePowerCallback: function (pokemon, target) {
			if (pokemon.template.speciesid !== 'linoone') {
				return 130;
			}
			return 75;
		},
		category: "Physical",
		desc: "This move has a 30% change to paralyze the target and 10% chance to lounge it. Summons Electric Terrain. If the user is a Zigzagoon, it changes to a Linoone and this move's power becomes 130. The target with a lounge status is unable to move for three turns.",
		shortDesc: "30%: Paralyze. 10%: Lounge. Elec Terrain + Zigzagoon changes.",
		id: "zigzapgoon",
		isNonstandard: "Custom",
		name: "Zig-Zap Goon",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Spark', source);
			this.add('-anim', source, 'Gigavolt Havoc', target);
		},
		onHit: function () {
			this.field.setTerrain('electricterrain');
		},
		onAfterMove: function (pokemon) {
			if (pokemon.template.speciesid !== 'zigzagoon' || pokemon.transformed || pokemon.illusion) return;
			pokemon.formeChange('Linoone', this.effect, true);
			this.add('-message', pokemon.name + ' became a Linoone!');
			   pokemon.types = ['Normal', 'Electric'];
			   this.add('-start', pokemon, 'typeadd', 'Electric');
			   pokemon.setAbility('Volt Shocker');
		},
		secondaries: [
			{
			chance: 30,
			status: 'par',
			}, {
			chance: 10,
			volatileStatus: 'lounge',
			},
		],
		target: "normal",
		type: "Electric",
	},
	// Poppy Seed
	"bugcrash": {
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		desc: "Has a 30% chance to summon Scripted Terrain",
		shortDesc: "30% chance to summon Scripted Terrain.",
		id: "bugcrash",
		isNonstandard: "Custom",
		name: "Bug Crash",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Bug Buzz', source);
			this.add('-anim', source, 'Megahorn', target);
		},
		secondary: {
			chance: 30,
		    onHit: function () {
			this.field.setTerrain('scriptedterrain');
		   },
		},
		target: "normal",
		type: "Bug",
	},
	// From SSB
	scriptedterrain: {
		accuracy: 100,
		category: "Status",
		desc: "Sets Scripted Terrain for 5 turns. The power of Bug type moves is boosted by 1.5, and there is a 5% chance for every move used to become Glitch Out instead. At the end of a turn, every Pokemon has a 5% chance to transform into a Missingno. with 3 random moves and Glitch Out. Switching out will restore the Pokemon to its normal state. This terrain affects floating Pokemon.",
		shortDesc: "5 turns: +Bug power, glitchy effects.",
		id: "scriptedterrain",
		name: "Scripted Terrain",
		isNonstandard: "Custom",
		pp: 5,
		priority: 0,
		flags: {nonsky: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Calm Mind', source);
			this.add('-anim', source, 'Geomancy', source);
		},
		terrain: 'scriptedterrain',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Bug') {
					this.debug('scripted terrain boost');
					return this.chainModify(1.5);
				}
			},
			onTryHitPriority: 4,
			onTryHit: function (target, source, effect) {
				if (!effect || effect.id === 'glitchout' || source.volatiles['glitchout']) return;
				if (this.random(20) === 1) {
					this.add('message', `${source.name}'s move was glitched by the Scripted Terrain!`);
					this.useMove('Glitch Out', source, source.side.foe.active[0]);
					return null;
				}
			},
			onStart: function (battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Scripted Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Scripted Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onResidual: function () {
				this.eachEvent('Terrain');
			},
			onTerrain: function (pokemon) {
				if (pokemon.template.id === 'missingno') return;
				if (pokemon.fainted || !pokemon.hp) return;
				if (this.random(20) === 1) {
					this.debug('Scripted terrain corrupt');
					this.add('message', `${pokemon.name} was corrupted by a bug in the scripted terrain!`);
					// generate a movepool
					let moves = [];
					let pool = this.shuffle(Object.keys(this.data.Movedex));
					let metronome = this.dex.getMove('metronome');
					for (let i of pool) {
						let move = this.dex.getMove(i);
						if (i !== move.id) continue;
						if (move.isZ || move.isNonstandard) continue;
						if (metronome.noMetronome && metronome.noMetronome.includes(move.id)) continue;
						if (this.dex.getMove(i).gen > this.gen) continue;
						moves.push(move);
						if (moves.length >= 3) break;
					}
					moves.push('glitchout');
					pokemon.formeChange('missingno');
					pokemon.moveSlots = [];
					for (let moveid of moves) {
						let move = this.dex.getMove(moveid);
						if (!move.id) continue;
						pokemon.moveSlots.push({
							move: move.name,
							id: move.id,
							pp: 5,
							maxpp: 5,
							target: move.target,
							disabled: false,
							used: false,
							virtual: true,
						});
						pokemon.moves.push(move.id);
					}
				}
			},
			onEnd: function () {
				this.add('-fieldend', 'move: Scripted Terrain');
			},
		},
		secondary: null,
		target: "self",
		type: "Psychic",
	},
	glitchout: {
		accuracy: true,
		category: "Status",
		desc: "A random move is selected for use, other than After You, Assist, Baneful Bunker, Beak Blast, Belch, Bestow, Celebrate, Chatter, Copycat, Counter, Covet, Crafty Shield, Destiny Bond, Detect, Diamond Storm, Endure, Feint, Fleur Cannon, Focus Punch, Follow Me, Freeze Shock, Helping Hand, Hold Hands, Hyperspace Hole, Ice Burn, Instruct, King's Shield, Light of Ruin, Mat Block, Me First, Metronome, Mimic, Mind Blown, Mirror Coat, Mirror Move, Nature Power, Photon Geyser, Plasma Fists, Protect, Quash, Quick Guard, Rage Powder, Relic Song, Secret Sword, Shell Trap, Sketch, Sleep Talk, Snarl, Snatch, Snore, Spectral Thief, Spiky Shield, Spotlight, Steam Eruption, Struggle, Switcheroo, Techno Blast, Thief, Thousand Arrows, Thousand Waves, Transform, Trick, Trump Card, V-create, or Wide Guard. The selected move's Base Power is increased by 20.",
		shortDesc: "Uses a random move with Base Power +20.",
		id: "glitchout",
		name: "Glitch Out",
		isNonstandard: "Custom",
		pp: 10,
		priority: 0,
		flags: {},
		noMetronome: ['afteryou', 'assist', 'banefulbunker', 'beakblast', 'belch', 'bestow', 'celebrate', 'chatter', 'copycat', 'counter', 'covet', 'craftyshield', 'destinybond', 'detect', 'diamondstorm', 'dragonascent', 'endure', 'feint', 'fleurcannon', 'focuspunch', 'followme', 'freezeshock', 'helpinghand', 'holdhands', 'hyperspacefury', 'hyperspacehole', 'iceburn', 'instruct', 'kingsshield', 'lightofruin', 'matblock', 'mefirst', 'metronome', 'mimic', 'mindblown', 'mirrorcoat', 'mirrormove', 'naturepower', 'originpulse', 'photongeyser', 'plasmafists', 'precipiceblades', 'protect', 'quash', 'quickguard', 'ragepowder', 'relicsong', 'secretsword', 'shelltrap', 'sketch', 'sleeptalk', 'snarl', 'snatch', 'snore', 'spectralthief', 'spikyshield', 'spotlight', 'steameruption', 'struggle', 'switcheroo', 'technoblast', 'thief', 'thousandarrows', 'thousandwaves', 'transform', 'trick', 'trumpcard', 'vcreate', 'wideguard'],
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Bug Buzz', source);
			this.add('-anim', source, 'Metronome', source);
			source.addVolatile('glitchout');
		},
		onHit: function (target, source, effect) {
			let moves = [];
			for (let i in this.data.Movedex) {
				let move = this.data.Movedex[i];
				if (i !== move.id) continue;
				if (move.isZ || move.isNonstandard) continue;
				if (effect.noMetronome && effect.noMetronome.includes(move.id)) continue;
				if (this.dex.getMove(i).gen > this.gen) continue;
				moves.push(move);
			}
			let randomMove = '';
			if (moves.length) {
				moves.sort((a, b) => a.num - b.num);
				randomMove = this.sample(moves).id;
			}
			if (!randomMove) {
				return false;
			}
			this.useMove(randomMove, target);
		},
		secondary: null,
		target: "self",
		type: "Bug",
	},
	// Mirica
	galaxydance: {
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "Every Pokemon in the user's party restores 1/3 of its maximum HP, rounded down, restored 5 PP of its maximum, and is cured of its major status condition. ",
		shortDesc: "Cures the user's party of all status conditions and restores HP and PP.",
		id: "galaxydance",
		isNonstandard: "Custom",
		name: "Galaxy Dance",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, dance: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Teeter Dance", source);
			this.add('-anim', source, "Wish", source);
			this.add('-anim', source, "Swift", target);
		},
		self: {
			onHit: function (pokemon, source, move) {
		    	this.attrLastMove('[still]');
		    	this.add('-anim', source, "Wish", source);
				this.add('-message', `A wishing star shot through your team area!`);
				source.heal(source.maxhp / 3);
				this.add('-heal', source, source.getHealth);
					for (const moveSlot of source.moveSlots) {
						moveSlot.pp += 5;
					}
				for (const ally of source.side.pokemon) {
					ally.heal(ally.maxhp / 3);
					ally.cureStatus();
					for (const moveSlot of ally.moveSlots) {
						moveSlot.pp += 5;
					}
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
	},
	// Move used for Mirica's Fantasy Surge
	fantasymist: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the user and its party members are immune to super-effective moves. Fails if the effect is already active on the user's side.",
		shortDesc: "For 5 turns, protects user's party from super-effective moves.",
		id: "fantasymist",
		name: "Fantasy Mist",
		pp: 30,
		priority: 0,
        isNonstandard: "Custom",
		flags: {snatch: 1},
		sideCondition: 'fantasymist',
		effect: {
			duration: 5,
	    	onTryHit: function (target, source, move) {
	    		if (target.runEffectiveness(move) == 1) {
				this.add('-activate', target, 'move: Fantasy Mist');
				this.add('-message', `The Pokémon is protected by a Fantasy Mist!`);
				return null;
		    	}
	    	},
			onStart: function (side) {
				this.add('-sidestart', side, 'Fantasy Mist', '[silent]');
			},
			onResidualOrder: 21,
			onResidualSubOrder: 3,
			onEnd: function (side) {
				this.add('-sideend', side, 'Fantasy Mist', '[silent]');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Psychic",
	},
	// Montgomery
	powerburn: {
		accuracy: 100,
		basePower: 130,
		basePowerCallback: function (pokemon, target, move) {
			if (pokemon.status === 'brn') return move.basePower * 2;
			return move.basePower;
		},
		category: "Physical",
		desc: "Has a 30% chance to burn the target. Power doubles if the user is burned. The target thaws out if it is frozen.",
		shortDesc: "30% chance to burn the target. Power 2x if the user is burned.",
		id: "powerburn",
        isNonstandard: "Custom",
		name: "Power Burn",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, defrost: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Outrage', source);
			this.add('-anim', source, 'Flare Blitz', target);
		},
		thawsTarget: true,
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "normal",
		type: "Fighting",
	},
	// Harold
	blastofshadows: {
		accuracy: 95,
		basePower: 100,
		category: "Special",
		desc: "If the target has not fainted, both the user and the target are forced to switch out and be replaced with a chosen unfainted ally. The target's replacement has its Defense, Special Defense and Accuracy lowered by 2 stages. Fails if either Pokemon is under the effect of Ingrain or Suction Cups.",
		shortDesc: "Both Pokemon switch. Opp. replacement: Def -2, Spd -2, Acc -2.",
		id: "blastofshadows",
        isNonstandard: "Custom",
		name: "Blast of Shadows",
		pp: 10,
		priority: -6,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Night Shade", source);
			this.add('-anim', source, "Shadow Ball", target);
		},
		onTryHit: function (target, source, move) {
			target.side.addSideCondition('blastofshadows');
		},
		onHit: function (target, source, move) {
			if (this.runEvent('DragOut', source, target, move)) {
				source.forceSwitchFlag = true;
			}
		},
		effect: {
			duration: 1,
			onSwitchIn: function (pokemon) {
				this.boost({def: -2, spd: -2, accuracy: -2}, pokemon, pokemon.side.foe.active[0], this.dex.getActiveMove('blastofshadows'));
			},
		},
		forceSwitch: true,
		target: "normal",
		type: "Ghost",
		zMovePower: 150,
	},
// Loretta
	powerburst: {
		accuracy: 100,
		basePower: 130,
		basePowerCallback: function (pokemon, target, move) {
			return move.basePower + 10 * pokemon.positiveBoosts();
		},
		category: "Special",
		desc: "Raises the user's Attack, Special Attack, and Speed by 1 stage. Power is equal to 10+(X*10), where X is the user's total stat stage changes that are greater than 0. This move can hit a Dark-type target no matter what this move's type is.",
		shortDesc: "Raises Atk, SpA, and Spe by 1; +10Boost.",
		id: "powerburst",
		name: "Power Burst",
		isNonstandard: "Custom",
		pp: 10,
		priority: 0,
		flags: {mirror: 1, protect: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Cosmic power', source);
			this.add('-anim', source, 'Mist Ball', target);
		},
		self: {
			boosts: {
				atk: 1,
				spa: 1,
				spe: 1,
			},
		},
		secondary: null,
		ignoreImmunity: {'Psychic': true},
		target: "normal",
		type: "Psychic",
	},
	// Roger
	powerblow: {
		accuracy: 100,
		basePower: 0,
		basePowerCallback: function (pokemon, target) {
			let power = 60 + 20 * target.positiveBoosts();
			if (power > 200) power = 200;
			return power;
		},
		category: "Special",
		desc: "Power is equal to 60+(X*20), where X is the target's total stat stage changes that are greater than 0, but not more than 200 power. Ignores the target's stat stage changes, including evasiveness. This move can hit a Dark-type target no matter what this move's type is. Ignores its own stat changes, including accuracy.",
		shortDesc: "Ignores stat changes; +20 Foe's boosts.",
		id: "powerblow",
		isNonstandard: "Custom",
		name: "Power Blow",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Cosmic Power", source);
			this.add('-anim', source, "Psystrike", target);
		},
		onAnyModifyBoost: function (boosts, target) {
			let source = this.effectData.target;
			if (source === target) return;
			if (source === this.activePokemon && target === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			if (target === this.activePokemon && source === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		secondary: null,
		ignoreImmunity: {'Psychic': true},
		ignoreEvasion: true,
		ignoreDefensive: true,
		target: "normal",
		type: "Psychic",
	},
	// Cyborg
	trimissle: {
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "Has a 50% chance to either burn, freeze, sleep, badly poison, or paralyze the target.",
		shortDesc: "50% chance to brn, frz, slp, tox, or par the foe.",
		id: "trimissle",
		isNonstandard: "Custom",
		name: "Tri Missle",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Extreme Evoboost", source);
			this.add('-anim', source, "Aura Sphere", target);
		},
		secondary: {
			chance: 50,
			onHit: function (target, source) {
				let result = this.random(5);
				if (result === 0) {
					target.trySetStatus('brn', source);
				} else if (result === 1) {
					target.trySetStatus('par', source);
				} else if (result === 2) {
					target.trySetStatus('slp', source);
				} else if (result === 3) {
					target.trySetStatus('tox', source);
				} else {
					target.trySetStatus('frz', source);
				}
			},
		},
		target: "normal",
		type: "Normal",
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
	// Bink
	painpunch: {
		accuracy: 100,
		basePower: 150,
		category: "Physical",
		desc: "If hit, every Pokemon in the foe's party loses 1/8 of their maximum HP, rounded down.",
		shortDesc: "Foe's party damaged.",
		id: "painpunch",
		isNonstandard: "Custom",
		name: "Pain Punch",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Dynamic Punch", target);
		},
		onHit: function (target, source, move) {
	    	for (const foes of target.side.pokemon) {
			this.add('-message', `The opposing team is damaged by a force!`);
	    	foes.damage(foes.maxhp / 8);
         }
    	},
		secondary: null,
		target: "normal",
		type: "Fighting",
	},
	// Lyoko
	primordialsong: {
		accuracy: true,
		category: "Status",
		desc: "Every Pokemon in the user's party has its HP and PP fully restored along with having any major status condition cured. After this move, the user faints.",
		shortDesc: "The user's party's HP and PP fully healed; status cured; user faints.",
		id: "primordialsong",
		isNonstandard: "Custom",
		name: "Primordial Song",
		pp: 2,
        noPPBoosts: true,
		priority: -7,
		flags: {protect: 1, distance: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Sing", source);
		},
       selfdestruct: "ifHit",
		self: {
			onHit: function (pokemon, source, move) {
				this.add('-message', `${source.name} is singing a Primordial Song!`);
				for (const ally of source.side.pokemon) {
					ally.heal(ally.maxhp);
					ally.cureStatus();
					for (const moveSlot of ally.moveSlots) {
						moveSlot.pp = moveSlot.maxpp;
					}
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Fairy",
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
	// Pupeye
	energypunch: {
		accuracy: 100,
		basePower: 70,
		basePowerCallback: function (pokemon, target, move) {
			return move.basePower + 20 * pokemon.positiveBoosts();
		},
		category: "Physical",
		desc: "Power is equal to 20+(X*20), where X is the user's total stat stage changes that are greater than 0. Resets all of the user's stat stages to 0 after doing damage. This move can hit a Ghost-type target no matter what this move's type is.",
		shortDesc: "+20 Boost. ",
		id: "energypunch",
		name: "Energy Punch",
		isNonstandard: "Custom",
		pp: 5,
		flags: {protect: 1, mirror: 1, contact: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Mega Punch', target);
			this.add('-anim', source, 'Close Combat', target);
		},
		onAfterMoveSecondarySelf: function (pokemon, target, move) {
			pokemon.clearBoosts();
			this.add('-clearboost', pokemon);
		},
        secondary: null,
        ignoreImmunity: {'Fighting': true},
		target: "normal",
		type: "Fighting",
	},
	// Boomer
	noblescreech: {
		accuracy: 100,
		basePower: 180,
		category: "Special",
		desc: "Lowers the target's Attack, Defense, Special Attack, Special Defense, and Speed by 1 stage. This move can hit a Fairy-type target no matter what this move's type is.",
		shortDesc: "Lowers all the target's stats by 1 (not acc/eva).",
		id: "noblescreech",
		name: "Noble Screech",
		isNonstandard: "Custom",
		pp: 5,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Screech', target);
			this.add('-anim', source, 'Boomburst', target);
		},
		boosts: {
			atk: -1,
			def: -1,
			spa: -1,
			spd: -1,
			spe: -1,
		},
        secondary: null,
        ignoreImmunity: {'Dragon': true},
		target: "normal",
		type: "Dragon",
	},
	// Maggie 64
	readytotroll: {
		id: "readytotroll",
		name: "Ready to Troll",
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "This move hits 4 times. After the first hit, the target is badly poisoned. After the second hit, the target is affected with Leech Seed. After the third hit, the target is cursed. After the fourth hit, Hyper Beam is used. After doing the damage, the user gains a an Aqua Ring status. Used even while sleeping. Fully restores the user's HP if this move knocks out the target.",
		shortDesc: "Hits 4 times with effects for 1st 3 hits; MAX HP restore if KOs the foe.",
		isNonstandard: "Custom",
		pp: 30,
		priority: 7,
		sleepUsable: true,
		flags: {contact: 1, protect: 1, mirror: 1, authentic: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Taunt", target);
			this.add('-anim', source, 'Mach Punch', target);
		},
		multihit: 4,
		onAfterHit: function (target, source, move) {
			// @ts-ignore hack for Maggie 64's move
			if (!move.curHits) move.curHits = 1;
			// @ts-ignore hack for Maggie 64's move
			switch (move.curHits) {
			case 1:
					this.add('-anim', source, 'Toxic', target);
					target.trySetStatus('tox', source);
				break;
			case 2:
					this.add('-anim', source, 'Leech Seed', target);
					if (target.hasType('Grass')) return null;
		         	target.addVolatile('leechseed', source);
				break;
			case 3:
					this.add('-anim', source, 'Spite', target);
					target.addVolatile('curse', source);
				break;			
			case 4:
					let move = this.dex.getActiveMove('banattack');
			        this.useMove(move, source, target);
				break;			}
			// @ts-ignore hack for Maggie 64's move
			move.curHits++;
		},
		onAfterMoveSecondarySelf: function (pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) this.heal(pokemon.maxhp, pokemon, pokemon, move);
		},
		self: {
			onHit: function (source) {
				source.addVolatile('aquaring');
			},
		},
        secondary: null,
		target: "normal",
		type: "???",
	},
	// Used for Maggie 64's move
	banattack: {
		id: "banattack",
		name: "Ban Attack",
		accuracy: true,
		basePower: 100,
		category: "Physical",
		desc: "Ignores the target's stat stage changes, including evasiveness. Cannot miss. Clears the both the terrain and weather first before using the move. This move is super-effective against any type. This move and its effects ignore the types and Abilities of other Pokemon.",
		shortDesc: "Various effects; super-effective; HP restore if KOs the foe.",
		isNonstandard: "Custom",
		pp: 30,
		flags: {contact: 1, protect: 1, mirror: 1, authentic: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.field.clearWeather();
			this.field.clearTerrain();
			this.add('-anim', source, 'Psycho Boost', source);
			this.add('-anim', source, 'Dynamic Punch', target);
		},
		onEffectiveness: function (typeMod, target) {
			return 1;
		},
		onAfterMoveSecondarySelf: function (pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) this.heal(pokemon.maxhp, pokemon, pokemon, move);
		},
		ignoreDefensive: true,
		ignoreEvasion: true,
		ignoreAbility: true,
		ignoreImmunity: true,
        secondary: null,
		target: "normal",
		type: "???",
	},
	// Silvereye
	eyeofdarksilver: {
		id: "eyeofdarksilver",
		name: "Eye of Dark Silver",
		accuracy: true,
		category: "Status",
		desc: "Raises the user's Attack, Defense, Special Attack, Special Defense, and Speed by 1 stage. The user restores 1/2 of its maximum HP, rounded half up.",
		shortDesc: "Raises all stats by 1 (not acc/eva) and heals the user by 50% of its max HP.",
		isNonstandard: "Custom",
		pp: 50,
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Night Shade', source);
			this.add('-anim', source, 'Psycho Boost', source);
		},
		boosts: {
			spa: 1,
			atk: 1,
			spe: 1,
			def: 1,
			spd: 1,
		},
        secondary: null,
		target: "self",
		type: "Dark",
	},
	// Nigel
	watertermination: {
		accuracy: 100,
		basePower: 160,
		basePowerCallback: function (pokemon, target) {
			if (target.hasType('Rock') || target.hasType('Ground') || target.hasType('Fire')) {
				return 250;
			}
			return 160;
		},
		category: "Special",
		desc: "Raises the user's Special Attack by two stages. If the target is a Fire-type, a Rock-type and a Ground-type, this move's base power becomes 250.",
		shortDesc: "Raises SpA by 2; BP: 250 if foe is fire, rock or ground.",
		id: "watertermination",
		isNonstandard: "Custom",
		name: "Water Termination",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Water Pulse", source);
			this.add('-anim', source, "Surf", target);
		},
		self: {
			boosts: {
				spa: 2,
			},
		},
		secondary: null,
		target: "normal",
		type: "Water",
	},
	// Riana
	shininglight: {
		accuracy: true,
		category: "Status",
		desc: "All the Pokemon in the user's party has its HP restored by 1/2. After this move, the user faints.",
		shortDesc: "Heals the user's party by 1/2; user faints.",
		id: "shininglight",
		isNonstandard: "Custom",
		name: "Shining Light",
		pp: 1,
        noPPBoosts: true,
		priority: -7,
		flags: {protect: 1, distance: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Spotlight", source);
		},
       selfdestruct: "ifHit",
		self: {
			onHit: function (pokemon, source, move) {
				this.add('-message', `${source.name} shone a light on its allies!`);
				for (const ally of source.side.pokemon) {
					ally.heal(ally.maxhp / 2);
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Fairy",
	},
// Angel
	"heavenswrath": {
		accuracy: 100,
		basePower: 170,
		category: "Special",
		desc: "Deals damage two turns after this move is used. At the end of that turn, the damage is calculated at that time and dealt to the Pokemon at the position the target had when the move was used. If the user is no longer active at the time, damage is calculated based on the user's natural Special Attack stat, types, and level, with no boosts from its held item or Ability. Fails if this move or Future Sight is already in effect for the target's position.",
		shortDesc: "Hits two turns after being used.",
		id: "heavenswrath",
		name: "Heavens' Wrath",
		pp: 5,
		priority: 0,
		flags: {},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Synthesis", source);
		},
		isFutureMove: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				move: 'heavenswrath',
				source: source,
				moveData: {
					id: 'heavenswrath',
					name: "Heavens' Wrath",
					accuracy: 100,
					basePower: 170,
					category: "Special",
					priority: 0,
					flags: {},
		           onTryMovePriority: 100,
		           onTryMove: function () {
		        	this.attrLastMove('[still]');
		             },
		           onPrepareHit: function (target, source) {
		        	this.add('-anim', source, "Light of Ruin", source);
		            },
					effectType: 'Move',
					isFutureMove: true,
					type: 'Fairy',
				},
			});
			this.add('-message', `${source.name} started using Heaven's Wrath as its target's fate!`);
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
	},
// Gerald
	firedomination: {
		accuracy: 100,
		basePower: 160,
		basePowerCallback: function (pokemon, target) {
			if (target.hasType('Grass') || target.hasType('Steel') || target.hasType('Bug') || target.hasType('Ice')) {
				return 250;
			}
			return 160;
		},
		category: "Physical",
		desc: "Raises the user's Attack by two stages. If the target is an Ice-type, a Grass-type, a Steel-type and a Bug-type, this move's base power becomes 250.",
		shortDesc: "Raises Atk by 2; BP: 250 if foe is bug, grass, ice, or steel.",
		id: "firedomination",
		isNonstandard: "Custom",
		name: "Fire Domination",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Eruption", source);
			this.add('-anim', source, "Fire Punch", target);
		},
		self: {
			boosts: {
				atk: 2,
			},
		},
		secondary: null,
		target: "normal",
		type: "Fire",
	},
// Danon
	mysterygift: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "This move may give out random things happen to the target. The world may never know!",
		shortDesc: "Will randomly do various things.",
		id: "mysterygift",
		name: "Mystery Gift",
		isNonstandard: "Custom",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		ignoreImmunity: true,
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Present', target);
		},
		onModifyMove: function (move) {
			switch (this.random(10)) {
			case 0:
                    move.category = 'Special';
					move.type = 'Fire';
					move.basePower = 250;
					move.onTryHit = function (target, source) {
						this.add('-anim', source, 'Seed Bomb', target);
						this.add('-message', `Power Bomb Attack!`);
					};
					move.onHit = function () {};
					break;
			case 1:
                    move.onTryHit = function (target, source) {
                        this.add('-anim', source, 'Heal Pulse', target);
						this.add('-message', `Here's something to cheer you up!`);
					};
					move.onHit = function (target, source) {
						this.heal(target.maxhp);
						target.cureStatus();
					for (const moveSlot of target.moveSlots) {
						moveSlot.pp = moveSlot.maxpp;
					     }
					};
					break;
			case 2:
                        move.onTryHit = function (target, source) {
                        this.add('-anim', source, 'Sunsteel Strike', target);
						this.add('-message', `Destiny is victory!`);
					};
					move.onHit = function (target, source) {
						target.setStatus('frz');
						target.addVolatile('confusion');
					};
					break;
			case 3:
					move.category = 'Special';
					move.type = 'Dark';
					move.basePower = 500;
					move.self = {volatileStatus: 'mustrecharge'};
					move.onTryHit = function (target, source) {
                        this.add('-anim', source, 'Flash', target);
                        this.add('-anim', source, 'Hyper Beam', target);
                        this.add('-anim', source, 'Explosion', target);
						this.add('-message', `Ultimate Destroyer of the Everything!`);
					};
					move.onHit = function (target, source) {
						this.add('-message', `${target.name} gets hit by an unknown force!`);
						target.setStatus('par');
						target.addVolatile('disabled');
						target.addVolatile('confusion');
						target.addVolatile('lounge');
						source.addVolatile('powershield');
					};
					break;
			case 4:
				move.onTryHit = function (target, source) {
						this.add('-anim', source, 'Synthesis', target);
						this.add('-message', `Here's something to refresh!`);
					};
					move.onHit = function (target, source) {
						target.addVolatile('aquaring');
						target.addVolatile('ingrain');
					};
					break;
			case 5:
                    move.category = 'Physical';
					move.type = 'Poison';
					move.basePower = 180;
					move.onTryHit = function (target, source) {
						this.add('-anim', source, 'Poison Gas', target);
						this.add('-message', `A fart times a thousand!`);
					};
					move.onHit = function () {};
					break;
			case 6:
                        move.onTryHit = function (target, source) {
                        this.add('-anim', source, 'Flash', source);
                        this.add('-anim', source, 'Rapid Spin', source);
						this.add('-message', `🎵You spin me right round baby right round like a record baby right round round round!🎵`);
					};
					move.onHit = function (target, source) {
				if (source.hp && source.removeVolatile('leechseed')) {
					this.add('-end', source, 'Leech Seed', '[from] move: Super Spin', '[of] ' + source);
				}
				let sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
				for (const condition of sideConditions) {
					if (source.hp && source.side.removeSideCondition(condition)) {
						this.add('-sideend', source.side, this.dex.getEffect(condition).name, '[from] move: Super Spin', '[of] ' + source);
					}
				}
				if (source.hp && source.volatiles['partiallytrapped']) {
					source.removeVolatile('partiallytrapped');
				}
					};
					break;
			case 7:
                    move.category = 'Physical';
					move.type = 'Steel';
					move.basePower = 25;
					move.multihit = 8;
					move.onTryHit = function (target, source) {
						this.add('-anim', source, 'Spike Cannon', target);
						this.add('-message', `Metal Missle Attack Go!`);
					};
					move.onHit = function () {};
					break;
			case 8:
                    move.category = 'Status';
					move.type = 'Psychic';
					move.onTryHit = function (target, source) {
						this.add('-anim', source, 'Teleport', source);
						this.add('-message', `Teleport out!`);
					};
					move.selfSwitch = true;
					break;
			case 9:
					move.onTryHit = function (target, source) {
						this.add('-anim', source, 'Celebrate', source);
						this.add('-message', `Looks like it's Wonder Trading time!`);
					};
					move.onHit = function (target, source) {
			// Store percent of HP left, percent of PP left, and status for each pokemon on the user's team
			let carryOver = [];
			let currentTeam = source.side.pokemon;
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
			let team = this.teamGenerator.getTeam({name: source.side.name});
			// Overwrite un-fainted pokemon other than the user
			for (let i = 0; i < currentTeam.length; i++) {
				if (currentTeam[i].fainted || !currentTeam[i].hp || currentTeam[i].position === source.position) continue;
				let set = team.shift();
				let oldSet = carryOver[i];
				// @ts-ignore
				if (set.name === 'Danon') {
					// No way am I allowing 2 of this mon on one team
					set = team.shift();
				}

				// Bit of a hack so client doesn't crash when formeChange is called for the new pokemon
				let effect = this.effect;
				this.effect = /** @type {Effect} */ ({id: ''});
				// @ts-ignore
				let pokemon = new Pokemon(set, source.side);
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
			this.add('message', `${source.name} shifted ${source.side.name}'s team away!`);
		};
		break;
			default:
              move.onTryHit = function () {
			     this.add('-message', `But nothing's happened!`);
			      };
				 break;
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	// Frog
	aquaticecho: {
		accuracy: true,
		basePower: 100,
		basePowerCallback() {
			if (this.field.pseudoWeather.aquaticecho) {
				return 100 * this.field.pseudoWeather.aquaticecho.multiplier;
			}
			return 100;
		},
		category: "Special",
		desc: "For every consecutive turn that this move is used by at least one Pokemon, this move's power is multiplied by the number of turns to pass, but not more than 5. This move does not check accuracy.",
		shortDesc: "Power increases when used on consecutive turns.",
		id: "aquaticecho",
		name: "Aquatic Echo",
		isNonstandard: "Custom",
		pp: 5,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Water Pulse', target);
			this.add('-anim', source, 'Hyper Voice', target);
		},
        secondary: null,
		target: "normal",
		type: "Water",
	},
	// Millennium
	colorshift: {
		accuracy: true,
		category: "Status",
		desc: "If the user is an Arceus, its item becomes a random Plate whose type matches one of the target's weaknesses, it changes forme, and it uses Multi-Breaker. Fails if the target has no weaknesses or if the user's species is not Arceus.",
		shortDesc: "Arceus: Changes user/move type to a weakness of target.",
		id: "colorshift",
		name: "Color Shift",
		isNonstandard: "Custom",
		pp: 10,
		priority: 0,
		flags: {authentic: 1},
        breaksProtect: true,
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Conversion 2", source);
		},
		onHit: function (target, source) {
			if (source.baseTemplate.baseSpecies !== 'Arceus') return false;
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
				let typeMod = this.dex.getEffectiveness(type, targetTypes);
				if (typeMod > 0 && this.dex.getImmunity(type, target)) weaknesses.push(type);
			}
			if (!weaknesses.length) {
				return false;
			}
			let randomType = this.sample(weaknesses);
			source.setItem(randomType + 'jewel');
			this.add('-item', source, source.getItem(), '[from] move: Color Shift');
			let template = this.dex.getTemplate('Arceus-' + randomType);
			source.formeChange(template, this.dex.getAbility('coloraura'), true);
			let move = this.dex.getActiveMove('multibreaker');
			this.useMove(move, source, target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMoveEffect: 'heal',
	},
/////Move used for Color Shift
	multibreaker: {
		accuracy: 100,
		category: "Special",
		basePower: 110,
		desc: "This move's type depends on the user's held Jewel. This move becomes a physical attack if the user's Attack is greater than its Special Attack, including stat stage changes. If this move is successful and the user has not fainted, the effects of Leech Seed and binding moves end for the user, and all hazards are removed from the user's side of the field. This move and its effects ignore the Type Immunities and Abilities of other Pokemon. If this move is successful, it breaks through the target's Baneful Bunker, Detect, King's Shield, Protect, or Spiky Shield for this turn, allowing other Pokemon to attack the target normally. If the target's side is protected by Crafty Shield, Mat Block, Quick Guard, or Wide Guard, that protection is also broken for this turn and other Pokemon may attack the target's side normally. Fails if the target has no weaknesses or if the user's species is not Arceus.",
		shortDesc: "Type varies based on the held Jewel. Does many things.",
		id: "multibreaker",
		name: "Multi-Breaker",
		isNonstandard: "Custom",
		pp: 5,
		priority: 0,
		flags: {authentic: 1, protect: 1},
        breaksProtect: true,
		onModifyMove: function (move, pokemon) {
			const item = pokemon.getItem();
			if (item.id && item.onPlate && !item.zMove) {
				move.type = item.onPlate;
			}
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		onTryMovePriority: 100,
		onTryMove: function (pokemon, target, move) {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source, pokemon) {
			this.add('-anim', source, "Destiny Bond", source);
			this.add('-anim', source, "Prismatic Laser", target);
		},
		self: {
			onHit: function (pokemon) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Multi-Breaker', '[of] ' + pokemon);
				}
				let sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Multi-Breaker', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
// Zatch
  zraider: {
		accuracy: 100,
		basePower: 110,
		category: "Special",
		desc: "This move becomes a physical attack if the user's Attack is greater than its Special Attack, including stat stage changes. If this move is successful and the user has not fainted, the effects of Leech Seed and binding moves end for the user, and all hazards are removed from the user's side of the field. This move and its effects ignore the Type Immunities and Abilities of other Pokemon. If this move is successful, it breaks through the target's Baneful Bunker, Detect, King's Shield, Protect, or Spiky Shield for this turn, allowing other Pokemon to attack the target normally. If the target's side is protected by Crafty Shield, Mat Block, Quick Guard, or Wide Guard, that protection is also broken for this turn and other Pokemon may attack the target's side normally.",
		shortDesc: "Does many things.",
		id: "zraider",
		name: "Z-Raider",
		isNonstandard: "Custom",
		pp: 5,
		priority: 0,
		flags: {authentic: 1},
		breaksProtect: true,
		onModifyMove: function (move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		onTryMovePriority: 100,
		onTryMove: function (pokemon, target, move) {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Geomancy", source);
			this.add('-anim', source, "Dragon Dance", source);
			this.add('-anim', source, "Prismatic Laser", target);
		},
		self: {
			onHit: function (pokemon) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Z-Raider', '[of] ' + pokemon);
				}
				let sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Z-Raider', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			},
		},
        secondary: null,
		ignoreImmunity: true,
		ignoreAbility: true,
		target: "normal",
		type: "Psychic",
	},
	worldoflight: {
		accuracy: true,
		basePower: 180,
		category: "Special",
		desc: "This move becomes a physical attack if the user's Attack is greater than its Special Attack, including stat stage changes. This move and its effects ignore the Type Immunities and Abilities of other Pokemon. If this move is successful, it breaks through the target's Baneful Bunker, Detect, King's Shield, Protect, or Spiky Shield for this turn, allowing other Pokemon to attack the target normally. If the target's side is protected by Crafty Shield, Mat Block, Quick Guard, or Wide Guard, that protection is also broken for this turn and other Pokemon may attack the target's side normally. The user uses a Power Shield afterwards. The Pokémon with a Power Shield protects any attack, including statuses. That effect lasts for three turns. The user won't get affected by its own status stat-boosting moves, however.",
		shortDesc: "Physical if user's Atk > Sp. Atk. Ignrs. abilis./immunis.",
		id: "worldoflight",
		name: "World of Light",
		isNonstandard: "Custom",
		pp: 1,
		priority: 0,
		flags: {authentic: 1},
		breaksProtect: true,
		onModifyMove: function (move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Cosmic Power", source);
			this.add('-anim', source, "Flash", source);
			this.add('-anim', source, "Light That Burns The Sky", target);
		},
		onAfterMoveSecondarySelf: function (source) {
			source.addVolatile('powershield');
		},
		ignoreImmunity: true,
		ignoreAbility: true,
		isZ: "zatchiumz",
		secondary: null,
		target: "normal",
		type: "Psychic",
	},
	// Omega Sheron
	doubledragon: {
		accuracy: 100,
		basePower: 110,
		category: "Physical",
		desc: "This move has a 10% chance to KO the target. This move is super-effective against any type. This move and its effects ignore the Abilities of other Pokemon. If this move is successful and the user has not fainted, it gains the effect of Aqua Ring, Safeguard, Mist, and the Aurora Veil. If this move is successful, it breaks through the target's Baneful Bunker, Detect, King's Shield, Protect, or Spiky Shield for this turn, allowing other Pokemon to attack the target normally. If the target's side is protected by Power Shield, Crafty Shield, Mat Block, Quick Guard, or Wide Guard, that protection is also broken for this turn and other Pokemon may attack the target's side normally.",
		shortDesc: "Does many things.",
		id: "doubledragon",
		name: "Double Dragon",
		isNonstandard: "Custom",
		pp: 5,
		priority: 0,
		flags: {authentic: 1},
        breaksProtect: true,
		onTryMovePriority: 100,
		onTryMove: function (pokemon, target, move) {
			this.attrLastMove('[still]');		
			if (pokemon.template.species === 'Rayquaza-Mega') {
				return;
			}
			this.add('-fail', pokemon, 'move: Double Dragon');
			this.add('-hint', "Only a Pokemon whose form is Rayquaza-Mega can use this move.");
			return null;	
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Double Team", source);
			this.add('-anim', source, "Roar of Time", source);
			this.add('-anim', source, "Air Slash", target);
		},
		self: {
			onHit: function (pokemon, target, move) {
                pokemon.addVolatile('aquaring');
			    pokemon.side.addSideCondition('safeguard');
			    pokemon.side.addSideCondition('mist');
			    pokemon.side.addSideCondition('auroraveil');
			},
		},
		onEffectiveness: function (typeMod, target) {
			return 1;
		},
		ignoreAbility: true,
		secondary: {
			chance: 10,
			ohko: true,
			onHit: function (target, source) {
			this.add('-message', 'FATALITY!');
		      },
		},
		target: "normal",
		type: "Flying",
	},
	// Modified Moves \\
	"multiattack": {
		inherit: true,
		accuracy: true,
		basePower: 160,
	},
	"judgment": {
		inherit: true,
		accuracy: true,
		basePower: 180,
	},
	"gastroacid": {
		inherit: true,
		volatileStatus: 'gastroacid',
		onTryHit: function (pokemon) {
			let bannedAbilities = ['battlebond', 'comatose', 'coloraura', 'prismpower', 'overdrive', 'disguise', 'shockpuppet', 'multitype', 'powerconstruct', 'rkssystem', 'schooling', 'shieldsdown', 'stancechange'];
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
	"skyattack": {
		inherit: true,
		basePower: 200,
	},
	"teleport": {
		inherit: true,
		desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members.",
		shortDesc: "User switches out.",
		priority: -6,
		selfSwitch: true,
		onTryHit: true,
	},
	"solarbeam": {
		inherit: true,
		basePower: 200,
	},
	"metronome": {
		inherit: true,
		onHit: function (target, source, effect) {
			let moves = [];
			for (let i in exports.BattleMovedex) {
				let move = this.dex.getMove(i);
				if (i !== move.id) continue;
				if (move.gen !== 1) continue;
				// @ts-ignore
				if (effect.noMetronome.includes(move.id)) continue;
				moves.push(move);
			}
			let randomMove = '';
			if (moves.length) {
				moves.sort((a, b) => a.num - b.num);
				randomMove = this.sample(moves).id;
			}
			if (!randomMove) return false;
			this.useMove(randomMove, target);
		},
	},
	"megadrain": {
		inherit: true,
		basePower: 75,
		pp: 10,
	},
	"absorb": {
		inherit: true,
		basePower: 40,
		pp: 15,
	},
};

exports.BattleMovedex = BattleMovedex;
