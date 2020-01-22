'use strict';

/**@type {{[k: string]: ModdedAbilityData}} */
let BattleAbilities = {
    // Drew
	fossilchange: {
		id: "fossilchange",
		name: "Fossil Change",
		desc: "On switch-in, this Pokemon switches to a different Pokémon.",
		shortDesc: "On switch-in, this Pokemon switches to a different Pokémon.",
		isNonstandard: "Custom",
		onStart(source) {
			let formes = ['arctozolt', 'arctovish', 'dracozolt', 'dracovish'];
			if (formes.includes(toID(source.template.species))) {
				formes.splice(formes.indexOf(toID(source.template.species)), 1);
				this.add('-activate', source, 'ability: Fossil Change');
				source.formeChange(formes[this.random(formes.length)], this.dex.getAbility('fossilchange'), true);
			}
		},
	},
	//Distro
	viletwist: {
		desc: "Summons Pure Darkness upon switching in. This Pokemon is immune to super-effective moves.",
		shortDesc: "SwitchIn: Pure Darkness; Immune to supereffective moves",
		onStart: function (target, source, move) {
			this.field.addPseudoWeather('puredarkness', source);
		},
		onTryHit: function (target, source, move) {
			if (target.runEffectiveness(move) == 1) {
				this.add('-immune', target, '[from] ability: Vile Twist');
				return null;
			}
		},
		id: "viletwist",
		name: "Vile Twist",
		isNonstandard: "Custom",
	},
	// Bulk-Up Man
	earthforce: {
		shortDesc: "On switch-in, this Pokemon avoids all Water and Grass-type attacks.",
		onTryHit: function (target, source, move) {
			if (move.type === 'Water' && !target.activeTurns) {
				this.add('-immune', target, '[from] ability: Earth Force');
				return null;
			}
			if (move.type === 'Grass' && !target.activeTurns) {
				this.add('-immune', target, '[from] ability: Earth Force');
				return null;
			}
		},
		id: "earthforce",
		isNonstandard: "Custom",
		name: "Earth Force",
	},
	// Artie
	blaziate: {
		desc: "This Pokemon's Normal-type moves become Fire-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Fire type and have 1.2x power.",
		onModifyMovePriority: -1,
		onModifyMove(move, pokemon) {
			if (move.type === 'Normal' && !['judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'weatherball'].includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Fire';
				move.blaziateBoosted = true;
			}
		},
		onBasePowerPriority: 8,
		onBasePower(basePower, pokemon, target, move) {
			if (move.blaziateBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		id: "blaziate",
		isNonstandard: "Custom",
		name: "Blaziate",
	},
	// Lynda
	crystalbody: {
		desc: "The Pokémon's crystalized body can take a Special attack as a substitute. The crystals will be restored when it hails.",
		shortDesc: "Pokémon's head functions as substitute for a special attack. Restored in hail.",
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect && effect.effectType === 'Move' && effect.category === 'Special' && target.template.speciesid === 'frosmoth' && !target.transformed) {
				this.add('-activate', target, 'ability: Crystal Body');
				target.addVolatile('crystalbody');
				return 0;
			}
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (move.category !== 'Special' || target.template.speciesid !== 'frosmoth' || target.transformed || (target.volatiles['substitute'] && !(move.flags['authentic'] || move.infiltrates))) return;
			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		effect: {
			onUpdate(pokemon) {
				if (pokemon.template.speciesid === 'frosmoth') {
					pokemon.removeVolatile('crystalbody');
					pokemon.formeChange('Snom', this.effect, true);
				}
			},
		},
		onAnyWeatherStart() {
			const pokemon = this.effectData.target;
			if (this.field.isWeather('hail') && pokemon.template.speciesid === 'snom' && !pokemon.transformed) {
				pokemon.formeChange('Frosmoth', this.effect, true);
			}
		},
		id: "crystalbody",
		isNonstandard: "Custom",
		name: "Crystal Body",
	},
   //Blaze
	destinysfire: {
		desc: "If Sunny Day is active, this Pokemon's Attack is doubled.",
		shortDesc: "If Sunny Day is active, this Pokemon's Attack is doubled.",
		id: "destinysfire",
		name: "Destiny's Fire",
		isNonstandard: "Custom",
		onModifyAtk: function (atk) {
			if (this.field.isWeather(['sunnyday', 'desolateland'])) {
				return this.chainModify(2);
			}
		},
	},
	// Simpson
	purecrystal: {
		desc: "If this Pokemon is a Kyurem, it will transform into either Kyurem-Black before using physical attack or Kyurem-White before using its special attack. After using a move, if this Pokemon was originally in its base forme, it will transform back into Kyurem. Prevents other Pokemon from lowering this Pokemon's stat stages.",
		shortDesc: "Turns into Kyurem-B/Kyurem-W;Stops stats lower.",
		id: "purecrystal",
		name: "Pure Crystal",
		isNonstandard: "Custom",
		onPrepareHit: function (source, target, move) {
			if (!target || !move) return;
			if (source.template.baseSpecies !== 'Kyurem' || source.transformed) return;
			if (target !== source && move.category == 'Physical') {
				source.formeChange('Kyurem-Black', this.effect);
			}
			if (target !== source && move.category == 'Special') {
				source.formeChange('Kyurem-White', this.effect);
			}
		},
		onAfterMove: function (pokemon, move) {
			if (pokemon.template.baseSpecies !== 'Kyurem' || pokemon.transformed) return;
			pokemon.formeChange('Kyurem', this.effect);
		},
		onBoost: function (boost, target, source, effect) {
			if (source && target === source) return;
			let showMsg = false;
			for (let i in boost) {
				// @ts-ignore
				if (boost[i] < 0) {
					// @ts-ignore
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !effect.secondaries) this.add("-fail", target, "unboost", "[from] ability: Pure Crystal", "[of] " + target);
		},
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
	// Kris
	maximization: {
		desc: "This Pokemon had effects of Mold Breaker, Emergency Exit and Regenerator. Blocks super-effective moves. Ignores type immunities.",
		shortDesc: "This Pokemon has many things.",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Maximization');
			this.add('-message', `${pokemon.name} is radiating a mysterious aura!`);
		},
		onModifyMove(move) {
			move.ignoreAbility = true;
			move.ignoreImmunity = true;
		},
		onTryHit: function (target, source, move) {
			if (target.runEffectiveness(move) == 1) {
				this.add('-immune', target, '[from] ability: Maximization');
				return null;
			}
		},
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.maxhp / 3);
		},
		onAfterMoveSecondary(target, source, move) {
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				if (!this.canSwitch(target.side) || target.forceSwitchFlag || target.switchFlag) return;
				target.switchFlag = true;
				source.switchFlag = false;
				this.add('-activate', target, 'ability: Maximization');
			}
		},
		onAfterDamage(damage, target, source, effect) {
			if (!target.hp || effect.effectType === 'Move') return;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				if (!this.canSwitch(target.side) || target.forceSwitchFlag || target.switchFlag) return;
				target.switchFlag = true;
				this.add('-activate', target, 'ability: Maximization');
			}
		},
		id: "maximization",
		name: "Maximization",
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
};

exports.BattleAbilities = BattleAbilities;
