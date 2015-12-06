var app = angular.module('plunker', ['siyfion.sfTypeahead']);

app.controller('MainCtrl', function($scope) {
    var numbers = ["one", "two", "three", "four", "five"];
    var numbersBh = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: numbers
    });
    function numbersWithDefaults(q, sync) {
        if (q === '') {
            sync(numbers);
        } else {
            numbersBh.search(q, sync);
        }
    }

    $scope.selectedNumberNonEditable = null;
    $scope.numbersDataset = {
        source: numbersWithDefaults,
    };
    $scope.exampleOptionsNonEditable = {
        highlight: true,
        minLength: 0,
        //TODO: figure out why editable:false breaks connection to the model
        //editable: false,
    };
    $scope.clearValue = function () {
        $scope.selectedNumberNonEditable = null;
    };
});
