var Arcini = (function() {
	return {
		Model: (function() {
			return {
				Character: function(characterName, baseAttributes, chosenDeity, constantsService) {
					var name = (!characterName ? '' : characterName);

					if (!baseAttributes) {
						baseAttributes = constants.Attributes.Base();
					};

					var constants = constantsService;

					var attributes = (function() {
						var base = (function() {
							var values = baseAttributes;

							var add = function(id) {
								this.values[id] = Math.min(this.values[id] + 1, constants.Max.Attribute());
							};

							var remove = function(id) {
								this.values[id] = Math.max(this.values[id] - 1, attributes.spent.values[id]);
							};

							var total = function() {
								return this.values.reduce(function(previous, current) {
									return previous + current;
								});
							};

							return {
								values : values,
								add: add,
								remove: remove,
								total: total
							};
						}());

						var spent = (function() {
							var values = constants.Attributes.Base();

							var add = function(id) {
								this.values[id] = Math.min(this.values[id] + 1, attributes.base.values[id] + deity.attribute(id));
							};

							var remove = function(id) 	{
								this.values[id] = Math.max(this.values[id] - 1, constants.Min.Spent());
							};

							var total = function() {
								return this.values.reduce(function(previous, current) {
									return previous + current;
								});
							};

							return {
								values: values,
								add: add,
								remove: remove,
								total: total
							};
						}());

						var blood = function() {
							return this.base.values[0] - this.spent.values[0] + deity.attribute(0);
						};

						var air = function() {
							return this.base.values[1] - this.spent.values[1] + deity.attribute(1);
						};

						var earth = function() {
							return this.base.values[2] - this.spent.values[2] + deity.attribute(2);
						};

						var fire = function() {
							return this.base.values[3] - this.spent.values[3] + deity.attribute(3);
						};

						var water = function() {
							return this.base.values[4] - this.spent.values[4] + deity.attribute(4);
						};

						var total = function() {this
							return this.base.total() - this.spent.total() + deity.total();
						};

						return {
							base: base,
							spent: spent,
							blood: blood,
							air: air,
							earth: earth,
							fire: fire,
							water: water,
							total: total
						};
					}());

					var resistances = (function() {
						var physical = function() {
							return Math.floor(attributes.blood()/5 + attributes.total()/20 + deity.resistance(0));
						};

						var air = function() {
							return Math.floor(attributes.air()/5 + attributes.total()/20 + deity.resistance(1));
						};

						var earth = function() {
							return Math.floor(attributes.earth()/5 + attributes.total()/20 + deity.resistance(2));
						};

						var fire = function() {
							return Math.floor(attributes.fire()/5 + attributes.total()/20 + deity.resistance(3));
						};

						var water = function() {
							return Math.floor(attributes.water()/5 + attributes.total()/20 + deity.resistance(4));
						};

						return {
							physical: physical,
							air: air,
							earth: earth,
							fire: fire,
							water: water
						};
					}());

					var offence = (function() {
						var physical = function() {
							return Math.floor(0.55 + (attributes.blood()/2 + attributes.earth() + attributes.fire())/5 + attributes.total()/20);
						};

						var elemental = function() {
							return Math.floor(0.55 + (attributes.blood()/2 + attributes.air() + attributes.fire())/5 + attributes.total()/20);
						};

						return {
							physical: physical,
							elemental: elemental
						};
					}());

					var defence = (function() {
						var physical = function() {
							return Math.floor((attributes.blood()/2 + attributes.earth() + attributes.water())/5 + attributes.total()/20);
						};

						var elemental = function() {
							return Math.floor((attributes.blood()/2 + attributes.air() + attributes.water())/5 + attributes.total()/20);
						};

						return {
							physical: physical,
							elemental: elemental
						};
					}());

					var health = (function() {
						var damage = 0;

						var max = function() {
							return Math.floor(attributes.blood()*3 + attributes.earth());
						};

						var current = function() {
							return this.max() - this.damage;
						};

						var dealDamage = function() {
							this.damage = Math.min(this.damage + 1, this.max());
						};

						var heal = function() {
							return Math.max(this.damage - 1, 0);
						};

						return {
							damage: damage,
							max: max,
							current: current,
							dealDamage: dealDamage,
							heal: heal
						};
					}());

					var speed = function() {
						return Math.floor(4 + attributes.air()/5 + attributes.total()/20);
					};

					var extra = (function() {
						var damage = function() {
							return Math.floor(attributes.fire()/5 + attributes.total()/10);
						};

						var health = function() {
							return Math.floor(attributes.water()/5 + attributes.total()/10);
						};

						return {
							damage: damage,
							health: health
						};
					}());

					var deity = (function() {
						var id = chosenDeity.id
						var value = chosenDeity.value;

						var set = function(chosenDeity) {
							value = chosenDeity.value;
						};

						var index = function() {
							return id;
						};

						var attribute = function(index) {
							return value.attributes[index];
						};

						var attributes = function(index) {
							return value.attributes;
						};

						var resistance = function(index) {
							return value.resistances[index];
						};
						
						var total = function() {
							return 1;
						};

						return {
							set: set,
							index: index,
							attribute: attribute,
							attributes: attributes,
							resistance: resistance,
							total: total
						};
					}());

					return {
						name: name,
						attributes: attributes,
						resistances: resistances,
						offence: offence,
						defence: defence,
						health: health,
						speed: speed,
						extra: extra,
						deity: deity
					};
				},
				Deity: function(deityName, baseAttributes, baseResistances) {
					var name = (!deityName ? '' : deityName);
					var attributes = (!baseAttributes ? constants.Attributes.Base() : baseAttributes);
					var resistances = (!baseAttributes ? constants.Attributes.Base() : baseResistances);

					return {
						name: name,
						attributes: attributes,
						resistances: resistances
					};
				},
			};
		}()),
	};
}());
