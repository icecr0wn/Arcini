var Arcini = (function() {
	return {
		Constants: (function() {
			var max = (function() {
				var attribute = function() {
					return 30;
				};
				return {
					Attribute: attribute
				};
			}());

			var min = (function() {
				var attribute = function() {
					return 0;
				};

				var spent = function() {
					return 0;
				};

				return {
					Attribute: attribute,
					Spent: spent
				};
			}());

			var attributes = (function() {
				var base = function() {
					return [ 0, 0, 0, 0, 0 ];
				};
				
				return {
					Base: base
				};
			}());
			
			var deity = (function() {
				var base = function() {
					return new Arcini.Model.Deity('', Arcini.Constants.Attributes.Base(), Arcini.Constants.Attributes.Base());
				};

				return {
					Base: base,
				};
			}());
				
			var deities = function() {
				var list = [
					{ id: 0, name: '<choose>', value: new Arcini.Model.Deity('<choose>', [ 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0 ]) },
					{ id: 1, name: 'Almarea', value: new Arcini.Model.Deity('Almarea', [ 3, 3, 0, 0, 0 ], [ 0, 2, 0, 0, 0 ]) },
					{ id: 2, name: 'Baramethor', value: new Arcini.Model.Deity('Baramaethor', [ 3, 0, 0, 3, 0 ], [ 0, 0, 0, 2, 0 ]) },
					{ id: 3, name: 'Eferhilda', value: new Arcini.Model.Deity('Eferhilda', [ 3, 0, 0, 0, 3 ], [ 0, 0, 0, 0, 2 ]) },
					{ id: 4, name: 'Herion', value: new Arcini.Model.Deity('Herion', [ 3, 0, 2, 0, 1 ], [ 0, 0, 1, 0, 1 ]) },
					{ id: 5, name: 'Jade', value: new Arcini.Model.Deity('Jade', [ 3, 1, 0, 2, 0 ], [ 0, 1, 0, 1, 0 ]) },
					{ id: 6, name: 'Khalon', value: new Arcini.Model.Deity('Khalon', [ 3, 0, 3, 0, 0 ], [ 0, 0, 2, 0, 0 ]) },
					{ id: 7, name: 'Lovisa', value: new Arcini.Model.Deity('Lovisa', [ 3, 2, 0, 0, 1 ], [ 0, 1, 0, 0, 1 ]) },
					{ id: 8, name: 'Naerdiel', value: new Arcini.Model.Deity('Naerdiel', [ 5, 1, 0, 0, 0 ], [ 2, 0, 0, 0, 0 ]) },
					{ id: 9, name: 'Zebulon', value: new Arcini.Model.Deity('Zebulon', [ 3, 0, 2, 1, 0 ], [ 0, 0, 1, 1, 0 ]) }
				];
				
				return {
					List: list
				};
			};			

			return {
				Max: max,
				Min: min,
				Attributes: attributes,
				Deity: deity,
				Deities: deities
			};
		}()),
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
				Character: function(characterName, baseAttributes, chosenDeity) {
					/*
					 * class Character:
					 * 	characterName:string,
					 * 	baseAttributes:[ blood:int,
					 * 					 air:int,
					 * 					 earth:int,
					 * 					 fire:int,
					 * 					 water:int
					 * 				  ]
					 */

					var name = (!characterName ? '' : characterName);

					if (!baseAttributes) {
						baseAttributes = Arcini.Constants.Attributes.Base();
					};
					
					var attributes = (function() {
						var base = (function() {
							var values = baseAttributes;

							var add = function(id) {
								this.values[id] = Arcini.Formula.add(this.values[id], Arcini.Constants.Max.Attribute());
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
							var values = Arcini.Constants.Attributes.Base();

							var add = function(id) {
								this.values[id] = Arcini.Formula.add(this.values[id], attributes.base.values[id] + Arcini.Constants.Deities().List[deity.index()].value.attributes[id]);
							};

							var remove = function(id) 	{
								this.values[id] = Arcini.Formula.remove(this.values[id], Arcini.Constants.Min.Spent());
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
							return Arcini.Formula.attribute(this.base.values[0], this.spent.values[0], Arcini.Constants.Deities().List[deity.index()].value.attributes[0]);
						};

						var air = function() {
							return Arcini.Formula.attribute(this.base.values[1], this.spent.values[1], Arcini.Constants.Deities().List[deity.index()].value.attributes[1]);
						};

						var earth = function() {
							return Arcini.Formula.attribute(this.base.values[2], this.spent.values[2], Arcini.Constants.Deities().List[deity.index()].value.attributes[2]);
						};

						var fire = function() {
							return Arcini.Formula.attribute(this.base.values[3], this.spent.values[3], Arcini.Constants.Deities().List[deity.index()].value.attributes[3]);
						};

						var water = function() {
							return Arcini.Formula.attribute(this.base.values[4], this.spent.values[4], Arcini.Constants.Deities().List[deity.index()].value.attributes[4]);
						};

						var total = function() {this
							return Arcini.Formula.attribute(Arcini.Formula.attributes.total(this.base.values), Arcini.Formula.attributes.total(this.spent.values), Arcini.Formula.attributes.total(Arcini.Constants.Deities().List[deity.index()].value.attributes));
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
							return Arcini.Formula.resistance(attributes.blood(), attributes.total(), Arcini.Constants.Deities().List[deity.index()].value.resistances[0]);
						};

						var air = function() {
							return Arcini.Formula.resistance(attributes.air(), attributes.total(), Arcini.Constants.Deities().List[deity.index()].value.resistances[1]);
						};	

						var earth = function() {
							return Arcini.Formula.resistance(attributes.earth(), attributes.total(), Arcini.Constants.Deities().List[deity.index()].value.resistances[2]);
						};

						var fire = function() {
							return Arcini.Formula.resistance(attributes.fire(), attributes.total(), Arcini.Constants.Deities().List[deity.index()].value.resistances[3]);
						};

						var water = function() {
							return Arcini.Formula.resistance(attributes.water(), attributes.total(), Arcini.Constants.Deities().List[deity.index()].value.resistances[4]);
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
						var listIndex = (!chosenDeity ? 0 : chosenDeity);
						
						var set = function(deity) {
							this.listIndex = (!deity ? 0 : deity);
						};
						
						var index = function() {
							return listIndex;
						};
						
						return {
							set: set,
							index: index
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
					var attributes = (!baseAttributes ? Arcini.Constants.Attributes.Base() : baseAttributes);					
					var resistances = (!baseAttributes ? Arcini.Constants.Attributes.Base() : baseResistances);					

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
