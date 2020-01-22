'use strict';

/**@type {{[k: string]: ModdedFormatsData}} */
let BattleFormats = {
	/*freeforallpokemon: {
		effectType: 'ValidatorRule',
		name: 'Free-For-All Pokemon',
		desc: "Applies the unlimitations of pokemon with illegal move/ability validation.",
		onChangeSet(set, format) {
			let item = this.dex.getItem(set.item);
			let template = this.dex.getTemplate(set.species);
			let problems = [];
			let totalEV = 0;
			let allowCAP = !!(format && this.dex.getRuleTable(format).has('allowcap'));

			if (set.species === set.name) delete set.name;
			if (template.gen > this.gen) {
				problems.push(set.species + ' does not exist in gen ' + this.gen + '.');
			}
			if (template.gen && template.gen !== this.gen && template.tier === 'Illegal') {
				problems.push(set.species + ' does not exist outside of gen ' + template.gen + '.');
			}
			/**@type {Ability} */
			// @ts-ignore
			/*let ability = {};
			if (set.ability) {
				ability = this.dex.getAbility(set.ability);
				if (ability.gen > this.gen) {
					problems.push(ability.name + ' does not exist in gen ' + this.gen + '.');
				}
			}
			if (set.moves) {
				for (const moveid of set.moves) {
					let move = this.dex.getMove(moveid);
					if (move.gen > this.gen) {
						problems.push(move.name + ' does not exist in gen ' + this.gen + '.');
					} else if (!allowCAP && move.isNonstandard) {
						problems.push(move.name + ' does not exist.');
					}
				}
			}
			if (item.gen > this.gen) {
				problems.push(item.name + ' does not exist in gen ' + this.gen + '.');
			}
			if (set.moves && set.moves.length > 4) {
				problems.push((set.name || set.species) + ' has more than four moves.');
			}
			if (set.level && set.level > 100) {
				problems.push((set.name || set.species) + ' is higher than level 100.');
			}

			if (!allowCAP || !template.tier.startsWith('CAP')) {
				if (template.isNonstandard && template.num > -5000) {
					problems.push(set.species + ' does not exist.');
				}
			}

			if (!allowCAP && ability.isNonstandard) {
				problems.push(ability.name + ' does not exist.');
			}

			if (item.isNonstandard) {
				if (item.isNonstandard === 'Past' || item.isNonstandard === 'Future') {
					problems.push(item.name + ' does not exist in this generation.');
				} else if (!allowCAP) {
					problems.push(item.name + ' does not exist.');
				}
			}

			if (set.evs) {
				for (let k in set.evs) {
					// @ts-ignore
					if (typeof set.evs[k] !== 'number' || set.evs[k] < 0) {
						// @ts-ignore
						set.evs[k] = 0;
					}
					// @ts-ignore
					totalEV += set.evs[k];
				}
			}

			return problems;
		},
	},*/
smithersnameclause: {
		effectType: 'ValidatorRule',
		name: 'Smithers Name Clause',
		desc: "Prevents Waylon Smithers from having a nickname.",
		onBegin() {
			this.add('rule', 'Smithers Name Clause: Waylon Smithers cannot be nicknamed.');
		},
		onValidateTeam(team, format) {
			let problems = [];
			for (const set of team) {
		    	if (set.species === 'Waylon Smithers' && set.name) {
		    		problems.push(`${set.species} cannot be nicknamed.`);
		    	}
			}
			return problems;
		},
	},
};

exports.BattleFormats = BattleFormats;
