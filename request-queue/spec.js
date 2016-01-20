describe("Request Queue Service", function () {
    beforeEach(angular.mock.module("exampleApp"));
    beforeEach(angular.mock.inject(function(requestSender){
        requestSender.debugEnabled(true);
    }));
    it('one click', angular.mock.inject(function ($httpBackend, $log, requestSender) {
        $httpBackend.expect("GET", "index.html").respond('one click');
        var promise = requestSender.sendRequest({clickTime: 1});
        $httpBackend.flush();
        promise.then(function (response) {
            expect(response.data).toBe('one click');
            expect(response.config.clickTime).toBe(1);
        });
        $httpBackend.verifyNoOutstandingExpectation();
        var expectedLogs = [
            ['sendRequest (1)'],
            ['$http.get (1)'],
            ['TransformResponse one click'],
            ['pendingRequest.finally']
        ];
        expect($log.log.logs).toEqual(expectedLogs);
    }));
    it('two slow clicks', angular.mock.inject(function ($httpBackend, $log,requestSender) {
        $httpBackend.expect("GET", "index.html").respond('first click');
        var promise1 = requestSender.sendRequest({clickTime: 1});
        $httpBackend.flush();
        $httpBackend.expect("GET", "index.html").respond('second click');
        var promise2 = requestSender.sendRequest({clickTime: 2});
        $httpBackend.flush();
        promise1.then(function (response) {
            expect(response.data).toBe('first click');
            expect(response.config.clickTime).toBe(1);
        });
        promise2.then(function (response) {
            expect(response.data).toBe('second click');
            expect(response.config.clickTime).toBe(2);
        });
        $httpBackend.verifyNoOutstandingExpectation();
        var expectedLogs = [
            ['sendRequest (1)'],
            ['$http.get (1)'],
            ['TransformResponse first click'],
            ['pendingRequest.finally'],
            ['sendRequest (2)'],
            ['$http.get (2)'],
            ['TransformResponse second click'],
            ['pendingRequest.finally']
        ];
        expect($log.log.logs).toEqual(expectedLogs);
    }));
    it('two fast clicks', angular.mock.inject(function ($httpBackend, $log, requestSender) {
        $httpBackend.expect("GET", "index.html").respond('first click');
        $httpBackend.expect("GET", "index.html").respond('second click');
        var promise1 = requestSender.sendRequest({clickTime: 1});
        var promise2 = requestSender.sendRequest({clickTime: 2});
        $httpBackend.flush();
        promise1.then(function (response) {
            expect(response.data).toBe('ignore');
        });
        promise2.then(function (response) {
            expect(response.data).toBe('second click');
            expect(response.config.clickTime).toBe(2);
        });
        $httpBackend.verifyNoOutstandingExpectation();
        var expectedLogs = [
            ['sendRequest (1)'],
            ['$http.get (1)'],
            ['sendRequest (2)'],
            [ '$q.defer (2)' ],
            ['TransformResponse first click'],
            ['pendingRequest.finally'],
            ['sendRequest (2)'],
            ['$http.get (2)'],
            ['TransformResponse second click'],
            ['pendingRequest.finally'],
            ['d2.resolve'],
            ['cleanup']
        ];
        expect($log.log.logs).toEqual(expectedLogs);
    }));
    it('three fast clicks', angular.mock.inject(function ($httpBackend, $log, requestSender) {
        $httpBackend.expect("GET", "index.html").respond('first click');
        $httpBackend.expect("GET", "index.html").respond('third click');
        var promise1 = requestSender.sendRequest({clickTime: 1});
        var promise2 = requestSender.sendRequest({clickTime: 2});
        var promise3 = requestSender.sendRequest({clickTime: 3});
        $httpBackend.flush();
        promise1.then(function (response) {
            expect(response.data).toBe('ignore');
        });
        promise2.then(function () {
            expect(1).toBe(0); // I do not expect success to be called
        }, function () {
            expect(1).toBe(1); // I expect only failure to be called
        });
        promise3.then(function (response) {
            expect(response.data).toBe('third click');
            expect(response.config.clickTime).toBe(3);
        });
        $httpBackend.verifyNoOutstandingExpectation();
        var expectedLogs = [
            ['sendRequest (1)'],
            ['$http.get (1)'],
            ['sendRequest (2)'],
            ['$q.defer (2)'],
            ['sendRequest (3)'],
            ['deferred.reject'],
            ['$q.defer (3)'],
            ['TransformResponse first click'],
            ['pendingRequest.finally'],
            ['sendRequest (3)'],
            ['$http.get (3)'],
            ['TransformResponse third click'],
            ['pendingRequest.finally'],
            ['d2.resolve'],
            ['cleanup']
        ];
        expect($log.log.logs).toEqual(expectedLogs);
    }));
    it('three slow clicks', angular.mock.inject(function ($httpBackend, $log, requestSender) {
        $httpBackend.expect("GET", "index.html").respond('first click');
        $httpBackend.expect("GET", "index.html").respond('second click');
        var promise1 = requestSender.sendRequest({clickTime: 1});
        var promise2 = requestSender.sendRequest({clickTime: 2});
        $httpBackend.flush(1);
        $httpBackend.expect("GET", "index.html").respond('third click');
        var promise3 = requestSender.sendRequest({clickTime: 3});
        $httpBackend.flush();
        promise1.then(function (response) {
            expect(response.data).toBe('ignore');
        });
        promise2.then(function (response) {
            expect(response.data).toBe('ignore');
        });
        promise3.then(function (response) {
            expect(response.data).toBe('third click');
            expect(response.config.clickTime).toBe(3);
        });
        $httpBackend.verifyNoOutstandingExpectation();
        var expectedLogs = [
            ['sendRequest (1)'],
            ['$http.get (1)'],
            ['sendRequest (2)'],
            ['$q.defer (2)'],
            ['TransformResponse first click'],
            ['pendingRequest.finally'],
            ['sendRequest (2)'],
            ['$http.get (2)'],
            ['sendRequest (3)'],
            ['$q.defer (3)'],
            ['TransformResponse second click'],
            ['pendingRequest.finally'],
            ['sendRequest (3)'],
            ['$http.get (3)'],
            ['d2.resolve'],
            ['cleanup'],
            ['TransformResponse third click'],
            ['pendingRequest.finally'],
            ['d2.resolve'],
            ['cleanup']
        ];
        expect($log.log.logs).toEqual(expectedLogs);
    }));
});
