// code for testing content of downloaded file is borrowed from
// http://stackoverflow.com/questions/21935696
describe('demo page', function() {
    it('downloads blob.txt once button is clicked', function(){
        browser.get('http://localhost:63342/untitled3/blob-download');
        var filename = '/Users/mkishine/Downloads/blob.txt';
        var fs = require('fs');
        if (fs.existsSync(filename)) {
            // Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(filename);
        }
        element(by.buttonText('Click Me')).click();
        browser.driver.wait(function() {
            return fs.existsSync(filename);
        }, 30000).then(function() {
            expect(fs.readFileSync(filename, { encoding: 'utf8' })).toEqual('Hello, Blob!');
        });
    });
    it('records downloading on chrome://downloads page', function(){
        browser.driver.get('chrome://downloads/');
        expect(browser.driver.getTitle()).toEqual('Downloads');
        var fineElementsPromise = browser.driver.findElements(By.tagName('a'));
        fineElementsPromise.then(function(a){a[2].getInnerHtml().then(function(txt){
            expect(txt).toEqual('blob.txt');
        })});
    })
});