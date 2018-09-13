const betContainerSelector = '#betContainer';
const lastWinFieldSelector = '#lastWin';
const creditsFieldSelector = '#credits';
const betFieldSelector = '#bet';
const betSpinUpButtonSelector = '#betSpinUp';
const betSpinDownButtonSelector = '#betSpinDown';
const spinButtonSelector = '#spinButton';
const spinButtonDisabledSelector = '#spinButton.disabled';

class BetContainer {
    get betContainer() {
        return browser.$(betContainerSelector);
    }

    get spinButton() {
        return browser.$(spinButtonSelector);
    }

    get spinButtonDisabled() {
        return browser.$(spinButtonDisabledSelector);
    }

    get betField() {
        return browser.$(betFieldSelector);
    }

    get creditsField() {
        return browser.$(creditsFieldSelector);
    }

    get lastWinField() {
        return browser.$(lastWinFieldSelector);
    }

    get betSpinUpButton() {
        return browser.$(betSpinUpButtonSelector);
    }

    get betSpinDownButton() {
        return browser.$(betSpinDownButtonSelector);
    }

    clickSpinButton() {
        this.spinButtonDisabled.waitForExist(10000, true);
        this.spinButton.click();
    }

    waitForSpinButtonActive() {
        this.spinButtonDisabled.waitForExist(10000, true);
    }

    clickBetSpinUpButton() {
        this.betSpinUpButton.click();
    }

    clickBetSpinDownButton() {
        this.betSpinDownButton.click();
    }

    getBetValue() {
        return parseInt(this.betField.getText());
    }

    getCreditsValue() {
        let tempValue;
        let actualValue = parseInt(this.creditsField.getText());
        while (tempValue !== actualValue) {
            tempValue = actualValue;
            browser.pause(250);
            actualValue = parseInt(this.creditsField.getText());
        }
        return actualValue;
    }

    getlastWinValue() {
        return parseInt(this.lastWinField.getText());
    }
}

module.exports = new BetContainer();
