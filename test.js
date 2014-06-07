// For testing only
var app = angular.module('testapp', []);
app.controller('testctl', function($scope) {
	$scope.deities = Arcini.Constants.Deities().List;	

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