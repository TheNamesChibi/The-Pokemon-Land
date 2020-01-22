'use strict';

/**@type {{[k: string]: ModdedAbilityData}} */
let BattleAbilities = {
	// Vexen IV
	starstorm: {
		desc: "On switch-in, the weather becomes a cosmic storm that remove the weaknesses of all of the types from ally Pokemon. This weather remains in effect until this Ability is no longer active for any Pokemon, or the weather is changed by Desolate Land, Primordial Sea or Delta Stream.",
		shortDesc: "On switch-in, cosmic storms begin until this Ability is not active in battle.",
		onStart(source) {
			this.field.setWeather('starstorm');
		},
		onAnySetWeather(target, source, weather) {
			if (this.field.getWeather().id === 'starstorm' && !['desolateland', 'primordialsea', 'deltastream', 'starstorm'].includes(weather.id)) return false;
		},
		onEnd(pokemon) {
			if (this.field.weatherData.source !== pokemon) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('starstorm')) {
					this.field.weatherData.source = target;
					return;
				}
			}
			this.field.clearWeather();
		},
		id: "starstorm",
		name: "Star Storm",
		isNonstandard: "Custom",
	},
	// Spydreigon
	bigmentalpower: {
		shortDesc: "This Pokemon's Special Attack is doubled.",
		onModifySpaPriority: 5,
		onModifySpa(spa) {
			return this.chainModify(2);
		},
		id: "bigmentalpower",
		name: "Big Mental Power",
		isNonstandard: "Custom",
	},
	// KrisTami
	holyforce: {
        desc: "No Guard + Magic Guard + Sturdy + Mold Breaker. Restores 33% of HP during each turn. Moongeist Beam, Photon Geyser, Sunsteel Strike, and the Mold Breaker, Teravolt, and Turboblaze Abilities cannot ignore this Ability.",
		shortDesc: "Has most abilities. Restores 33% of HP during each turn.",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Holy Force');
		},
		onTryHit(target, source, move) {
			if (move.ohko) {
				this.add('-immune', pokemon, '[from] ability: Holy Force');
				return null;
			}
		},
		onAnyAccuracy(accuracy, target, source, move) {
			if (move && (source === this.effectData.target || target === this.effectData.target)) {
				return true;
			}
			return accuracy;
		},
		onDamagePriority: -100,
		onDamage(damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add('-ability', target, 'Holy Force');
				return target.hp - 1;
			}
			if (effect.effectType !== 'Move') {
				return false;
			}
		},
        onModifyMove(move) {
			move.ignoreAbility = true;
		},
		onResidual: function (pokemon) {
			if (!pokemon.hp) return;
			this.heal(this.modify(pokemon.maxhp, 0.33));
		},
		id: "holyforce",
		name: "Holy Force",
		isUnbreakable: true,
		isNonstandard: "Custom",
	},
	// bidoferz
	exhaustedpressure: {
		desc: "If this Pokemon is the target of an opposing Pokemon's move, that move loses five additional PP.",
		shortDesc: "If this Pokemon is the target of a foe's move, that move loses five additional PP.",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Exhausted Pressure');
			this.add('message', `${pokemon.name} is exerting its pressure!`);
		},
		onDeductPP(target, source) {
			if (target.side === source.side) return;
			return 5;
		},
		id: "exhaustedpressure",
		name: "Exhausted Pressure",
		isNonstandard: "Custom",
	},
    // Modified Abilities
	// Modified Illusion to support volatiles
	illusion: {
		inherit: true,
		onEnd(pokemon) {
			if (pokemon.illusion) {
				this.debug('illusion cleared');
				let disguisedAs = toID(pokemon.illusion.name);
				pokemon.illusion = null;
				let details = pokemon.template.species + (pokemon.level === 100 ? '' : ', L' + pokemon.level) + (pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
				this.add('replace', pokemon, details);
				this.add('-end', pokemon, 'Illusion');
				// Handle hippopotas
				if (this.getTemplate(disguisedAs).exists) disguisedAs += 'user';
				if (pokemon.volatiles[disguisedAs]) {
					pokemon.removeVolatile(disguisedAs);
				}
				if (!pokemon.volatiles[toID(pokemon.name)]) {
					let status = this.getEffect(toID(pokemon.name));
					if (status && status.exists) {
						pokemon.addVolatile(toID(pokemon.name), pokemon);
					}
				}
			}
		},
	},
};

exports.BattleAbilities = BattleAbilities;
