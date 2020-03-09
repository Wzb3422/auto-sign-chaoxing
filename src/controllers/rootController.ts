import puppeteer from 'puppeteer'
import { Context } from 'koa'
import { login } from '../utils/login'
import { getCourseIds } from '../utils/getCourseIds'
import { queryActiveTask } from '../utils/queryActiveTask'
import { signAll } from '../utils/sign'
import { showResult } from '../utils/showResult'
import ConfigPage from '../utils/ConfigPage'

const rootController = async (ctx: Context) => {

  console.log('💡 接收到了请求')
  console.log('🐛 开始进行登录操作')
  const {username, password} = ctx.request.body

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  ConfigPage.noImageRequest(page)

  // 登录
  if (await login(page, username, password) === false) {
    ctx.body = '登录失败'
    console.log('⚠️ 登录失败')
    return
  }
  console.log('🚪 登录成功')
  const courseIDArray = await getCourseIds(page)
  console.log(`🤔 你共有 ${courseIDArray.length} 门课程`)
  console.log(`🔍 开始获取 classId courseId 等信息`)
  const actvieSignArray = await queryActiveTask(browser, courseIDArray)
  console.log(`😯 classId courseId 等信息 获取成功`)
  if (actvieSignArray.length === 0) {
    console.log('🐷 此时没有需要签到的课')
    return
  }
  console.log('✍️ 开始签到操作')
  const result = await signAll(browser, actvieSignArray)
  showResult(result)
  await browser.close()

}
export default rootController
