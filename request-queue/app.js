(function () {
    // delay code is borrowed from
    // https://endlessindirection.wordpress.com/2013/05/18/angularjs-delay-response-from-httpbackend/
    // Also see
    // http://plnkr.co/edit/lj9srM2KXZmwmTxLb1p7?p=preview
    var useNgMockE2E = true;
    function httpBackendDecorator($delegate) {
        var proxy = function (method, url, data, callback, headers) {
            var interceptor = function () {
                var _this = this,
                    _arguments = arguments;
                setTimeout(function () {
                    callback.apply(_this, _arguments);
                }, 1500);
            };
            return $delegate.call(this, method, url, data, interceptor, headers);
        };
        proxy.whenGET = $delegate.whenGET;
        return proxy;
    }

    function appConfig($provide) {
        $provide.decorator('$httpBackend', httpBackendDecorator);
    }

    function appRun($httpBackend) {
        if ( !useNgMockE2E ) {
            return;
        }
        $httpBackend.whenGET('index.html').respond(function () {
            return [200, '', {}];
        });
    }

    function defaultController($scope, requestSender) {
        var pageLoadTime = Date.now();
        $scope.buttonClicked = function () {
            var clickTime = Date.now() - pageLoadTime;
            var config = {clickTime: clickTime};
            var promise = requestSender.sendRequest(config);
            if (promise !== null) {
                promise.then(function (response) {
                    console.log("Success " + response.config.clickTime + " " + response.data);
                }, function () {
                    console.log("Error");
                });
            } else {
                console.log("Error Error Error: null promise returned");
            }
        };
        $scope.clickTwice = function () {
            pageLoadTime = Date.now();
            $scope.buttonClicked();
            setTimeout(function () {
                $scope.buttonClicked();
                $scope.$digest();
            }, 200);
        };
        $scope.clickThreeTimes = function (delay) {
            pageLoadTime = Date.now();
            $scope.buttonClicked();
            setTimeout(function () {
                $scope.buttonClicked();
                $scope.$digest();
                setTimeout(function () {
                    $scope.buttonClicked();
                    $scope.$digest();
                }, delay);
            }, delay);
        };
    }
    function requestSender($http, $q) {
        var nextRequestData = null;
        var pendingHttpRequestPromise = null;
        var deferred = null;
        this.sendRequest = function (config) {
            console.log("sendRequest (" + config.clickTime + ")");
            if (pendingHttpRequestPromise !== null) {
                if (deferred !== null) {
                    console.log('deferred.reject 1');
                    deferred.reject();
                }
                nextRequestData = angular.copy(config);
                deferred = $q.defer();
                return deferred.promise;
            } else {
                config.transformResponse = function (data) {
                    console.log("TransformResponse");
                    if (deferred !== null) {
                        data = 'ignore';
                    }
                    return data;
                };
                console.log("$http.get (" + config.clickTime + ")");
                pendingHttpRequestPromise = $http.get("index.html", config);
                var requestSenderService = this;
                pendingHttpRequestPromise.finally(function () {
                    console.log('pendingRequest.finally');
                    pendingHttpRequestPromise = null;
                    if (deferred !== null) {
                        var d2 = deferred;
                        deferred = null;
                        var promise = requestSenderService.sendRequest(nextRequestData);
                        promise.then(function (result) {
                            console.log('deferred.resolve');
                            d2.resolve(result);
                        }, function (reason) {
                            console.log('deferred.reject 2');
                            d2.reject(reason);
                        });
                        promise.finally(function () {
                            console.log('cleanup');
                            nextRequestData = null;
                            deferred = null;
                        });
                    }
                });
                return pendingHttpRequestPromise;
            }
        }
    }
    var dependents = useNgMockE2E ? ["ngMockE2E"] : [];
    angular.module("exampleApp", dependents)
        .config(appConfig)
        .run(appRun)
        .controller("defaultCtrl", defaultController)
        .service("requestSender", requestSender);
})();