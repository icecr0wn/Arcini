var Arcini = (function() {
	return {
		Constants: (function() {
			return {
				Max: (function() {
					return {
						Attribute: function() {
							return 30;
						}
					};
				}()),
				Min: (function() {
					return {
						Attribute: function() {
							return 0;
						},
						Spent: function() {
							return 0;
						}
					};
				}()),
				Attributes: (function() {
					return {
						Base: function() {
							return [ 0, 0, 0, 0, 0 ];
						}
					};
				}())
			};
		}()),
		Formula: (function() {
			return {
				resistance: function(attribute, total) {
					return Math.floor(attribute/5 + total/20);
				},
				offence: function(blood, main, total) {
					return Math.floor(0.55 + (blood/2 + main[0] + main[1])/5 + total/20);	
				},
				defence: function(blood, main, total) {
					return Math.floor((blood/2 + main[0] + main[1])/5 + total/20);	
				},
				speed: function(air, total) {
					return Math.floor(4 + air/5 + total/20);
				},
				extra: function(attribute, total) {
					return Math.floor(attribute/5 + total/10);
				},
				health: function(blood, earth) {
					return Math.floor(blood*3 + earth);
				},
				add: function(value, maximum) {
					return Math.min(value + 1, maximum);
				},
				remove: function(value, minimum) {
					return Math.max(value - 1, minimum);
				},
				attribute: function(value, spent) {
					return value - spent;
				},
				attributes: (function() {
					return {
						elementTotal: function(attributes) {
							return attributes[1] + attributes[2] + attributes[3] + attributes[4];
						},
						total: function(attributes) {
							return this.elementTotal(attributes) + attributes[0];
						}
					};
				}())
				
			};
		}()),
		Model: (function() {
			return {
				Character: function(characterName, baseAttributes) {
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
						return {
							base: (function() {
								return {
									values : baseAttributes,
									elementTotal: function() {
										console.log(attributes)
										return Arcini.Formula.attributes.elementTotal(values);
									},
									total: function() {
										return Arcini.Formula.attributes.total(values);
									},
									add: function(id) {
										this.values[id] = Arcini.Formula.add(this.values[id], Arcini.Constants.Max.Attribute());
									},
									remove: function(id) {
										this.values[id] = Arcini.Formula.remove(this.values[id], attributes.spent.values[id]);
									},
									total: function() {
										return Arcini.Formula.attributes.total(this.values);
									}
								};
							}()),
							spent: (function() {
								return {
									values: Arcini.Constants.Attributes.Base(),
									elementTotal: function() {
										return Arcini.Formula.attributes.elementTotal(this.values);
									},
									total: function() {
										return Arcini.Formula.attributes.total(this.values);
									},
									add: function(id) {
										this.values[id] = Arcini.Formula.add(this.values[id], attributes.base.values[id]);
									},
									remove: function(id) {
										this.values[id] = Arcini.Formula.remove(this.values[id], Arcini.Constants.Min.Spent());
									},
									total: function() {
										return Arcini.Formula.attributes.total(this.values);
									}
								};
							}()),
							blood: function() {
								return Arcini.Formula.attribute(this.base.values[0], this.spent.values[0]);
							},
							air: function() {
								return Arcini.Formula.attribute(this.base.values[1], this.spent.values[1]);
							},
							earth: function() {
								return Arcini.Formula.attribute(this.base.values[2], this.spent.values[2]);
							},
							fire: function() {
								return Arcini.Formula.attribute(this.base.values[3], this.spent.values[3]);
							},
							water: function() {
								return Arcini.Formula.attribute(this.base.values[4], this.spent.values[4]);
							},
							elementTotal: function() {
								return Arcini.Formula.attribute(Arcini.Formula.attributes.elementTotal(this.base.values), Arcini.Formula.attributes.elementTotal(this.spent.values));
							},
							total: function() {
								return Arcini.Formula.attribute(Arcini.Formula.attributes.total(this.base.values), Arcini.Formula.attributes.total(this.spent.values));
							}
						};
					}());

					var resistances = (function() {
						return {
							physical: function() {
								return Arcini.Formula.resistance(attributes.blood(), attributes.total());
							},
							air: function() {
								return Arcini.Formula.resistance(attributes.air(), attributes.total());
							},
							earth: function() {
								return Arcini.Formula.resistance(attributes.earth(), attributes.total());
							},
							fire: function() {
								return Arcini.Formula.resistance(attributes.fire(), attributes.total());
							},
							water: function() {
								return Arcini.Formula.resistance(attributes.water(), attributes.total());
							}
						};
					}());

					var offence = (function() {
						return {
							physical: function () {
								return Arcini.Formula.offence(attributes.blood(), [ attributes.earth(), attributes.fire() ], attributes.total());
							},
							elemental: function() {
								return Arcini.Formula.offence(attributes.blood(), [ attributes.air(), attributes.fire() ], attributes.total());
							}
						};
					}());

					var defence = (function() {
						return {
							physical: function() {
								return Arcini.Formula.defence(attributes.blood(), [ attributes.earth(), attributes.water() ], attributes.total());
							},
							elemental: function() {
								return Arcini.Formula.defence(attributes.blood(), [ attributes.air(), attributes.water() ], attributes.total());	
							}
						};
					}());

					var health = (function() {
						return {
							damage: 0,
							max: function() {
								return Arcini.Formula.health(attributes.blood(), attributes.earth());
							},
							current: function() {
								return this.max() - this.damage;
							},
							dealDamage: function() {
								this.damage = Arcini.Formula.add(this.damage, this.max());
							},
							heal: function() {
								this.damage = Arcini.Formula.remove(this.damage, 0);
							}
						};
					}());

					var speed = function() {
						return Arcini.Formula.speed(attributes.air(), attributes.total());
					};
					
					var extra = (function() {
						return {
							damage: function() {
								return Arcini.Formula.extra(attributes.fire(), attributes.total());
							},
							health: function() {
								return Arcini.Formula.extra(attributes.water(), attributes.total());
							}
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
						extra: extra
					};
				},
			};
		}())
	};
}());
