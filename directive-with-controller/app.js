'use strict';

angular.module("directiveWithControllerApp", [])
    .controller("defaultCtrl", function ($scope) {
        $scope.products = [
            {name: "Apples", price: 1.20, quantity: 2},
            {name: "Bananas", price: 2.42, quantity: 3},
            {name: "Pears", price: 2.02, quantity: 1}
        ];
    })
    .directive("productItem", function () {
        return {
            template: document.querySelector("#productTemplate").outerText,
            require: "^productTable",
            link: function(scope, element, attrs, ctrl) {
                scope.$watch("item.quantity", function() {
                    ctrl.updateTotal();
                })
            }
        }
    })
    .directive("productTable", function () {
        return {
            transclude: true,
            scope: {
                value: "=productTable",
                data: "=productData"
            },
            controller: function($scope, $element, $attrs) {
                this.updateTotal = function() {
                    var total = 0;
                    for (var i = 0; i < $scope.data.length; ++i) {
                        total += Number($scope.data[i].quantity);
                    }
                    $scope.value = total;
                }
            }
        }
    })
    .directive("resetTotals", function () {
        return {
            scope: {
                data: "=productData",
                propname: "@propertyName"
            },
            template: document.querySelector("#resetTemplate").outerText,
            require: "^productTable",
            link: function (scope, element, attrs, ctrl) {
                scope.reset = function () {
                    for (var i = 0; i < scope.data.length; i++) {
                        scope.data[i][scope.propname] = 0;
                    }
                    ctrl.updateTotal();
                }
            }
        }
    });