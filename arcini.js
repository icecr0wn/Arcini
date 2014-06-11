var Arcini = (function() {
	return {
		Model: (function() {
			return {
				Character: function(characterName, baseAttributes, chosenDeity, constantsService, formulaService) {
					var name = (!characterName ? '' : characterName);

					if (!baseAttributes) {
						baseAttributes = constants.Attributes.Base();
					};
					
					var constants = constantsService;
					var formula = formulaService;
					
					var attributes = (function() {
						var base = (function() {
							var values = baseAttributes;

							var add = function(id) {
								this.values[id] = formula.add(this.values[id], constants.Max.Attribute());
							};

							var remove = function(id) {
								this.values[id] = formula.remove(this.values[id], attributes.spent.values[id]);
							};

							var total = function() {
								return formula.attributes.total(this.values);
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
								this.values[id] = formula.add(this.values[id], attributes.base.values[id] + deity.attribute(id));
							};

							var remove = function(id) 	{
								this.values[id] = formula.remove(this.values[id], constants.Min.Spent());
							};

							var total = function() {
								return formula.attributes.total(this.values);
							};

							return {
								values: values,
								add: add,
								remove: remove,
								total: total
							};
						}());

						var blood = function() {
							return formula.attribute(this.base.values[0], this.spent.values[0], deity.attribute(0));
						};

						var air = function() {
							return formula.attribute(this.base.values[1], this.spent.values[1], deity.attribute(1));
						};

						var earth = function() {
							return formula.attribute(this.base.values[2], this.spent.values[2], deity.attribute(2));
						};

						var fire = function() {
							return formula.attribute(this.base.values[3], this.spent.values[3], deity.attribute(3));
						};

						var water = function() {
							return formula.attribute(this.base.values[4], this.spent.values[4], deity.attribute(4));
						};

						var total = function() {this
							return formula.attribute(formula.attributes.total(this.base.values), formula.attributes.total(this.spent.values), formula.attributes.total(deity.attributes()));
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
							return formula.resistance(attributes.blood(), attributes.total(), deity.resistance(0));
						};

						var air = function() {
							return formula.resistance(attributes.air(), attributes.total(), deity.resistance(1));
						};	

						var earth = function() {
							return formula.resistance(attributes.earth(), attributes.total(), deity.resistance(2));
						};

						var fire = function() {
							return formula.resistance(attributes.fire(), attributes.total(), deity.resistance(3));
						};

						var water = function() {
							return formula.resistance(attributes.water(), attributes.total(), deity.resistance(4));
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
							return formula.defence(attributes.blood(), [ attributes.earth(), attributes.fire() ], attributes.total());
						};

						var elemental = function() {
							return formula.defence(attributes.blood(), [ attributes.air(), attributes.fire() ], attributes.total());
						};

						return {
							physical: physical,
							elemental: elemental
						};
					}());

					var defence = (function() {
						var physical = function() {
							return formula.defence(attributes.blood(), [ attributes.earth(), attributes.water() ], attributes.total());
						};

						var elemental = function() {
							return formula.defence(attributes.blood(), [ attributes.air(), attributes.water() ], attributes.total());
						};

						return {
							physical: physical,
							elemental: elemental
						};
					}());

					var health = (function() {
						var damage = 0;

						var max = function() {
							return formula.health(attributes.blood(), attributes.earth());
						};

						var current = function() {
							return this.max() - this.damage;
						};

						var dealDamage = function() {
							this.damage = formula.add(this.damage, this.max());
						};

						var heal = function() {
							this.damage = formula.remove(this.damage, 0);
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
						return formula.speed(attributes.air(), attributes.total());
					};

					var extra = (function() {
						var damage = function() {
							return formula.extra(attributes.fire(), attributes.total());
						};

						var health = function() {
							return formula.extra(attributes.water(), attributes.total());
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
						
						return {
							set: set,
							index: index,
							attribute: attribute,
							attributes: attributes,
							resistance: resistance
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
