'use strict';
(function () {
    angular.module("exampleApp").factory("Student", function (Person) {
        // Define the Student constructor
        function Student(firstName, subject) {
            // Call the parent constructor, making sure (using Function#call)
            // that "this" is set correctly during the call
            Person.call(this, firstName);

            // Initialize our Student-specific properties
            this.subject = subject;
        }

        // Create a Student.prototype object that inherits from Person.prototype.
        // Note: A common error here is to use "new Person()" to create the
        // Student.prototype. That's incorrect for several reasons, not least
        // that we don't have anything to give Person for the "firstName"
        // argument. The correct place to call Person is above, where we call
        // it from Student.
        Student.prototype = Object.create(Person.prototype); // See note below

        // Set the "constructor" property to refer to Student
        Student.prototype.constructor = Student;

        // Replace the "sayHello" method
        Student.prototype.sayHello = function () {
            return "Hello, I'm " + this.firstName + ". I'm studying " + this.subject + ".";
        };

        // Add a "sayGoodBye" method
        Student.prototype.sayGoodBye = function () {
            console.log("Goodbye!");
        };
        return Student;
    });
})();