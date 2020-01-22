'use strict';

/**@type {{[k: string]: ModdedEffectData}} */
let BattleStatuses = {
// Smash 
	smash: { // No single quotes causes issues
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Smash:</b> SMASH! Of all things!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Smash:</b> What's on the run, funny?`);
		},
		onFaint: function () {
			this.add(`raw|<b>Smash:</b> What kind of Pokémon are you anyway?`);
		},
	},
	
// Kal
	kal: { // No single quotes causes issues
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Kal:</b> I just read a note and it says that you're banned from a Bomberman forum.`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Kal:</b> I'm just sweeping and mopping on the floor.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Kal:</b> Owch. What's that? Are you kidding me? You're pretending to get me trolled aren't ya?`);
		},
	},

// Willy
	willy: {
		noCopy: true,
		onStart: function (source) {
			source.types = ['Poison', 'Fairy'];
			this.add(`raw|<b>Willy:</b> Do you wanna know what I need someone to love?`);
			this.add('-start', source, 'typechange', 'Poison/Fairy');
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Willy:</b> Feeling hopeless? Here's something to do.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Willy:</b> All I prefer is a guy and not a lady.`);
		},
	},

// Narcia
	narcia: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Narcia:</b> OK, play nice!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Narcia:</b> Look out, world! Here I come!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Narcia:</b> This tores me up!`);
		},
	},

// Mikey
	mikey: {
		noCopy: true,
		onStart: function (source) {
			source.types = ['Bug', 'Dragon'];
			this.add(`raw|<b>Mikey:</b> Yo, man!`);
			this.add('-start', source, 'typechange', 'Bug/Dragon');
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Mikey:</b> Embrace coolness!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Mikey:</b> I'm toasted, dude!`);
		},
//// Innate Ability: Sound Absorb - This Pokemon is immune to Sound-based moves and restores 1/4 of its maximum HP, rounded down, when hit by a Sound-based move.
		onTryHit(target, source, move) {
			if (target !== source && move.flags['sound']) {
				if (!this.heal(target.maxhp / 4)) {
					this.add('-immune', target, '[from] ability: Sound Absorb');
				}
				return null;
			}
		},
	},

// Lisa Palson
	lisapalson: {
		noCopy: true,
		onStart: function (source) {
			source.types = ['Fairy', 'Fire'];
			this.add(`raw|<b>Lisa Palson:</b> Remember, this is only a game.`);
			this.add('-start', source, 'typechange', 'Fairy/Fire');
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Lisa Palson:</b> Not feeling strong? Not to worry, I have a friend to help!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Lisa Palson:</b> If this game is not for you, look out for an another one, OK?`);
		},
	},

// Millie
	millie: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Millie:</b> Welcome to my world1!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Millie:</b> Ha ha! Made a switch for myself!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Millie:</b> I'll be back... For an another revenge!`);
		},
	},

// Joe
	joe: {
		noCopy: true,
		onStart: function (source) {
			source.types = ['Steel', 'Dark'];
			this.add(`raw|<b>Joe:</b> The name's Joe and I'm playing <i>Super Cast Bros. X</i>!`);
			this.add('-start', source, 'typechange', 'Steel/Dark');
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Joe:</b> And here comes the switch off!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Joe:</b> And there's a beatdown for me!`);
		},
	},

// Doug Funny
	dougfunny: {
		noCopy: true,
		onStart: function (source) {
			source.types = ['Normal', 'Steel'];
			this.add(`raw|<b>Doug Funny:</b> I'm going to write a diary and don't you ever call me "Doug Funnie"!`);
		    this.add('-start', source, 'typechange', 'Normal/Steel');
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Doug Funny:</b> 101? Time to head out to Dr. Swrirly's!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Doug Funny:</b> I'm staying in a closet for the rest of my eternity. Roger that.`);
		},
//// Innate Ability: Wonder Skin
		onModifyAccuracyPriority: 10,
		onModifyAccuracy(accuracy, target, source, move) {
			if (move.category === 'Status' && typeof move.accuracy === 'number') {
				this.debug('Wonder Skin - setting accuracy to 50');
				return 50;
			}
		},
	},

// Omar
	omar: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Omar:</b> Why I am here?`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Omar:</b> Let's go to the Frosty Milkshakes.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Omar:</b> Eesh! I'm beaten!`);
		},
	},

// Amy Lou
	amylou: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Amy Lou:</b> What on Earth are you doing here?`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Amy Lou:</b> How's my deal?`);
		},
		onFaint: function () {
			this.add(`raw|<b>Amy Lou:</b> That's my weakspot, sir or madam.`);
		},
	},

