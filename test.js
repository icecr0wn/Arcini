// For testing only
var app = angular.module('testapp', []);
app.controller('testctl', function($scope) {
	$scope.characters = [
		new Arcini.Model.Character('Jonathan', [ 3, 0, 6, 1, 0 ]),
		new Arcini.Model.Character('Cartha', [ 3, 0, 1, 0, 6 ]),
		new Arcini.Model.Character('Kiara', [ 4, 6, 0, 0, 0 ]),
		new Arcini.Model.Character('Goblin God', [ 11, 0, 7, 7, 0 ]),

	];

	$scope.deleteCharacter = function(idx) {
		$scope.characters.splice(idx, 1);
	};

	$scope.addCharacter = function() {
		$scope.characters.push(new Arcini.Model.Character());
	};
});
