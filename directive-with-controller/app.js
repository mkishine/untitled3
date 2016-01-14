﻿'use strict';

angular.module("directiveWithControllerApp", [])
    .controller("defaultCtrl", function ($scope) {
        $scope.products = [{name: "Apples", price: 1.20, quantity: 2},
            {name: "Bananas", price: 2.42, quantity: 3},
            {name: "Pears", price: 2.02, quantity: 1}];
    })
    .directive("productItem", function () {
        return {
            template: document.querySelector("#productTemplate").outerText
        }
    })
    .directive("productTable", function () {
        return {
            transclude: true,
            scope: {
                value: "=productTable",
                data: "=productData"
            }
        }
    });