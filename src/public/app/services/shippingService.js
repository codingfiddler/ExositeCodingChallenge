/* Service to calculate shipping and handling based on the selected US state */

angular.module('myApp')
    .factory('shippingService', function () {
        var service = {};

        service.calculateShipping = function(state){

            var cost;

            switch (state){
                case 'MN':
                    cost = 0;
                    break;
                case 'NY':
                case 'CA':
                case 'MA':
                    cost = 7.5;
                    break;
                case 'GA':
                case 'AL':
                case 'FL':
                    cost = 3.99;
                    break;
                default:
                    cost = 5.99;
            }

            return cost;

        };

        return service;
    });