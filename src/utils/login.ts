import { Page } from 'puppeteer'

export const login = async (page: Page, username: string, password: string) => {
  await page.goto(`http://i.chaoxing.com/vlogin?passWord=${password}&userName=${username}`);
  const bodyHandle = await page.$('body');
  const loginRet = await page.evaluate(body => body.innerHTML, bodyHandle);
  await bodyHandle.dispose();
  let result
  if (loginRet.includes('true')) {
    result = true
  } else {
    result = false
  }
  return result
}

