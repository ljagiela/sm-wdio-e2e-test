const { expect } = require('chai');
const SlotMachineContainer = require('../page-object/SlotMachineContainer.page');

describe('Slot Machine Conainer', () => {
    before(() => {
        browser.url('/');
    });

    it('should be dispayed', () => {
        expect(SlotMachineContainer.slotMachineOuterConainer.isVisible()).to.be.true;
    });

    it('should contain inactive WON banner by default', () => {
        expect(SlotMachineContainer.isBannerNormalDisplayed()).to.be.true;
    });

    it('should have default reel values', () => {
        expect(SlotMachineContainer.getReelValues()).to.deep.equal([1360, 992, 1116]);
    });
});
