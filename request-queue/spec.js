describe("Request Queue Service", function () {
    beforeEach(angular.mock.module("exampleApp"));
    it('one click', angular.mock.inject(function ($httpBackend, $log, requestSender) {
        var data = 'one click';
        $httpBackend.expect("GET", "index.html").respond(data);
        var promise = requestSender.sendRequest({clickTime: 1});
        $httpBackend.flush();
        promise.then(function (response) {
            expect(response.data).toBe(data);
            expect(response.config.clickTime).toBe(1);
        });
        $httpBackend.verifyNoOutstandingExpectation();
        var expectedLogs = [
            ['sendRequest (1)'],
            ['$http.get (1)'],
            ['TransformResponse'],
            ['pendingRequest.finally']
        ];
        expect($log.log.logs).toEqual(expectedLogs);
    }));
    it('two slow clicks', angular.mock.inject(function ($httpBackend, $log,requestSender) {
        var data = 'two slow clicks';
        $httpBackend.expect("GET", "index.html").respond(data);
        var promise1 = requestSender.sendRequest({clickTime: 1});
        $httpBackend.flush();
        $httpBackend.expect("GET", "index.html").respond(data);
        var promise2 = requestSender.sendRequest({clickTime: 2});
        $httpBackend.flush();
        promise1.then(function (response) {
            expect(response.data).toBe(data);
            expect(response.config.clickTime).toBe(1);
        });
        promise2.then(function (response) {
            expect(response.data).toBe(data);
            expect(response.config.clickTime).toBe(2);
        });
        $httpBackend.verifyNoOutstandingExpectation();
        var expectedLogs = [
            ['sendRequest (1)'], ['$http.get (1)'], ['TransformResponse'],
            ['pendingRequest.finally'], ['sendRequest (2)'], ['$http.get (2)'],
            ['TransformResponse'], ['pendingRequest.finally']
        ];
        expect($log.log.logs).toEqual(expectedLogs);
    }));
    it('two fast clicks', angular.mock.inject(function ($httpBackend, requestSender) {
        var data = 'two fast clicks';
        $httpBackend.expect("GET", "index.html").respond(data);
        $httpBackend.expect("GET", "index.html").respond(data);
        var promise1 = requestSender.sendRequest({clickTime: 1});
        var promise2 = requestSender.sendRequest({clickTime: 2});
        $httpBackend.flush();
        promise1.then(function (response) {
            expect(response.data).toBe('ignore');
        });
        promise2.then(function (response) {
            expect(response.data).toBe(data);
            expect(response.config.clickTime).toBe(2);
        });
        $httpBackend.verifyNoOutstandingExpectation();
    }));
    it('three fast clicks', angular.mock.inject(function ($httpBackend, requestSender) {
        var data = 'three fast clicks';
        $httpBackend.expect("GET", "index.html").respond(data);
        $httpBackend.expect("GET", "index.html").respond(data);
        var promise1 = requestSender.sendRequest({clickTime: 1});
        var promise2 = requestSender.sendRequest({clickTime: 2});
        var promise3 = requestSender.sendRequest({clickTime: 3});
        $httpBackend.flush();
        promise1.then(function (response) {
            expect(response.data).toBe('ignore');
        });
        promise2.then(function (response) {
            expect(1).toBe(0);
        }, function (reason) {
            expect(1).toBe(1);
        });
        promise3.then(function (response) {
            expect(response.data).toBe(data);
            expect(response.config.clickTime).toBe(3);
        });
        $httpBackend.verifyNoOutstandingExpectation();
    }));
    it('three slow clicks', angular.mock.inject(function ($httpBackend, requestSender) {
        var data = 'three slow clicks';
        $httpBackend.expect("GET", "index.html").respond(data);
        $httpBackend.expect("GET", "index.html").respond(data);
        var promise1 = requestSender.sendRequest({clickTime: 1});
        var promise2 = requestSender.sendRequest({clickTime: 2});
        $httpBackend.flush(1);
        $httpBackend.expect("GET", "index.html").respond(data);
        var promise3 = requestSender.sendRequest({clickTime: 3});
        $httpBackend.flush();
        promise1.then(function (response) {
            expect(response.data).toBe('ignore');
        });
        promise2.then(function (response) {
            expect(response.data).toBe('ignore');
        });
        promise3.then(function (response) {
            expect(response.data).toBe(data);
            expect(response.config.clickTime).toBe(3);
        });
        $httpBackend.verifyNoOutstandingExpectation();
    }));
});
