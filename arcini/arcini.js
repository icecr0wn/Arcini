var Arcini = (function() {
	return {
		Model: (function() {
			return {
				Character: function(characterName, baseAttributes, chosenDeity) {
					var name = (!characterName ? '' : characterName);

					if (!baseAttributes) {
						baseAttributes = [ 0, 0, 0, 0, 0 ];
					};

					var attributes = (function() {
						var base = (function() {
							var _values = baseAttributes;

							var attribute = function(id) {
								return _values[id];
							};

							var add = function(id) {
								_values[id] = Math.min(_values[id] + 1, 30);
							};

							var remove = function(id) {
								_values[id] = Math.max(_values[id] - 1, attributes.spent.attribute(id));
							};

							var total = function() {
								return _values.reduce(function(previous, current) {
									return previous + current;
								});
							};

							return {
								attribute: attribute,
								add: add,
								remove: remove,
								total: total
							};
						}());

						var spent = (function() {
							var _values = [ 0, 0, 0, 0, 0 ];

							var attribute = function(id) {
								return _values[id];
							};

							var add = function(id) {
								_values[id] = Math.min(_values[id] + 1, attributes.base.attribute(id) + deity.deity().attribute(id));
							};

							var remove = function(id) {
								_values[id] = Math.max(_values[id] - 1, 0);
							};

							var total = function() {
								return _values.reduce(function(previous, current) {
									return previous + current;
								});
							};

							return {
								attribute: attribute,
								add: add,
								remove: remove,
								total: total
							};
						}());

						var blood = function() {
							return base.attribute(0) - spent.attribute(0) + deity.deity().attribute(0);
						};

						var air = function() {
							return base.attribute(1) - spent.attribute(1) + deity.deity().attribute(1);
						};

						var earth = function() {
							return base.attribute(2) - spent.attribute(2) + deity.deity().attribute(2);
						};

						var fire = function() {
							return base.attribute(3) - spent.attribute(3) + deity.deity().attribute(3);
						};

						var water = function() {
							return base.attribute(4) - spent.attribute(4) + deity.deity().attribute(4);
						};

						var total = function() {this
							return base.total() - spent.total() + deity.deity().total();
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
							return Math.floor(attributes.blood()/5 + attributes.total()/20 + deity.deity().resistance(0));
						};

						var air = function() {
							return Math.floor(attributes.air()/5 + attributes.total()/20 + deity.deity().resistance(1));
						};

						var earth = function() {
							return Math.floor(attributes.earth()/5 + attributes.total()/20 + deity.deity().resistance(2));
						};

						var fire = function() {
							return Math.floor(attributes.fire()/5 + attributes.total()/20 + deity.deity().resistance(3));
						};

						var water = function() {
							return Math.floor(attributes.water()/5 + attributes.total()/20 + deity.deity().resistance(4));
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
						var _damage = 0;

						var max = function() {
							return Math.floor(attributes.blood()*3 + attributes.earth());
						};

						var current = function() {
							return max() - _damage;
						};

						var damage = function() {
							return _damage;
						};

						var harm = function() {
							_damage = Math.min(_damage + 1, max());
						};

						var heal = function() {
							_damage = Math.max(_damage - 1, 0);
						};

						return {
							max: max,
							current: current,
							damage: damage,
							harm: harm,
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
						var _id = chosenDeity.id
						var _deity = chosenDeity.value;

						var set = function(chosenDeity) {
							_id = chosenDeity.id;
							_deity = chosenDeity.value;
						};

						var index = function() {
							return _id;
						};

						var deity = function() {
							return _deity;
						}

						return {
							set: set,
							index: index,
							deity: deity
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
				Deity: function(deityName, deityTitle, attributes, resistances) {
					var _name = (!deityName ? '' : deityName);
					var _title = (!deityTitle ? '' : deityTitle);
					var _attributes = (!attributes ? [ 0, 0, 0, 0, 0 ] : attributes);
					var _resistances = (!resistances ? [ 0, 0, 0, 0, 0 ] : resistances);

					var name = function() {
						return _name;
					};

					var title = function() {
						return _title;
					};

					var attribute = function(index) {
						return _attributes[index];
					}

					var resistance = function(index) {
						return _resistances[index];
					}

					var total = function() {
						return _attributes.reduce(function(previous, current) {
							return previous + current;
						});
					};

					return {
						name: name,
						title: title,
						attribute: attribute,
						resistance: resistance,
						total: total
					};
				},
				Spell: function(spellName, spellType, spellDescription, spellDamage /*not used*/, spellRange /*not used*/, spellEffect /*not used*/) {
					var _name = (!spellName ? '' : spellName);
					var _title = (!spellType ? '' : spellType);
					var _description = (!spellDescription? '' : spellDescription);

					var name = function() {
						return _name;
					};

					var title = function() {
						return _title;
					};

					var description = function() {
						return _description;
					};

					return {
						name: name,
						title: title,
						description: description
					};
				}
			};
		}()),
	};
}());
