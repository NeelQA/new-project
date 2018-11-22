import { browser } from "protractor";
import { HomePage } from "../pacs/home.page";

export async function searchForAgreement(agreementid: string, index: number): Promise<void> {
    await HomePage.clickOnDropdown();
    browser.sleep(5000);
    await HomePage.searchBy(index);
    await HomePage.enterAgreementName(agreementid);
    return await HomePage.clickOnSearchButton();
}