// Kris
	kris: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Kris:</b> Welcome to my grave, sucker!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Kris:</b> What am I think I'm doing?`);
		},
		onFaint: function () {
			this.add(`raw|<b>Kris:</b> Who the heck are you anyway?`);
		},
      //// Innate Ability: Mysical Boost - This Pokemon's Special Attack is raised by 1 stage at the end of each full turn it has been on the field.
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.activeTurns) {
				this.boost({spa: 1});
			}
		},
	},

// Aqua
	aqua: {
		noCopy: true,
		onStart: function (source) {
			source.types = ['Water'];
			this.add(`raw|<b>Aqua:</b> Ladies and gentlemen, Aqua is back!`);
		    this.add('-start', source, 'typechange', 'Water');
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Aqua:</b> Yikes! A real trouble!`);
		},
		onFaint: function (pokemon) {
			let enemy = pokemon.side.foe.name
			this.add(`raw|<b>Aqua:</b> *Aqua gets kicked out by ${enemy}!*`);
		},
	},

// Ashtar
	ashtar: {
		noCopy: true,
		onStart: function (source) {
			this.add(`raw|<b>Ashtar:</b> Hold on! I'm in the middle of Pokémon battles!`);
      			if (source.template.speciesid !== 'absolmega' || source.illusion) return;
              source.types = ['Dark', 'Flying', 'Fire'];
			  this.add('-start', source, 'typechange', 'Dark/Flying');
			  this.add('-start', source, 'typeadd', 'Fire');
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Ashtar:</b> Play friendly, everyone!`);
		},
		onFaint: function (pokemon) {
			let foe = pokemon.side.foe.active[0];
			this.add(`raw|<b>Ashtar:</b> I want ${foe.name} to go away, please.`);
		},
	},

// Jethro
	jethro: {
		noCopy: true,
		onStart: function (source) {
			source.types = ['Dark', 'Ground'];
			this.add(`raw|<b>Jethro:</b> Release the hounds!`);
			this.add('-start', source, 'typechange', 'Dark/Ground');
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Jethro:</b> Try to see if you can hid into this private room!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Jethro:</b> Ehehehe. Not bad.`);
		},
	},

// Meddy
	meddy: {
		noCopy: true,
		onStart: function (source) {
			this.add(`raw|<b>Meddy:</b> That's my ${["life insurance", "Poké Ball", "soda can", "bowl of spinach", "credit card", "bottles of orange juice", "Super NES console", "picture of Waylon Smithers", "random Iron Ball"][this.random(9)]}, pal!`);
		},
		onSwitchOut: function (pokemon) {
			this.add(`raw|<b>Meddy:</b> I may be more of a bit invincible, not even the Galar legendaries won't do!`);
			if (pokemon.illusion) return;
////Innate Ability: Super Regenerator
			pokemon.heal(pokemon.maxhp / 2);
		},
		onFaint: function () {
			this.add(`raw|<b>Meddy:</b> That's impossible! Not bad!`);
		},
	},

// Oscar
	oscar: {
		noCopy: true,
		onStart: function (pokemon) {
			this.add(`raw|<b>Oscar:</b> Time to get lucky!`);
			this.useMove("focusenergy", pokemon);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Oscar:</b> See ya in Springfield!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Oscar:</b> I think I will need to concentrate my attacks.`);
		},
      ////Innate Ability: A Great Good Luck - All moves have the high critical hit ratio.
		onModifyMove(move) {
			move.critRatio = 2;
		},
	},

// Opal
	opal: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Opal:</b> Here comes an idea!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Opal:</b> Let's see about that!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Opal:</b> Nobody would ever beat me like THAT!`);
		},
	},
	
