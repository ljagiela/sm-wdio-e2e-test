module.exports = {
    "extends": "standard",
    "plugins": [
        "standard",
        "mocha"
    ],
    "rules": {
        "semi": [2, "always"],
        "no-extra-semi": 2,
        "indent": [2, 4],
        "mocha/no-exclusive-tests": "error",
        "mocha/no-pending-tests": "error",
        "max-len": [2, 150, { "ignoreStrings": true }],
        "space-before-function-paren": ["error", {
            "anonymous": "never",
            "named": "never",
            "asyncArrow": "always"
        }],
    },
    globals: {
        browser: false,
        $: false,
        $$: false
    },
    "env": {
        "mocha": true,
        "es6": true
    },
    "overrides": [{
        "files": [ "*.spec.js" ],
        "rules": {
            "no-unused-expressions": "off"
        }
    }]
};
