import { browser, element, by } from 'protractor';

export class Angular2CliPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ang2-root h1')).getText();
  }
}
