'use strict'
const Koa = require('koa')
const KoaStatic = require('koa-static')
const KoaRouter = require('koa-router')
const KoaBodyParser = require('koa-bodyparser')
const http = require('http')
const path = require('path')
const KeyGrip = require('keygrip')
const random = require('randomstring')

const Bot = require('./bot.js').DialogFlow
const bot = new Bot('steam-bot-673ee', 'C:/g_key/a.json')

/* Server port */
const port = 8000

const app = new Koa()

/* POST 데이터를 읽기 위한 미들웨어 */
app.use(KoaBodyParser())

/* 라우터 */
const router = new KoaRouter()

/* 암호화 키 생성 */
app.keys = new KeyGrip([random.generate()], 'sha256', 'hex')

router.post('/query', async ctx => {
  console.log('Client:', ctx.request.body.message)
  const res = await bot.sendTextMessageToDialogFlow(ctx.request.body.message, 'aas')
  const resMessage = bot.getResponseText(res)
  console.log('Dialogflow:', resMessage)
  console.log(bot.getIntent(res))
  ctx.type = 'json'
  ctx.body = {response: resMessage}
})

/* 미들웨어 설정 */
app.use(KoaStatic(path.join(__dirname, '../steam-bot-client/dist')))
app.use(router.routes())

/* 서버 시작 */
http.createServer(app.callback()).listen(port, () => {
	console.log(`(${path.join(__dirname, '../steam-bot-client/dist')}) Server started at http://localhost:${port}`)
})
