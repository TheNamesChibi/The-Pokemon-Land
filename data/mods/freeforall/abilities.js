'use strict';

/**@type {{[k: string]: ModdedAbilityData}} */
let BattleAbilities = {
	/*
	// Example
	"abilityid": {
		desc: "", // long description
		shortDesc: "", // short description, shows up in /dt
		id: "abilityid",
		name: "Ability Name",
		// The bulk of an ability is not easily shown in an example since it varies
		// For more examples, see https://github.com/Zarel/Pokemon-Showdown/blob/master/data/abilities.js
	},
	*/
	powercharge: {
		desc: "Maximizes Attack if hit by an Electric-type move. Immune to Electric-type moves.",
		id: "powercharge",
		name: "Power Charge",
		isNonstandard: "Custom",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				if (!this.boost({atk: 18})) {
					this.add('-immune', target, '[from] ability: Power Charge');
				}
				return null;
			}
		},
	},
	eyeshaveit: {
		desc: "When an another Pokemon faints, this Pokémon sharply boosts its Accuracy stat.",
		id: "eyeshaveit",
		name: "Eyes Have It",
		isNonstandard: "Custom",
		onAnyFaint() {
			this.boost({accuracy: 2}, this.effectData.target);
		},
	},
	vanishedbody: {
		desc: "This Pokemon's evasiveness is multiplied by 1.25",
		id: "vanishedbody",
		name: "Vanished Body",
		isNonstandard: "Custom",
		onModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
				return accuracy * 0.8;
		},
	},
	powerrain: {
		desc: "If Rain Dance is active, this Pokemon's Attack is multiplied by 1.5 and it loses 1/8 of its maximum HP, rounded down, at the end of each turn.",
		shortDesc: "If Rain Dance is active, this Pokemon's Atk is 1.5x; loses 1/8 max HP per turn.",
		id: "powerrain",
		name: "Power Rain",
		isNonstandard: "Custom",
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (this.field.isWeather(['raindance', 'primordialsea'])) {
				return this.chainModify(1.5);
			}
		},
		onWeather(target, source, effect) {
			if (effect.id === 'raindance' || effect.id === 'primordialsea') {
				this.damage(target.maxhp / 8, target, target);
			}
		},
	},
	divineshield: {
		shortDesc: "This Pokemon can only be damaged by a few moves.",
		onTryHit(target, source, move) {
			if (target === source || move.id === 'wondersword') return;
			this.debug('Divine Shield immunity: ' + move.id);
			if (target.runEffectiveness(move) <= 0) {
				this.add('-immune', target, '[from] ability: Divine Shield');
				return null;
			}
            if (target.runEffectiveness(move) == 1) {
				this.add('-immune', target, '[from] ability: Divine Shield');
				return null;
			}
		},
		onDamage(damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				return false;
			}
		},
		id: "divineshield",
		name: "Divine Shield",
		isNonstandard: "Custom",
		isUnbreakable: true,
	},
	fullpower: {
		desc: "Any move that requires a two-turn can be completed in one turn.",
		id: "fullpower",
		name: "Full Power",
		isNonstandard: "Custom",
		onChargeMove(pokemon, target, move) {
				this.debug('full power - remove charge turn for ' + move.id);
				this.attrLastMove('[still]');
				this.addMove('-anim', pokemon, move.name, target);
				return false; // skip charge turn
		},
	},
	burningtouch: {
		shortDesc: "This Pokemon's contact moves have a 30% chance of burning.",
		onModifyMove(move) {
			if (!move || !move.flags['contact'] || move.target === 'self') return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 30,
				status: 'brn',
				ability: this.dex.getAbility('burningtouch'),
			});
		},
		id: "burningtouch",
		name: "Burning touch",
		isNonstandard: "Custom",
	},
	ultrasonic: {
		shortDesc: "This Pokemon's sound moves have their priority increased by 3.",
		onModifyPriority(priority, pokemon, target, move) {
			if (move && move.flags['sound']) return priority + 3;
		},
		id: "ultrasonic",
		name: "Ultrasonic",
		isNonstandard: "Custom",
	},
	sinisterabsorb: {
		desc: "This Pokemon is immune to Dark-type moves and restores 1/4 of its maximum HP, rounded down, when hit by a Dark-type move.",
		shortDesc: "This Pokemon heals 1/4 of its max HP when hit by Dark moves; Dark immunity.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Dark') {
				if (!this.heal(target.maxhp / 4)) {
					this.add('-immune', target, '[from] ability: Sinister Absorb');
				}
				return null;
			}
		},
		id: "sinisterabsorb",
		name: "Sinister Absorb",
		isNonstandard: "Custom",
	},
};

exports.BattleAbilities = BattleAbilities;
