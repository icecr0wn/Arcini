var Arcini = (function() {
	return {
		Formula: (function() {
			var resistance = function(attribute, total, deity) {
				return Math.floor(attribute/5 + total/20 + deity);
			};

			var offence = function(blood, main, total) {
				return Math.floor(0.55 + (blood/2 + main[0] + main[1])/5 + total/20);
			};

			var defence = function(blood, main, total) {
				return Math.floor((blood/2 + main[0] + main[1])/5 + total/20);
			};

			var speed = function(air, total) {
				return Math.floor(4 + air/5 + total/20);
			};

			var extra = function(attribute, total) {
				return Math.floor(attribute/5 + total/10);
			};

			var health = function(blood, earth) {
				return Math.floor(blood*3 + earth);
			};

			var add = function(value, maximum) {
				return Math.min(value + 1, maximum);
			};

			var remove = function(value, minimum) {
				return Math.max(value - 1, minimum);
			};

			var attribute = function(value, spent, deity) {
				return value - spent + deity;
			};

			var attributes = (function() {
				var elementTotal = function(attributes) {
					return attributes[1] + attributes[2] + attributes[3] + attributes[4];
				};

				var total = function(attributes) {
					return this.elementTotal(attributes) + attributes[0];
				};

				return {
					elementTotal: elementTotal,
					total: total
				};
			}());

			return {
				resistance: resistance,
				offence: offence,
				defence: defence,
				speed: speed,
				extra: extra,
				health: health,
				add: add,
				remove: remove,
				attribute: attribute,
				attributes: attributes
			};
		}()),
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
								this.values[id] = Arcini.Formula.add(this.values[id], constants.Max.Attribute());
							};

							var remove = function(id) {
								this.values[id] = Arcini.Formula.remove(this.values[id], attributes.spent.values[id]);
							};

							var total = function() {
								return Arcini.Formula.attributes.total(this.values);
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
								this.values[id] = Arcini.Formula.add(this.values[id], attributes.base.values[id] + deity.attribute(id));
							};

							var remove = function(id) 	{
								this.values[id] = Arcini.Formula.remove(this.values[id], constants.Min.Spent());
							};

							var total = function() {
								return Arcini.Formula.attributes.total(this.values);
							};

							return {
								values: values,
								add: add,
								remove: remove,
								total: total
							};
						}());

						var blood = function() {
							return Arcini.Formula.attribute(this.base.values[0], this.spent.values[0], deity.attribute(0));
						};

						var air = function() {
							return Arcini.Formula.attribute(this.base.values[1], this.spent.values[1], deity.attribute(1));
						};

						var earth = function() {
							return Arcini.Formula.attribute(this.base.values[2], this.spent.values[2], deity.attribute(2));
						};

						var fire = function() {
							return Arcini.Formula.attribute(this.base.values[3], this.spent.values[3], deity.attribute(3));
						};

						var water = function() {
							return Arcini.Formula.attribute(this.base.values[4], this.spent.values[4], deity.attribute(4));
						};

						var total = function() {this
							return Arcini.Formula.attribute(Arcini.Formula.attributes.total(this.base.values), Arcini.Formula.attributes.total(this.spent.values), Arcini.Formula.attributes.total(deity.attributes()));
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
							return Arcini.Formula.resistance(attributes.blood(), attributes.total(), deity.resistance(0));
						};

						var air = function() {
							return Arcini.Formula.resistance(attributes.air(), attributes.total(), deity.resistance(1));
						};	

						var earth = function() {
							return Arcini.Formula.resistance(attributes.earth(), attributes.total(), deity.resistance(2));
						};

						var fire = function() {
							return Arcini.Formula.resistance(attributes.fire(), attributes.total(), deity.resistance(3));
						};

						var water = function() {
							return Arcini.Formula.resistance(attributes.water(), attributes.total(), deity.resistance(4));
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
							return Arcini.Formula.defence(attributes.blood(), [ attributes.earth(), attributes.fire() ], attributes.total());
						};

						var elemental = function() {
							return Arcini.Formula.defence(attributes.blood(), [ attributes.air(), attributes.fire() ], attributes.total());
						};

						return {
							physical: physical,
							elemental: elemental
						};
					}());

					var defence = (function() {
						var physical = function() {
							return Arcini.Formula.defence(attributes.blood(), [ attributes.earth(), attributes.water() ], attributes.total());
						};

						var elemental = function() {
							return Arcini.Formula.defence(attributes.blood(), [ attributes.air(), attributes.water() ], attributes.total());
						};

						return {
							physical: physical,
							elemental: elemental
						};
					}());

					var health = (function() {
						var damage = 0;

						var max = function() {
							return Arcini.Formula.health(attributes.blood(), attributes.earth());
						};

						var current = function() {
							return this.max() - this.damage;
						};

						var dealDamage = function() {
							this.damage = Arcini.Formula.add(this.damage, this.max());
						};

						var heal = function() {
							this.damage = Arcini.Formula.remove(this.damage, 0);
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
						return Arcini.Formula.speed(attributes.air(), attributes.total());
					};

					var extra = (function() {
						var damage = function() {
							return Arcini.Formula.extra(attributes.fire(), attributes.total());
						};

						var health = function() {
							return Arcini.Formula.extra(attributes.water(), attributes.total());
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
					/*
					 * class Deity:
					 * 	deityName:string,
					 * 	baseAttributes:[ blood:int,
					 * 					 air:int,
					 * 					 earth:int,
					 * 					 fire:int,
					 * 					 water:int
					 * 				  ]
					 * 	baseResistances: [ blood:int,
					 * 					   air:int,
					 * 					   earth:int,
					 * 					   fire:int,
					 * 					   water:int
					 * 				    ]
					 */
					
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
