'use strict';

/**@type {{[k: string]: ModdedItemData}} */
let BattleItems = {
	//Gyro
	defenseclaw: {
		id: "defenseclaw",
		name: "Defense Claw",
		isNonstandard: "Custom",
		fling: {
			basePower: 170,
		},
		onModifySpDPriority: 2,
		onModifySpD: function (spd, pokemon) {
			if (pokemon.baseTemplate.species === 'Sandslash') {
				return this.chainModify(2);
			}
		},
		onModifyDefPriority: 2,
		onModifyDef: function (def, pokemon) {
			if (pokemon.baseTemplate.species === 'Sandslash') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Sandslash"],
		desc: "If held by a Sandslash, its Def and Sp. Def are doubled",
		shortDesc: "If held by a Sandslash, its Def and Sp. Def stats are doubled.",
	},
	// ???
	"mysterydisc": {
		id: "mysterydisc",
		name: "Mystery Disc",
		fling: {
			basePower: 80,
		},
		onStart(source) {
			this.field.setTerrain('psychicterrain');
		},
		gen: 7,
		desc: "On switch-in, this item uses Psychic Terrain.",
	},
};

exports.BattleItems = BattleItems;
