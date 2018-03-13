'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.marketView',
  'myApp.order',
    'myApp.confirmation'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/market'});
}]);

//Initialize Material design
$(document).ready(function() { $('body').bootstrapMaterialDesign(); });
