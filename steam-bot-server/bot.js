const SteamSearch = require('steam-app-search').SteamStore
const SteamStore = new SteamSearch()

const dialogflow = require('dialogflow')
const fs = require('fs')

const LANGUAGE_CODE = 'ko-KR' 

class DialogFlow {
	/**
	 * @description 생성자, 인증파일을 읽고 SessionClient 생성
	 * @param {*} projectId 
	 * @param {*} keyfileDir 
	 */
	constructor (projectId, keyfileDir) {
    this.projectId = projectId
		const authfile = JSON.parse(fs.readFileSync(keyfileDir))
    let privateKey = authfile['private_key'] // 비공개 키
		let clientEmail = authfile['client_email'] // 클라이언트 이메일
		let config = {
			credentials: {
				private_key: privateKey,
				client_email: clientEmail
			}
    }
		this.sessionClient = new dialogflow.SessionsClient(config)
	}

	/**
	 * @description 다이얼로그 플로우 
	 * @param {string} textMessage Dialogflow에 질문할 문장
	 * @param {string} sessionId 세션 ID
	 * @return {any} 결과 객체
	 */
	async sendTextMessageToDialogFlow (textMessage, sessionId) {
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
    return await this.sessionClient.detectIntent(request)
	}

	/**
	 * @description 결과 객체에서 응답 메시지를 추출하여 반환
	 * @param {any} result Dialogflow 결과 객체
	 * @return {string} 응답 메시지
	 */
	getResponseText (result) {
		return result[0].queryResult.fulfillmentText
	}

	/**
	 * @description 결과 객체에서 인텐트를 추출하여 반환
	 * @param {any} result Dialogflow 결과 객체
	 * @return {any} 인텐트 정보
	 */
	getIntent (result) {
		return result[0].queryResult.intent.displayName
	}
}

exports.DialogFlow = DialogFlow
