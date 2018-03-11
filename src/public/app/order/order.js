'use strict';

angular.module('myApp.order', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/order', {
    templateUrl: 'order/order.html',
    controller: 'OrderCtrl'
  });
}])

.controller('OrderCtrl', ['$scope', '$location', 'orderService', 'shippingService', function($scope, $location, orderService, shippingService) {
   $scope.init = function(){

       $scope.states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];

       //Is this necessary?
       $scope.location = $location;
       $scope.orderService = orderService;
       $scope.product = $scope.orderService.getCurrentProduct();

       $scope.shippingService = shippingService;


   };

   $scope.calculateTotal = function(){
     $scope.shippingHandlingCost = $scope.shippingService.calculateShipping($scope.state);
     $scope.totalCost = $scope.shippingHandlingCost + $scope.product.price;
   };

   $scope.submit = function() {
      console.log($scope.shippingForm);

      if (!$scope.shippingForm.$valid) {
        // Display an error message with extra details on what's missing
      }
      else {
        // Form is valid, send user to the Thank You page
      }
   };

   $scope.init();
}]);