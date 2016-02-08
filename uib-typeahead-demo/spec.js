describe('Typeahead Demo Page', function() {
    beforeEach(function(){
        browser.get('http://localhost:63342/untitled3/uib-typeahead-demo');
    });
    describe('has simple typeahead', function(){
        beforeEach(function(){
            this.input = element(by.model('selected'));
            this.dropDownContainer = element(by.id(this.input.getAttribute('aria-owns')));
            var that = this;
            this.choices = function() {
                return that.dropDownContainer.all(by.tagName('li'));
            }
        });
        it('invisble and empty by default',function(){
            expect(this.dropDownContainer.isDisplayed()).toBeFalsy();
            expect(this.choices().count()).toBe(0);
        });
        describe('once user types a few keys',function(){
            beforeEach(function(){
                this.input.sendKeys('al');
            });
            it('typeahead becomes visible and not empty',function(){
                expect(this.dropDownContainer.isDisplayed()).toBeTruthy();
                var items = this.choices().map(function(elm) {
                    return elm.getText();
                });
                expect(items).toEqual(['Alabama','Alaska','California']);
            });
            it('option can be selected with a keyboard',function(){
                this.input.sendKeys(protractor.Key.DOWN, protractor.Key.ENTER);
                expect(this.input.getAttribute('value')).toEqual('Alaska');
            });
            it('option can be selected with a mouse',function(){
                this.choices().get(1).click();
                expect(this.input.getAttribute('value')).toEqual('Alaska');
            });
        });
    });
});
