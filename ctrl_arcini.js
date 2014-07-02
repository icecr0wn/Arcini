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
			deity = 0;
		}

		return new Arcini.Model.Character(name, attributes, service.get(0));
	};

	return {
		create: create
	};
}]);

arcini.factory('Arcini.Factory.Deity', [ function() {
	var create = function(name, attributes, resistances) {
		if (!name) {
			name = '<choose>'
		};

		if (!attributes) {
			attributes = [ 0, 0, 0, 0, 0 ];
		};

		if (!resistances) {
			resistances = [ 0, 0, 0, 0, 0 ];
		}

		return new Arcini.Model.Deity(name, attributes, resistances);
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
/*
Jade, Goddess of Fire and Air
*/
	var deities = [
		{ id: 0, name: '<choose>', value: factory.create('<choose>', ' ', [ 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0 ]) },
		{ id: 1, name: 'Almarea', value: factory.create('Almarea', 'Goddess of Wind', [ 3, 3, 0, 0, 0 ], [ 0, 2, 0, 0, 0 ]) },
		{ id: 2, name: 'Baramaethor', value: factory.create('Baramaethor', 'God of Fire', [ 3, 0, 0, 3, 0 ], [ 0, 0, 0, 2, 0 ]) },
		{ id: 3, name: 'Eferhilda', value: factory.create('Eferhilda', 'Goddess of Healing', [ 3, 0, 0, 0, 3 ], [ 0, 0, 0, 0, 2 ]) },
		{ id: 4, name: 'Herion', value: factory.create('Herion', 'God of Seas', [ 3, 0, 1, 0, 2 ], [ 0, 0, 1, 0, 1 ]) },
		{ id: 5, name: 'Jade', value: factory.create('Jade', 'Goddess of Flames', [ 3, 1, 0, 2, 0 ], [ 0, 1, 0, 1, 0 ]) },
		{ id: 6, name: 'Khalon', value: factory.create('Khalon', 'God of Men', [ 3, 0, 3, 0, 0 ], [ 0, 0, 2, 0, 0 ]) },
		{ id: 7, name: 'Lovisa', value: factory.create('Lovisa', 'Goddess of Ice', [ 3, 2, 0, 0, 1 ], [ 0, 1, 0, 0, 1 ]) },
		{ id: 8, name: 'Naerdiel', value: factory.create('Naerdiel', 'Goddess of The Nether', [ 5, 1, 0, 0, 0 ], [ 2, 0, 0, 0, 0 ]) },
		{ id: 9, name: 'Zebulon', value: factory.create('Zebulon', 'God of Battle', [ 3, 0, 2, 1, 0 ], [ 0, 0, 1, 1, 0 ]) }
	];

	var get = function(index) {
		return deities[index];
	};

	var list = function() {
		return deities;
	};

	return {
		get: get,
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

