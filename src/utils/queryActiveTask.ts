import { Browser } from 'puppeteer'
import ConfigPage from './ConfigPage'



export const queryActiveTask = async (browser: Browser, courseIDArray: CourseIDItem[]) => {
  const queryActive = async (courseIdItem: CourseIDItem): Promise<ActiveItem> => {
    const { classId, courseId, title } = courseIdItem
    const page = await browser.newPage()
    ConfigPage.noImageRequest(page)
    await page.goto(`https://mobilelearn.chaoxing.com/widget/pcpick/stu/index?courseId=${courseId}&jclassId=${classId}`)
    // endlist for test startList
    const activeListHandle = await page.$('#startList')
    const active =  await activeListHandle.$$eval('.Mct', nodes => nodes.map(n => n.getAttribute('onclick')))
    return {
      classId: classId,
      courseId: courseId,
      activeId: active[0],
      title: title
    }
  }

  let activeItemList: ActiveItem[] = []
  activeItemList = await Promise.all(courseIDArray.map(async item => Promise.resolve(await queryActive(item))))
  let activeSign: ActiveItem[] = activeItemList.filter(item => item.activeId !== undefined)
  activeSign.forEach((item, index) => {
    item.activeId = item.activeId.substr(13)
    item.activeId = item.activeId.substr(0, item.activeId.length - 1)
  })
  return activeSign
}
