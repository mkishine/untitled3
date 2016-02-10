// code for testing content of downloaded file is borrowed from
// http://stackoverflow.com/questions/21935696
describe('demo page', function() {
    beforeEach(function(){
        browser.get('http://localhost:63342/untitled3/blob-download');
    });
    it('has a button for downloading using blob', function(){
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
    })
});