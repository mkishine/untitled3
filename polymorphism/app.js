'use strict';
(function () {
    var myApp = angular.module("exampleApp", []);
    myApp.controller("myController", function ($scope, Person, Student) {
        var p1 = new Person("Bob");
        $scope.m1 = p1.sayHello();
        $scope.w1 = p1.walk();
        $scope.t11 = p1 instanceof Person;
        $scope.t12 = p1 instanceof Student;
        var p2 = new Student("Fred", "Physics");
        $scope.m2 = p2.sayHello();
        $scope.w2 = p2.walk();
        $scope.t21 = p2 instanceof Person;
        $scope.t22 = p2 instanceof Student;
    });
})();