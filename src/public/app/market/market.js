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

        $scope.orderService = orderService;
        $scope.products = [];
        $scope.orderService.getLatestProducts(function(err, data){
           if (err) {
               console.error("Error getting products " + err);
           }
           else {
               $scope.products = data;
           }

        });

    };

    $scope.orderProduct = function(product){
       $scope.orderService.setCurrentProduct(product);
       $location.path('/order');
    };

    $scope.init();

}]);