// timeout notes
// http://jasmine.github.io/2.3/introduction.html#section-Asynchronous_Support
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10*60*1000;
describe('Promises Page', function() {
    it('should have a title', function() {
        browser.get('http://localhost:63342/untitled3/Chapter%2020/Listing%2015.html');
        expect(browser.getTitle()).toEqual('Promises');
    });
    it('should have six buttons', function() {
        browser.get('http://localhost:63342/untitled3/Chapter%2020/Listing%2015.html');
        expect(element.all(by.tagName('button')).count()).toEqual(6);
    });
});