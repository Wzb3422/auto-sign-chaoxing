import { Page } from 'puppeteer'

export const getCourseIds = async (page: Page) => {
  await page.goto('http://mooc1-2.chaoxing.com/visit/interaction')
  const lisHandles = await page.$$('.ulDiv ul li')
  let result: CourseIDItem[] = []
  let i = 0
  await new Promise(resolve => {
    lisHandles.forEach(async (handle, index) => {
      const oneCourseIdArr = await handle.$$eval('input', nodes => nodes.map(n => {
        const name = n.getAttribute('name')
        const id = n.getAttribute('value')
        return {
          [name]: id
        }
      }))
      const courseTitle = await handle.$$eval('.Mconright a', nodes => nodes.map(n => n.textContent))
      if (oneCourseIdArr[0] && oneCourseIdArr[0].courseId) {
        result[i] = {
          courseId: oneCourseIdArr[0].courseId,
          classId: oneCourseIdArr[1].classId,
          title: courseTitle[0]
        } as CourseIDItem
        i++
      }
      if (index === lisHandles.length - 1) {
        resolve('ok')
      }
    })
  })
  return result
}
