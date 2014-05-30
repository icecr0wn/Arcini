// For testing only
var app = angular.module('testapp', []);
app.controller('testctl', function($scope) {
	$scope.characters = [
	];

	$scope.deleteCharacter = function(idx) {
		$scope.characters.splice(idx, 1);
	};

	$scope.addCharacter = function() {
		$scope.characters.push(new Arcini.Model.Character());
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