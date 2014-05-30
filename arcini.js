var Arcini = (function() {
	return {
		Constants: (function(){
			return {
				maxAttribute: function() {
					return 30;
				},
				minAttribute: function() {
					return 0;
				},
				minBloodAttribute: function() {
					return 3;
				},
				minSpentAttribute: function() {
					return 0;
				}
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
					return Math.floor(4 + air/5);
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
				}
			};
		}()),
		Model: (function() {
			return {
				Character: function(characterName, baseAttributes) {
					/*
					 * class Character(
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
						baseAttributes = [];
					};

					var attributes = (function() {
						return {
							base: (function() {
								return {
									blood: Math.floor(angular.isNumber(baseAttributes[0]) ? baseAttributes[0] : Arcini.Constants.minBloodAttribute()),
									air: Math.floor(angular.isNumber(baseAttributes[1]) ? baseAttributes[1] : Arcini.Constants.minAttribute()),
									earth: Math.floor(angular.isNumber(baseAttributes[2]) ? baseAttributes[2] : Arcini.Constants.minAttribute()),
									fire: Math.floor(angular.isNumber(baseAttributes[3]) ? baseAttributes[3] : Arcini.Constants.minAttribute()),
									water: Math.floor(angular.isNumber(baseAttributes[4]) ? baseAttributes[4] : Arcini.Constants.minAttribute()),
									elementTotal: function() {
										return this.air + this.earth + this.fire + this.water;
									},
									total: function() {
										return this.blood + this.elementTotal();
									},
									add: function(attribute) {
										switch (attribute) {
											case 0: this.blood = Arcini.Formula.add(this.blood, Arcini.Constants.maxAttribute()); break; 
											case 1: this.air = Arcini.Formula.add(this.air, Arcini.Constants.maxAttribute()); break; 
											case 2: this.earth = Arcini.Formula.add(this.earth, Arcini.Constants.maxAttribute()); break; 
											case 3: this.fire = Arcini.Formula.add(this.fire, Arcini.Constants.maxAttribute()); break; 
											case 4: this.water = Arcini.Formula.add(this.water, Arcini.Constants.maxAttribute()); break; 
										};
									},
									remove: function(attribute) {
										switch (attribute) {
											case 0: this.blood = Arcini.Formula.remove(this.blood, Arcini.Constants.minBloodAttribute()); break; 
											case 1: this.air = Arcini.Formula.remove(this.air, Arcini.Constants.minAttribute()); break; 
											case 2: this.earth = Arcini.Formula.remove(this.earth, Arcini.Constants.minAttribute()); break; 
											case 3: this.fire = Arcini.Formula.remove(this.fire, Arcini.Constants.minAttribute()); break; 
											case 4: this.water = Arcini.Formula.remove(this.water, Arcini.Constants.minAttribute()); break; 
										};
									}
								};
							}()),
							spent: (function() {
								return {
									blood: 0,
									air: 0,
									earth: 0,
									fire: 0,
									water: 0,
									elementTotal: function() {
										return this.air + this.earth + this.fire + this.water;
									},
									total: function() {
										return this.blood + this.elementTotal();
									},
									add: function(attribute) {
										switch (attribute) {
											case 0: this.blood = Arcini.Formula.add(this.blood, attributes.base.blood); break;
											case 1: this.air = Arcini.Formula.add(this.air, attributes.base.air); break;
											case 2: this.earth = Arcini.Formula.add(this.earth, attributes.base.earth); break;
											case 3: this.fire = Arcini.Formula.add(this.fire, attributes.base.fire); break;
											case 4: this.water = Arcini.Formula.add(this.water, attributes.base.water); break;
										};
									},
									remove: function(attribute) {
										switch (attribute) {
											case 0: this.blood = Arcini.Formula.remove(this.blood, Arcini.Constants.minSpentAttribute()); break;
											case 1: this.air = Arcini.Formula.remove(this.air, Arcini.Constants.minSpentAttribute()); break;
											case 2: this.earth = Arcini.Formula.remove(this.earth, Arcini.Constants.minSpentAttribute()); break;
											case 3: this.fire = Arcini.Formula.remove(this.fire, Arcini.Constants.minSpentAttribute()); break;
											case 4: this.water = Arcini.Formula.remove(this.water, Arcini.Constants.minSpentAttribute()); break;
										};
									}
								};
							}()),
							blood: function() {
								return Arcini.Formula.attribute(this.base.blood, this.spent.blood);
							},
							air: function() {
								return Arcini.Formula.attribute(this.base.air, this.spent.air);
							},
							earth: function() {
								return Arcini.Formula.attribute(this.base.earth, this.spent.earth);
							},
							fire: function() {
								return Arcini.Formula.attribute(this.base.fire, this.spent.fire);
							},
							water: function() {
								return Arcini.Formula.attribute(this.base.water, this.spent.water);
							},
							elementTotal: function() {
								return Arcini.Formula.attribute(this.base.elementTotal(), this.spent.elementTotal());
							},
							total: function() {
								return Arcini.Formula.attribute(this.base.total(), this.spent.total());
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
				}
			};
		}())
	};
}());
