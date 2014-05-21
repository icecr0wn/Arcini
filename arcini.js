var Arcini = (function() {
	var isValueValid = function(value) {
		return (value != undefined && value != null);
	};

	var isNumeric = function(value) {
		return (Arcini.isValueValid(value) && !isNaN(value));
	};

	return {
		isValueValid: isValueValid,
		isNumeric: isNumeric,
		Constants: (function(){
			return {
				maxAttribute: 30,
				minAttribute: 0,
				minBloodAttribute: 3,
				minSpentAttribute: 0
			};
		}()),
		Model: (function() {
			return {
				// Item: function(itemName, description, bonuses, damage, range, physicalResistance, elementalResistance, speedBonus) {
					// /*
						// itemName:string
						// description:string
						// bonuses: [ blood, air, earth, fire, water ]
						// damage:string
						// range:string
						// physicalResistance:int
						// elementalResistance:int
						// speedBonus:int
					// */
					// var name = (Arcini.isValueValid(itemName) ? itemName : '');
					
					// var bonus = (function() {
						// return {
							// blood: Math.floor(Arcini.isNumeric(bonuses[0]) ? bonuses[0] : 3),
							// air: Math.floor(Arcini.isNumeric(bonuses[1]) ? bonuses[1] : 0),
							// earth: Math.floor(Arcini.isNumeric(bonuses[2]) ? bonuses[2] : 0),
							// fire: Math.floor(Arcini.isNumeric(bonuses[3]) ? bonuses[3] : 0),
							// water: Math.floor(Arcini.isNumeric(bonuses[4]) ? bonuses[4] : 0),
							// speed: Math.floor(Arcini.isNumeric(speedBonus)) ? speedBonus : 0
						// };
					// }());
					
					// var resistance = (function() {
						// return {
							// physical: Math.floor(Arcini.isNumeric(physicalResistance) ? physicalResistance : 0),
							// elemental: Math.floor(Arcini.isNumeric(elementalResistance) ? elementalResistance : 0)
						// };
					// }());
					
					// return {
						// name: name,
						// bonus: bonus,
						// resistance: resistance
					// };
				// },
				Character: function(characterName, baseAttributes) {
					/*
						characterName:string
						baseAttributes:[ blood, air, earth, fire, water ]
					*/
					var name = (Arcini.isValueValid(characterName) ? characterName : '');
					
					if (!Arcini.isValueValid(baseAttributes)) {
						baseAttributes = [];
					};

					var attributes = (function() {
						return {
							base: (function() {
								return {
									blood: Math.floor(Arcini.isNumeric(baseAttributes[0]) ? baseAttributes[0] : Arcini.Constants.minBloodAttribute),
									air: Math.floor(Arcini.isNumeric(baseAttributes[1]) ? baseAttributes[1] : Arcini.Constants.minAttribute),
									earth: Math.floor(Arcini.isNumeric(baseAttributes[2]) ? baseAttributes[2] : Arcini.Constants.minAttribute),
									fire: Math.floor(Arcini.isNumeric(baseAttributes[3]) ? baseAttributes[3] : Arcini.Constants.minAttribute),
									water: Math.floor(Arcini.isNumeric(baseAttributes[4]) ? baseAttributes[4] : Arcini.Constants.minAttribute),
									elementTotal: function() {
										return this.air + this.earth + this.fire + this.water;
									},
									total: function() {
										return this.blood + this.elementTotal();
									},
									add: function(attribute) {
										switch (attribute) {
											case 0: this.blood = Math.min(Arcini.Constants.maxAttribute, this.blood + 1); break;
											case 1: this.air = Math.min(Arcini.Constants.maxAttribute, this.air + 1); break;
											case 2: this.earth = Math.min(Arcini.Constants.maxAttribute, this.earth + 1); break;
											case 3: this.fire = Math.min(Arcini.Constants.maxAttribute, this.fire + 1); break;
											case 4: this.water = Math.min(Arcini.Constants.maxAttribute, this.water + 1); break;
										};
									},
									remove: function(attribute) {
										switch (attribute) {
											case 0: this.blood = Math.max(Arcini.Constants.minBloodAttribute, this.blood - 1); break;
											case 1: this.air = Math.max(Arcini.Constants.minAttribute, this.air - 1); break;
											case 2: this.earth = Math.max(Arcini.Constants.minAttribute, this.earth - 1); break;
											case 3: this.fire = Math.max(Arcini.Constants.minAttribute, this.fire - 1); break;
											case 4: this.water = Math.max(Arcini.Constants.minAttribute, this.water - 1); break;
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
											case 0: this.blood = Math.min(attributes.base.blood, this.blood + 1); break;
											case 1: this.air = Math.min(attributes.base.air, this.air + 1); break;
											case 2: this.earth = Math.min(attributes.base.earth, this.earth + 1); break;
											case 3: this.fire = Math.min(attributes.base.fire, this.fire + 1); break;
											case 4: this.water = Math.min(attributes.base.water, this.water + 1); break;
										};
									},
									remove: function(attribute) {
										switch (attribute) {
											case 0: this.blood = Math.max(Arcini.Constants.minSpentAttribute, this.blood - 1); break;
											case 1: this.air = Math.max(Arcini.Constants.minSpentAttribute, this.air - 1); break;
											case 2: this.earth = Math.max(Arcini.Constants.minSpentAttribute, this.earth - 1); break;
											case 3: this.fire = Math.max(Arcini.Constants.minSpentAttribute, this.fire - 1); break;
											case 4: this.water = Math.max(Arcini.Constants.minSpentAttribute, this.water - 1); break;
										};
									}
								};
							}()),
							blood: function() {
								return this.base.blood - this.spent.blood;
							},
							air: function() {
								return this.base.air - this.spent.air;
							},
							earth: function() {
								return this.base.earth - this.spent.earth;
							},
							fire: function() {
								return this.base.fire - this.spent.fire;
							},
							water: function() {
								return this.base.water - this.spent.water;
							},
							elementTotal: function() {
								return this.base.elementTotal() - this.spent.elementTotal();
							},
							total: function() {
								return this.base.total() - this.spent.total();
							}
						};
					}());

					var resistances = (function() {
						return {
							physical: function() {
								return Math.floor(attributes.blood()/5 + attributes.total()/20);
							},
							air: function() {
								return Math.floor(attributes.air()/5 + attributes.total()/20);
							},
							earth: function() {
								return Math.floor(attributes.earth()/5 + attributes.total()/20);
							},
							fire: function() {
								return Math.floor(attributes.fire()/5 + attributes.total()/20);
							},
							water: function() {
								return Math.floor(attributes.water()/5 + attributes.total()/20);
							}
						};
					}());

					var offence = (function() {
						return {
							physical: function () {
								return  Math.floor(0.55 + (attributes.blood()/2 + attributes.earth() + attributes.fire())/5 + attributes.total()/20);
							},
							elemental: function() {
								return Math.floor(0.55 + (attributes.blood()/2 + attributes.air() + attributes.fire())/5 + attributes.total()/20);
							}
						};
					}());

					var defence = (function() {
						return {
							physical: function() {
								return Math.floor((attributes.blood()/2 + attributes.earth() + attributes.water())/5 + attributes.total()/20);
							},
							elemental: function() {
								return Math.floor((attributes.blood()/2 + attributes.air() + attributes.water())/5 + attributes.total()/20);
							}
						};
					}());

					var health = (function() {
						return {
							damage: 0,
							max: function() {
								return Math.floor(attributes.blood()*3 + attributes.earth());
							},
							current: function() {
								return this.max() - this.damage;
							},
							dealDamage: function() {
								this.damage = Math.min(this.max(), this.damage + 1);
							},
							heal: function() {
								this.damage = Math.max(0, this.damage - 1);
							}
						};
					}());

					var speed = function() {
						return Math.floor(4 + attributes.air()/5);
					};
					
					var extra = (function() {
						return {
							damage: function() {
								return Math.floor(attributes.fire()/5 + attributes.total()/10);
							},
							health: function() {
								return Math.floor(attributes.water()/5 + attributes.total()/10);
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
