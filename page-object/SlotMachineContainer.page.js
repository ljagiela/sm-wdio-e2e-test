const slotMachineOuterContainerSelector = '#SlotsOuterContainer';
const slotMachineInnerContainerSelector = '#SlotsInnerContainer';
const reel1Selector = '#reel1';
const reel2Selector = '#reel2';
const reel3Selector = '#reel3';
const reelSelectors = [reel1Selector, reel2Selector, reel3Selector];

const BANNER_NORMAL_BG = browser.options.baseUrl + '/img/slotmachine1/main_bg_machine.png';
const BANNER_WON_BG = browser.options.baseUrl + '/img/slotmachine1/won_bg.png';

class SlotMachineContainer {
    get slotMachineOuterConainer() {
        return browser.$(slotMachineOuterContainerSelector);
    }

    getReelValue(reelSelector) {
        const regex = new RegExp(/-(.*)px/);
        const valueFromCss = browser.$(reelSelector).getCssProperty('top').value;
        return parseInt(valueFromCss.match(regex)[1]);
    }

    getReelValues() {
        const reelValues = [];
        reelSelectors.forEach((reel) => {
            reelValues.push(this.getReelValue(reel));
        });
        return reelValues;
    }

    waitUntilSpinDone() {
        let previousReelValues = [];
        let actualReelValues = this.getReelValues();

        while (JSON.stringify(previousReelValues) !== JSON.stringify(actualReelValues)) {
            previousReelValues = actualReelValues;
            browser.pause(250);
            actualReelValues = this.getReelValues();
        }
    }

    getBannerUrl(containerSelector) {
        const bg = browser.$(containerSelector).getCssProperty('background').value;
        return bg.match(new RegExp(/"(.*)"/))[1];
    }

    isBannerNormalDisplayed() {
        const url = this.getBannerUrl(slotMachineOuterContainerSelector);
        return url === BANNER_NORMAL_BG;
    }

    isBannerWonDisplayed() {
        const url = this.getBannerUrl(slotMachineInnerContainerSelector);
        return url === BANNER_WON_BG;
    }
}

module.exports = new SlotMachineContainer();
