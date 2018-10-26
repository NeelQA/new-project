import * as debug from "debug";
import * as fs from "fs";
import { browser as protractorBrowser, ProtractorBrowser } from "protractor";
import { ProtractorPlugin } from "protractor/built/plugins";
import { promise } from "selenium-webdriver";

const testabilityScript = fs.readFileSync(require.resolve("testability.js")).toString();
// tslint:disable-next-line:no-var-requires
const browserInstrumentationScript = require("testability-browser-bindings");
const log = debug("sync-plugin");

class SyncPlugin implements ProtractorPlugin {

    name?: "synchronization";

    get skipAngularStability() {
        return true;
    }

    onPrepare() {
        log("onPrepare: enter");
        this.wrapBrowserGet(protractorBrowser);
        log("onPrepare: exit");
    }

    onPageLoad(browser: ProtractorBrowser): void {
        log("onPageLoad: enter");
        browser.executeScript(`if(!window.testability) { ${testabilityScript} }`);
        browser.executeScript(browserInstrumentationScript);
        log("onPageLoad: exit");
    }

    waitForPromise(browser: ProtractorBrowser): promise.Promise<void> {
        log("waitForPromise: enter");

        return browser.executeAsyncScript(
            "return window.testability && window.testability.when.ready.apply(null, arguments)")
            .then(function(browserErr) {
                log("waitForPromise: resolving promise");

                if (browserErr) {
                    throw new Error(`Error while waiting to sync with the page: ${JSON.stringify(browserErr)}`);
                }
            });
    }

    private wrapBrowserGet(browser: ProtractorBrowser): void {
        log("wrapBrowserGetIfRequired: enter");

        if (browser.hasGetBeenWrappedBySync) {
            throw new Error("Broswer get method has already been wrapped");
        }

        const originalGet = browser.get;

        browser.get = function(): promise.Promise<any> {
            log("browser.get: enter");
            browser.ignoreSynchronization = true;

            log("browser.get: calling original get");
            const result = originalGet.apply(browser, arguments);
            log("browser.get: finished calling original get");

            browser.ignoreSynchronization = false;

            log("browser.get: exit");
            return result;
        };

        browser.hasGetBeenWrappedBySync = true;
        log("wrapBrowserGetIfRequired: exit");
    }
}

module.exports = new SyncPlugin();
