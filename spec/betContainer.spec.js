const { expect } = require('chai');
const BetContainer = require('../page-object/BetContainer.page');

describe('Bet Conainer', () => {
    beforeEach(() => {
        browser.url('/');
    });

    it('should be dispayed', () => {
        expect(BetContainer.betContainer.isVisible()).to.be.true;
    });

    it('should contain SPIN button', () => {
        expect(BetContainer.spinButton.isVisible()).to.be.true;
    });

    it('should have initial value: 1 for BET field', () => {
        expect(BetContainer.getBetValue()).to.equal(1);
    });

    it('should have some initial value for TOTAL SPINS field', () => {
        expect(BetContainer.getCreditsValue()).not.to.be.null;
    });

    it('should have initial value of null for LAST WIN field', () => {
        expect(BetContainer.getlastWinValue()).to.be.NaN;
    });

    it('should be possible to increase BET value to max 10', () => {
        for (let i = 1; i <= 13; i++) {
            BetContainer.clickBetSpinUpButton();
            if (i <= 8) expect(BetContainer.getBetValue()).to.equal(i + 1);
            else expect(BetContainer.getBetValue()).to.equal(10);
        }
    });

    it('should not be possible to decrease BET value below 1', () => {
        BetContainer.clickBetSpinDownButton();
        BetContainer.clickBetSpinDownButton();
        expect(BetContainer.getBetValue()).to.equal(1);
    });
});
