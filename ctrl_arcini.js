var arcini = angular.module('Arcini.Module.Arcini', []);

arcini.factory('Arcini.Factory.Character', [ 'Arcini.Service.Deity', function(service) {
	var create = function(name, attributes, deity) {
		if (!name) {
			name = '<choose name>'
		};

		if (!attributes) {
			attributes = [ 0, 0, 0, 0, 0 ];
		};

		if (!deity) {
			deity = Math.floor(Math.random() * (service.count() + 1));
		}

		return new Arcini.Model.Character(name, attributes, service.get(deity));
	};

	return {
		create: create
	};
}]);

arcini.factory('Arcini.Factory.Deity', [ function() {
	var create = function(name, title, attributes, resistances) {
		name = (!name ? '' : name);
		title = (!title ? '' : title);

		if (!attributes) {
			attributes = [ 0, 0, 0, 0, 0 ];
		};

		if (!resistances) {
			resistances = [ 0, 0, 0, 0, 0 ];
		}

		return new Arcini.Model.Deity(name, title, attributes, resistances);
	};

	return {
		create: create
	};
}]);

arcini.factory('Arcini.Factory.Spell', [ function() {
	var create = function(name, type, description, damage, range, effect) {
		name = (!name ? '' : name);
		title = (!type ? '' : type);
		description = (!description? '' : description);
		
		return new Arcini.Model.Spell(name, type, description, /* damage, range, effect */);
	};
	
	return {
		create: create
	};
}]);

arcini.service('Arcini.Service.Character', [ 'Arcini.Factory.Character', function(factory) {
	var characters = [];

	var add = function() {
		characters.push(factory.create());
	};

	var remove = function(index) {
		characters.splice(index, 1);
	};

	var get = function(index) {
		return characters[index];
	};

	var list = function() {
		return characters;
	};

	return {
		add: add,
		remove: remove,
		get: get,
		list: list
	};
}]);

arcini.service('Arcini.Service.Deity', [ 'Arcini.Factory.Deity', function(factory) {
	// @note Generated names for Deities come from: www.fantasynamegenerators.com/god-names.php
	// All possibilities left:
	/*
		[ 3, 0, 0, 1, 2]
		[ 3, 0, 0, 2, 1]
		[ 3, 0, 1, 0, 2]
		[ 3, 0, 1, 1, 1]
		[ 3, 0, 1, 2, 0]
		[ 3, 0, 2, 1, 0]
		[ 3, 1, 0, 1, 1]
		[ 3, 1, 1, 0, 1]
		[ 3, 1, 2, 0, 0]
		[ 3, 2, 0, 1, 0]
		[ 3, 2, 1, 0, 0]
		[ 3, 3, 0, 0, 0]
	*/
	var deities = [
		{ id: 0, name: 'Homes', value: factory.create('Homes', 'God of Fire', [ 3, 0, 0, 3, 0 ], [ 1, 0, 0, 2, 0 ]) },
		{ id: 1, name: 'Iion', value: factory.create('Iion', 'God of Summer', [ 3, 1, 1, 1, 0 ], [ 0, 1, 1, 1, 0 ]) },
		{ id: 2, name: 'Isgyn', value: factory.create('Isgyn', 'Goddess of Magic', [ 3, 2, 0, 0, 1 ], [ 1, 1, 0, 0, 1 ]) },
		{ id: 3, name: 'Jurheia', value: factory.create('Jurheia', 'Goddess of Rivers', [ 3, 0, 0, 0, 3 ], [ 1, 0, 0, 0, 2 ]) },
		{ id: 4, name: 'Obhena', value: factory.create('Obhena', 'God of the Land', [ 3, 0, 2, 0, 1 ], [ 1, 0, 1, 0, 1 ]) },
		{ id: 5, name: 'Ubris', value: factory.create('Ubris', 'God of Winter', [ 3, 1, 0, 0, 2 ], [ 1, 1, 0, 0, 1 ]) },
		{ id: 6, name: 'Uqdea', value: factory.create('Uqdea', 'God of Day', [ 3, 1, 0, 2, 0 ], [ 1, 1, 0, 1, 0 ]) },
		{ id: 7, name: 'Xevdione', value: factory.create('Xevdione', 'Goddess of Earth', [ 3, 0, 3, 0, 0 ], [ 1, 0, 2, 0, 0 ]) },
	];

	var get = function(index) {
		return deities[index];
	};
	
	var count = function() {
		return 8; // @note The Arcini.Service.Deity.count() must be updated manually.
	};

	var list = function() {
		return deities;
	};

	return {
		get: get,
		count: count,
		list: list
	};
}]);

arcini.controller('Arcini.Controller.Creator', [ '$scope', 'Arcini.Service.Character', 'Arcini.Service.Deity', function($scope, character, deity) {
	$scope.service = {};
	$scope.service.character = character;
	$scope.service.deity = deity;

	$scope.list = {};
	$scope.list.characters = character.list();
	$scope.list.deities = deity.list();
	
	$scope.addCharacter = function() {
		character.add();
	};

	$scope.deleteCharacter = function(index) {
		character.remove(index);
	};
}]);

arcini.directive('integer', function() {
    return {
        require: 'ngModel',
        link: function(scope, ele, attr, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
            	if (!viewValue) {
            		return 0;
            	}
                return parseInt(viewValue);
            });
        }
    };
});

