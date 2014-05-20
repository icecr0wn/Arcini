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
					var damageTaken = 5;
					
					if (!Arcini.isValueValid(baseAttributes)) {
						baseAttributes = [];
					};

					var attributes = (function() {
						return {
							base: (function() {
								return {
									blood: Math.floor(Arcini.isNumeric(baseAttributes[0]) ? baseAttributes[0] : 3),
									air: Math.floor(Arcini.isNumeric(baseAttributes[1]) ? baseAttributes[1] : 0),
									earth: Math.floor(Arcini.isNumeric(baseAttributes[2]) ? baseAttributes[2] : 0),
									fire: Math.floor(Arcini.isNumeric(baseAttributes[3]) ? baseAttributes[3] : 0),
									water: Math.floor(Arcini.isNumeric(baseAttributes[4]) ? baseAttributes[4] : 0),
									elementTotal: function() {
										return this.air + this.earth + this.fire + this.water;
									},
									total: function() {
										return this.blood + this.elementTotal();
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

app.directive('integer', function() {
    return {
        require: 'ngModel',
        link: function(scope, ele, attr, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
            	if (viewValue == undefined || viewValue == null) {
            		return 0;
            	}
                return parseInt(viewValue);
            });
        }
    };
});