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
       $scope.submitDisabled = false;

       $scope.location = $location;
       $scope.orderService = orderService;
       $scope.product = $scope.orderService.getCurrentProduct();
       $scope.formdata = $scope.orderService.getShippingDetails();

       $scope.$watchCollection('formdata', function(){
          // Save current shipping details to local storage so the user doesn't have to enter them extraneously
          $scope.orderService.saveShippingDetails($scope.formdata);
       });

       if (!$scope.product) {
           // User navigated to the Order page after purchasing a product, send them to the market page since there's
           // nothing they can do here

           $location.path('/market');
       }

       $scope.shippingService = shippingService;
   };

   $scope.getMessageClass = function(message){
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

   $scope.validateZipCode = function(){
       // Target zip codes specifically as this is the only field with a particular pattern requirement.

       //If fields other than zip are added this should be extracted to a more general purpose method
       $scope.messages = [];

       var zipRegex = /^\d{5}$/;
       if ($scope.formdata.zipcode) {
           // Only evaluate if there's a value entered
           var match = $scope.formdata.zipcode.match(zipRegex);

           if (match) {
               $scope.submitDisabled = false;
               return true;
           }
           else{
               //Not a valid zip code, show error message
               $scope.messages.push({text: 'Please enter a valid zip code, e.g. 55102', type: 'error'});
               $scope.submitDisabled = true;
               return false;
       }

       }
       else {
           // No value entered (user deleted their entry, etc.). Don't show an error and unlock the submit button to
           // enable required field messages for the user

           $scope.messages = [];
           $scope.submitDisabled = false;
       }
   };

   $scope.calculateTotal = function() {
     $scope.shippingHandlingCost = $scope.shippingService.calculateShipping($scope.state);
     $scope.totalCost = $scope.shippingHandlingCost + $scope.product.price;
   };

   $scope.submit = function() {

       // Form is valid, buy the selected product and send user to the Thank You page
       $scope.orderService.buyCurrentProduct();
       $location.path('/confirmation')


   };

   $scope.init();
}]);