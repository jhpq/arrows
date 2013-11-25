'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
	'myApp.filters',
	'myApp.services',
	'myApp.directives',
	'myApp.myServices', 
	'myApp.myMsgServices',
	'myApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {templateUrl: 'public/partials/partial1.html', controller: 'MyCtrl1'});
    $routeProvider.when('/car', {templateUrl: 'public/partials/car.html', controller: 'MyCtrl2'});
    $routeProvider.otherwise({redirectTo: '/view1'});
  }]);
