import { Page } from 'puppeteer'

class ConfigPage {
  static noImageRequest = async (page: Page) => {
    await page.setRequestInterception(true);
    page.on('request', interceptedRequest => {
      if (interceptedRequest.url().endsWith('.png') || interceptedRequest.url().endsWith('.jpg'))
        interceptedRequest.abort()
      else
        interceptedRequest.continue()
    })
  }
}

export default ConfigPage

