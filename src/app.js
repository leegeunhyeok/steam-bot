const SteamSearch = require('steam-app-search').SteamStore
const SteamStore = new SteamSearch()

const dialogflow = require('dialogflow')
const fs = require('fs')

const LANGUAGE_CODE = 'ko-KR' 

class DialogFlow {
	constructor (projectId) {
    this.projectId = projectId
    /* 인증 파일 읽기 */
		this.authfile = JSON.parse(fs.readFileSync('C:/g_key/steam-bot-673ee-eb9a40a8a691.json'))
    let privateKey = this.authfile['private_key'] // 비공개 키
		let clientEmail = this.authfile['client_email']
		let config = {
			credentials: {
				private_key: privateKey,
				client_email: clientEmail
			}
    }
		this.sessionClient = new dialogflow.SessionsClient(config)
	}

  /* Dialogflow 에 쿼리 */
	async sendTextMessageToDialogFlow(textMessage, sessionId) {
		const sessionPath = this.sessionClient.sessionPath(this.projectId, sessionId)
		const request = {
			session: sessionPath,
			queryInput: {
				text: {
					text: textMessage,
					languageCode: LANGUAGE_CODE
				}
			}
		}
    let responses = await this.sessionClient.detectIntent(request)			
    return responses
	}
}

/* 테스트 */
async function test () {
	var ins = new DialogFlow('steam-bot-673ee')
	let re = await ins.sendTextMessageToDialogFlow('검색할래', 'test-session')
	console.log(re[0]['queryResult']['intent']['displayName'])
	console.log(re[0]['queryResult']['outputContexts'][0])
}


test()