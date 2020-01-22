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
	aqua: {
		noCopy: true,
		onStart(target, source) {
			source.types = ['Water'];
			this.add(`raw|<b>Aqua:</b> Remember me, ladies and gentlemen?`);
		    this.add('-start', source, 'typechange', 'Water');
      			if (source.template.speciesid !== 'mewgmax' || source.illusion) return;
			     source.types = ['Water'];
			     this.add('-start', source, 'typechange', 'Water');
		},
		onSwitchOut() {
			this.add(`raw|<b>Aqua:</b> I'll let my pal to take over me.`);
		},
		onFaint() {
			this.add(`raw|<b>Aqua:</b> Have a nice day.`);
		},
		//Custom G-Max
		onModifyMove(move, pokemon) {
			if (pokemon.volatiles['dynamax']) {
			 if (move.id === 'maxgeyser') {
				move.type = 'Water';
				move.target = 'normal';
				move.name = 'G-Max Aqua\'s Revenge';
				move.accuracy = true;
				move.isMax = "Mew";
				move.flags = {};
				move.priority = 0;
				move.secondary = null;
				move.onPrepareHit = function (target, source) {
			       this.add('-anim', source, 'Surf', target);
			       this.add('-anim', source, 'Steam Eruption', target);
					};
				move.onHit= function (target, source, move) {
			      for (let pokemon of target.side.active) {
				  this.boost({spe: -2, spd: -2}, pokemon, source, move);
		        	}
                this.add(`raw|<b>Aqua:</b> And all the nice water splashed out of nowhere!`);
			   };
			 }
			}
		},
		//Custom Gigantamax
		onUpdate(pokemon) {
			if (pokemon.volatiles['dynamax']) {
				if (pokemon.template.speciesid !== 'mew' || pokemon.illusion) return;
				pokemon.formeChange('Mew-Gmax');
			     pokemon.types = ['Water'];
			     this.add('-start', pokemon, 'typechange', 'Water');
			     pokemon.setAbility('primordialsea');
			}
			if (!pokemon.volatiles['dynamax']) {
				if (pokemon.template.speciesid !== 'mewgmax' || pokemon.illusion) return;
				pokemon.formeChange('Mew');
			     pokemon.types = ['Water'];
			     this.add('-start', pokemon, 'typechange', 'Water');
			     pokemon.setAbility('primordialsea');
			}
		},
	},
	static: {
		noCopy: true,
		onStart() {
			this.add(`raw|<b>Static:</b> Static's the name, power's my game\!`);
		},
		onSwitchOut() {
			this.add(`raw|<b>Static:</b> What a switchout\!`);
		},
		onFaint() {
			this.add(`raw|<b>Static:</b> I'll see you folks later\!`);
		},
	},
	erika: {
		noCopy: true,
		onStart() {
			this.add(`raw|<b>Erika:</b> I wanted to know who you are\!`);
		},
		onSwitchOut() {
			this.add(`raw|<b>Erika:</b> I'm just a little Eevee, sir or madam.`);
		},
		onFaint() {
			this.add(`raw|<b>Erika:</b> I'm very serious that you've offended me.`);
		},
	},
	drew: {
		noCopy: true,
		onStart() {
			this.add(`raw|<b>Drew:</b> Welcome to my world- uh, who the heck are you!?`);
		},
		onSwitchOut() {
			this.add(`raw|<b>Drew:</b> Try to be like that. You're not gonna win anyway...`);
		},
		onFaint() {
			this.add(`raw|<b>Drew:</b> Did you think I spammed you? No I'm not!`);
		},
	},
	dynamo: {
		noCopy: true,
		onStart(pokemon) {
			this.add(`raw|<b>Dynamo:</b> THANKS FOR YOUR CONCERN. Were you offended by what you just saw? Please scroll SLOWLY to the bottom of this page and we will be happy to rectify your situation. =)`);
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
			this.add('-ability', pokemon, 'Delayed Promise');
			this.add('-anim', pokemon, 'Geomancy', pokemon);
			this.add('-anim', pokemon, 'Luster Purge', pokemon);
			this.add('-anim', pokemon, 'Psychic', pokemon);

					activated = true;
				}
            this.damage(target.maxhp / 4, target, pokemon);
			target.clearBoosts();
			this.add('-clearboost', target);
				    this.boost({def: -1}, target, pokemon);
					this.boost({spd: -1}, target, pokemon);
					this.boost({spe: -1}, target, pokemon);
					this.boost({atk: -1}, target, pokemon);
					this.boost({spa: -1}, target, pokemon);
			}
		},
		onSwitchOut() {
			this.add(`raw|<b>Dynamo:</b> Shame on myself, I'll go do it.`);
		},
		onFaint() {
			this.add(`raw|<b>Dynamo:</b> Next time you have a cold, give this page a gander. You can also collect your $25 gift certificate at all Walmart stores near you.`);
		},
	},
	mizzy: {
		noCopy: true,
		onStart(target, source) {
			source.types = ['Fairy', 'Psychic'];
			this.add(`raw|<b>Mizzy:</b> What's up, frosty flakes?`);
		    this.add('-start', source, 'typechange', 'Fairy/Psychic');
		},
		onSwitchOut() {
			this.add(`raw|<b>Mizzy:</b> Be right back, going to the Walmart store.`);
		},
		onFaint() {
			this.add(`raw|<b>Mizzy:</b> Never send a Wigglytuff to that dimension again\!`);
		},
		onSourceModifyDamage: function (damage, source, target, move) {
			if (move.typeMod > 0 && !target.illusion) {
				this.debug('Prism Armor neutralize');
				return this.chainModify(0.75);
     			this.add(`raw|<b>Mizzy:</b> Nothing can stand my Prism Armor power though.`);
			}
		},
	},
	sedna: {
		noCopy: true,
		onStart(source) {
			this.add(`raw|<b>Sedna:</b> Today's logic: Gravity\!`);
			if (source.illusion) return;
			this.field.addPseudoWeather('gravity', source);
		},
		onSwitchOut() {
			this.add(`raw|<b>Sedna:</b> I'm gonna work on a Sky Dance accademy.`);
		},
		onFaint() {
			this.add(`raw|<b>Sedna:</b> And now I'm going home. :(`);
		},
	},
	jason: {
		noCopy: true,
		onStart() {
			this.add(`raw|<b>Jason:</b> I'm looking for Homer Simpson. Do you?`);
		},
		onSwitchOut() {
			this.add(`raw|<b>Jason:</b> Tell me if you found Homer.`);
		},
		onFaint() {
			this.add(`raw|<b>Jason:</b> I guess I'll be sticking to Ned Flanders instead,`);
		},
	},
	distro: {
		noCopy: true,
		onStart(pokemon) {
		let enemy = pokemon.side.foe.name
			this.add(`raw|<b>Distro:</b> Ladies and gentlemen, your attention, please. The name's Distro... The one and only, the brilliant ruler of distruction, Super Distro! Now, this may seem rather... sudden to you, but I've decided I'd like to take over the world! HAHAHAHAHA!!! Ahem... Anyway, to begin. ${enemy}! I'll be taking your precious friends with me!`);
		},
		onSwitchOut() {
			this.add(`raw|<b>Distro:</b> I'll be back!`);
		},
		onFaint(pokemon) {
			let activeMon = toID(pokemon.side.foe.active[0].illusion ? pokemon.side.foe.active[0].illusion.name : pokemon.side.foe.active[0].name);
	     	let enemy = pokemon.side.foe.name
			if (activeMon === 'gary') {
			this.add(`raw|<b>Distro:</b> You've beaten me to it, Gary! I'll surrender!`);
			this.add(`raw|<b>Gary:</b> I didn't mean to hurt you, sir.`);
			} else {
			this.add(`raw|<b>Distro:</b> NOOOOO! You beat me this time, ${enemy}! I can't stand losing to you! What!? You're stronger that I though! Come on, Gary! Let's continue watching this fight!`);
			this.add(`raw|<b>Gary:</b> OK, sir.`);
			}
		},
		onSourceFaint(pokemon) {
			let activeMon = toID(pokemon.side.foe.active[0].illusion ? pokemon.side.foe.active[0].illusion.name : pokemon.side.foe.active[0].name);
			if (activeMon === 'gary') {
			this.add(`raw|<b>Distro:</b> I'm sorry, Gary. I didn't mean to hurt you!`);
			this.add(`raw|<b>Gary:</b> It's OK, sir. Just in a little coma.`);
			}
		},
	},
	gary: {
		noCopy: true,
		onStart(pokemon) {
			let activeMon = toID(pokemon.side.foe.active[0].illusion ? pokemon.side.foe.active[0].illusion.name : pokemon.side.foe.active[0].name);
			if (activeMon === 'distro') {
			this.add(`raw|<b>Distro:</b> Aha! I see what you came, Gary!`);
			this.add(`raw|<b>Gary:</b> I wanted to test our strength, sir.`);
			} else {
            this.add(`raw|<b>Gary:</b> Let's have my own business here.`);
			}
		},
		onSwitchOut() {
			this.add(`raw|<b>Gary:</b> Going to the ice cream palor for a while.`);
		},
		onFaint(pokemon) {
			let activeMon = toID(pokemon.side.foe.active[0].illusion ? pokemon.side.foe.active[0].illusion.name : pokemon.side.foe.active[0].name);
			if (activeMon === 'distro') {
			this.add(`raw|<b>Gary:</b> Sorry, sir. I'm in a little coma here.`);
			} else {
            this.add(`raw|<b>Gary:</b> You just killed me.`);
			}
		},
		onSourceFaint(pokemon) {
			let activeMon = toID(pokemon.side.foe.active[0].illusion ? pokemon.side.foe.active[0].illusion.name : pokemon.side.foe.active[0].name);
			if (activeMon === 'distro') {
			this.add(`raw|<b>Gary:</b> I'm sorry sir. I didn't mean to hurt you.`);
			this.add(`raw|<b>Distro:</b> You feather-brain! Don't you how to avoid mental problems!?`);
			}
		},
	},
	bulkupman: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Bulk-Up Man:</b> Hey you\! Adults only\! Kids don't belong here\!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Bulk-Up Man:</b> You better go there before I got hurt\!`);
		},
		onMoveFail: function () {
			this.add(`raw|<b>Bulk-Up Man:</b> Am I blinded like this?`);
		},
		onFaint: function () {
			this.add(`raw|<b>Bulk-Up Man:</b> You idiot\! What if my brother sees me? He'll be mad at me getting injured like that\!`);
		},
	},
	artie: {
		noCopy: true,
		onStart() {
			this.add(`raw|<b>Artie:</b> Hello and welcome back to Pokémon Showdown. With your host, Artie Magmazoom!`);
		},
		onSwitchOut() {
			this.add(`raw|<b>Artie:</b> We'll be right back after the break!`);
		},
		onFaint() {
			this.add(`raw|<b>Artie:</b> My fight for Pokémon Showdown is over. I'll see you next time, and good night!`);
		},
	},
	max: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|*Plays some bubblegum dance music in a background.*`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Max:</b> Some funny things happen when I use moves.`);
		},
		onFaint: function (source) {
			this.add(`raw|<b>Max:</b> Geez! I'm surrounded by morons!`);
		},
		onModifyDefPriority: 6,
		onModifyDef: function (def, pokemon) {
			if (pokemon.illusion) return;
			if (!pokemon.transformed) {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 6,
		onModifySpD: function (spd, pokemon) {
			if (pokemon.illusion) return;
			if (!pokemon.transformed) {
				return this.chainModify(1.5);
			}
		},
	},
	naru: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Naru:</b> Hi gays - I mean, guys!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Naru:</b> OOOOOOOOOOOOOOOOOHHHHHH NOOOOOOOOOOOOOO!!!`);
		},
	},
	kasandra: {
		noCopy: true,
		onStart() {
			this.add(`raw|<b>Kasandra:</b> Fathers lock your sons, cuz Kasandra's in town\!`);
		},
		onSwitchOut(pokemon) {
			this.add(`raw|<b>Kasandra:</b> My pal will watch you while I'm away.`);
			if (pokemon.m.mirageHP) {
				pokemon.hp = pokemon.m.mirageHP;
				pokemon.m.mirageHP = null;
			}
		},
		onFaint() {
			this.add(`raw|<b>Kasandra:</b> How did you know that I am a impersonator!?`);
		},
		onDamage(damage, pokemon) {
			// Hack for Kasandra's Z move
			if (!pokemon.m.mirageHP) return;
			// Prevent Kasandra from fainting while using a fake mirage to prevent visual bug
			if (pokemon.hp - damage <= 0) return (pokemon.hp - 1);
		},
		onAfterDamage(damage, pokemon) {
			// Hack for Kasandra's Z move
			if (!pokemon.m.mirageHP || pokemon.hp > 1) return;
			// Now we handle the fake mirage "fainting"
			pokemon.hp = pokemon.m.mirageHP;
			pokemon.formeChange(pokemon.baseTemplate.id);
			pokemon.moveSlots = pokemon.moveSlots.slice(0, 4);
			this.add('message', `${pokemon.name}'s mirage was uncovered!`);
			pokemon.m.mirageHP = null;
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		},
	},
	lynda: {
		noCopy: true,
		onStart() {
			this.add(`raw|<b>Lynda:</b> Am I gonna win? Really?`);
		},
		onSwitchOut() {
			this.add(`raw|<b>Lynda:</b> Making freezing pops. Be right back!`);
		},
		onFaint() {
			this.add(`raw|<b>Lynda:</b> I thought it was my nightmare.`);
		},
	},
	bonky: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Bonky:</b> Going bonkers for Bewear, folks?`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Bonky:</b> Where's my Klondike bar, sir or madam?`);
		},
		onFaint: function () {
			this.add(`raw|<b>Bonky:</b> I find this attack DISTURBING!`);
		},
	},
	simmons: {
		noCopy: true,
		onStart() {
			this.add(`raw|<b>Simmons:</b> Immortal fools.`);
		},
		onSwitchOut(source) {
			this.add(`raw|<b>Simmons:</b> Cheers for ${source.side.name}.`);
		},
		onFaint() {
			this.add(`raw|<b>Simmons:</b> Worthless villain!`)
		},
	},
	simpson: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Simpson:</b> It is I, King of Ice Dragons!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Simpson:</b> What kind of monster am I? Am I attacking someone that bad?`);
		},
		onFaint: function () {
			this.add(`raw|<b>Simpson:</b> If you came up with an idea of making a powerful move, you're in for it!`);
		},
	},
	oblivia: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Oblivia:</b> Hi?`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Oblivia:</b> Bye.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Oblivia:</b> I'm no good.`);
		},
	},
	flapjack: {
		noCopy: true,
		onStart() {
			this.add(`raw|<b>Flapjack:</b> Your "Flapplejacking" hasn't just caused you problems. It's over-propelled Wishing Star, practically poisoned plenty of Pokémon, and terrorized bushels of brand-new bouncing baby kitties!`);
		},
		onFaint() {
			this.add(`raw|<b>Flapjack:</b> Ladies and gentlemen, can we talk?`);
		},
		onTryHit(target, source, move) {
			if (target.illusion) return;
			if (target !== source && move.type === 'Ice') {
				if (!this.heal(target.maxhp / 4)) {
					this.add('-immune', target, '[from] ability: Ice Absorb');
				}
				return null;
			}
		},
	},
	// Blaze
	blaze: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Blaze:</b> I have a power of Fire!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Blaze:</b> I'll get rid of any coolness! Just you wait!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Blaze:</b> I'M MELTING!`);
		},
	},
	// Bogie
	bogie: {
		noCopy: true,
		onStart(target, source) {
			let activeMon = toID(source.side.foe.active[0].illusion ? source.side.foe.active[0].illusion.name : source.side.foe.active[0].name);
			let pals = ['artie', 'flapjack', 'lynda', 'simmons', 'gary', 'jason', 'drew', 'willby', 'bullet', 'oscar', 'gizmo', 'puff', 'seraphiman'];
			if (activeMon === 'skyla' || activeMon === 'simpson') {
				 this.add(`raw|<b>Bogie:</b> If I'm was a legendary, I should take you down in one hit. GOT IT, HEROMAKER!?`);
			} else if (activeMon === 'aqua' || activeMon === 'erika' || activeMon === 'static') {
				this.add(`raw|<b>Bogie:</b> I wanted to have a party with you guys!`);
			} else if (pals.includes(activeMon)) {
				this.add(`raw|<b>Bogie:</b> Oh! Hi there! Wanna go for a ride on Motostoke?`);
			} else {
				this.add(`raw|<b>Bogie:</b> It's all in the middle!`);
			}
		},
		onSwitchOut() {
			this.add(`raw|<b>Bogie:</b> Boy, I'm not good with this!`);
		},
		onFaint(pokemon) {
			let activeMon = toID(pokemon.side.foe.active[0].illusion ? pokemon.side.foe.active[0].illusion.name : pokemon.side.foe.active[0].name);
			if (activeMon === 'distro') {
				this.add(`raw|<b>Bogie:</b> Your pal Gary isn't going to be sorry with you!`);
			} else {
                this.add(`raw|<b>Bogie:</b> Screw this! I'm outta here!`);
			}
		},
	},
	// Bullet
	bullet: {
		noCopy: true,
		onStart() {
			this.add(`raw|<b>Bullet:</b> 🎵You got a friend in me!🎵`);
		},
		onSwitchOut() {
			this.add(`raw|<b>Bullet:</b> *Ran outside to hide himself*`);
		},
		onFaint() {
			this.add(`raw|<b>Bullet:</b> *Holds a flag* I surrender!`);
		},
	},
	// Vixie
		vixie: {
		noCopy: true,
		onStart: function (source) {
			this.add(`raw|<b>Vixie:</b> GameStop sells the Pokémon games ever...`);
			this.field.setTerrain('mistyterrain');
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Vixie:</b> Trying to see the screening of <i>Mewtwo Strikes Back EVOLUTION</i> at theaters.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Vixie:</b> I get it! You're trying to win!`);
		},
	},
	// Puff
	puff: {
		noCopy: true,
		onStart(source) {
			source.types = ['Fairy', 'Psychic'];
			this.add(`raw|<b>Puff:</b> I'm cute and fluffy. How about you?`);
			this.add('-start', source, 'typechange', 'Fairy/Psychic');
		},
		onSwitchOut(pokemon) {
			let foe = pokemon.side.foe.active[0];
			this.add(`raw|<b>Puff:</b> Wait, ${foe.name}! I'll go get some flowers for you!`);
		},
		onFaint(pokemon) {
			let activeMon = toID(pokemon.side.foe.active[0].illusion ? pokemon.side.foe.active[0].illusion.name : pokemon.side.foe.active[0].name);
			if (activeMon === 'gizmo') {
			this.add(`raw|<b>Puff:</b> How do I suppose to lose against this weirdo!?`);
			} else {
			this.add(`raw|<b>Puff:</b> That really ticks me off if I were you!`);
			}
		},
		//// Innate Ability: Shed Wool - Instantly clears negative boosts after every turn.
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.activeTurns) {
				this.debug('shed wool');
				this.add('-activate', pokemon, 'ability: Shed Wool');
				let boosts2 = {};
				for (let i in pokemon.boosts2) {
					// @ts-ignore
					if (pokemon.boosts2[i] < 0) {
						boosts2[i] = 0;
					}
				}
				pokemon.setBoost(boosts2);
				this.add('-clearnegativeboost', pokemon, '[silent]');
			}
		},
	},
	// Willby
	willby: {
		noCopy: true,
		onStart() {
			this.add(`raw|<b>Willby:</b> Let's play ball! Beep-beep!`);
		},
		onSwitchOut() {
			this.add(`raw|<b>Willby:</b> Going inside the store! Beep-beep!`);
		},
		onFaint() {
			this.add(`raw|<b>Willby:</b> Rest in peace! Beep-beep!`);
		},
	},
