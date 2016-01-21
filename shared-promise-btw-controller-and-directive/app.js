'use strict';

angular.module("directiveWithControllerApp", [])
    .controller("defaultCtrl", function ($scope) {

        $scope.portCreateMode = "model";
        $scope.portfolioPromise = null; // will by filled by directive

        $scope.toggleViewMode = function() {
            if ($scope.portCreateMode == "model") {
                $scope.portCreateMode = 'default';
            } else {
                $scope.portCreateMode = 'model';
            }
        };

        $scope.$watch('portfolioPromise', setPromiseBehavior);

        function setPromiseBehavior() {
            if ($scope.portfolioPromise) {
                $scope.portfolioPromise.then(
                    function(success) {
                        console.log("Success: ");
                        console.log(success);
                        $scope.result = "Success: " + JSON.stringify(success);
                    },
                    function(error) {
                        console.log("Error: " + error);
                        $scope.result = "Error: " + JSON.stringify(error);
                    }
                )
            }
        }

    })

    .directive("portCreator", function ($compile, $q) {
        var getTemplate = function(view) {
            switch (view) {
                case 'model':
                    return "<div>Hello, Model!</div>";
                default:
                    return "<div>Hello, Default Port Creator!</div>";
            }
        };
        return {
            restrict: "E",
            scope: {
                mode: "=",
                portfolioDataPromise: '='
            },
            link: function(scope, element, attrs) {
                /*************/
                scope.newPortDataKey = ""; // updated via tree onClick OR quick-import directive action
                scope.$watch('newPortDataKey', getPromise);
                var doFirst = false;
                /*************/

                // Must use exterior getTemplate function b/c the template/templateUrl attributes
                // only observe params prior to interpolation (e.g. it reads {{A2FCtrl.view}} as 'A2FCtrl.view')
                function setTemplate() {
                    var template = $compile(getTemplate(scope.mode))(scope);
                    element.children().remove();
                    element.append(template);

                    if (doFirst) {
                        scope.newPortDataKey += "a";
                        console.log("scope.newPortDataKey: " + scope.newPortDataKey);
                    }
                    doFirst = true;
                }
                scope.$watch('mode', setTemplate);

                function getPromise() {
                    scope.portfolioDataPromise = getPortData(scope.mode);
                }

                // Fill portfolio data
                function getPortData(mode) {
                    var deferred = $q.defer();
                    var portfolioData = _fillPortData(mode);
                    if (portfolioData) {
                        deferred.resolve(portfolioData);
                    } else {
                        deferred.reject("No data");
                    }
                    return deferred.promise;
                }

                // Helper function to retrieve portfolio data
                function _fillPortData(mode) {
                    var portData = null;
                    switch(mode) {
                        case 'model':
                            // newPortDataKey = onClick result from horizontal tree
                            portData = _getModelPortData(scope.newPortDataKey);
                            break;
                        default:
                            break;
                    }
                    return portData;
                }

                // Helper function to retreive model Portfolio data
                // Can only be called when scope.mode == 'model'
                function _getModelPortData(key) {
                    // Fake for now
                    return {
                        'positions': [
                            {
                                'ticker': 'US Large Cap',
                                'weight': 60
                            },
                            {
                                'ticker': 'US Aggregate',
                                'weight': 40
                            }
                        ],
                        'results': []
                    }
                }

            }
        }
    });