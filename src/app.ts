import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import puppeteer from 'puppeteer'
import rootController from './controllers/rootController'


type CourseIdItem = {
  name: string,
  id: string
}


const app = new Koa();
const router = new Router()

router.post('/', async ctx => {
  await rootController(ctx)
  // await browser.close();
});

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000);
