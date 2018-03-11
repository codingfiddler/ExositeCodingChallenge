const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const constants = require('../constants/constants');

/* Return a list of all products */
router.get('/', function(req, res, next) {

    /* Try to read the products data file, throw an error on failure */
        let productsStream = fs.createReadStream(constants.dataFile);
        let productsJSONString = '';

        productsStream.on('data', function(chunk){
           productsJSONString += chunk;
        });

        productsStream.on('end', function(){

            try {
                let productsJSON = JSON.parse(productsJSONString);
                res.status(200).json(productsJSON.products);
            }
            catch (e) {
                let error = new Error(e);
                next(e);
            }

        });

        productsStream.on('error', function(e){
            productsStream.close();
            let error = new Error(e);
           next(error);
        });

});

router.get('/:sku', function(req, res, next) {

    const sku = req.params.sku;

    /* Try to read the products data file and get the product with this ID, throw an error on failure */
    let productsStream = fs.createReadStream(constants.dataFile);
    let productsJSONString = '';

    productsStream.on('data', function(chunk){
        productsJSONString += chunk;
    });

    productsStream.on('end', function(){

        try {
            let productsJSON = JSON.parse(productsJSONString);

            let product = productsJSON.products.find(p => p.sku === sku);

            if (product) {
                res.status(200).json(product);
            }
            else {
                res.status(404).send('Product not found');
            }

        }
        catch (e) {
            let error = new Error(e);
            next(error);
        }

    });

    productsStream.on('error', function(e){
        productsStream.close();
        let error = new Error(e);
        next(error);
    });



});

module.exports = router;
