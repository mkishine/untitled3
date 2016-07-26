'use strict';
(function () {
    angular.module("exampleApp").factory("Person", function(){
        var Person = function (firstName) {
            this.firstName = firstName;
        };
        Person.prototype.walk = function () {
            return "I am walking!";
        };
        Person.prototype.sayHello = function () {
            return "Hello, I'm " + this.firstName;
        };
        return Person;
    });
})();