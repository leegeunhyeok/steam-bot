'use strict'
const Koa = require('koa')
const KoaStatic = require('koa-static')
const KoaRouter = require('koa-router')
const KoaSession = require('koa-session')
const KoaBodyParser = require('koa-bodyparser')
const http = require('http')
const path = require('path')
const fs = require('fs')
const KeyGrip = require('keygrip')
const random = require('randomstring')

const SteamSearch = require('steam-app-search').SteamStore
const SteamStore = new SteamSearch()

const Bot = require('./bot.js').DialogFlow
const bot = new Bot('steam-bot-673ee', 'C:/g_key/a.json')

/* Server port */
const port = 80

/* Koa 인스턴스 생성 */
const app = new Koa()

/* 암호화 키 생성 */
app.keys = new KeyGrip([random.generate()], 'sha256', 'hex')

/* POST 데이터를 읽기 위한 미들웨어 */
app.use(KoaBodyParser())

/* 세션 미들 웨어 */
app.use(KoaSession(app))

/* 라우터 */
const router = new KoaRouter()

router.get('/', (ctx, next) => {
  if (ctx.session['id'] === undefined) {
    const time = new Date().getTime().toString()
    ctx.session['id'] = KeyGrip([time], 'sha256', 'hex').sign(random.generate())
    console.log('New session:', ctx.session['id'])
  }

  ctx.type = 'html'
  ctx.status = 200
  ctx.body = fs.readFileSync(path.join(__dirname, '../steam-bot-client/dist/index.html'))
})

/* 클라이언트 메시지 Dialogflow로 전달 */
router.post('/query', async ctx => {
  let resType = 'default'
  let resData = {}
  let resAction = ''
  console.log('Client:', ctx.request.body.message)
  const res = await bot.sendTextMessageToDialogFlow(ctx.request.body.message, ctx.session.id)
  let resMessage = bot.getResponseText(res)

  const $intent = bot.getIntent(res)

  /* 검색 인텐트인 경우 해당 키워드 검색하여 데이터 조회하기 */
  if ($intent === 'search-keyword' || $intent === 'search') {
    const keyword = bot.getParameterValue(res)['keyword']['stringValue']
    const result = await SteamStore.search(keyword)
    resType = 'store'
    const pendingPromises = result.slice(0, 3).map(async info => {
      info['detail'] = await SteamStore.detail(info.id, 'koreana')
      return info
    })
    resData = await Promise.all(pendingPromises)
  } else if ($intent === 'cart-clear') {
    resAction = 'cart-clear'
  } else if ($intent === 'help') {
    resAction = 'help'
  }
  console.log('Dialogflow:', resMessage)
  ctx.type = 'json'
  ctx.body = {type: resType, message: resMessage, data: resData, action: resAction}
})

/* 라우터 미들웨어 설정 */
app.use(router.routes())

/* 정적파일 */
app.use(KoaStatic(path.join(__dirname, '../steam-bot-client/dist/')))

/* 서버 시작 */
http.createServer(app.callback()).listen(port, () => {
	console.log(`(${path.join(__dirname, '../steam-bot-client/dist')}) Server started at http://localhost:${port}`)
})
