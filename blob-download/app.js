'use strict';
(function () {
    angular.module("exampleApp", [])
        .controller("defaultCtrl", function ($scope) {
            var c = this;
            c.clickMe = function () {
                var data = "Hello, Blob!";
                var fileName = "blob.txt";
                var a = document.createElement("a");
                var blob = new Blob([data], {type: "octet/stream"});
                var url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = fileName;
                a.click();
                window.URL.revokeObjectURL(url);
            };
        })
    ;
})();
