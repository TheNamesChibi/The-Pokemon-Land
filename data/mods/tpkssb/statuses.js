'use strict';

/**@type {{[k: string]: ModdedPureEffectData}} */
let BattleStatuses = {
	/*
	// Example:
	userid: {
		noCopy: true,
		onStart() {
			this.add(`c|+Username|Switch In Message`);
		},
		onSwitchOut() {
			this.add(`c|+Username|Switch Out Message`);
		},
		onFaint() {
			this.add(`c|+Username|Faint Message`);
		},
		// Innate effects go here
	},
	*/
	// Please keep statuses organized alphabetically based on staff member name!
	'jetou': { // No single quotes causes issues
		noCopy: true,
		onStart(pokemon) {
			this.add(`c|+jetou|Time for me to fight.`);
			pokemon.addVolatile('upsheer', pokemon);
		},
		onSwitchOut: function () {
			this.add(`c|+jetou|I'll never lose.`);
		},
		onFaint: function () {
			this.add(`c|+jetou|Good game.`);
		},
	},
	'lionyx': {
		noCopy: true,
		onStart() {
			this.add(`c|+Lionyx|Let's chant for my friend Arendelle!`);
		},
		onSwitchOut() {
			this.add(`c|+Lionyx|I don't get it.`);
		},
		onFaint() {
			this.add(`c|+Lionyx|/me turns away.`);
			this.add(`c|+Lionyx|Don't you ever think about hurting my feelings.`);
		},
	},
	ladymonita: {
		noCopy: true,
		onStart(pokemon) {
			this.add(`c|*Lady Monita|WARNING WARNING`);
			pokemon.addVolatile('startup', pokemon);
		},
		onSwitchOut() {
			this.add(`c|*Lady Monita|SWTICHING TO AN ANOTHER USER`);
		},
		onFaint() {
			this.add(`c|*Lady Monita|YOU HAVE BEEN WARNED`);
		},
	},
	taylor: {
		noCopy: true,
		onStart() {
			this.add(`c|+taylor|Just testing this in Pokémon Showdown.`);
		},
		onFaint() {
			this.add(`c|+taylor|If there's a bug in Pokémon Showdown, tell me.`);
		},
	},
	afkrchastl: {
		noCopy: true,
		onStart() {
			this.add(`c|%aFkRchASTl|whos ready for some fun?`);
		},
		onSwitchOut() {
			this.add(`c|%aFkRchASTl|bye bye see ya later`);
		},
		onFaint() {
			this.add(`c|%aFkRchASTl|whooooot im hot!`);
		},
	},
	lostlink: {
		noCopy: true,
		onStart(pokemon) {
			this.add(`c|+lost-link|o_o`);
			pokemon.addVolatile('specialboost', pokemon);
		},
		onSwitchOut() {
			this.add(`c|+lost-link|-_-`);
		},
		onFaint() {
			this.add(`c|+lost-link|T_T`);
		},
	},
	vexeniv: {
		noCopy: true,
		onStart() {
			this.add(`c|+Vexen IV|oh hey. come on in!`);
		},
		onSwitchOut() {
			this.add(`c|+Vexen IV|i'll bring u somethin ok?`);
		},
		onFaint() {
			this.add(`c|+Vexen IV|oh not right now. i'm not in da mood for this.`);
		},
	},
	zalm: {
		noCopy: true,
		onStart(pokemon) {
			this.add(`c|+Zalm|we all know steamed hams exists.`);
		},
		onSwitchOut() {
			this.add(`c|+Zalm|is ur house on fire?`);
		},
		onFaint() {
			this.add(`c|+Zalm|i just realized the smoke in the house isn't aurora borealis.`);
		},
	},
	darnell: {
		noCopy: true,
		onStart() {
			this.add(`c|@Darnell|:D Hey!`);
		},
		onSwitchOut() {
			this.add(`c|@Darnell|:3 Be right back!`);
		},
		onFaint() {
			this.add(`c|@Darnell|XS Failed!`);
		},
	},
	spydreigon: {
		noCopy: true,
		onStart() {
			this.add(`c|%Spydreigon|Welcome to my world!`);
		},
		onSwitchOut() {
			this.add(`c|%Spydreigon|That's Homer Simpson, one of your ${["boob's", "organ banks", "drones", "carbon blobs", "schmoes", "stiffs", "chair moisteners", "finest, bravest men ever to grace", "low-level employee", "fork and spoon operators"][this.random(10)]} from Sector 7-G.`);
		},
		onFaint() {
			this.add(`c|%Spydreigon|Boo-urns! Boo-urns!`);
		},
	},
	tenshi: {
		noCopy: true,
		onStart() {
			this.add(`c|@Tenshi³|I'm sorry, will you please leave?`);
		},
		onSwitchOut() {
			this.add(`c|@Tenshi³|Who's the heroes when we need them?`);
		},
		onFaint() {
			this.add(`c|@Tenshi³|I'm quite shocked.`);
		},
	},
	kristami: {
		noCopy: true,
		onStart() {
			this.add(`c|~KrisTami|How many licks does it take to get to the Tootsie Roll center of a Tootsie Pop? The world may never know.`);
		},
		onSwitchOut(pokemon) {
			this.add(`c|~KrisTami|A good question. Let's find out, shall we?`);
			if (pokemon.illusion) return;
			// Heals 40% on switch out
			pokemon.heal(pokemon.maxhp * 0.4);
		},
		onFaint() {
			this.add(`c|~KrisTami|Impossible! I ain't never made it without attacking! Just ask ask Mr. Darnell, OK?`);
		},
	},
	bidoferz: {
		noCopy: true,
		onStart() {
			this.add(`c|%bidoferz|Anyone remember seeing __The Lion King__?`);
		},
		onSwitchOut() {
			this.add(`c|%bidoferz|Remember, Hakuna Matata means "No Worries".`);
		},
		onFaint() {
			this.add(`c|%bidoferz|I should prefer a 1994 one instead of the 2019 remake.`);
		},
	},
	blitzamirin: {
		noCopy: true,
		onStart() {
			this.add(`c|+Blitzamirin|KEYBOARDERS ARE FOR LOONIES!`);
		},
		onSwitchOut() {
			this.add(`c|+Blitzamirin|GOT SWAPPED!`);
		},
		onFaint() {
			this.add(`c|+Blitzamirin|GOT WHACKED BY AN ENEMY! THANKS!`);
		},
	},
///////// Ability Innates
	// jetou
	autoboost: {
    effectType: 'Ability',
    name: 'Up Sheer',
		onModifyMove(move) {
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 30,
				self: {
				boosts: {
					atk: 1,
					accuracy: 2,
				},
			},
				ability: this.getAbility('upsheer'),
			});
		},    
	},
	// Lady Monita
	startup: {
    effectType: 'Ability',
    name: 'Startup',
		onStart(target) {
			this.useMove('swordsdance', target);
			this.useMove('agility', target);
			this.useMove('fakeout', target);
		},    
	},
	// lost-link
	specialboost: {
    effectType: 'Ability',
    name: 'Special Boost',
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.activeTurns) {
				this.boost({spa: 1, spd: 1});
			}
		},   
	},
	// Weathers
	starstorm: {
		weatherName: "Star Storm",
		name: 'StarStorm',
		id: 'starstorm',
		effectType: 'Weather',
		duration: 0,
		onEffectiveness(typeMod, target, type, move) {
			if (move && move.effectType === 'Move' && move.category !== 'Status' && typeMod > 0) {
				this.add('message', `The cosmic storm weakened the attack!`);
				return 0;
			}
		},
		onStart(battle, source, effect) {
			this.add('message', `Mysterious cosmic storms are protecting all of the Pokémon!`);
		},
		onResidualOrder: 1,
		onResidual() {
			this.add('message', `The cosmic storm is raging.`);
			this.eachEvent('Weather');
		},
		onEnd() {
			this.add('message', `The cosmic storm have dissipated!`);
		},
	},
};

exports.BattleStatuses = BattleStatuses;
