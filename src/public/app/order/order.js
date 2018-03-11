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
       $scope.messages = [];

       $scope.location = $location;
       $scope.orderService = orderService;
       $scope.product = $scope.orderService.getCurrentProduct();

       $scope.shippingService = shippingService;
   };

   $scope.getMessageClass = function(message){
       console.log(message);
       var cssClass = '';

       switch(message.type) {
           case 'error':
               cssClass = 'alert alert-danger';
               break;
           case 'info':
               cssClass = 'alert alert-info';
               break;
           default:
               cssClass = 'alert alert-primary';
       }

       return cssClass;
   };

   $scope.calculateTotal = function(){
     $scope.shippingHandlingCost = $scope.shippingService.calculateShipping($scope.state);
     $scope.totalCost = $scope.shippingHandlingCost + $scope.product.price;
     console.log($scope.shippingForm);
   };

   $scope.submit = function() {

       $scope.messages = [];


       var zipRegex = /\d{5}/;
       var match = $scope.zipcode.match(zipRegex);

       if (match) {
           // Good zip code
           // Form is valid, buy the selected product and send user to the Thank You page
           $scope.orderService.buyCurrentProduct();
           $location.path('/confirmation')
       }
       else{
           //Not a valid zip code, show error message
           $scope.messages.push({text: 'Please enter a valid zip code, e.g. 55102', type: 'error'});
       }
   };

   $scope.init();
}]);