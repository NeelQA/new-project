import * as debug from "debug";
import { browser as protractorBrowser, ProtractorBrowser } from "protractor";
import { ProtractorPlugin } from "protractor/built/plugins";
import { promise } from "selenium-webdriver";

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
