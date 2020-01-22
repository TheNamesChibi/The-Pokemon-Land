'use strict';

/**@type {{[k: string]: ModdedEffectData}} */
let BattleStatuses = {
	amida: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Amida:</b> What's the hurry?`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Amida:</b> Let me have something to drink, OK?`);
		},
		onFaint: function () {
			this.add(`raw|<b>Amida:</b> What a luck!`);
		},
	},
	haze: {
		noCopy: true,
		onStart: function (pokemon) {
			this.add(`raw|<b>Haze:</b> Hi. I really want you something.`);
			pokemon.addVolatile('autoboost', pokemon);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Haze:</b> Be right back in the second.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Haze:</b> I'm very proud of your supreme powers.`);
		},
	},
	aqua: {
		noCopy: true,
		onStart: function (target, source) {
			source.types = ['Water'];
			this.add(`raw|<b>Aqua:</b> Remember me, ladies and gentlemen?`);
		    this.add('-start', source, 'typechange', 'Water');
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Aqua:</b> I'll let my pal to take over me.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Aqua:</b> Have a nice day.`);
		},
	},
	dynamo: {
		noCopy: true,
		onStart: function (pokemon) {
			this.add(`raw|<b>Dynamo:</b> THANKS FOR YOUR CONCERN. Were you offended by what you just saw? Please scroll SLOWLY to the bottom of this page and we will be happy to rectify your situation. =)`);
			pokemon.addVolatile('delayedpromise', pokemon);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Dynamo:</b> Shame on myself, I'll go do it.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Dynamo:</b> Next time you have a cold, give this page a gander. You can also collect your $25 gift certificate at all Walmart stores near you.`);
		},
	},
	mizzy: {
		noCopy: true,
		onStart: function (target, source) {
			source.types = ['Fairy', 'Psychic'];
			this.add(`raw|<b>Mizzy:</b> What's up, frosty flakes?`);
		    this.add('-start', source, 'typechange', 'Fairy/Psychic');
		    source.addVolatile('prismarmorinnate', source);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Mizzy:</b> Be right back, going to the Walmart store.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Mizzy:</b> Never send a Wigglytuff to that dimension again\!`);
		},
	},
	sedna: {
		noCopy: true,
		onStart: function (source) {
			this.add(`raw|<b>Sedna:</b> Today's logic: Gravity\!`);
			source.addVolatile('gravitationalfield', source);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Sedna:</b> I'm gonna work on a Sky Dance accademy.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Sedna:</b> And now I'm going home. :(`);
		},
	},
	zodiac: {
		noCopy: true,
		onStart: function (source) {
			this.add(`raw|<b>Zodiac:</b> Me and my big mouth!!`);
			source.addVolatile('psychicaura', source);
			if (source.illusion) return;
			this.boost({spa: 1}, source);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Zodiac:</b> Listen here, bully! I'm not in the mood for this!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Sedna:</b> I said to quit making fun of me, but you won't listen!`);
		},
	},
		vixie: {
		noCopy: true,
		onStart: function (source) {
			this.add(`raw|<b>Vixie:</b> GameStop sells the Pokémon games ever...`);
			source.addVolatile('mistysurgeinnate', source);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Vixie:</b> Trying to see the screening of <i>Mewtwo Strikes Back EVOLUTION</i> at theaters.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Vixie:</b> I get it! You're trying to win!`);
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
	naru: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Naru:</b> Hi gays - I mean, guys!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Naru:</b> OOOOOOOOOOOOOOOOOHHHHHH NOOOOOOOOOOOOOO!!!`);
		},
	},
	arthur: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Arthur:</b> Anyone seen Iggy?`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Arthur:</b> I wanted to find out about what I done to myself.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Arthur:</b> Seriously?`);
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
	gyro: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Gyro:</b> Yo, ladies and gentlemen! Gyro's back y'all!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Gyro:</b> Watchin' a Butterfinger commercial.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Gyro:</b> I hope you’re happy!`);
		},
	},
	flippit: {
		noCopy: true,
		onStart: function (pokemon) {
			this.add(`raw|<b>Flippit:</b> ${["I would like to see Mario and Luigi in this place!", "Oy!"][this.random(2)]}`);
			pokemon.addVolatile('simpleinnate', pokemon);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Flippit:</b> ${["Nore more no-fun-at-all! I'm out of this!", "Randomizer comign through!", "What the heck do I say this?"][this.random(3)]}`);
		},
		onFaint: function () {
			this.add(`raw|<b>Gyro:</b> And boom! I'm gone!`);
		},
	},
	jill: {
		noCopy: true,
		onStart: function (pokemon) {
			this.add(`raw|<b>Jill:</b> Hi there!`);
			pokemon.addVolatile('supercute', pokemon);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Jill:</b> Don't worry, I'll be bringing you a new friend to play!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Jill:</b> Why do I have to tell you?`);
		},
	},
	shinni: {
		noCopy: true,
		onStart: function (source) {
			this.add(`raw|<b>Shinni:</b> Tell me what you want me. I'll be happy.`);
		},
		onSwitchOut: function (pokemon) {
			this.add(`raw|<b>Shinni:</b> Considering Togepis to become legendary is a fun thing to do.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Shinni:</b> And the meme goes on!`);
		},
	},
	alphus: {
		noCopy: true,
		onStart: function (source) {
			this.add(`raw|<b>Alphus:</b> Tell me to find ${["a screwdriver", "a bucket of popcorn", "remote control", "packs of Pepsi", "a counterfeit dollar"][this.random(5)]} or else I'll damage you!`);
		},
		onSwitchOut: function (pokemon) {
			this.add(`raw|<b>Alphus:</b> Also, I live in suburban area and not a Kentucky coal holler. I considered most Kroger stores to be exotic and mysterious.`);
		},
		onMoveFail: function () {
			this.add(`raw|<b>Alphus:</b> On fail...`);
		},
		onFaint: function () {
			this.add(`raw|<b>Alphus:</b> Almost 2020, folks?`);
		},
	},
