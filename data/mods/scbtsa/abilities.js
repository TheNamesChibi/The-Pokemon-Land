'use strict';

/**@type {{[k: string]: ModdedAbilityData}} */
let BattleAbilities = {
	// Zodiac
	energyofpower: {
		shortDesc: "If this Pokemon's Psychic-type moves have their priority increased by 2.",
		onModifyPriority(priority, pokemon, target, move) {
			if (move && move.type === 'Psychic') return priority + 2;
		},
		id: "energyofpower",
		name: "Energy of Power",
		isNonstandard: "Custom",
	},
	// Vixie
	vitality: {
		shortDesc: "Restores 33% of HP during each turn.",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Vitality');
		},
		onResidual: function (pokemon) {
			if (!pokemon.hp) return;
			this.heal(this.modify(pokemon.maxhp, 0.33));
		},
		id: "vitality",
		name: "Vitality",
		isNonstandard: "Custom",
	},
	// Zanna
	sightseer: {
		shortDesc: "This Pokemon can hit Normal types with Ghost-type moves.",
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Ghost'] = true;
			}
		},
		id: "sightseer",
		name: "Sight Seer",
		isNonstandard: "Custom",
	},
	// Shinni
	onpower: {
     shortDesc: "This Pokemon's moves have a 50% chance of rendering the target's Ability.",
		onModifyMovePriority: 90,
		onModifyMove: function (move) {
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 50,
				volatileStatus: 'gastroacid',
			});
		},
		id: "onpower",
		name: "On-Power",
	},
    // Modified Abilities
	// Modified Illusion to support PKLand volatiles
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
				if (this.dex.getTemplate(disguisedAs).exists) disguisedAs += 'user';
				if (pokemon.volatiles[disguisedAs]) {
					pokemon.removeVolatile(disguisedAs);
				}
				if (!pokemon.volatiles[toID(pokemon.name)]) {
					let status = this.dex.getEffect(toID(pokemon.name));
					if (status && status.exists) {
						pokemon.addVolatile(toID(pokemon.name), pokemon);
					}
				}
			}
		},
	},
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
