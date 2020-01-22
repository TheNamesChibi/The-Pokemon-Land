'use strict';

/**@type {{[k: string]: ModdedEffectData}} */
let BattleStatuses = {
	static: { // No single quotes causes issues
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Static:</b> Static's the name, power's my game\!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Static:</b> What a switchout\!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Static:</b> I'll see you folks later\!`);
		},
	},
	erika: { // No single quotes causes issues
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Erika:</b> I wanted to know who you are\!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Erika:</b> I'm just a little Eevee, sir or madam.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Erika:</b> I'm very serious that you've offended me.`);
		},
	},
	aqua: {
		noCopy: true,
		onStart: function (target, source) {
			source.types = ['Water'];
			this.add(`raw|<b>Aqua:</b> Remember me, ladies and gentlemen?`);
		    this.add('-start', source, 'typechange', 'Water');
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Aqua:</b> I'll let my pal to take over me.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Aqua:</b> Have a nice day.`);
		},
	},
	mizzy: {
		noCopy: true,
		onStart: function (target, source) {
			source.types = ['Fairy', 'Psychic'];
			this.add(`raw|<b>Mizzy:</b> What's up, frosty flakes?`);
		    this.add('-start', source, 'typechange', 'Fairy/Psychic');
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Mizzy:</b> Be right back, going to the Walmart store.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Mizzy:</b> Never send a Wigglytuff to that dimension again\!`);
		},
		onSourceModifyDamage: function (damage, source, target, move) {
			if (move.typeMod > 0 && !target.illusion) {
				this.debug('Prism Armor neutralize');
				return this.chainModify(0.75);
     			this.add(`raw|<b>Mizzy:</b> Nothing can stand my Prism Armor power though.`);
			}
		},
	},
	zena: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Zena:</b> Did you call me out?`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Zena:</b> I'm made of 60 percent of cells\!`);
		},
		onFaint: function (pokemon) {
			let activeMon = pokemon.side.foe.active[0].template.speciesid;
			if (activeMon === 'mew') {
				this.add(`raw|<b>Zena:</b> You're going to miss me Aqua, cuz I QUIT\!`);
				this.add(`raw|<b>Aqua:</b> You can quit all ya want to! XD`);
			} else if (activeMon === 'victini') {
				this.add(`raw|<b>Zena:</b> When I see that guy, I think of a white Victini\!`);
			} else {
				this.add(`raw|<b>Zena:</b> Have a great good-bye\!`);
			}
		},
	},
	kyle: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Kyle:</b> I'll show you\!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Kyle:</b> Too hard for me to stop\!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Kyle:</b> We should play that again sometime\!`);
		},
	},
	serenestar: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Serene Star:</b> The world's famous admin of the Messies is here\!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Serene Star:</b> I have to go to the bathroom.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Serene Star:</b> Not your average ice master.`);
		},
	},
	goby: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Goby:</b> My underwear is made of bologna\!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Goby:</b> Time to go loco\!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Goby:</b> I'm happy and I'm proud\!`);
		},
	},
	thehound: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>The Hound:</b> Release The Hound!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>The Hound:</b> This one stinks. I'm switching to something nice!`);
		},
		onFaint: function () {
			this.add(`raw|<b>The Hound:</b> I'm ruined! Who are you people!?`);
		},
	},
	felix: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Felix:</b> Felix the Meowth! The Wondeful Wonderful Meowth\!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Felix:</b> Come to think of it, I don't even know if I could get back there myself.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Felix:</b> Righty-O\!`);
		},
	},
	chuck: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Chuck:</b> I didn't do much fight in here anyway...`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Chuck:</b> I'll check out my pals.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Chuck:</b> How is this possible?`);
		},
	},
	abby: {
		noCopy: true,
		onStart: function (target, source) {
			this.add(`raw|<b>Abby:</b> Bangin' on a trash can, drummin' on a street light...`);
      			if (source.template.speciesid !== 'altariamega' || source.illusion) return;
			     source.types = ['Dragon', 'Fairy', 'Water'];
			     this.add('-start', source, 'typeadd', 'Water');
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Abby:</b> To avoid music damage, I have to switch my banjo to a keyboard\!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Abby:</b> OK, I'll stop playing music\!`);
		},
	},
	nappa: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Nappa:</b> I, for one, welcome our new Fighting-type overlords\!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Nappa:</b> We'll be back in a moment, so stay tuned\!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Nappa:</b> And that's for today's news.`);
		},
	},
	gidget: {
		noCopy: true,
		onStart: function (target) {
			this.add(`raw|<b>Gidget:</b> Go-Go Gidget Transform\!`);
			if (target.illusion) return;

			/** @type {{[forme: string]: string[]}} */
			let formes = {
				'Blastoise': ['Flamethrower', 'Ice Beam', 'Earth Power', 'Gidget Blast'],
				'Charizard': ['Seed Flare', 'Wing Attack', 'Earthquake', 'Gidget Blast'],
				'Venusaur': ['Water Spout', 'Sludge Bomb', 'Moonblast', 'Gidget Blast'],
				'Feraligatr': ['Ice Beam', 'Crunch', 'Meteor Mash', 'Gidget Blast'],
				'Typhlosion': ['Psychic Fangs', 'Solar Beam', 'Sunny Day', 'Gidget Blast'],
				'Meganium': ['Thunderbolt', 'Ancient Power', 'Earthquake', 'Gidget Blast'],
				'Swampert': ['Gunk Shot', 'Hammer Arm', 'Ice Punch', 'Gidget Blast'],
				'Blaziken': ['Shadow Sneak', 'Close Combat', 'Thunder Punch', 'Gidget Blast'],
				'Sceptile': ['Blue Flare', 'Dragon Pulse', 'Ancient Power', 'Gidget Blast'],
				'Empoleon': ['Psychic', 'Flash Cannon', 'Aura Sphere', 'Gidget Blast'],
				'Infernape': ['Seed Flare', 'Cross Chop', 'Dark Pulse', 'Gidget Blast'],
				'Torterra': ['Rock Slide', 'Earthquake', 'Volt Switch', 'Gidget Blast'],
				'Samurott': ['Earthquake', 'Sacred Sword', 'Swords Dance', 'Gidget Blast'],
				'Emboar': ['Foul Play', 'Close Combat', 'Thunder Punch', 'Gidget Blast'],
				'Serperior': ['Water Pulse', 'Ancient Power', 'Psystrike', 'Gidget Blast'],
				'Greninja': ['Earth Power', 'Dark Pulse', 'Gunk Shot', 'Gidget Blast'],
				'Delphox': ['Shadow Ball', 'Psychic', 'Moonblast', 'Gidget Blast'],
				'Chesnaught': ['Thunder Punch', 'Close Combat', 'Dark Pulse', 'Gidget Blast'],
				'Primarina': ['Ice Beam', 'Moonblast', 'Earthquake', 'Gidget Blast'],
				'Incineroar': ['Play Rough', 'Foul Play', 'Grass Knot', 'Gidget Blast'],
				'Decidueye': ['Close Combat', 'Phantom Force', 'Rock Slide', 'Gidget Blast'],
			};
			let forme = Object.keys(formes)[this.random(21)];
			this.add(`-anim`, target, 'Geomancy', target);
			target.formeChange(forme);
			this.add('-message', `${target.name} transformed into a ${forme}\!`);
			target.setAbility('Limber');
			// Update movepool
			target.moveSlots = [];
			if (!formes[forme]) throw new Error(`Can't find moveset for Gidget's forme: "${forme}".`); // should never happen
			for (const [i, moveid] of formes[forme].entries()) {
				let move = this.getMove(moveid);
				if (!move.id) continue;
				target.moveSlots.push({
					move: move.name,
					id: move.id,
					// @ts-ignore hacky change for Gidget's set
					pp: Math.floor(((move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5) * (target.ppPercentages ? target.ppPercentages[i] : 1)),
					maxpp: ((move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5),
					target: move.target,
					disabled: false,
					used: false,
					virtual: true,
				});
				target.moves.push(move.id);
			}
		},
		onBeforeSwitchOut: function (pokemon) {
			if (pokemon.illusion) return;
			// @ts-ignore hacky change for Gidget's set
			pokemon.ppPercentages = pokemon.moveSlots.slice().map(m => {
				return m.pp / m.maxpp;
			});
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Gidget:</b> I'll be here in a moment! Don't worry\!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Gidget:</b> It's simple if my name isn't Gadget\!`);
		},
	},
	sedna: {
		noCopy: true,
		onStart: function (source) {
			this.add(`raw|<b>Sedna:</b> Today's logic: Gravity\!`);
			if (source.illusion) return;
			this.field.addPseudoWeather('gravity', source);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Sedna:</b> I'm gonna work on a Sky Dance accademy.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Sedna:</b> And now I'm going home. :(`);
		},
	},
	skyla: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Skyla:</b> Good luck and have fun\!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Skyla:</b> Have a nice day, darling\!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Skyla:</b> I'll do my best\!`);
		},
		onModifyDefPriority: 6,
		onModifyDef: function (def, pokemon) {
			if (pokemon.illusion) return;
			if (!pokemon.transformed) {
				return this.chainModify(2);
			}
		},
		onModifySpDPriority: 6,
		onModifySpD: function (spd, pokemon) {
			if (pokemon.illusion) return;
			if (!pokemon.transformed) {
				return this.chainModify(2);
			}
		},
	},
	kristami: {
		noCopy: true,
		onStart: function (pokemon) {
			let foe = pokemon.side.foe.active[0];
			this.add(`raw|<b>Kris Tami:</b> Think you're going to challenge me, ${foe.name}?`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Kris Tami:</b> Good luck if you need me\!`);
		},
		onFaint: function (pokemon) {
			let foe = pokemon.side.foe.active[0];
			this.add(`raw|<b>Kris Tami:</b> Great job, ${foe.name}!`);
		},
	},
	oblivia: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Oblivia:</b> Hi?`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Oblivia:</b> Bye.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Oblivia:</b> I'm no good.`);
		},
	},
	sekka: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Sekka:</b> It's Sekka's time to shine\!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Sekka:</b> I had enough time for this\!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Sekka:</b> But I've tried my best\!`);
		},
	},
	leonas: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Leonas:</b> No matter how hard I've tried\!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Leonas:</b> Send me a card if you have time\!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Leonas:</b> I have to go! Bye\!`);
		},
		// Simple Innate
		onBoost: function (boost, target, source, effect) {
			if (source.illusion) return;
			if (effect && effect.id === 'zpower') return;
			for (let i in boost) {
				// @ts-ignore
				boost[i] *= 2;
			}
		},
	},
	anabelle: {
		noCopy: true,
		onStart: function (target, source) {
			source.types = ['Water', 'Psychic', 'Fairy'];
			this.add(`raw|<b>Anabelle:</b> I have a one-off start\!`);
			if (source.illusion) return;
			this.boost({spa: 3}, source);
			this.add('-start', source, 'typeadd', 'Fairy');
		},
		onSwitchOut: function () {
			this.add(`raw|*Anabelle summons an another friend of hers.*`);
		},
		onFaint: function () {
			this.add(`raw|<b>Anabelle:</b> I'm seriously missing the point\!`);
		},
	},
	crystal: {
		noCopy: true,
		onStart: function (target, source) {
			source.types = ["Water", "Ice"];
			this.add(`raw|<b>Crystal:</b> I\ll be using a Quiver Dance for you\!`);
      this.add('-anim', source, "Quiver Dance", source);
			this.add('-start', source, 'typeadd', 'Ice');
		},
		onMoveFail: function () {
			this.add(`raw|<b>Crystal:</b> Something's not right\!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Crystal:</b> Seriously!?`);
		},
		onFaint: function () {
			this.add(`raw|<b>Crystal:</b> I decided to come back for more\!`);
		},
	},
	speedy: {
		noCopy: true,
		onStart: function (pokemon) {
			this.add(`raw|<b>Speedy:</b> Cowabunga, man\!`);
			if (pokemon.illusion) return;
			this.boost({spe: 3}, pokemon);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Speedy:</b> Have fun and safe at PK Land\!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Speedy:</b> Great game\!`);
		},
		// Huge Power innate
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk) {
			return this.chainModify(2);
		},
	},
	goldhooh: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Gold Ho-Oh:</b> Welcome, ladies and gentlemen.`);
		},
		onSwitchOut: function (pokemon) {
			this.add(`raw|<b>Gold Ho-Oh:</b> Dare to switch out of me?`);
			if (pokemon.illusion) return;
			// Innate - heals 40% on switch out
			pokemon.heal(pokemon.maxhp * 0.2);
		},
		onFaint: function () {
			this.add(`raw|<b>Gold Ho-Oh:</b> I've own you a happy life.`);
		},
	},
	ajthekeldeo: {
		noCopy: true,
		onStart: function (source) {
			this.add(`raw|<b>AJ the Keldeo:</b> No fun here! =^u^=`);
			if (source.illusion) return;
			let target = source.side.foe.active[0];

			let removeAll = ['reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
			let silentRemove = ['reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist'];
			for (const sideCondition of removeAll) {
				if (target.side.removeSideCondition(sideCondition)) {
					if (!(silentRemove.includes(sideCondition))) this.add('-sideend', target.side, this.getEffect(sideCondition).name, '[from] move: No Fun Zone', '[of] ' + source);
				}
				if (source.side.removeSideCondition(sideCondition)) {
					if (!(silentRemove.includes(sideCondition))) this.add('-sideend', source.side, this.getEffect(sideCondition).name, '[from] move: No Fun Zone', '[of] ' + source);
				}
			}
			this.add('-clearallboost');
			for (const side of this.sides) {
				for (const pokemon of side.active) {
					if (pokemon && pokemon.isActive) pokemon.clearBoosts();
				}
			}
			for (const clear in this.field.pseudoWeather) {
				if (clear.endsWith('mod') || clear.endsWith('clause')) continue;
				this.field.removePseudoWeather(clear);
			}
			this.field.clearWeather();
			this.field.clearTerrain();
		},
		onFaint: function () {
			this.add(`raw|<b>AJ the Keldeo:</b> Tell CJ to say hi\!`);
		},
	},
	shademaster: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Shade Master:</b> Nyhehehehe!\!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Shade Master:</b> Nyhehehehehehehe!\!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Shade Master:</b> Nyhehehhehehehehehehehe!\!`);
		},
	},
	bulkupman: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Bulk-Up Man:</b> Hey you\! Adults only\! Kids don't belong here\!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Bulk-Up Man:</b> You better go there before I got hurt\!`);
		},
		onMoveFail: function () {
			this.add(`raw|<b>Bulk-Up Man:</b> Am I blinded like this?`);
		},
		onFaint: function () {
			this.add(`raw|<b>Bulk-Up Man:</b> You idiot\! What if my brother sees me? He'll be mad at me getting injured like that\!`);
		},
	},
	gemini: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Gemini:</b> Intruders... bad... E-li-mi-nate intruders...`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Gemini:</b> Negative. Must... eliminate. Eliminate. Eliminate...`);
		},
		onFaint: function (source) {
			this.add(`raw|<b>Gemini:</b> Must... eliminate. Eliminate.`);
            this.add('-anim', source, "Explosion", source);
			this.add('message', 'Gemini exploded!');
		},
	},
	max: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|*Plays some bubblegum dance music in a background.*`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Max:</b> Some funny things happen when I use moves.`);
		},
		onFaint: function (source) {
			this.add(`raw|<b>Max:</b> Geez! I'm surrounded by morons!`);
		},
		onModifyDefPriority: 6,
		onModifyDef: function (def, pokemon) {
			if (pokemon.illusion) return;
			if (!pokemon.transformed) {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 6,
		onModifySpD: function (spd, pokemon) {
			if (pokemon.illusion) return;
			if (!pokemon.transformed) {
				return this.chainModify(1.5);
			}
		},
	},
	naru: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Naru:</b> Hi gays - I mean, guys!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Naru:</b> OOOOOOOOOOOOOOOOOHHHHHH NOOOOOOOOOOOOOO!!!`);
		},
	},
	kasandra: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Kasandra:</b> Fathers lock your sons, cuz Kasandra's in town\!`);
		},
		onSwitchOut: function (pokemon) {
			this.add(`raw|<b>Kasandra:</b> My pal will watch you while I'm away.`);
			// @ts-ignore Hack for Kasandra's move
			if (pokemon.mirageHP) delete pokemon.mirageHP;
		},
		onFaint: function () {
			this.add(`raw|<b>Kasandra:</b> How did you know that I am a impersonator!?`);
		},
		onDamage: function (damage, pokemon) {
			// @ts-ignore Hack for Kasandra's Z move
			if (!pokemon.mirageHP) return;
			// Prevent Kasandra from fainting while using a fake claim to prevent visual bug
			if (pokemon.hp - damage <= 0) return (pokemon.hp - 1);
		},
		onAfterDamage: function (damage, pokemon) {
			// @ts-ignore Hack for Kasandra's Z move
			if (!pokemon.mirageHP || pokemon.hp > 1) return;
			// Now we handle the false mirage "fainting"
			// @ts-ignore Hack for Kasandra's Z move
			pokemon.hp = pokemon.mirageHP;
			pokemon.formeChange(pokemon.baseTemplate.id);
			pokemon.moveSlots = pokemon.moveSlots.slice(0, 4);
			this.add('message', `${pokemon.name}'s mirage was uncovered!`);
			// @ts-ignore Hack for Kasandra's Z move
			delete pokemon.mirageHP;
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		},
	},
	copykatt: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Copy Katt:</b> Copy is power\!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Copy Katt:</b> Going out to McDonald's for a while.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Copy Katt:</b> I'm faded\!`);
		},
	},
	blue: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Blue:</b> Water water everywhere!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Blue:</b> I'll be back before Red gets here!`);
		},
		onFaint: function (pokemon) {
			let foe = pokemon.side.foe.active[0];
			this.add(`raw|<b>Blue:</b> Darn it, ${foe.name}! I'm no good for using water powers!`);
		},
		onModifySpe: function (spe, pokemon) {
			if (this.field.isWeather(['raindance', 'primordialsea'])) {
				return this.chainModify(2);
			}
		},
		onModifySpa: function (spa, pokemon) {
			if (this.field.isWeather(['raindance', 'primordialsea'])) {
				return this.chainModify(2);
			}
		},
		onModifyAtk: function (atk, pokemon) {
			if (this.field.isWeather(['raindance', 'primordialsea'])) {
				return this.chainModify(2);
			}
		},
	},
		adelaide: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Adelaide:</b> (Tries to attack you)`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Adelaide:</b> (Trying to switch places)`);
		},
		onFaint: function () {
			this.add(`raw|<b>Adelaide:</b> (Falls down)`);
		},
	},
	blaze: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Blaze:</b> I have a power of Fire!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Blaze:</b> I'll get rid of any coolness! Just you wait!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Blaze:</b> WAAAAAAH! I'M MELTING!`);
		},
	},
	river: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>River:</b> Welcome to Wave Man's Locker!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>River:</b> I'm going to tell my sister on you.`);
		},
		onFaint: function () {
			this.add(`raw|<b>River:</b> I'm such a young Vappy!`);
		},
	},
	forte: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Forte:</b> INTRUDER DETECTED`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Forte:</b> WARP TO AN ANOTHER PLACE`);
		},
		onFaint: function () {
			this.add(`raw|<b>Forte:</b> PERMANENT DAMAGE FAILED`);
		},
	},
	nyra: {
		noCopy: true,
		onStart: function () {
			this.add(`j|Nyra`);
			this.add(`raw|<b>Nyra:</b>${["Lights, camera, chaos!", "I had something surprise for you!", "This child needs attention!"][this.random(3)]}`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Nyra:</b>${["Just asking you.", "You need something Come up with!", "This drama needs to be stop NOW!"][this.random(3)]}`);
			this.add(`l|Nyra`);
		},
		onFaint: function (source) {
			this.add(`raw|<b>Nyra:</b> Follow my friend's profile on ${["DeviantART:<br><a href='https://www.deviantart.com/parapararevolution90'>https://www.deviantart.com/parapararevolution90</a>", "FurAffinity:<br><a href='https://www.furaffinity.net/user/crystalgenerations/'>https://www.furaffinity.net/user/crystalgenerations/</a>"][this.random(2)]}`);
			this.add(`l|Nyra`);
		},
	},
	white: {
		noCopy: true,
		onStart: function (pokemon) {
			this.add(`raw|<b>White:</b> I'm on my way!`);
			if (pokemon.illusion) return;
            this.boost({accuracy: -3}, pokemon);
		},
		onSwitchOut: function (pokemon) {
			let trainer = pokemon.side.name
			this.add(`raw|<b>White:</b> Letting a desire of delivering a healing star, ${trainer}!`);
			pokemon.side.addSideCondition('shiftheal');
		},
		onFaint: function () {
			this.add(`raw|<b>White:</b> Simply faded.`);
		},
		// Contrary Innate
		onBoost: function (boost, target, source, effect) {
			if (effect && effect.id === 'zpower') return;
			for (let i in boost) {
				// @ts-ignore
				boost[i] *= -1;
			}
		},
	},
	alphus: {
		noCopy: true,
		onStart: function (source) {
			this.add(`raw|<b>Alphus:</b> ${["Garbage dump?", "Bees and wasps?", "Moles, freckles and warts?", "Red crocodiles?", "Feather brains?", "Spinach teeth?", "Suffering succotash?", "Black cars?", "Root beer?", "Rotten eggs?", "Doggy bones?", "Mexican bandits?", "Warble flies?", "Cat whiskers?", "Bran Flakes?", "Salt and pepper wind?", "Cheese wax?", "Croaking frogs?", "Super mushrooms?", "Popcorm shrimp?"][this.random(20)]} That rings a bell! XD`);
      			if (source.template.speciesid !== 'shedinja' || source.illusion) return;
			     source.setAbility('Wonder Guard');
		},
		onSwitchOut: function (pokemon) {
			this.add(`raw|<b>Alphus:</b> Going to ${["Long John Silvers", "Walmart", "Big Lots", "Family Dollar", "KFC"][this.random(5)]} in an hour!`);
		},
		onMoveFail: function () {
			this.add(`raw|<b>Alphus:</b> Dang it missed!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Alphus:</b> I've bullied too much!`);
		},
	},
	lyrica: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Lyrica:</b> What is this? Are you trying to make me hit myself to death?`);
		},
		onSwitchOut: function (pokemon) {
			this.add(`raw|<b>Lyrica:</b> I've seen better Pokémon at the Pokémon Center!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Lyrica:</b> Oh darn. You made me break a tail.`);
		},
	},
	blade: {
		noCopy: true,
		onStart: function (target, source) {
			let activeMon = target.side.foe.active[0].template.speciesid;
			if (activeMon === 'silvally') {
            this.add(`raw|<b>Sekka:</b> Blade, come with me!`);
            this.add(`raw|<b>Blade:</b> I can't. I'm on the side of my friend's!`);
            this.add(`raw|<b>Sekka:</b> If you don't come with me, I'll shut down your club as a punishment!`);
			} else {
			this.add(`raw|<b>Blade:</b> I will get a revenge on my sister!`);
			}
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Blade:</b> I'm out to the target practice!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Blade:</b> I didn't have to reload my attack yet!`);
		},
	},
	slashdown: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Slashdown:</b> I am the terror that flaps in the day... ${["I am the video game console that can't be soft-modded", "I am the graphic tablet that draws every night", "I am the spinach that sticks to your teeth", "I am the internet meme that always post online", "I am that Super Paper Mario game that needs to be destroyed by Christmas", "I am an anti-bacterial soap that harms germs"][this.random(6)]}... I am Slashdown Scizor!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Slashdown:</b> Do you know what affects Pokémon? THE SECRET LAIR!`);
		},
		onFaint: function () {
			this.add(`c|☆KrisTami|Don't you have to be a moron somewhere else?`);
			this.add(`raw|<b>Slashdown:</b> Not until 10 PM!`);
		},
	},
	zicko: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Zicko:</b> ${["Don't go around attacking me! It's hard to be cool when you're attacking me.", "Say hello to my epic sword power!", "Fainted or not, you're coming with me!"][this.random(3)]}`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Zicko:</b> Iron Sword is FOREVER!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Zicko:</b> YOU'VE BETRAYED MY ACTIONS! AAAAAAAACTIONS!`);
		},
	},
	gyro: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Gyro:</b> Yo, ladies and gentlemen! It is I, Gyro!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Gyro:</b> No one should lay a finger on a Butterfinger!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Gyro:</b> I hope you’re happy!`);
		},
	},
	merick: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Merick:</b> 🎵Every second we're together,<br>I can't believe how much it's better!🎵`);
			this.add(`raw|<b>Merick:</b> 🎵And I need you never leave you🎵`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Merick:</b> 🎵I think it's time to get up and go!🎵`);
		},
		onFaint: function () {
			this.add(`raw|<b>Merick:</b> 🎵Keep love coming!🎵`);
		},
	},
	lorica: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Lorica:</b> Don't touch me, sucker!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Lorica:</b> Mind if I do!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Lorica:</b> Urge to freeze... Fading...`);
		},
	},
	gyl: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Gyl:</b> ${["Lions rule!", "Viva los Lionels!", "Leo would be proud of this!"][this.random(3)]}`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Gyl:</b> ${["Between you and me forever!", "Don't attack me, I'm sterile!", "Hold on tight!"][this.random(3)]}`);
		},
		onFaint: function () {
			this.add(`raw|<b>Gyl:</b> Watch this clip from the 90's PBS Kids! ${["<a href='https://www.youtube.com/watch?v=tU3Q4X0t2SY'>https://www.youtube.com/watch?v=tU3Q4X0t2SY</a>", "<a href='https://www.youtube.com/watch?v=fYg3U-iqPd0'>https://www.youtube.com/watch?v=fYg3U-iqPd0</a>", "<a href='https://www.youtube.com/watch?v=syRYjXmRsp4'>https://www.youtube.com/watch?v=syRYjXmRsp4</a>"][this.random(3)]}`);
		},
	},
	jady: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Jady:</b> I wonder who that target is...`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Jady:</b> What is the big fat idea!?`);
		},
		onFaint: function () {
			this.add(`raw|<b>Jady:</b> But I'm not finished yet!`);
		},
		onModifyDefPriority: 6,
		onModifyDef: function (def, pokemon) {
			if (pokemon.illusion) return;
			if (!pokemon.transformed) {
				return this.chainModify(2);
			}
		},
		onModifySpDPriority: 6,
		onModifySpD: function (spd, pokemon) {
			if (pokemon.illusion) return;
			if (!pokemon.transformed) {
				return this.chainModify(2);
			}
		},
	},
	waylon: {
		noCopy: true,
		onStart: function (target, source) {
			source.types = ['Steel', 'Flying', 'Dragon'];
			this.add(`raw|<b>Waylon:</b> What is a Pokémon? A miserable little pile of secrets!`);
			if (source.illusion) return;
			this.add('-start', source, 'typeadd', 'Dragon');
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Waylon:</b> Who can say what truly motivates the Pokémon?`);
		},
		onFaint: function () {
			this.add(`raw|<b>Waylon:</b> Thanks, but my cousins are in another team!`);
		},
	},
	charlie: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Charlie:</b> Today's show is brought to you by the letter C!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Charlie:</b> It's gonna be wild!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Charlie:</b> And remember, friends are always best!`);
		},
      ///I'll Make You Blind! Innate
		onModifyAccuracyPriority: 10,
		onModifyAccuracy: function (accuracy, target, source, move) {
			if ((move.category === 'Special' || move.category === 'Physical') && typeof move.accuracy === 'number') {
				this.debug('I\'ll Make You Blind! - setting accuracy to 70');
				return 70;
			}
		},
      ///Hit Anything! Innate
		onModifyMovePriority: -5,
		onModifyMove: function (move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Electric'] = true;
				move.ignoreImmunity['Dragon'] = true;
				move.ignoreImmunity['Psychic'] = true;
				move.ignoreImmunity['Ground'] = true;
				move.ignoreImmunity['Fighting'] = true;
				move.ignoreImmunity['Normal'] = true;
			}
		},
	},
	zig: {
		noCopy: true,
		onStart: function (source) {
			this.add(`raw|<b>Zig:</b> Hey there, Poké-folks! This is Zig saying remember to buckle up! `);
      			if (source.template.speciesid !== 'linoone' || source.illusion) return;
			     source.types = ['Normal', 'Electric'];
			     this.add('-start', source, 'typeadd', 'Electric');
			     source.setAbility('Volt Shocker');
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Zig:</b> Gullible Pokémon never trust a lie!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Zig:</b> This is Zig saying to run away free!`);
		},
	},
	poppyseed: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Poppy Seed:</b> Hello hi, hello hi! How are you doing?`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Poppy Seed:</b> Time to watch some cartoons!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Poppy Seed:</b> I'm just fired! Seriously!`);
		},
	},
	mirica: {
		noCopy: true,
		onStart: function (pokemon) {
			let trainer = pokemon.side.name
			this.add(`raw|<b>Mirica:</b> ${trainer} is my best friend ever.`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Mirica:</b> Kentucky serves best of its rights in the world.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Mirica:</b> Omega Sheron is forever!.`);
			this.add(`raw|<b>Mirica:</b> !dt Omega Sheron`);
			this.add(`raw|<ul class="utilichart"><li class="result"><span class="col numcol">Uber</span> <span class="col iconcol"><span class="picon" style="background: transparent ur (&quot;//play.pokemonshowdown.com/sprites/smicons-sheet.png?a5&quot;) no-repeat scroll -0px -960px"></span></span> <span class="col pokemonnamecol" style="white-space: nowrap"><a href=https://pokemonshowdown.com/dex/pokemon/rayquaza" target="_blank" rel="noopener">Rayquaza</a></span> <span class="col typecol"><img src=https://play.pokemonshowdown.com/sprites/types/Dragon.png" alt="Dragon" height="14" width="32"><img src="https://play.pokemonshowdown.com/sprites/types/Flying.png" alt="Flying" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">Air Lock</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br> 105</span> <span class="col statcol"><em>Atk</em><br> 150</span> <span class="col statcol"><em>Def</em><br> 90</span> <span class="col statcol"><em>SpA</em><br> 150</span> <span class="col statcol"><em>SpD</em><br>90</span><span class="col statcol"><em>Spe</em><br>95</span><span class="col bstcol"><em>BST<br> 680</em></span> </span></li><li style="clear: both"><br></li></ul>`);
			this.add(`raw|<font color="#686868">Dex#:</font>384&nbsp;| <font color="#686868">Gen:</font> 3&nbsp;| <font color="#686868">Height:</font>7 m&nbsp;| <font color="#686868">Weight:</font> 206.5 kg <em>(120 BP)</em>&nbsp;|<font color="#686868">Dex Colour:</font> Green&nbsp;| <font color="#686868">Egg Group(s):</font> Undiscovered&nbsp;| <font color="#686868">Does Not Evolve</font></font>`);
		},
	},
	montgomery: {
		noCopy: true,
		onStart: function (pokemon) {
			this.add(`raw|<b>Montgomery:</b> Hello my little fate-of-nothingness!`);
            pokemon.trySetStatus('brn', pokemon);
		},
		onSwitchOut: function (pokemon) {
			let trainer = pokemon.side.name
			this.add(`raw|<b>Montgomery:</b> ${trainer}, will you watch that brat for me?`);
		},
		onFaint: function (pokemon) {
			let enemy = pokemon.side.foe.name
			this.add(`raw|<b>Montgomery:</b> You mischievious ${enemy}! You took my life! I'll report you the Tiksi Branch!`);
		},
		//Giant Guts Innate
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk, pokemon) {
			if (pokemon.status) {
				return this.chainModify(3);
			}
		},
	},
	harold: {
		noCopy: true,
		onStart: function (pokemon) {
			let enemy = pokemon.side.foe.name
			this.add(`raw|<b>Harold:</b> ${enemy}, your team are cruel, evil and are capable to cheat and wipe everything. Please don't block me for saying stuff!`);
			if (pokemon.illusion) return;
            this.boost({evasion: 3}, pokemon);
		},
		onSwitchOut: function (pokemon) {
			this.add(`raw|<b>Harold:</b> I'll take a screenshot and share with my friends at the forum.`);
		},
		onFaint: function (pokemon) {
			this.add(`raw|<b>Harold:</b> I've got blocked. Moron.`);
		},
	},
	loretta: {
		noCopy: true,
		onStart: function (pokemon) {
			let enemy = pokemon.side.foe.name
			this.add(`raw|<b>Loretta:</b> Every time something good happens in my life, every time, ${enemy} ruins it! Well, I'm not gonna let him or her ruin anything else!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Loretta:</b> This way to the Evergreen Station! *runs off-screen*`);
		},
		onFaint: function (pokemon) {
			let enemy = pokemon.side.foe.name
			this.add(`raw|<b>Loretta:</b> My body... Destroyed again! Curse you, ${enemy}!`);
		},
	},
	roger: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Roger:</b> Hi, there! Is this the final straw? Do you want to love me so far away that you can brag about it?`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Roger:</b> Went to my sisters' house. Later.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Roger:</b>  Maybe the lesson is sometimes, some Pokémon do stuffy, things happen and it kind of goes nowhere, anyway, thanks for the check bye!`);
		},
	},
	cyborg: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Cyborg:</b> ANOTHER SPECIES DETECTED`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Cyborg:</b> TELEPORT TO AN ANOTHER WORLD`);
		},
		onFaint: function () {
			this.add(`raw|<b>Cyborg:</b> HARDWARE DAMAGE FAILED`);
		},
	},
	distro: {
		noCopy: true,
		onStart: function (pokemon) {
		let enemy = pokemon.side.foe.name
			this.add(`raw|<b>Distro:</b> Ladies and gentlemen, your attention, please. The name's Distro... The one and only, the brilliant ruler of distruction, Super Distro! Now, this may seem rather... sudden to you, but I've decided I'd like to take over the world! HAHAHAHAHA!!! Ahem... Anyway, to begin. ${enemy}! I'll be taking your precious friends with me!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Distro:</b> I'll be back!`);
		},
		onFaint: function (pokemon) {
		let enemy = pokemon.side.foe.name
			this.add(`raw|<b>Distro:</b> NOOOOO! You beat me this time, ${enemy}! I can't stand loseing to you! What!? You're stronger that I though! Come on, Gary! Let's continue watching this fight!`);
			this.add(`raw|<b>Gary:</b> OK, sir.`);
		},
	},
	bink: {
		noCopy: true,
		onStart: function (pokemon) {
		let enemy = pokemon.side.foe.name
			this.add(`raw|<b>Bink:</b> ${enemy}'s not a dummy!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Bink:</b> Bink has to go!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Bink:</b> Bink's no good! Aqua's no good either!`);
		},
	},
	lyoko: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Lyoko:</b> Gentlemen, my name's Lyoko, admin of the Starlight society. Here's a downside. Killing me will make you earn a bad karma.`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Lyoko:</b> There's an alias within.`);
		},
		onFaint: function (target, source) {
			this.add(`raw|<b>Lyoko:</b> My force will be summoned in no time.`);
		},
		// Lyoko's Force Innate
		onAfterDamageOrder: 1,
		onAfterDamage: function (damage, target, source, move) {
			if (source && source !== target && move && move.effectType === 'Move' && !target.hp) {
				this.damage(source.maxhp / 1, source, target);
				this.add('-message', `${source.name} is struck by the force!`);
			}
		},
	},
	bonky: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Bonky:</b> Going bonkers for Bewear, folks?`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Bonky:</b> Where's my Klondike bar, sir or madam?`);
		},
		onFaint: function () {
			this.add(`raw|<b>Bonky:</b> I find this attack DISTURBING!`);
		},
	},
	simpson: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Simpson:</b> It is I, King of Ice Dragons!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Simpson:</b> What kind of monster am I? Am I attacking someone that bad?`);
		},
		onFaint: function () {
			this.add(`raw|<b>Simpson:</b> If you came up with an idea of making a powerful move, you're in for it!`);
		},
	},
	pupeye: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Pupeye:</b> Nobody can beat me!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Pupeye:</b> Ceiling: Zero! Service! What's the big idea!?`);
		},
		onFaint: function () {
			this.add(`raw|<b>Pupeye:</b> Here's some of the Anti-Popeye songs for ya:<br>🎵I'm Popeye the Sailor Man<br>I live in a garbage can<br>${["I eat all the worms<br>And spit out their germs", "I eat all the flies<br>And spit out their eyes", "I'm grouchy and green<br>And I have no spleen", "I'm strong to the finich<br>Cuz I eats me spinach", "There's a hole in the middle<br>Where I do my piddle", "I forgot all the words<br>Wait, is that a Big Bird?"][this.random(6)]}<br>I'm Popeye the Sailor Man!<br>Toot-toot!🎵`);
		},
		// Sturdy Innate
		onTryHit: function (pokemon, target, move) {
			if (move.ohko) {
				this.add('-immune', pokemon, '[from] ability: Sturdy');
				return null;
			}
		},
		onDamagePriority: -100,
		onDamage: function (damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add('-ability', target, 'Sturdy');
				return target.hp - 1;
			}
		},
	},
	
	boomer: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Boomer:</b> Feel my pain of energy now!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Boomer:</b> Excuse me, while I go to make other Pokémon miserable.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Boomer:</b> You misfits won't leave me alone! I'll tell my master on you!`);
		},
	},
	maggie64: {
		noCopy: true,
		onStart: function (source) {
			source.types = ["???"];
			this.add(`raw|<b>Maggie 64:</b> hello every-1 I came to this planet to overpowr u`);
		    this.add('-start', source, 'typechange', '???');
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Maggie 64:</b> okie dokie i'm comin at ya`);
		},
		onFaint: function () {
			this.add(`raw|<b>Maggie 64:</b> lol u hax i'm reporting u to kristami!`);
		},
	},
	silvereye: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Silvereye:</b> Anything that hits me will turn to silver!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Silvereye:</b> I have a fury of SILVER!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Silvereye:</b> I thought silver-eyed Sableyes won't lose. Too bad!`);
		},
	},
	nigel: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Nigel:</b> Hi folks! This is Nigel who came to a battle!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Nigel:</b> I'll be right back after the messages!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Nigel:</b> Never beat the Nigel the Sailor for good!`);
		},
	},
	riana: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Riana:</b> Nigel the Sailor is my love!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Riana:</b> I'm going outside for a flight.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Riana:</b> I wanted Nigel to come here, but I guess you treated me bad.`);
		},
	},
	angel: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Angel:</b> My pal Flippy wanted to get me a gift for Summer.`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Angel:</b> Be right back. Flippy wanted me.`);
		},
		onMoveFail: function () {
			this.add(`raw|<b>Angel:</b> Why do I have to miss?`);
		},
		onFaint: function () {
			this.add(`raw|<b>Angel:</b> Sometimes, you would like to share things with my life.`);
		},
	},
	gerald: {
		noCopy: true,
		onStart: function (target, source) {
			let activeMon = target.side.foe.active[0].template.speciesid;
			if (activeMon === 'kyogreprimal') {
            this.add(`raw|<b>Gerald:</b> There you are, Nigel! Let's have a fight with me!`);
			} else {
			this.add(`raw|<b>Gerald:</b> I'll here to find Nigel! Where is he?`);
			}
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Gerald:</b> I'll go find Nigel in an another place!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Gerald:</b> Your attacks are no match for me!`);
		},
	},
	danon: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Danon:</b> Did you know about something, my friend?`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Danon:</b> Time for me to play some video games.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Danon:</b> You cheated me aren't cha?`);
		},
	},
	frog: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Frog:</b> Flip the Frog is no more!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Frog:</b> Number Munchers is my favorite video game!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Frog:</b> Have a Ribbit-Ribbit time!`);
		},
	},
	millennium: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Millennium:</b> Is something you can fight me?`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Millennium:</b> Let the world decide me.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Millennium:</b> Take care of yourself.`);
		},		
	},
	zatch: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Millennium:</b> Let my power control yours.`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Zatch:</b> I'll let the world wither to myself.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Zatch:</b> Someday, we can be friends again.`);
		},
		// Ultra Burst Innate
		onUpdate: function (pokemon) {
			if (pokemon.template.speciesid !== 'necrozma' || pokemon.transformed || pokemon.illusion || !pokemon.hp) return;
			if (pokemon.hp > pokemon.maxhp / 2) return;
			this.add('-activate', pokemon, 'ability: Ultra Burst');
			this.add(`raw|<b>Zatch:</b> Playtime's over! Behold my true power!`);
			pokemon.formeChange('Necrozma-Ultra', this.effect, true);
			let newHP = Math.floor(Math.floor(2 * pokemon.template.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100) * pokemon.level / 100 + 10);
			pokemon.hp = newHP - (pokemon.maxhp - pokemon.hp);
			pokemon.maxhp = newHP;
			pokemon.heal(pokemon.maxhp / 4);
			this.add('-heal', pokemon, pokemon.getHealth);
			this.add('-message', pokemon.name + ' regained his true power through Ultra Burst!');
			this.add('-message', pokemon.name + '\'s ability is now Prism Power!');
			this.boost({atk: 1, def: 1, spa: 1, spd: 1, spe: 1}, pokemon);
		},		
	},
	omegasheron: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Omega Sheron:</b> Behold! The greatest Pokémon myself! I'm Omega Sheron! WAHAHAHAHA!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Omega Sheron:</b> Give me something you got, like you always do!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Omega Sheron:</b> You are a worthy opponent...`);
		},
	},
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
	// Prevents glitch out from running more than once per turn per pokemon & boosts base power. From SSB.
	glitchout: {
		duration: 1,
		onTryHit: function (target, source, move) {
			if (move.basePower) {
				move.basePower += 20;
				this.debug('glitch out base power boost');
			}
		},
	},
	// Future Move modified to add Heaven's Wrath
	futuremove: {
		// this is a slot condition
		name: 'futuremove',
		id: 'futuremove',
		num: 0,
		duration: 3,
		onResidualOrder: 3,
		onEnd(target) {
			const data = this.effectData;
			// time's up; time to hit! :D
			const move = this.getMove(data.move);
			if (target.fainted || target === data.source) {
				this.hint(`${move.name} did not hit because the target is ${(data.fainted ? 'fainted' : 'the user')}.`);
				return;
			}

           if (move.id === 'heavenswrath') {
            this.add('-message', `${target.name} took a Heaven's Wrath attack!`);
           } else {
			this.add('-end', target, 'move: ' + move.name);
			 }
			target.removeVolatile('Protect');
			target.removeVolatile('Endure');

			if (data.source.hasAbility('infiltrator') && this.gen >= 6) {
				data.moveData.infiltrates = true;
			}
			if (data.source.hasAbility('normalize') && this.gen >= 6) {
				data.moveData.type = 'Normal';
			}
			if (data.source.hasAbility('adaptability') && this.gen >= 6) {
				data.moveData.stab = 2;
			}
			const hitMove = new this.Data.Move(data.moveData);

			this.trySpreadMoveHit([target], data.source, /** @type {ActiveMove} */(/** @type {unknown} */(hitMove)));
		},
	},
	// Modified type setup for arceus and silvally
	arceus: {
		inherit: true,
		onType: function (types, pokemon) {
		if (pokemon.transformed) return types;
		/** @type {string | undefined} */
		let type = 'Normal';
		if (pokemon.ability === 'coloraura') {
			type = pokemon.getItem().onPlate;
			if (!type) {
				type = 'Normal';
			}
		}
		return [type];
		},
	},
	silvally: {
		inherit: true,
		onType: function (types, pokemon) {
		if (pokemon.transformed) return types;
		/** @type {string | undefined} */
		let type = 'Normal';
		if (pokemon.ability === 'rkssystem') {
			type = pokemon.getItem().onMemory;
			if (!type) {
				type = 'Normal';
			}
		}
		return [type];
		},
	},
};

exports.BattleStatuses = BattleStatuses;
