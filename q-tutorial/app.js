function TodoCtrl($scope, $q, $timeout) {
    function createPromise(name, timeout, willSucceed) {
        $scope[name] = 'Running';
        var deferred = $q.defer();
        $timeout(function() {
            if (willSucceed) {
                $scope[name] = 'Completed';
                deferred.resolve(name);
            } else {
                $scope[name] = 'Failed';
                deferred.reject(name);
            }
        }, timeout * 1000);
        return deferred.promise;
    }

    // Create 5 promises
    var promises = [];
    var names = [];
    for (var i = 1; i <= 5; i++) {
        var willSucceed = true;
        if (i == 2) willSucceed = false;
        promises.push(createPromise('Promise' + i, i, willSucceed));
    }

    // Wait for all promises
    $scope.Status1 = 'Waiting';
    $scope.Status2 = 'Waiting';
    $q.all(promises).then(
        function() {
            $scope.Status1 = 'Done';
        },
        function() {
            $scope.Status1 = 'Failed';
        }
    ).finally(function() {
            $scope.Status2 = 'Done waiting';
        });
}
