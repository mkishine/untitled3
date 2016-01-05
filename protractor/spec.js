// timeout notes
// http://jasmine.github.io/2.3/introduction.html#section-Asynchronous_Support
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10*60*1000;

describe('Protractor Demo App', function() {
    it('should have a title', function() {
        browser.get('http://localhost:63342/untitled3/Chapter%2020/Listing%2015.html');
        browser.pause();
        expect(browser.getTitle()).toEqual('Promises');
    });
});