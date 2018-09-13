const { expect } = require('chai');
const PrizesListContainer = require('../page-object/PrizesListContainer.page');

describe('Prizes List Conainer', () => {
    before(() => {
        browser.url('/');
    });

    it('should be dispayed', () => {
        expect(PrizesListContainer.prizesListSlotMachineContainer.isVisible()).to.be.true;
    });

    it('should contain initial payouts', () => {
        PrizesListContainer.getWinChartMapping().forEach((mapping) => {
            expect(PrizesListContainer.getRealPayout(mapping.id)).to.equal(mapping.basePayout);
        });
    });

    it('should contain icon images', () => {
        const results = PrizesListContainer.verifyReelIconsBG();
        expect(results.length).to.equal(27);
        expect(results.every((val) => val === true)).to.be.true;
    });
});
