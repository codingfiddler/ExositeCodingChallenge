'use strict';

angular.module('myApp.marketView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/market', {
    templateUrl: 'market/market.html',
    controller: 'MarketCtrl'
  });
}])

.controller('MarketCtrl', ['$scope','$http', '$location', 'orderService', function($scope, $http, $location, orderService) {

    $scope.init = function(){

        $scope.products = [];
        $scope.orderService = orderService;

        var httpOptions = {
            method: 'GET',
            url: '/products'
        };

        $http(httpOptions)
            .then(response => {
               $scope.products = response.data;
            }, err => {
                //TODO give error message to client
            });
    };

    $scope.orderProduct = function(product){
       $scope.orderService.setCurrentProduct(product);
       $location.path('/order');
    };



    $scope.init();

}]);