'use strict'
const Koa = require('koa')
const KoaStatic = require('koa-static')
const KoaRouter = require('koa-router')
const http = require('http')
const path = require('path')
const KeyGrip = require('keygrip')
const random = require('randomstring')

/* Server port */
const port = 8080

const app = new Koa()
const router = new KoaRouter()

/* 암호화 키 생성 */
app.keys = new KeyGrip([random.generate()], 'sha256', 'hex')

router.post('/test', (ctx, next) => {
	console.log('test!')
})

/* 미들웨어 설정 */
app.use(KoaStatic(path.join(__dirname, '../steam-bot-client/dist')))
app.use(router.routes())

/* 서버 시작 */
http.createServer(app.callback()).listen(port, () => {
	console.log(`(${path.join(__dirname, '../steam-bot-client/dist')}) Server started at http://localhost:${port}`)
})