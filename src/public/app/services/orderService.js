/* Service to store currently selected product */

angular.module('myApp')
    .factory('orderService', function () {
        var service = {};
        var currentProduct;

        service.setCurrentProduct = function (product) {
            currentProduct = product;
        };
        service.getCurrentProduct = function () {
            return currentProduct;
        };

        service.clearCurrentProduct = function () {
            currentProduct = undefined;
        };

        service.isProductSelected = function () {
            return currentProduct !== undefined;
        };

        return service;
    });