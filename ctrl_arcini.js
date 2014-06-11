var arcini = angular.module('Arcini.Module.Arcini', []);

arcini.factory('Arcini.Factory.Character', function() {
	var create = function(characterName, attributes, deity) {
		if (!characterName) {
			characterName = '<choose name>'
		};

		if (!attributes) {
			attributes = [ 0, 0, 0, 0, 0 ];
		};

		if (!deity) {
			deity = 0;
		}

		return new Arcini.Model.Character(characterName, [ 0, 0, 0, 0, 0 ], 0);
	};

	return {
		create: create
	};
});

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

arcini.controller('Arcini.Controller.Creator', [ '$scope', 'Arcini.Service.Character', function($scope, character) {
	$scope.service = {};
	$scope.service.character = character;
	
	$scope.list = {};
	$scope.list.characters = character.list();

	$scope.deities = Arcini.Constants.Deities().List;

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

