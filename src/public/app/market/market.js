'use strict';

angular.module('myApp.marketView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/market', {
    templateUrl: 'market/market.html',
    controller: 'MarketCtrl'
  });
}])

.controller('MarketCtrl', ['$scope','$http', function($scope, $http) {

    $scope.init = function(){

        $scope.products = [];

        var httpOptions = {
            method: 'GET',
            url: '/products'
        };

        $http(httpOptions)
            .then(response => {
               $scope.products = response.data;
               console.log(response.data);
            }, err => {
                //TODO give error message to client
            });
    };

    $scope.init();

}]);