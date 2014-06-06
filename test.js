// For testing only
var app = angular.module('testapp', []);
app.controller('testctl', function($scope) {
	$scope.deities = [
		{ name: '<choose>', value: new Arcini.Model.Deity('<choose>', [ 3, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0 ]) },
		{ name: 'Almarea', value: new Arcini.Model.Deity('Almarea', [ 3, 3, 0, 0, 0 ], [ 0, 2, 0, 0, 0 ]) },
		{ name: 'Baramethor', value: new Arcini.Model.Deity('Baramaethor', [ 3, 0, 0, 3, 0 ], [ 0, 0, 0, 2, 0 ]) },
		{ name: 'Eferhilda', value: new Arcini.Model.Deity('eferhilda', [ 3, 0, 0, 0, 3 ], [ 0, 0, 0, 0, 2 ]) },
		{ name: 'Herion', value: new Arcini.Model.Deity('Herion', [ 3, 0, 2, 0, 1 ], [ 0, 0, 1, 0, 1 ]) },
		{ name: 'Jade', value: new Arcini.Model.Deity('Jade', [ 3, 1, 0, 2, 0 ], [ 0, 1, 0, 1, 0 ]) },
		{ name: 'Khalon', value: new Arcini.Model.Deity('Khalon', [ 3, 0, 3, 0, 0 ], [ 0, 0, 2, 0, 0 ]) },
		{ name: 'Lovisa', value: new Arcini.Model.Deity('Lovisa', [ 3, 2, 0, 0, 1 ], [ 0, 1, 0, 0, 1 ]) },
		{ name: 'Naerdiel', value: new Arcini.Model.Deity('Naerdiel', [ 5, 1, 0, 0, 0 ], [ 2, 0, 0, 0, 0 ]) },
		{ name: 'Zebulon', value: new Arcini.Model.Deity('Zebulon', [ 3, 0, 2, 1, 0 ], [ 0, 0, 1, 1, 0 ]) },
	];

	$scope.characters = [
		new Arcini.Model.Character('Jonathan', [ 0, 0, 0, 0, 0 ], $scope.deities[6]),
		new Arcini.Model.Character('Cartha', [ 0, 0, 0, 0, 0 ], $scope.deities[3])
	];

	$scope.deleteCharacter = function(idx) {
		$scope.characters.splice(idx, 1);
	};

	$scope.addCharacter = function() {
		$scope.characters.push(new Arcini.Model.Character('<choose name>', [ 0, 0, 0, 0, 0 ], $scope.deities[0]));
	};	
});

app.directive('integer', function() {
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