describe('Tooltips Demo Page', function() {
    beforeEach(function(){
        browser.get('http://localhost:63342/untitled3/uib-tooltip-demo');
    });
    describe('Shows how to place tooltips',function(){
        function t(placement) {
            function allTooltips() {
                return element.all(by.className('tooltip'));
            }
            expect(allTooltips().count()).toBe(0);
            var firstButton = element.all(by.tagName('button')).first();
            expect(firstButton.getText()).toEqual('Tooltip '+placement);
            browser.actions().mouseMove(firstButton).perform();
            expect(allTooltips().count()).toBe(1);
            expect(allTooltips().first().getAttribute('content')).toEqual('On the '+placement);
        }
        it('default palcement is top', function(){
            t('top');
        })
        it('bottom-left is a valid placement', function(){
            element(by.model('placement.selected'))
                .element(by.cssContainingText('option', 'bottom-left'))
                .click();
            t('bottom-left');
        })
    });
});