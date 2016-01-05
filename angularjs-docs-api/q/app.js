angular.module('controllerAsExample', [])
    .controller('ctrl', ctrl);

function ctrl($q, $rootScope) {
    this.message = "Would you click button, please?";
    this.asyncGreet = function(name) {
        console.log('asyncGreet');
        var deferred = $q.defer();
        setTimeout(function() {
            console.log('setTimeout');
            deferred.notify('About to greet ' + name + '.');
            if (name === 'Resolve') {
                console.log('resolve');
                deferred.resolve('Hello, ' + name + '!');
            } else {
                console.log('reject');
                deferred.reject('Greeting ' + name + ' is not allowed.');
            }
            $rootScope.$digest();
        }, 1000);
        return deferred.promise;
    };
}

ctrl.prototype.click = function(msg) {
    console.log('click');
    var promise = this.asyncGreet(msg);
    var that = this;
    promise.then(function(greeting) {
        console.log('Success');
        that.message = 'Success: ' + greeting;
    }, function(reason) {
        console.log('Failed');
        that.message = 'Failed: ' + reason;
    });
};
