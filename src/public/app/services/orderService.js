/* Service to store currently selected product */

angular.module('myApp')
    .factory('orderService', function () {
        var service = {};
        var currentProduct;
        var lastOrderedProduct;

        // Methods to save and retrieve product data to local storage

        var init = function(){
            currentProduct = getProductFromStorage('currentProduct');
            lastOrderedProduct = getProductFromStorage('lastOrderedProduct')
        };

        var saveProductToStorage = function(key, product) {
            localStorage.setItem(key, JSON.stringify(product));
        };

        var getProductFromStorage = function(productKey) {

            var productString = localStorage.getItem(productKey);

            // Handle case where product might not have been saved yet
            if (productString) {
                return JSON.parse(productString);
            }
        };

        var clearProductFromStorage = function(productKey) {
           localStorage.removeItem(productKey);
        };

        service.setCurrentProduct = function (product) {
            currentProduct = product;
            saveProductToStorage('currentProduct', currentProduct);
        };

        service.getCurrentProduct = function () {
            return currentProduct;
        };

        service.clearCurrentProduct = function () {
            currentProduct = undefined;
            clearProductFromStorage('currentProduct');
        };

        service.getLastOrderedProduct = function() {
           return lastOrderedProduct;
        };

        service.buyCurrentProduct = function(){
            lastOrderedProduct = currentProduct;
            saveProductToStorage('lastOrderedProduct', lastOrderedProduct);
            clearProductFromStorage('currentProduct');
        };

        service.isProductSelected = function () {
            return currentProduct !== undefined;
        };

        init();

        return service;
    });