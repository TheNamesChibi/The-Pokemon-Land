'use strict';

/**@type {{[k: string]: ModdedEffectData}} */
let BattleStatuses = {
	//////////////////////// Custom effects from PKSSB
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
	// Illusion Burst Effect
	illusionmode: {
		noCopy: true,
		onStart: function (target) {
				this.add('-start', target, 'Illusion Mode', '[silent]');
		},
		onSwitchOut: function (pokemon) {
			// @ts-ignore Hack
		    if (pokemon.illusionHP) delete pokemon.illusionHP;
		},
		onDamage: function (damage, pokemon) {
			// @ts-ignore Hack
			if (!pokemon.illusionHP) return;
			// Prevent a Pokemon from fainting to prevent visual bug
			if (pokemon.hp - damage <= 0) return (pokemon.hp - 1);
		},
		onAfterDamage: function (damage, pokemon) {
			pokemon.removeVolatile('illusionmode');
			// @ts-ignore Hack for a move
			if (!pokemon.illusionHP || pokemon.hp > 1) return;
			// Now we handle the "fainting"
			// @ts-ignore Hack
			pokemon.hp = pokemon.illusionHP;
			pokemon.formeChange(pokemon.baseTemplate.id);
			this.add('message', `${pokemon.name}'s illusion was uncovered!`);
			// @ts-ignore Hack
			    let resetMove = pokemon.baseMoveSlots;
			    pokemon.moveSlots = [];
				for (const [i, moveid] of resetMove.entries()) {
					let move = this.dex.getMove(moveid);
					if (!move.id) continue;
					pokemon.moveSlots.push({
						move: move.name,
						id: move.id,
						pp: Math.floor(((move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5) * (pokemon.ppPercentages ? pokemon.ppPercentages[i] : 1)),
						maxpp: ((move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5),
						target: move.target,
						disabled: false,
						used: true,
						virtual: true,
					});
					pokemon.moves.push(move.id);
				}
			delete pokemon.illusionHP;
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		},
	},
};

exports.BattleStatuses = BattleStatuses;
