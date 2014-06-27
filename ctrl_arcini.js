var arcini = angular.module('Arcini.Module.Arcini', []);

arcini.factory('Arcini.Factory.Character', [ 'Arcini.Service.Deity', 'Arcini.Service.Constants', function(service, constants) {
	var create = function(name, attributes, deity) {
		if (!name) {
			name = '<choose name>'
		};

		if (!attributes) {
			attributes = constants.Attributes.Base();
		};

		if (!deity) {
			deity = 0;
		}

		return new Arcini.Model.Character(name, attributes, service.get(0), constants);
	};

	return {
		create: create
	};
}]);

arcini.factory('Arcini.Factory.Deity', [ 'Arcini.Service.Constants' , function(constants) {
	var create = function(name, attributes, resistances) {
		if (!name) {
			name = '<choose>'
		};

		if (!attributes) {
			attributes = constants.Attributes.Base();
		};

		if (!resistances) {
			resistances = constants.Attributes.Base();
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
	var deities = [
		{ id: 0, name: '<choose>', value: factory.create('<choose>', [ 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0 ]) },
		{ id: 1, name: 'Almarea', value: factory.create('Almarea', [ 3, 3, 0, 0, 0 ], [ 0, 2, 0, 0, 0 ]) },
		{ id: 2, name: 'Baramaethor', value: factory.create('Baramaethor', [ 3, 0, 0, 3, 0 ], [ 0, 0, 0, 2, 0 ]) },
		{ id: 3, name: 'Eferhilda', value: factory.create('Eferhilda', [ 3, 0, 0, 0, 3 ], [ 0, 0, 0, 0, 2 ]) },
		{ id: 4, name: 'Herion', value: factory.create('Herion', [ 3, 0, 2, 0, 1 ], [ 0, 0, 1, 0, 1 ]) },
		{ id: 5, name: 'Jade', value: factory.create('Jade', [ 3, 1, 0, 2, 0 ], [ 0, 1, 0, 1, 0 ]) },
		{ id: 6, name: 'Khalon', value: factory.create('Khalon', [ 3, 0, 3, 0, 0 ], [ 0, 0, 2, 0, 0 ]) },
		{ id: 7, name: 'Lovisa', value: factory.create('Lovisa', [ 3, 2, 0, 0, 1 ], [ 0, 1, 0, 0, 1 ]) },
		{ id: 8, name: 'Naerdiel', value: factory.create('Naerdiel', [ 5, 1, 0, 0, 0 ], [ 2, 0, 0, 0, 0 ]) },
		{ id: 9, name: 'Zebulon', value: factory.create('Zebulon', [ 3, 0, 2, 1, 0 ], [ 0, 0, 1, 1, 0 ]) }
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

arcini.service('Arcini.Service.Constants', function() {
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

	return {
		Max: max,
		Min: min,
		Attributes: attributes,
	};
});

arcini.controller('Arcini.Controller.Creator', [ '$scope', 'Arcini.Service.Character', 'Arcini.Service.Deity', 'Arcini.Service.Constants', function($scope, character, deity, constants) {
	$scope.service = {};
	$scope.service.character = character;
	$scope.service.deity = deity;

	$scope.list = {};
	$scope.list.characters = character.list();
	$scope.list.deities = deity.list();
	
	$scope.constants = constants;

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