// Frances
	frances: {
		noCopy: true,
		onStart: function (pokemon) {
			pokemon.types = ['Ice', 'Fire'];
			this.add(`raw|<b>Frances:</b> Hi everybody! Frances here!`);
			this.add(`raw|<b>Everyone:</b> Hi Frances!`);
			this.add('-start', pokemon, 'typechange', 'Ice/Fire')
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Frances:</b> Let's get outta here! Never lose my temperature!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Frances:</b> Oh my! The temperature's faded away!`);
		},
	},
	
// Exo
	exo: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Exo:</b> Let's the Rotom party begin!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Exo:</b> Whoop! I'm gonna miss my daytime program!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Exo:</b> I thought I was invincible! Oh well.`);
		},
	},

	// Lounge Custom effect
	lounge: {
		noCopy: true,
		duration: 3,
		onStart: function (pokemon) {
			this.add('-start', pokemon, 'Lounge', '[silent]');
			this.add('-message', pokemon.name + ' was immobilized!');
		},
		onBeforeMovePriority: 8,
		onBeforeMove: function (pokemon) {
			if (!this.runEvent('Flinch', pokemon)) {
				return;
			}
			this.add('cant', pokemon, 'truant');
			return false;
		},
		onEnd: function (pokemon) {
			this.add('-end', pokemon, 'Lounge', '[silent]');
			this.add('-message', pokemon.name + ' became mobile again!');
		},
	},
	// Reverse Attract effect
	reverseattract: {
		noCopy: true,
			onStart(pokemon, source, effect) {
				if (!(pokemon.gender === 'F' && source.gender === 'F') && !(pokemon.gender === 'M' && source.gender === 'M')) {
					this.debug('incompatible gender');
					return false;
				}
				if (!this.runEvent('Attract', pokemon, source)) {
					this.debug('Attract event failed');
					return false;
				}
				if (effect.id === 'effiminatecharm') {
					this.add('-start', pokemon, 'Attract', '[from] ability: Effiminate Charm', '[of] ' + source);
				} else if (effect.id === 'lgbtnecklace') {
					this.add('-start', pokemon, 'Attract', '[from] item: LGBT Necklace', '[of] ' + source);
				} else {
					this.add('-start', pokemon, 'Attract');
				}
			},
			onUpdate(pokemon) {
				if (this.effectData.source && !this.effectData.source.isActive && pokemon.volatiles['reverseattract']) {
					this.debug('Removing Reverse Attract volatile on ' + pokemon);
					pokemon.removeVolatile('reverseattract');
				}
			},
			onBeforeMovePriority: 2,
			onBeforeMove(pokemon, target, move) {
				this.add('-activate', pokemon, 'move: Reverse Attract', '[of] ' + this.effectData.source);
				if (this.randomChance(1, 2)) {
					this.add('cant', pokemon, 'Attract');
					return false;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Attract', '[silent]');
			},
	},
	// Weak Trap Custom effect
	weaktrap: {
		noCopy: true,
		duration: 5,
		onStart: function (pokemon) {
			this.add('-start', pokemon, 'Weak Trap', '[silent]');
			this.add('-message', pokemon.name + ' was weakened and trapped!');
		},
		onTrapPokemon: function (pokemon) {
			pokemon.tryTrap();
		},
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk, pokemon) {
			return this.chainModify(0.5);
		},
		onModifyDefPriority: 5,
		onModifyDef: function (def, pokemon) {
			return this.chainModify(0.5);
		},
		onModifySpAPriority: 5,
		onModifySpA: function (spa, pokemon) {
			return this.chainModify(0.5);
		},
		onModifySpe: function (spe, pokemon) {
			return this.chainModify(0.5);
		},
		onModifySpDPriority: 5,
		onModifySpD: function (spd, pokemon) {
			return this.chainModify(0.5);
		},
		onEnd: function (pokemon) {
		this.add('-end', pokemon, 'Weak Trap', '[silent]');
		this.add('-message', pokemon.name + ' is no longer weak-trapped!');
		},
	},
	// Special volatile that is applied to pokemon using a custom move with the effects of baton pass so that boosts/volatiles are shown on client.
	batonpasshelper: {
		duration: 1,
		onSwitchInPriority: 1000,
		onSwitchIn(target) {
			for (let boost in target.boosts) {
				// @ts-ignore Element implictly has type any due to lack of index signature
				if (target.boosts[boost]) this.add('-boost', target, boost, target.boosts[boost], '[silent]');
			}
			for (let v in target.volatiles) {
				if (v !== toID(target.name) && v !== 'batonpasshelper') this.add('-start', target, target.volatiles[v].id);
			}
		},
	},
	
};

exports.BattleStatuses = BattleStatuses;
