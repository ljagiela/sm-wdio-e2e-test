const prizesListSlotMachineSelector = '#prizes_list_slotMachine1';
const singlePayoutSelector = '.tdPayout';
const reelIconSelector = '.reelIcon';

const REEL_ICON_BG = browser.options.baseUrl + '/img/slotmachine1/prizes_sprites.png';

const winChartMapping = [
    { index: 0, id: 734, basePayout: 200 },
    { index: 1, id: 994, basePayout: 50 },
    { index: 2, id: 754, basePayout: 20 },
    { index: 3, id: 111, basePayout: 16 },
    { index: 4, id: 1114, basePayout: 15 },
    { index: 5, id: 634, basePayout: 14 },
    { index: 6, id: 874, basePayout: 12 },
    { index: 7, id: 222, basePayout: 7 },
    { index: 8, id: 333, basePayout: 4 }
];

class PrizesListContainer {
    get prizesListSlotMachineContainer() {
        return browser.$(prizesListSlotMachineSelector);
    }

    get reelIcons() {
        return browser.$(prizesListSlotMachineSelector).$$(reelIconSelector);
    }

    getWinChartMapping() {
        return winChartMapping;
    }

    getBasePayoutFromMapping(reelId) {
        return winChartMapping.find(e => e.id === reelId).basePayout;
    }

    getRealPayout(reelId) {
        const index = winChartMapping.find(e => e.id === reelId).index;
        return parseInt(browser.$(prizesListSlotMachineSelector).$$(singlePayoutSelector)[index].getText());
    }

    checkIfAllTheSame(results) {
        if (results.every((val, i, arr) => val === arr[0])) return results[0];
        return false;
    }

    checkIfMixed(results) {
        let finalArr = [];
        if (results[0] === 634 || results[0] === 874) finalArr.push(true);
        if (results[1] === 1114 || results[1] === 754) finalArr.push(true);
        if (results[2] === 994 || results[2] === 1234) finalArr.push(true);

        if (finalArr.length === 3 && finalArr.every((val, i, arr) => val === arr[0])) return 111;
        return false;
    }

    checkIfFruits(results) {
        let finalArr = [];
        results.forEach((result) => {
            if (result === 634 || result === 874 || result === 1114) finalArr.push(true);
        });

        if (finalArr.length === 3 && finalArr.every((val, i, arr) => val === arr[0])) return 222;
        return false;
    }

    checkIfWon(results) {
        const allTheSame = this.checkIfAllTheSame(results);
        const isMixed = this.checkIfMixed(results);
        const isFruits = this.checkIfFruits(results);

        if (allTheSame) return allTheSame;
        if (isMixed) return isMixed;
        if (isFruits) return isFruits;

        return false;
    }

    verifyReelIconsBG() {
        const results = [];
        this.reelIcons.forEach((icon) => {
            const bgValue = icon.getCssProperty('background-image').value;
            const bgUrl = bgValue.match(new RegExp(/"(.*)"/))[1];
            if (bgUrl === REEL_ICON_BG) results.push(true);
        });
        return results;
    }
}

module.exports = new PrizesListContainer();
