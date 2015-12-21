(function () {
    'use strict';
    var app = angular.module('myApp', []);
    app.controller('myCtrl', function(){
        var vm = this;
        vm.ideas = [
            ['ideas1', 1],
            ['ideas2', 8]
        ];
    });
    app.directive('hcPie', function () {
        return {
            restrict: 'C',
            replace: true,
            scope: {
                items: '='
            },
            template: '<div id="container" style="margin: 0 auto">not working</div>',
            link: function (scope, element, attrs) {
                var chart = new Highcharts.Chart({
                    chart: {
                        renderTo: 'container',
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false
                    },
                    title: {
                        text: 'Browser market shares at a specific website, 2010'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage}%</b>',
                        percentageDecimals: 1
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                color: '#000000',
                                connectorColor: '#000000',
                                formatter: function () {
                                    return '<b>' + this.point.name + '</b>: ' + this.percentage + ' %';
                                }
                            }
                        }
                    },
                    series: [{
                        type: 'pie',
                        name: 'Browser share',
                        data: angular.copy(scope.items)
                    }]
                });

                scope.$watch("items", function (newValue) {
                    chart.series[0].setData(angular.copy(newValue), true);
                }, true);

            }
        }
    });
})();
