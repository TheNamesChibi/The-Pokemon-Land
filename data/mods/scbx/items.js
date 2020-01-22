'use strict';

/**@type {{[k: string]: ModdedItemData}} */
let BattleItems = {
	// Willy
	lgbtnecklace: {
		id: "lgbtnecklace",
		name: "LGBT Necklace",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onAttractPriority: -100,
		onAttract(target, source) {
			this.debug('attract intercepted: ' + target + ' from ' + source);
			if (!source || source === target) return;
			if (!source.volatiles.reverseattract) source.addVolatile('reverseattract', target);
		},
		gen: 7,
		desc: "If holder becomes infatuated, the other Pokemon also becomes infatuated.",
	},
	// Kris
	soulorb: {
		id: "soulorb",
		name: "Soul Orb",
		fling: {
			basePower: 30,
		},
		onBasePowerPriority: 6,
		onBasePower(basePower, user, target, move) {
			if (move && (user.baseTemplate.num === 151) && (move.type === 'Psychic')) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		gen: 7,
		itemUser: ["Mew"],
		desc: "If held by a Mew, its Psychic-type moves have 1.2x power.",
	},
	// Opal
	sablenite: {
        inherit: true,
        megaStone: false, // Is no longer a Mega Stone.
		onSwitchIn: function (pokemon) {
			if (pokemon.isActive && pokemon.baseTemplate.species === 'Sableye') {
				this.insertQueue({pokemon: pokemon, choice: 'runPrimal'});
			}
		},
		onPrimal: function (pokemon) {
			pokemon.formeChange('Sableye-Mega', this.effect, true);
		},
		onTakeItem: function (item, source) {
			if (source.baseTemplate.baseSpecies === 'Sableye') return false;
			return true;
		},
		itemUser: ["Sableye"],
		desc: "If held by a Sableye, this item triggers its Primal Reversion in battle.",
	},
};

exports.BattleItems = BattleItems;