// Kris
	kris: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Kris:</b> Welcome to your grave, suckers!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Kris:</b> What did you think you're doing?`);
		},
		onFaint: function () {
			this.add(`raw|<b>Kris:</b> I don't like being in the middle of the raging fields. Let's go back.`);
		},
      //// Innate Ability: Speed Boost
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.activeTurns) {
				this.boost({spe: 1});
			}
		},
	},
	tara: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Tara:</b> Am I in this place? Oh, sorry. I've couln't forgive you.`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Tara:</b> Have fun and safe.`);
		},
		onFaint: function (pokemon) {
			let foe = pokemon.side.foe.active[0];
			this.add(`raw|<b>Tara:</b> ${foe.name}, you stole my idea.`);
		},
	},
	flippit: {
		noCopy: true,
		onStart: function (pokemon) {
			this.add(`raw|<b>Flippit:</b> ${["I would like to see Mario and Luigi in this place!", "Oy!"][this.random(2)]}`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Flippit:</b> ${["Nore more no-fun-at-all! I'm out of this!", "Randomizer comign through!", "What the heck do I say this?"][this.random(3)]}`);
		},
		onFaint: function () {
			this.add(`raw|<b>Gyro:</b> And boom! I'm gone!`);
		},
      //// Innate Ability: Simple
		onBoost(boost, target, source, effect) {
			if (effect && effect.id === 'zpower') return;
			for (let i in boost) {
				// @ts-ignore
				boost[i] *= 2;
			}
		},  
	},
	jay: {
		noCopy: true,
		onStart: function (source) {
			this.add(`raw|<b>Jay:</b> Tell me to find ${["a screwdriver", "a bucket of popcorn", "remote control", "packs of Pepsi", "a counterfeit dollar"][this.random(5)]} or else I'll damage you!`);
		},
		onSwitchOut: function (pokemon) {
			this.add(`raw|<b>Jay:</b> Also, I live in suburban area and not a Kentucky coal holler. I considered most Kroger stores to be exotic and mysterious.`);
		},
		onMoveFail: function () {
			this.add(`raw|<b>Jay:</b> On fail...`);
		},
		onFaint: function () {
			this.add(`raw|<b>Jay:</b> Almost 2020, folks?`);
		},
	},
	zanna: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Zanna:</b> I'm trying to find my friend Lisa Simpson in this place. She's special!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Zanna:</b> Going to Springfield School. See ya!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Zanna:</b> You're great to win against me!`);
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
// Gizmo
	gizmo: {
		noCopy: true,
		onStart(source) {
			source.types = ['Electric', 'Fairy', 'Steel'];
			this.add(`raw|<b>Gizmo:</b> I always try to count baby weirdos hopping over Lay's Potato Chips into a bowl of Pepsi and Kakunas!`);
			    this.add('-start', source, 'typechange', 'Electric/Fairy');
			    this.add('-start', source, 'typeadd', 'Steel');
      			if (source.template.speciesid !== 'yampergmax' || source.illusion) return;
			     source.types = ['Electric', 'Fairy', 'Steel'];
			    this.add('-start', source, 'typechange', 'Electric/Fairy');
			    this.add('-start', source, 'typeadd', 'Steel');
			//KrisTami shows up randomly.
			if (this.random(300) === 272) this.add(`c|~KrisTami|Your eyes are like bananas and your voice is a shoot-off airplane!`);
		},
		onSwitchOut() {
			this.add(`raw|<b>Gizmo:</b> Tell me I've won the lottery!`);
		},
		onSourceFaint(pokemon) {
			let activeMon = toID(pokemon.side.foe.active[0].illusion ? pokemon.side.foe.active[0].illusion.name : pokemon.side.foe.active[0].name);
			if (activeMon === 'puff') {
			this.add(`raw|<b>Gizmo:</b> *Sees Puff fainting* I think you oughta stick to telling jokes about lunacy, Puff.`);
			this.add(`raw|<b>Puff:</b> Don't tell me, you weirdo!`);
			}
		},
		onFaint(pokemon) {
			let activeMon = toID(pokemon.side.foe.active[0].illusion ? pokemon.side.foe.active[0].illusion.name : pokemon.side.foe.active[0].name);
			if (activeMon === 'aqua') {
			this.add(`raw|<b>Gizmo:</b> A G-Max on your <b>own</b> set?! GREAT GONZO!!`);
			} else if (activeMon === 'seraphiman') {
			this.add(`raw|<b>Gizmo:</b> Seraphi Man! I didn't know you were powerful!`);
			} else {
			this.add(`raw|<b>Gizmo:</b> But I'm a weirdo!`);
			}
		},
		//Custom G-Max
		onModifyMove(move, pokemon) {
			if (pokemon.volatiles['dynamax']) {
			 if (move.id === 'maxlightning') {
				move.type = 'Electric';
				move.target = 'normal';
				move.name = 'G-Max Weirdo\'s Domain';
				move.isMax = "Yamper";
				move.accuracy = true;
				move.flags = {};
				move.priority = 0;
				move.secondary = null;
				move.onPrepareHit = function (target, source) {
			       this.add('-anim', source, 'Wild Charge', target);
			       this.add('-anim', source, 'Volt Tackle', target);
					};
				move.onHit= function (target, source, move) {
			      for (const pokemon of target.side.active) {
				  pokemon.trySetStatus('par', source, move);
				  pokemon.addVolatile('confusion', source, move);
			}
                this.add(`raw|<b>Gizmo:</b> This G-Max move is brought to you by The Weirdo's Domain!`);
			   };
			 }
			}
		},
		//Custom Gigantamax
		onUpdate(pokemon) {
			if (pokemon.volatiles['dynamax']) {
				if (pokemon.template.speciesid !== 'yamper' || pokemon.illusion) return;
				pokemon.formeChange('Yamper-Gmax');
			     pokemon.types = ['Electric', 'Fairy', 'Steel'];
			    this.add('-start', pokemon, 'typechange', 'Electric/Fairy');
			    this.add('-start', pokemon, 'typeadd', 'Steel');
			     pokemon.setAbility('hugepower');
			}
			if (!pokemon.volatiles['dynamax']) {
				if (pokemon.template.speciesid !== 'yampergmax' || pokemon.illusion) return;
				pokemon.formeChange('Yamper');
			     pokemon.types = ['Electric', 'Fairy', 'Steel'];
			    this.add('-start', pokemon, 'typechange', 'Electric/Fairy');
			    this.add('-start', pokemon, 'typeadd', 'Steel');
			     pokemon.setAbility('hugepower');
			}
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
// Oscar
	oscar: {
		noCopy: true,
		onStart: function (pokemon) {
			this.add(`raw|<b>Oscar:</b> Time to get lucky!`);
			this.useMove("focusenergy", pokemon);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Oscar:</b> See ya at Target!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Oscar:</b> I think I will need to concentrate my attacks.`);
		},
      ////Innate Ability: A Great Good Luck - All moves have the high critical hit ratio.
		onModifyMove(move) {
		
			move.critRatio = 2;
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
// Seraphi Man
	seraphiman: {
		noCopy: true,
		onStart: function (pokemon) {
			this.add(`raw|<b>Seraphi Man:</b> Welcome to my world!`);
      			if (pokemon.template.speciesid !== 'eternatuseternamax' || pokemon.illusion) return;
			     pokemon.setAbility('wonderguard');
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Seraphi Man:</b> Fear not, citizen! I'm going somewhere to recover!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Seraphi Man:</b> How is that possible to beat me?`);
		},
	},
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// Custom Effects
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Slow Recharge effect
	slowrecharge: {
		name: 'slowrecharge',
		id: 'slowrecharge',
		duration: 2,
		onBeforeMovePriority: 11,
		onBeforeMove(pokemon) {
			this.add('cant', pokemon, 'recharge');
			pokemon.removeVolatile('slowrecharge');
			pokemon.removeVolatile('truant');
			return null;
		},
		onStart(pokemon) {
			this.add('-recharge', pokemon);
		},
		onLockMove: 'recharge',
	},
	// Lounge Custom effect
	lounge: {
		noCopy: true,
		duration: 2,
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
		duration: 4,
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
	// weight tripling volatile
	weighttripler: {
		noCopy: true,
		onStart(pokemon) {
			this.add('-message', `${pokemon.illusion ? pokemon.illusion.name : pokemon.name}'s weight has tripled.`);
			pokemon.weighthg *= 3;
		},
	},
	// Computer Wiz Change
	computerwizchange: {
		  onModifyMove(move) {
			const allTypes = ['Fire', 'Fighting', 'Water', 'Flying', 'Grass', 'Poison', 'Electric', 'Ground', 'Psychic', 'Rock', 'Ice', 'Bug', 'Dragon', 'Ghost', 'Dark', 'Steel', 'Fairy'];
			const type1 = allTypes[this.random(17)];
			if (move.id === 'extremespeed') {
			move.type = type1;
			}
		},
			onBasePowerPriority: 3,
			onBasePower(basePower, attacker, defender, move) {
				if (move.id === 'extremespeed') {
					this.debug('computer wiz boost');
					return this.chainModify(2);
				}
			},
	},
	// Power Boost
	powerboost: {
			duration: 4,
			durationCallback(target, source, effect) {
				if (source && source.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 6;
				}
				return 4;
			},
			onStart(pokemon) {
			this.add('-activate', pokemon, 'ability: Power Boost');
			this.add('-message', `${pokemon.name}'s team became surrounded by an unseen power!`);
			},
			onModifyAtk(atk, pokemon) {
				return this.chainModify(2);
			},
			onModifySpa(spa, pokemon) {
				return this.chainModify(2);
			},
			onResidualOrder: 21,
			onResidualSubOrder: 4,
			onEnd() {
				this.add('-message', `The unseen power wore off!`);
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