///////// Ability Innates
	// Haze
	autoboost: {
    effectType: 'Ability',
    name: 'Auto Boost',
		onStart: function (target, source) {
			this.add('-ability', source, 'Auto Boost');
			this.add('message', `${source.name} is performing an automatic boost!`);
		},
		onModifyMove(move) {
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 100,
				self: {
				boosts: {
					atk: 2,
					spe: 2,
				},
			},
				ability: this.getAbility('autoboost'),
			});
		},    
	},
	// Dynamo
	delayedpromise: {
    effectType: 'Ability',
    name: 'Delayed Promise',
		onStart: function (pokemon) {
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
	},

	// Mizzy
	prismarmorinnate: {
    effectType: 'Ability',
    name: 'Prism Armor',
	onSourceModifyDamage: function (damage, source, target, move) {
			if (move.typeMod > 0 && !target.illusion) {
				this.add('-ability', source, 'Prism Armor');
				this.debug('Prism Armor neutralize');
				return this.chainModify(0.75);
     			this.add(`raw|<b>Mizzy:</b> Nothing can stand my Prism Armor power though.`);
			}
		},
	},
	
	// Sedna
	gravitationalfield: {
    effectType: 'Ability',
    name: 'Gravitational Field',
		onStart: function (source) {
			this.add('-ability', source, 'Gravitational Field');
			this.field.addPseudoWeather('gravity', source);
		},
	},
	
	// Zodiac
	psychicaura: {
    effectType: 'Ability',
    name: 'Psychic Aura',
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Psychic Aura');
			this.add('-message', `${pokemon.name} is radiating a psychic aura!`);
		},
		onAnyBasePower(basePower, source, target, move) {
			if (target === source || move.category === 'Status' || move.type !== 'Psychic') return;
			if (!move.auraBooster) move.auraBooster = this.effectData.target;
			if (move.auraBooster !== this.effectData.target) return;
			return this.chainModify([move.hasAuraBreak ? 0x0C00 : 0x1547, 0x1000]);
		},
		isUnbreakable: true,
	},
	
	// Vixie
	mistysurgeinnate: {
    effectType: 'Ability',
    name: 'Misty Surge',
		onStart(source) {
			this.field.setTerrain('mistyterrain');
		},
	},
	
	// Tara
	mysticeye: {
    effectType: 'Ability',
    name: 'Mystic Eye',
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Psychic'] = true;
			}
		},
	},
	
	// Zanna
	scrappyinnate: {
    effectType: 'Ability',
    name: 'Scrappy',
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Fighting'] = true;
				move.ignoreImmunity['Normal'] = true;
			}
		},
	},
	
	// Gyro
	superblocker: {
    effectType: 'Ability',
    name: 'Super Blocker',
		onTryHit: function (target, source, move) {
			if (target.runEffectiveness(move) == 1) {
				this.add('-immune', target, '[from] ability: Super Blocker');
				return null;
			}
		},
	},
	// Flippit
	simpleinnate: {
    effectType: 'Ability',
    name: 'Simple',
		onBoost(boost, target, source, effect) {
			if (effect && effect.id === 'zpower') return;
			for (let i in boost) {
				// @ts-ignore
				boost[i] *= 2;
			}
		},  
	},
	// Jill
	supercute: {
    effectType: 'Ability',
    name: 'Super Cute!',
		onModifyAtk: function () {
			return this.chainModify(2);
		},
		onModifySpA: function () {
			return this.chainModify(2);
		},
		onModifySpe: function () {
			return this.chainModify(3);
		},
		onAfterDamage: function (damage, target, source, effect) {
				this.add('-ability', target, 'Super Cute!');
				this.boost({atk: 1, spa: 1, spe: 1}, target, effect);
				if (source.name === 'Jill') this.add(`raw|<b>Jill:</b> Don't come to me!`);
		}, 
	},
	// Alphus
	forcepower: {
		effectType: 'Ability',
		onStart: function (target, source) {
			this.add('-ability', source, 'Force Power');
			this.add('-anim', source, 'Geomancy', source);
			this.add('-anim', source, 'Extreme Evoboost', source);
			this.add('-message', source.name + " powers up its Special Moves to the limit!");
		},
		onModifySpA: function () {
			return this.chainModify(3);
		},
	},
