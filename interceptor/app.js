'use strict';

var m = angular.module("exampleApp", []);
m.controller("defaultCtrl", function ($scope, $http) {
    $http.get("productData.json").success(function (data) {
        $scope.products = data;
        $scope.productAttributes = Object.keys($scope.products[0]);
    });
});


m.config(function ($httpProvider) {
    // debugger;
    $httpProvider.interceptors.push(function () {
        return {
            response: function (response) {
                console.log(response);
                return response;
            }
        }
    });
});
