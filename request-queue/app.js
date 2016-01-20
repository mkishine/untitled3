(function () {
    // delay code is borrowed from
    // https://endlessindirection.wordpress.com/2013/05/18/angularjs-delay-response-from-httpbackend/
    // Also see
    // http://plnkr.co/edit/lj9srM2KXZmwmTxLb1p7?p=preview
    var useNgMockE2E = typeof jasmine === 'undefined';
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

    function setupHttpBackendTimeout($provide) {
        if ( !useNgMockE2E ) {
            return;
        }
        $provide.decorator('$httpBackend', httpBackendDecorator);
    }

    function configureExpertOptions(expertOptionsProvider) {
        // http://stackoverflow.com/questions/979975/how-to-get-the-value-from-the-url-parameter
        var regex = new RegExp(/[\\?&]debug=([^&#]*)/);
        var results = regex.exec(location.href);
        var debugStr = results == null ? '' : results[1];
        expertOptionsProvider.setDebugFlags(debugStr);
    }

    function setupHttpBackend($httpBackend) {
        if ( !useNgMockE2E ) {
            return;
        }
        $httpBackend.whenGET('index.html').respond(function () {
            return [200, '', {}];
        });
    }
    function setupRequestSenderDebug(requestSender) {
        requestSender.setupDebug();
    }

    function defaultController($scope, $log, requestSender) {
        var pageLoadTime = Date.now();
        $scope.buttonClicked = function () {
            var clickTime = Date.now() - pageLoadTime;
            var config = {clickTime: clickTime};
            var promise = requestSender.sendRequest(config);
            if (promise !== null) {
                promise.then(function (response) {
                    $log.log("Success " + response.config.clickTime + " " + response.data);
                }, function () {
                    $log.log("Error");
                });
            } else {
                $log.log("Error Error Error: null promise returned");
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
    function requestSender($http, $q, $log, expertOptions) {
        var nextRequestData = null;
        var pendingHttpRequestPromise = null;
        var deferred = null;
        var debug = false;
        var requestSender = this;
        function trace(msg) {
            if ( debug ) {
                $log.log(msg);
            }
        }
        this.debugEnabled = function(setting) {
            if (angular.isDefined(setting)) {
                debug = setting;
                return this;
            } else {
                return debug;
            }
        };
        this.setupDebug = function() {
            expertOptions.addDebugFlagWatcher('requestSender', function(setting){
                requestSender.debugEnabled(setting);
            });
        };
        this.sendRequest = function (config) {
            trace("sendRequest (" + config.clickTime + ")");
            if (pendingHttpRequestPromise !== null) {
                if (deferred !== null) {
                    trace('deferred.reject');
                    deferred.reject();
                }
                nextRequestData = angular.copy(config);
                trace("$q.defer (" + config.clickTime + ")");
                deferred = $q.defer();
                return deferred.promise;
            } else {
                config.transformResponse = function (data) {
                    trace("TransformResponse "+data);
                    if (deferred !== null) {
                        data = 'ignore';
                    }
                    return data;
                };
                trace("$http.get (" + config.clickTime + ")");
                pendingHttpRequestPromise = $http.get("index.html", config);
                var requestSenderService = this;
                pendingHttpRequestPromise.finally(function () {
                    trace('pendingRequest.finally');
                    pendingHttpRequestPromise = null;
                    if (deferred !== null) {
                        var d2 = deferred;
                        deferred = null;
                        var promise = requestSenderService.sendRequest(nextRequestData);
                        promise.then(function (result) {
                            trace('d2.resolve');
                            d2.resolve(result);
                        }, function (reason) {
                            trace('d2.reject');
                            d2.reject(reason);
                        });
                        promise.finally(function () {
                            trace('cleanup');
                            nextRequestData = null;
                            deferred = null;
                        });
                    }
                });
                return pendingHttpRequestPromise;
            }
        }
    }
    function expertOptions() {
        var debugFlags = {};
        var debugCallbacks = [];
        function _setDebugFlags(flags) {
            debugFlags = {};
            decodeURIComponent(flags).split(/[ +]/).forEach(function(flag){debugFlags[flag] = 1;});
            debugCallbacks.forEach(function(e){e.callback(e.key in debugFlags)});
        }
        return {
            // this is called by expertOptionsProvider, and sets debug flags from URL debug parameter
            setDebugFlags: function(flags) {
                _setDebugFlags(flags);
            },
            $get: function(){
                return {
                    // In order to use expertOptions
                    // [1] Create a debug varible
                    // [2] During module.run() call expertOptions.addDebugFlagWatcher(function(value){debug=value;})
                    addDebugFlagWatcher: function(key, callback){
                        debugCallbacks.push({key: key, callback: callback});
                        callback(key in debugFlags);
                    },
                    // enable debugging at run time using something like this:
                    // angular.element(document.body).injector().get('expertOptions').setDebugFlags('requestSender')
                    setDebugFlags: function(flags) {
                        _setDebugFlags(flags);
                    }
                };
            }
        };
    }
    var dependents = useNgMockE2E ? ['ngMockE2E'] : [];
    angular.module('exampleApp', dependents)
        .config(setupHttpBackendTimeout)
        .run(setupHttpBackend)
        .controller('defaultCtrl', defaultController)
        .service('requestSender', requestSender)
        .provider('expertOptions', expertOptions)
        .config(configureExpertOptions)
        .run(setupRequestSenderDebug)
    ;
})();