/////// Custom Effects
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
	// Lovesick Custom effect for Loretta and Roger
	lovesick: {
		duration: 5,
		onStart: function (pokemon, source) {
			if (!this.runEvent('Attract', pokemon, source)) {
				this.debug('Attract event failed');
				return false;
			}
			this.add('-start', pokemon, 'Attract', '[from] ability: Cute Body', '[of] ' + source);
			this.add('-message', pokemon.name + ' became lovesick!');
		},
		onBeforeMovePriority: 2,
		onBeforeMove: function (pokemon) {
			this.add('-activate', pokemon, 'move: Attract', '[of] ' + this.effectData.source);
			if (this.randomChance(1, 2)) {
				this.add('cant', pokemon, 'Attract');
				return false;
			}
		},
		onTrapPokemon: function (pokemon) {
			pokemon.tryTrap();
		},
			onResidualOrder: 8,
			onResidual: function (pokemon) {
				let target = this.effectData.source.side.active[pokemon.volatiles['lovesick'].sourcePosition];
				if (!target || target.fainted || target.hp <= 0) {
					this.debug('Nothing to attract into');
					return;
				}
				let damage = this.damage(pokemon.maxhp / 5, pokemon, target);
				if (damage) {
					this.heal(damage, target, pokemon);
				}
			},
		onEnd: function (pokemon) {
		this.add('-end', pokemon, 'Attract', '[silent]');
		this.add('-message', pokemon.name + ' is cured of lovesickness!');
		},
	},
	// Power Shield Effect
	powershield: {
            duration: 3,
			onStart: function (target) {
				this.add('-start', target, 'Power Shield', '[silent]');
				this.add('-message', `${target.name} is protected with Power Shield.`);
			},
			onTryHitPriority: 3,
			onTryHit: function (target, source, move) {
				if (move.id === 'doubledragon') return;
				this.add('-activate', target, 'move: Power Shield');
				let lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				return null;
			},
			onEnd: function (target) {
				this.add('-end', target, 'Power Shield', '[silent]');
				this.add('-message', `${target.name}'s Power Shield has ended.`);
			},
	  },
	// Prevents glitch out from running more than once per turn per pokemon & boosts base power. From SSB.
	glitchout: {
		duration: 1,
		onTryHit: function (target, source, move) {
			if (move.basePower) {
				move.basePower += 20;
				this.debug('glitch out base power boost');
			}
		},
	},
	// Future Move modified to add Heaven's Wrath
	futuremove: {
		// this is a slot condition
		name: 'futuremove',
		id: 'futuremove',
		num: 0,
		duration: 3,
		onResidualOrder: 3,
		onEnd(target) {
			const data = this.effectData;
			// time's up; time to hit! :D
			const move = this.getMove(data.move);
			if (target.fainted || target === data.source) {
				this.hint(`${move.name} did not hit because the target is ${(data.fainted ? 'fainted' : 'the user')}.`);
				return;
			}

           if (move.id === 'heavenswrath') {
            this.add('-message', `${target.name} took a Heaven's Wrath attack!`);
           } else {
			this.add('-end', target, 'move: ' + move.name);
			 }
			target.removeVolatile('Protect');
			target.removeVolatile('Endure');

			if (data.source.hasAbility('infiltrator') && this.gen >= 6) {
				data.moveData.infiltrates = true;
			}
			if (data.source.hasAbility('normalize') && this.gen >= 6) {
				data.moveData.type = 'Normal';
			}
			if (data.source.hasAbility('adaptability') && this.gen >= 6) {
				data.moveData.stab = 2;
			}
			const hitMove = new this.Data.Move(data.moveData);

			this.trySpreadMoveHit([target], data.source, /** @type {ActiveMove} */(/** @type {unknown} */(hitMove)));
		},
	},
	// Modified type setup for arceus and silvally
	arceus: {
		inherit: true,
		onType: function (types, pokemon) {
		if (pokemon.transformed) return types;
		/** @type {string | undefined} */
		let type = 'Normal';
		if (pokemon.ability === 'coloraura') {
			type = pokemon.getItem().onPlate;
			if (!type) {
				type = 'Normal';
			}
		}
		return [type];
		},
	},
	silvally: {
		inherit: true,
		onType: function (types, pokemon) {
		if (pokemon.transformed) return types;
		/** @type {string | undefined} */
		let type = 'Normal';
		if (pokemon.ability === 'rkssystem') {
			type = pokemon.getItem().onMemory;
			if (!type) {
				type = 'Normal';
			}
		}
		return [type];
		},
	},
};

exports.BattleStatuses = BattleStatuses;
