var app = angular.module('plunker', ['siyfion.sfTypeahead']);

app.controller('MainCtrl', function($scope) {

    $scope.selectedNumber = null;
    $scope.selectedNumberNonEditable = null;
    // instantiate the bloodhound suggestion engine
    var numbers = [
        { num: 'one' },
        { num: 'two' },
        { num: 'three' },
        { num: 'four' },
        { num: 'five' },
        { num: 'six' },
        { num: 'seven' },
        { num: 'eight' },
        { num: 'nine' },
        { num: 'ten' }
    ];
    var numbersBh = new Bloodhound({
        datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.num); },
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

    // initialize the bloodhound suggestion engine
    numbersBh.initialize();

    $scope.numbersDataset = {
        displayKey: 'num',
        source: numbersWithDefaults
    };

    $scope.addValue = function () {
        numbers.add({
            num: 'twenty'
        });
    };

    $scope.setValue = function () {
        $scope.selectedNumber = { num: 'seven' };
        $scope.selectedNumberNonEditable = { num: 'two' };
    };

    $scope.clearValue = function () {
        $scope.selectedNumber = null;
        $scope.selectedNumberNonEditable = null;
    };


    // Typeahead options object
    $scope.exampleOptions = {
        highlight: true,
        minLength: 0,
    };

    $scope.exampleOptionsNonEditable = {
        highlight: true,
        editable: false,
        minLength: 0,
    };

});
