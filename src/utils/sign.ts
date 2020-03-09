import { Page, Browser } from 'puppeteer'


export const signAll = async (browser: Browser, activeItem: ActiveItem[]) => {

  const signOne = async (activeItem: ActiveItem) => {
    const page = await browser.newPage()
    const { classId, activeId, courseId, title } = activeItem
    let arr = activeId.split(',')
    if (arr[1] === '2') {
      const signPage = await page.goto(`https://mobilelearn.chaoxing.com/widget/sign/pcStuSignController/preSign?activeId=${arr[0]}&classId=${classId}&courseId=${courseId}`)
      const signDivHandler = await page.$eval('.qd_Success .greenColor', el => el.textContent)
      console.log(`🐢 课程 - ${title} - ${signDivHandler}`)
      return {
        title,
        success: true
      }
    }
    return {
      title,
      success: false
    }
  }
  let retList= []
  retList = await Promise.all(activeItem.map(async item => Promise.resolve(await signOne(item))))
  return retList
}
