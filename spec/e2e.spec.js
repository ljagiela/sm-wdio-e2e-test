const { expect } = require('chai');
const BetContainer = require('../page-object/BetContainer.page');
const SlotMachineContainer = require('../page-object/SlotMachineContainer.page');
const PrizesListContainer = require('../page-object/PrizesListContainer.page');

describe('E2E', () => {
    beforeEach(() => {
        browser.url('/');
    });

    it('increasing bet values should update win chart payouts', () => {
        for (let i = 1; i <= 10; i++) {
            BetContainer.clickBetSpinUpButton();
            PrizesListContainer.getWinChartMapping().forEach((mapping) => {
                let realPayoutValue = PrizesListContainer.getRealPayout(mapping.id);
                let currentBetValue = BetContainer.getBetValue();
                expect(realPayoutValue).to.equal(mapping.basePayout * currentBetValue);
            });
        }
    });

    function repeatSpinTest(index) {
        it(`should update all relevant fields after spin (#${index})`, () => {
            for (let i = 0; i <= Math.floor(Math.random() * 10); i++) BetContainer.clickBetSpinUpButton();

            const initialBetValue = BetContainer.getBetValue();
            const initialCreditsValue = BetContainer.getCreditsValue();

            BetContainer.clickSpinButton();
            SlotMachineContainer.waitUntilSpinDone();
            const reelResults = SlotMachineContainer.getReelValues();
            const reelId = PrizesListContainer.checkIfWon(reelResults);
            if (reelId) {
                expect(SlotMachineContainer.isBannerWonDisplayed()).to.be.true;

                const basePayout = PrizesListContainer.getBasePayoutFromMapping(reelId);
                const realPayout = PrizesListContainer.getRealPayout(reelId);
                const calculatedCredits = initialBetValue * basePayout;

                expect(BetContainer.getBetValue()).to.equal(initialBetValue);
                expect(realPayout).to.equal(calculatedCredits);

                expect(BetContainer.getCreditsValue()).to.equal(initialCreditsValue - initialBetValue + calculatedCredits);
                expect(BetContainer.getlastWinValue()).to.equal(calculatedCredits);
            } else {
                expect(SlotMachineContainer.isBannerNormalDisplayed()).to.be.true;
                expect(BetContainer.getBetValue()).to.equal(initialBetValue);
                expect(BetContainer.getCreditsValue()).to.equal(initialCreditsValue - initialBetValue);
                expect(BetContainer.getlastWinValue()).to.be.NaN;
            }
        });
    }

    for (let i = 1; i <= 6; i++) {
        repeatSpinTest(i);
    }
});
