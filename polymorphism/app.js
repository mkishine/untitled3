'use strict';
(function () {
    var myApp = angular.module("exampleApp", []);
    myApp.controller("myController", function ($scope, Person, Student) {
        var p1 = new Person("Bob");
        $scope.m1 = p1.sayHello();
        $scope.w1 = p1.walk();
        var p2 = new Student("Fred", "Physics");
        $scope.m2 = p2.sayHello();
        $scope.w2 = p2.walk();
    });
})();