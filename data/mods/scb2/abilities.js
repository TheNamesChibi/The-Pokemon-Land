'use strict';

/**@type {{[k: string]: ModdedAbilityData}} */
let BattleAbilities = {
	// Kyle
	desertcactus: {
		desc: "On switch-in, this Pokemon summons Sandstorm. If Sandstorm is active, this Pokemon restores 1/16 of its maximum HP, rounded down, at the end of each turn. This Pokemon takes no damage from Sandstorm.",
		shortDesc: "Summons Sandstorm; If Sanstorm is active, this Pokemon heals 1/16 of its max HP each turn.",
		onStart: function (source) {
			this.field.setWeather('sandstorm');
		},
		onWeather: function (target, source, effect) {
			if (effect.id === 'sandstorm') {
				this.heal(target.maxhp / 16);
			}
		},
		onImmunity: function (type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		id: "desertcactus",
		name: "Desert Cactus",
		isNonstandard: "Custom",
	},
	// Serene Star
	snowpower: {
		desc: "On switch-in, this Pokemon summons Hail. If Hail is active, its Attack is doubled.",
		shortDesc: "If Hail is active, this Pokemon's Attack is doubled.",
		onStart: function (source) {
			this.field.setWeather('hail');
		},
		onModifyAtk: function (atk, pokemon) {
			if (this.field.isWeather('hail')) {
				return this.chainModify(2);
			}
		},
		id: "snowpower",
		name: "Snow Power!",
		isNonstandard: "Custom",
	},	
// Felix
	luckynumberseven: {
		shortDesc: "This Pokemon's moves have their accuracy doubled.",
		onSourceModifyAccuracy: function (accuracy) {
			if (typeof accuracy !== 'number') return;
			this.debug('enhancing accuracy');
			return accuracy * 2;
		},
		id: "luckynumberseven",
		name: "Lucky Number Seven",
		isNonstandard: "Custom",
	},	
	// Nappa
	heroswill: {
		desc: "If this Pokemon is a Gallade, it will transform into Mega Gallade before using a physical or special attack. After using the attack, if this Pokemon was originally in its base forme, it will transform back into Gallade.",
		shortDesc: "Transforms into Mega Gallade before attacking, then reverts to a Gallade.",
		id: "heroswill",
		name: "Hero's Will",
		isNonstandard: "Custom",
		onPrepareHit: function (source, target, move) {
			if (!target || !move) return;
			if (source.template.baseSpecies !== 'Gallade' || source.transformed) return;
			if (target !== source && move.category !== 'Status') {
				source.formeChange('Gallade-Mega', this.effect);
			}
		},
		onAfterMove: function (pokemon, move) {
			if (pokemon.template.baseSpecies !== 'Gallade' || pokemon.transformed) return;
			pokemon.formeChange('Gallade', this.effect);
		},
	},
  	// Skyla
	psychicshield: {
		desc: "This Pokemon cannot be afficted with status conditions, Taunt and Attract and prevents other Pokemon from lowering this Pokemon's stat stages.",
		shortDesc: "Prevent stats lowered; protects statuses.",
		id: "psychicshield",
		name: "Psychic Shield",
		isNonstandard: "Custom",
		onUpdate: function (pokemon) {
			if (pokemon.volatiles['attract']) {
				this.add('-activate', pokemon, 'ability: Psychic Shield');
				pokemon.removeVolatile('attract');
				this.add('-end', pokemon, 'move: Attract', '[from] ability: Psychic Shield');
			}
			if (pokemon.volatiles['taunt']) {
				this.add('-activate', pokemon, 'ability: Psychic Shield');
				pokemon.removeVolatile('taunt');
				// Taunt's volatile already sends the -end message when removed
			}
		},
		onImmunity: function (type, pokemon) {
			if (type === 'attract') return false;
		},
		onTryHit: function (pokemon, target, move) {
			if (move.id === 'attract' || move.id === 'captivate' || move.id === 'taunt') {
				this.add('-immune', pokemon, '[from] ability: Psychic Shield');
				return null;
			}
		},
		onSetStatus: function (status, target, source, effect) {
				if (effect && effect.status) this.add('-immune', target, '[from] ability: Psychic Shield');
				return false;
		},
		onTryAddVolatile: function (status, target) {
			if (status.id === 'yawn') {
				this.add('-immune', target, '[from] ability: Psychic Shield');
				return null;
			}
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
			if (showMsg && !effect.secondaries) this.add("-fail", target, "unboost", "[from] ability: Psychic Shield", "[of] " + target);
		},
	},
  // Kris Tami
  	chaosinnation: {
		desc: "On switch-in, this Pokemon harshly lowers the Defense, Special Defense and Speed of adjacent opposing Pokemon by 2 stages. Pokemon behind a substitute are immune.",
		shortDesc: "On switch-in, this Pokemon harshly lowers Def, SpD and Spe of opponents by 2 stages.",
		onStart: function (pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Chaos Innation', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({def: -2}, target, pokemon);
					this.boost({spd: -2}, target, pokemon);
					this.boost({spe: -2}, target, pokemon);
				}
			}
		},
		id: "chaosinnation",
		name: "Chaos Innation",
		isNonstandard: "Custom",
	},
	// Crystal
	mistyguard: {
		desc: "As it switches in, this Pokemon summons Mist.",
		shortDesc: "On switch-in, this Pokemon Summons Mist.",
		id: "mistyguard",
		name: "Misty Guard",
		isNonstandard: "Custom",
		onStart: function (pokemon) {
			pokemon.side.addSideCondition('mist');
		},
	},
	// Shade Master
	dimensionalchange: {
		desc: "If this Pokemon is a Giratina, it changes to an Origin Forme before attempting to use an attacking move, and changes to Alternate Forme before attempting to use Recover.",
		shortDesc: "If Giratina, changes Forme to Origin before attacks and Alternate before Recover.",
		id: "dimensionalchange",
		name: "Dimensional Change",
		isNonstandard: "Custom",
		onBeforeMovePriority: 0.5,
		onBeforeMove: function (attacker, defender, move) {
			if (attacker.template.baseSpecies !== 'Giratina' || attacker.transformed) return;
			if (move.category === 'Status' && move.id !== 'recover') return;
			let targetSpecies = (move.id === 'recover' ? 'Giratina' : 'Giratina-Origin');
			if (attacker.template.species !== targetSpecies) attacker.formeChange(targetSpecies);
		},
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
	// Forte
	quickstart: {
		desc: "As this Pokemon switches in, its Attack and Speed are doubled for 5 turns. After five turns have passed, these effects are removed.",
		shortDesc: "On switch-in, this Pokemon's Attack and Speed are doubled for 5 turns.",
		id: "quickstart",
		name: "Quick Start",
		isNonstandard: "Custom",
		onStart: function (pokemon) {
			pokemon.addVolatile('quickstart');
		},
		onEnd: function (pokemon) {
			delete pokemon.volatiles['quickstart'];
			this.add('-end', pokemon, 'Quick Start', '[silent]');
		},
		effect: {
			duration: 5,
			onStart: function (pokemon) {
				this.add('-activate', pokemon, 'ability: Quick Start');
				this.add('-start', pokemon, 'Quick Start', '[silent]');
				this.add('-message', `${pokemon.name} can get it going.`);
			},
			onModifyAtkPriority: 5,
			onModifyAtk: function (atk, pokemon) {
				return this.chainModify(2);
			},
			onModifySpe: function (spe, pokemon) {
				return this.chainModify(2);
			},
			onEnd: function (pokemon) {
				this.add('-end', pokemon, 'Quick Start', '[silent]');
				this.add('-message', `${pokemon.name}'s Quick Start has ended.`);
			},
		},
	},
	// White
	instantvictory: {
		desc: "Has a %5 chance to forcibly give the user's trainer the win upon hitting the target.",
		shortDesc: "%5 chance to win.",
		onModifyMove: function (move) {
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 5,
		    onHit: function (target, source) {
            this.win(source.side);
			}
			});
		},
		id: "instantvictory",
		name: "Instant Victory",
		isNonstandard: "Custom",
	},
	// Lorica
	frosttouch: {
		shortDesc: "30% chance a Pokemon making contact with this Pokemon will be frozen.",
		onAfterDamage: function (damage, target, source, move) {
			if (move && move.flags['contact']) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('frz', target);
				}
			}
		},
		isNonstandard: "Custom",
		id: "frosttouch",
		name: "Frost Touch",
	},
	// Alphus
	shockpuppet: {
		desc: "If this Pokemon is a Ninjask, the first hit it takes in battle deals 0 neutral damage. Its disguise is then broken, and it transforms into a Shedinja. Confusion damage also breaks the disguise. Moongeist Beam, Sunsteel Strike, and the Mold Breaker, Teravolt, and Turboblaze Abilities cannot ignore this Ability.",
		shortDesc: "Ninjask: the first hit it takes in battle deals 0 damage.",
		id: "shockpuppet",
		name: "Shock Puppet",
		isNonstandard: "Custom",
		onDamagePriority: 1,
		onDamage: function (damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				return false;
			}
			if (effect && effect.effectType === 'Move' && target.template.speciesid === 'ninjask' && !target.transformed) {
				this.add('-activate', target, 'ability: Shock Puppet');
				this.effectData.busted = true;
				return 0;
			}
		},
		onEffectiveness: function (typeMod, target, type, move) {
			if (!target) return;
			if (target.template.speciesid !== 'ninjask' || target.transformed || (target.volatiles['substitute'] && !(move.flags['authentic'] || move.infiltrates))) return;
			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate: function (pokemon) {
			if (pokemon.template.speciesid === 'ninjask' && this.effectData.busted) {
				let templateid = 'Shedinja';
				pokemon.formeChange(templateid, this.effect, true);
				this.add('-message', `${pokemon.name || pokemon.species}'s true identity was revealed!`);
				pokemon.setAbility('Wonder Guard');
				this.add('-message', `${pokemon.name || pokemon.species} now has a Wonder Guard!`);
			}
		},
	isUnbreakable: true,
	},
	// Lyrica
	aurorasurge: {
		desc: "On switch-in, this Pokemon summons Aurora Terrain.",
		shortDesc: "On switch-in, this Pokemon summons Aurora Terrain.",
		id: "aurorasurge",
		name: "Aurora Surge",
		isNonstandard: "Custom",
		onStart: function () {
			this.field.setTerrain('auroraterrain');
		},
	},
	// Gyl
	fireaura: {
		desc: "While this Pokemon is active, the power of Fire-type moves used by active Pokemon is multiplied by 1.33.",
		shortDesc: "While this Pokemon is active, a Fire move used by any Pokemon has 1.33x power.",
		onStart: function (pokemon) {
			this.add('-ability', pokemon, 'Fire Aura');
			this.add('-message', `${pokemon.name} is radiating a fire aura!`);
		},
		onAnyBasePower: function (basePower, source, target, move) {
			if (target === source || move.category === 'Status' || move.type !== 'Fire') return;
			if (!move.auraBooster) move.auraBooster = this.effectData.target;
			if (move.auraBooster !== this.effectData.target) return;
			return this.chainModify([move.hasAuraBreak ? 0x0C00 : 0x1547, 0x1000]);
		},
		isUnbreakable: true,
		isNonstandard: "Custom",
		id: "fireaura",
		name: "Fire Aura",
	},
	// Jady
	extremethickfat: {
		desc: "If a Pokemon uses a Fire- or Ice-type attack against this Pokemon, that Pokemon's attacking stat is weaken severely when calculating the damage to this Pokemon.",
		shortDesc: "Fire/Ice-type moves against this Pokemon deal damage with a severely weakened attacking stat.",
		onModifyAtkPriority: 6,
		onSourceModifyAtk: function (atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Extreme Thick Fat weaken');
				return this.chainModify(0.1);
			}
		},
		onModifySpAPriority: 5,
		onSourceModifySpA: function (atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Extreme Thick Fat weaken');
				return this.chainModify(0.1);
			}
		},
		id: "extremethickfat",
		name: "Extreme Thick Fat",
		isNonstandard: "Custom",
	},
	// Waylon
	dragonsedge: {
		shortDesc: "This Pokemon is immune to super-effective moves.",
		onTryHit: function (target, source, move) {
			if (target.runEffectiveness(move) == 1) {
				this.add('-immune', target, '[from] ability: Dragon\'s Edge');
				return null;
			}
		},
		id: "dragonsedge",
		name: "Dragon's Edge",
		isNonstandard: "Custom",
	},	
	// Zig
	voltshocker: {
		desc: "This Pokemon's Normal-type moves become Electric-type moves and have their power multiplied by 1.2. In addition, this Pokemon is immune to Electric-type moves and raises its Speed by 2 stages when hit by an Electric-type move.",
		shortDesc: "Normal-type moves become Electric with 1.2x power; Electric hits raises speed by 2.",
		onModifyMovePriority: -1,
		onModifyMove: function (move, pokemon) {
			if (move.type === 'Normal' && !['judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'weatherball'].includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Electric';
				move.galvanizeBoosted = true;
			}
		},
		onBasePowerPriority: 8,
		onBasePower: function (basePower, pokemon, target, move) {
			if (move.galvanizeBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Electric') {
				if (!this.boost({spe: 2})) {
					this.add('-immune', target, '[from] ability: Volt Shocker');
				}
				return null;
			}
		},
		id: "voltshocker",
		name: "Volt Shocker",
		isNonstandard: "Custom",
	},	
	// Poppy Seed
	weakbinder: {
		desc: "Raises Accuracy and Evasion by 2 stages if this Pokemon is hit by a super-effective move.",
		shortDesc: "Raises Accuracy and Evasion by 2 stages when hit by supereffective moves.",
		id: "weakbinder",
		name: "Weak Binder",
		isNonstandard: "Custom",
		onHit: function (target, source, move) {
			if (target.hp && move.category !== 'Status' && !move.damage && !move.damageCallback && move.typeMod > 0) {
				this.boost({accuracy: 2, evasion: 2});
			}
		},
	},
	// Mirica
	staraura: {
		shortDesc: "This Pokemon's Special Attack ann Special Defense are doubled. This Pokemon is immune to super-effective moves.",
		onTryHit: function (target, source, move) {
			if (target.runEffectiveness(move) == 1) {
				this.add('-immune', target, '[from] ability: Star Aura');
				return null;
			}
		},
		onModifySpAPriority: 6,
		onModifySpA: function (spa) {
			return this.chainModify(2);
		},
		onModifySpDPriority: 6,
		onModifySpD: function (spd) {
			return this.chainModify(2);
		},
		id: "staraura",
		name: "Star Aura",
		isNonstandard: "Custom",
	},	
	//Montgomery
	burningheal: {
		desc: "If this Pokemon is burned, it restores 1/8 of its maximum HP, rounded down, at the end of each turn instead of losing HP.",
		shortDesc: "This Pokemon is healed by 1/8 of its max HP each turn when burned; no HP loss.",
		onDamagePriority: 1,
		onDamage: function (damage, target, source, effect) {
			if (effect.id === 'brn') {
				this.heal(target.maxhp / 8);
				return false;
			}
		},
		id: "burningheal",
		name: "Burning Heal",
		isNonstandard: "Custom",
	},
	//Loretta and Roger
	cutebody: {
		desc: "There is a 30% chance a Pokemon making contact with this Pokemon will become afflicted with a \"love-sick\" status, which infatuates, paralyzes, confuses, and traps the target for five turns. The user steals 1/5 of the target's maximum HP, rounded down, at the end of each turn. If Big Root is held by the recipient, the HP recovered is 1.3x normal, rounded half down. If the target uses Baton Pass, the replacement will be afflicted with a lovesick status.",
		shortDesc: "30% chance of Pokemon getting \"love-sick\" if they make contact.",
		onAfterDamage: function (damage, target, source, move) {
			if (move && move.flags['contact']) {
				if (this.randomChance(3, 10)) {
					source.addVolatile('lovesick', this.effectData.target);
					source.addVolatile('confusion', this.effectData.target);
					source.trySetStatus('par', target);
				}
			}
		},
		id: "cutebody",
		name: "Cute Body",
		isNonstandard: "Custom",
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
	// Bink
	hugefist: {
		desc: "This Pokemon's Attack is doubled. This Pokemon's punch-based attacks have their power multiplied by 1.2.",
		shortDesc: "Huge Power + Iron Fist",
		id: "hugefist",
		name: "Huge Fist",
		isNonstandard: "Custom",
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk) {
			return this.chainModify(2);
		},
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.debug('Huge Fist boost');
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	// Lyoko
	survivalist: {
		desc: "If this Pokemon is at full HP, it survives one hit with at least 1 HP. OHKO moves fail when used against this Pokemon. This Pokemon has a 40% chance to have its HP fully healed at the end of each turn.",
		shortDesc: "User survives one hit with at least 1 HP. Immune to OHKO. %40: HP restored.",
		id: "survivalist",
		name: "Survivalist",
		isNonstandard: "Custom",
		onTryHit: function (pokemon, target, move) {
			if (move.ohko) {
				this.add('-immune', pokemon, '[from] ability: Survivalist');
				return null;
			}
		},
		onDamagePriority: -100,
		onDamage: function (damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add('-ability', target, 'Survivalist');
				return target.hp - 1;
			}
		},
		onResidualOrder: 5,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.hp && pokemon.status && this.randomChance(4, 10)) {
				this.debug('hp recovery max activated');
				this.add('-activate', pokemon, 'ability: HP Recovery MAX');
				pokemon.heal(pokemon.maxhp);
				this.add('-message', `${pokemon.name} restored its HP by using its HP using HP Recovery MAX!`);
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
	//Pupeye
	exposedpower: {
		desc: "If this Pokemon used its one-time held item, its Attack, Defense, Special Attack, Special Defense, and Speed are raised by 12 stages. These boosts are lost if it switches out.",
		shortDesc: "All stats (not acc/eva) raised 12 stages on item use.",
		id: "exposedpower",
		name: "Exposed Power",
		isNonstandard: "Custom",
		onAfterUseItem: function (item, pokemon) {
			if (pokemon !== this.effectData.target) return;
			this.boost({atk: 12, def: 12, spa: 12, spd: 12, spe: 12}, pokemon);
		},
	},
	//Boomer
	amplifier: {
		desc: "This Pokemon's sound-based attacks have their power multiplied by 1.2.",
		shortDesc: "This Pokemon's sound-based attacks have 1.2x power.",
		id: "amplifier",
		name: "Amplifier",
		isNonstandard: "Custom",
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.flags['sound']) {
				this.debug('Amplifier boost');
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	//Maggie 64
	faintevasion: {
		id: "faintevasion",
		name: "Faint Evasion",
		desc: "Uses Substitute, raises the user's Evasion by 12 stages and activates Faint Evasion on switch-in. Also prevents other Pokemon from lowering this Pokemon's evasion stat stage.",
		shortDesc: "Substitute, raises evasion by 12, Faint Evasion on switch-in.",
		isNonstandard: "Custom",
		onStart: function (pokemon, target) {
            let move = this.dex.getActiveMove('substitute');
			this.useMove(move, pokemon, target);
            this.boost({evasion: 12}, pokemon);
            pokemon.addVolatile('faintevasion');
	        },
		onEnd: function (pokemon) {
			delete pokemon.volatiles['faintevasion'];
			this.add('-end', pokemon, 'Faint Evasion', '[silent]');
		},
		onBoost: function (boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.evasion && boost.evasion < 0) {
				delete boost.evasion;
				if (!effect.secondaries) this.add("-fail", target, "unboost", "evasion", "[from] ability: Faint Evasion", "[of] " + target);
			}
		},
		effect: {
			duration: 5,
			onStart: function (pokemon) {
				this.add('-activate', pokemon, 'ability: Faint Evasion');
				this.add('-start', pokemon, 'Faint Evasion', '[silent]');
				this.add('-message', `${pokemon.name} increases the likehood of evading all attacks.`);
			},
		onModifyAccuracy: function (accuracy) {
			if (typeof accuracy !== 'number') return;
             return accuracy * 0.8;
	   	},
			onEnd: function (pokemon) {
				this.add('-end', pokemon, 'Faint Evasion', '[silent]');
				this.add('-message', `${pokemon.name}'s Faint Evasion wore off.`);
			},
		},
	},
	//Silvereye
	puresilver: {
		id: "puresilver",
		name: "Pure Silver",
		desc: "This Pokemon cannot be afficted with status conditions. On switch-in, all the boosts on both sides are cleared. When this Pokemon's stat stages are raised or lowered, the effect is doubled instead.",
		shortDesc: "No status; Switch-in: Boosts cleared + Simple.",
		isNonstandard: "Custom",
		onStart: function (source) {
			this.add('-clearallboost');
			for (const side of this.sides) {
				for (const pokemon of side.active) {
					if (pokemon && pokemon.isActive) pokemon.clearBoosts();
				}
			}
		},
		onSetStatus: function (status, target, source, effect) {
				if (effect && effect.status) this.add('-immune', target, '[from] ability: Pure Silver');
				return false;
		},
		onTryAddVolatile: function (status, target) {
			if (status.id === 'yawn') {
				this.add('-immune', target, '[from] ability: Pure Silver');
				return null;
			}
		},
		onBoost: function (boost, target, source, effect) {
			if (effect && effect.id === 'zpower') return;
			for (let i in boost) {
				// @ts-ignore
				boost[i] *= 2;
			}
		},
	},
	//Nigel
	aquaticdomain: {
		id: "aquaticdomain",
		name: "Aquatic Domain",
		desc: "Primordial Sea + Hydration + Rain Dish + Swift Swim",
		shortDesc: "Primordial Sea + Hydration + Rain Dish + Swift Swim",
		isNonstandard: "Custom",
		onStart(source) {
			this.field.setWeather('primordialsea');
		},
		onAnySetWeather(target, source, weather) {
			if (this.field.getWeather().id === 'primordialsea' && !['desolateland', 'primordialsea', 'deltastream'].includes(weather.id)) return false;
		},
		onEnd(pokemon) {
			if (this.field.weatherData.source !== pokemon) return;
			for (const side of this.sides) {
				for (const target of side.active) {
					if (target === pokemon) continue;
					if (target && target.hp && target.hasAbility('aquaticdomain')) {
						this.field.weatherData.source = target;
						return;
					}
				}
			}
			this.field.clearWeather();
		},
		onResidualOrder: 5,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.status && this.field.isWeather(['raindance', 'primordialsea'])) {
				this.debug('hydration');
				this.add('-activate', pokemon, 'ability: Aquatic Domain');
				pokemon.cureStatus();
			}
		},
		onWeather(target, source, effect) {
			if (effect.id === 'raindance' || effect.id === 'primordialsea') {
				this.heal(target.maxhp / 8);
			}
		},
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather(['raindance', 'primordialsea'])) {
				return this.chainModify(2);
			}
		},
	},
	//Riana
	magicassemble: {
		id: "magicassemble",
		name: "Magic Assemble",
		desc: "Misty Terrain + Fairy Aura + Magic Bounce + Magic Guard",
		shortDesc: "Misty Terrain + Fairy Aura + Magic Bounce + Magic Guard",
		isNonstandard: "Custom",
		onStart(pokemon) {
            this.add('-ability', pokemon, 'Magic Assemble');
			this.add('-message', `${pokemon.name} is radiating a magical aura!`);
			this.field.setTerrain('mistyterrain');
		},
		onAnyBasePower(basePower, source, target, move) {
			if (target === source || move.category === 'Status' || move.type !== 'Fairy') return;
			if (!move.auraBooster) move.auraBooster = this.effectData.target;
			if (move.auraBooster !== this.effectData.target) return;
			return this.chainModify([move.hasAuraBreak ? 0x0C00 : 0x1547, 0x1000]);
		},
		onDamage(damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				return false;
			}
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
	},
	//Gerald
	fierydomain: {
		id: "fierydomain",
		name: "Fiery Domain",
		shortDesc: "Desolate Land + Huge Power",
		isNonstandard: "Custom",
		onStart(source) {
			this.field.setWeather('desolateland');
		},
		onAnySetWeather(target, source, weather) {
			if (this.field.getWeather().id === 'desolateland' && !['desolateland', 'primordialsea', 'deltastream'].includes(weather.id)) return false;
		},
		onEnd(pokemon) {
			if (this.field.weatherData.source !== pokemon) return;
			for (const target of this.dex.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('desolateland')) {
					this.field.weatherData.source = target;
					return;
				}
			}
			this.field.clearWeather();
		},
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk) {
				return this.chainModify(2);
		},
	},
	//Danon
	luckybody: {
		desc: "This Pokémon's HP is fully restored when another Pokemon faints.",
		shortDesc: "This Pokémon's HP is fully restored when another Pokemon faints.",
		onAnyFaintPriority: 1,
		onAnyFaint(pokemon) {
			this.heal(pokemon.maxhp);
		},
		id: "luckybody",
		name: "Lucky Body",
		isNonstandard: "Custom",
	},
	//Millennium
	coloraura: {
		desc: "If this Pokemon is an Arceus, its type changes to match its held Plate, Jewel or Z-Crystal, and it is immune to Normal and same-type moves.",
		shortDesc: "Arceus: type matches held Plate, Jewel or Z-Crystal; immunity to Normal and its own type.",
		// Color Aura's type-changing itself is implemented in statuses.js
		id: "coloraura",
		name: "Color Aura",
		isNonstandard: "Custom",
		onTryHit: function (target, source, move) {
			let plateType = this.dex.getItem(target.item).onPlate;
			if (target !== source && (move.type === 'Normal' || plateType === move.type)) {
				this.add('-immune', target, '[from] ability: Color Aura');
				return null;
			}
		}
	},
	// Zatch
	prismpower: {
		desc: "This Pokemon's attacks that are super effective against the target do 1.25x damage. This Pokemon receives 3/4 damage from supereffective attacks. Moongeist Beam, Sunsteel Strike, and the Mold Breaker, Teravolt, and Turboblaze Abilities cannot ignore this Ability.",
		shortDesc: "3/4 damage from supereffectives; Boosts user's supereffective damage.",
		onModifyDamage: function (damage, source, target, move) {
			if (move && move.typeMod > 0) {
				return this.chainModify([0x1400, 0x1000]);
			}
		},
		onSourceModifyDamage: function (damage, source, target, move) {
			if (move.typeMod > 0) {
				this.debug('Prism Armor neutralize');
				return this.chainModify(0.75);
			}
		},
		isUnbreakable: true,
		id: "prismpower",
		name: "Prism Power",
		isNonstandard: "Custom",
	},
	// Omega Sheron
	overdrive: {
		desc: "This Pokemon's moves and their effects ignore the Abilities of other Pokemon. This Pokémon resists any type of move, including ones it is weak to. This Pokemon restores 1/2 of its maximum HP, rounded down, when it switches out. Moongeist Beam, Sunsteel Strike, and the Mold Breaker, Teravolt, and Turboblaze Abilities cannot ignore this Ability.",
		shortDesc: "Has many things.",
		onStart: function (pokemon) {
			this.add('-ability', pokemon, 'Overdrive');
			this.add('-message', `${pokemon.name}'s powers are surging in its aura!`);
		},
		onModifyMove: function (move) {
			move.ignoreAbility = true;
		},
		onSwitchOut: function (pokemon) {
			pokemon.heal(pokemon.maxhp / 2);
		},
		onEffectiveness: function (typeMod, target) {
			return -1;
		},
		isUnbreakable: true,
		id: "overdrive",
		name: "Overdrive",
		isNonstandard: "Custom",
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
