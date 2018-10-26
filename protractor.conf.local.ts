import { Config } from "protractor";
import { config as baseConfig } from "./protractor.conf";

const overrides: Config = {
    capabilities: {
        browserName: "chrome",
        chromeOptions: {
            args: [
                "--window-size=1920,1080",
            ],
        },
    },
    mochaOpts: {
        reporter: "mocha-jenkins-reporter",
        slow: 1000000, // Keep high to allow for debugging
        timeout: 1000000,  // Keep high to allow for debugging
    },
};

export const config: Config = Object.assign({}, baseConfig, overrides);
