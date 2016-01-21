'use strict';
(function () {
    angular.module("exampleApp", [])
        .controller("defaultCtrl", function ($scope) {
            var c = this;
            c.counter = 0;
            c.anotherCounter = 0;
            c.incrementCounter = function () {
                c.counter++;
            }
            console.log('setting up watch on ctrl.counter');
            $scope.$watch('ctrl.counter', function (newValue) {
                console.log('ctrl.counter updated '+newValue);
                c.anotherCounter = newValue*2;
            });
        })
    ;

})();
