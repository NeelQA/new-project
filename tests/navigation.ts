import { browser } from "protractor";

const resetUrl = "data:text/html,<html></html>";

/**
 * Navigates to the given URL. Note: The current page is cleared in order to ensure the application
 * doesn't intercept the navigation event.
 * @param url Url to navigate to.
 */
export async function navigateTo(url: string): Promise<void> {
    await browser.driver.get(resetUrl);

    await browser.get(url);
}
