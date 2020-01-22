'use strict';

/**@type {{[k: string]: ModdedAbilityData}} */
let BattleAbilities = {
	// Kal
	magicalaura: {
		desc: "While this Pokemon is active, the power of Ghost-type moves used by active Pokemon is multiplied by 1.33. This Pokemon can only be damaged by direct attacks.",
		shortDesc: "Any Ghost move used by any Pokemon has 1.33x power. Also Magic Guard.",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Magical Aura');
			this.add('-message', `${pokemon.name} is radiating a magical aura!`);
		},
		onAnyBasePower(basePower, source, target, move) {
			if (target === source || move.category === 'Status' || move.type !== 'Ghost') return;
			if (!move.auraBooster) move.auraBooster = this.effectData.target;
			if (move.auraBooster !== this.effectData.target) return;
			return this.chainModify([move.hasAuraBreak ? 0x0C00 : 0x1547, 0x1000]);
		},
		onDamage(damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				if (effect.effectType === 'Ability') this.add('-activate', source, 'ability: ' + effect.name);
				return false;
			}
		},
		id: "magicalaura",
		name: "Magical aura",
		isNonstandard: "Custom",
	},
	// Willy
	effiminatecharm: {
		desc: "There is a 40% chance a Pokemon making contact with this Pokemon will become infatuated if it is of the same gender.",
		shortDesc: "40% chance of infatuating Pokemon of the same gender if they make contact.",
		onAfterDamage(damage, target, source, move) {
			if (move && move.flags['contact']) {
				if (this.randomChance(4, 10)) {
					source.addVolatile('reverseattract', this.effectData.target);
				}
			}
		},
		id: "effiminatecharm",
		name: "Effiminate Charm",
		isNonstandard: "Custom",
	},
	// Millie
	superpoisonheal: {
		desc: "If this Pokemon is poisoned, it restores 1/2 of its maximum HP, rounded down, at the end of each turn instead of losing HP. This Pokémon's defenses are also doubled.",
		shortDesc: "This Pokemon is healed by 1/2 of its max HP each turn when poisoned; no HP loss.",
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect.id === 'psn' || effect.id === 'tox') {
				this.heal(target.maxhp / 2);
				return false;
			}
		},
		onModifyDefPriority: 6,
		onModifyDef(def) {
			return this.chainModify(2);
		},
		onModifySpdPriority: 6,
		onModifySpd(spd) {
			return this.chainModify(2);
		},
		id: "superpoisonheal",
		name: "Super Poison Heal",
		isNonstandard: "Custom",
	},
	// Joe
	bananaaura: {
		desc: "Has the effects of Magic Guard, Magic Bounce and Infiltrator.",
		shortDesc: "Magic Guard + Magic Bounce + Infiltrator.",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Banana Aura');
			this.add('-message', `${pokemon.name} is radiating a strange aura!`);
		},
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide(target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		effect: {
			duration: 1,
		},
		onDamage(damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				if (effect.effectType === 'Ability') this.add('-activate', source, 'ability: ' + effect.name);
				return false;
			}
		},
		onModifyMove(move) {
			move.infiltrates = true;
		},
		id: "bananaaura",
		name: "Banana Aura",
		isNonstandard: "Custom",
	},
	// Kris
	prismmagic: {
		desc: "When this Pokemon's stat stages are raised or lowered, the effect is doubled instead. This Pokemon can only be damaged by direct attacks.",
		shortDesc: "Simple + Magic Guard",
		onBoost(boost, target, source, effect) {
			if (effect && effect.id === 'zpower') return;
			for (let i in boost) {
				// @ts-ignore
				boost[i] *= 2;
			}
		},
		onDamage(damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				if (effect.effectType === 'Ability') this.add('-activate', source, 'ability: ' + effect.name);
				return false;
			}
		},
		id: "prismmagic",
		name: "Prism Magic",
		isNonstandard: "Custom",
	},
	// Ashttar
	onewingedangel: {
		desc: "If this Pokemon is an Absol, it transforms into Absol-Mega after knocking out a Pokemon. As Absol-Mega, its Dark Hurricane has 160 base power and always hits.",
		shortDesc: "After KOing a Pokemon: becomes Absol-Mega, Dark Hurricane: 160 power, can't miss.",
		onStart(source) {
      		 if (source.template.speciesid !== 'absolmega' || source.illusion) return;
              source.types = ['Dark', 'Flying', 'Fire'];
			  this.add('-start', source, 'typechange', 'Dark/Flying');
			  this.add('-start', source, 'typeadd', 'Fire');
		},
		onSourceFaint(target, source, effect) {
			if (effect && effect.effectType === 'Move' && source.template.speciesid === 'absol' && source.hp && !source.transformed && source.side.foe.pokemonLeft) {
				this.add('-activate', source, 'ability: One-Winged Angel');
				source.formeChange('Absol-Mega', this.effect, true);
			    source.types = ['Dark', 'Flying', 'Fire'];
			    this.add('-start', source, 'typechange', 'Dark/Flying');
			    this.add('-start', source, 'typeadd', 'Fire');
			}
		},
		onModifyMovePriority: -1,
		onModifyMove(move, attacker) {
			if (move.id === 'darkhurricane' && attacker.template.species === 'Absol-Mega') {
				move.accuracy = true;
			}
		},
		id: "onewingedangel",
		name: "One-Winged Angel",
	},
	// Meddy
	superblocker: {
		shortDesc: "This Pokemon is immune to super-effective moves.",
		onTryHit: function (target, source, move) {
			if (target.runEffectiveness(move) == 1) {
				this.add('-immune', target, '[from] ability: Super Blocker');
				return null;
			}
		},
		id: "superblocker",
		name: "Super Blocker",
		isNonstandard: "Custom",
	},	
	// Frances
	therometerboost: {
		id: "therometerboost",
		name: "Therometer Boost",
		desc: "On switch-in, this Pokemon summons Hail and Aurora Veil. Its Ice- and Fire-type attacks have their power doubled.",
		shortDesc: "This Pokemon's Ice and Fire attacks have 2x power; Summons Hail/Aurora Veil.",
		isNonstandard: "Custom",
		onStart(source) {
			this.field.setWeather('hail');
			this.useMove("auroraveil", source);
		},
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (['Fire', 'Ice'].includes(move.type)) {
				this.debug('Therometer Boost boost');
				return this.chainModify(2);
			}
		},
	},
	// Exo
	exoluck: {
		id: "exoluck",
		name: "Exoluck",
		desc: "After being damaged by a Special move, this Pokemon is healed by 33% of its maximum HP. Ignores abilities and Type immunities.",
		shortDesc: "Heal 33% after hit by Special move. Ignores abilities/immunities.",
		onAfterDamage(damage, target, source, effect) {
			if (effect && effect.category === 'Special') {
				this.heal(target.maxhp / 3, target);
			}
		},
		onModifyMove(move) {
			move.ignoreAbility = true;
			move.ignoreImmunity = true;
		},
	},
	// ????
	// ????
	// ????
	// ????
/////////////////////////Making Wonder Guard immune to super-effective moves and Mold Breaker and its variants. Status moves, Miracle Hold, Power Control, Double Dragon, Multi-Breaker and Z-Raider can still hit Alphus.
	wonderguard: {
		inherit: true,
		shortDesc: "This Pokemon can only be damaged by the few moves",
		onTryHit(target, source, move) {
			if (target === source || move.category === 'Status' || move.type === '???' || move.id === 'struggle' || move.id === 'miraclehold' || move.id === 'doubledragon' || move.id === 'zraider' || move.id === 'multibreaker') return;
			this.debug('Wonder Guard immunity: ' + move.id);
			if (target.runEffectiveness(move) <= 0) {
				this.add('-immune', target, '[from] ability: Wonder Guard');
				return null;
			}
			if (target.runEffectiveness(move) == 1) {
				this.add('-immune', target, '[from] ability: Wonder Guard');
				return null;
			}
		},
		isUnbreakable: true,
	},
};

exports.BattleAbilities = BattleAbilities;
