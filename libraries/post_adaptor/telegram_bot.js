const { Telegram } = require("telegraf")

class TelegramBot {
    constructor(config) {
        this._config = config
    }

    sendMessage(message) {
        if (!message) throw new Error(`message is invalid - ${message}`)
        try {
            this.checkConfig(this._config)
            const bot = new Telegram(this._config.token)
            const CHANNEL_ID = this._config.id

            bot.sendMessage(CHANNEL_ID, message)
                .catch(err => console.log(`telegram bot message send error - ${err}`))

        } catch (error) {
            console.log(`config error - ${error}`)
        }
    }

    checkConfig(configObj) {
        if (!configObj.token) throw new Error(`telegram bot token is missing or invalid`)
        if (!configObj.id) throw new Error(`telegram bot id is missing or invalid`)
    }
}

module.exports = {
    TelegramBot
}