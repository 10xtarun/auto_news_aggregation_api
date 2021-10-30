const { CarNews } = require("../models/car_news")
const { TelegramBot } = require("../libraries/post_adaptor/telegram_bot")


module.exports = (agenda) => {
    agenda.define(process.env.UPLOADS_JOB, () => {

        const bot = new TelegramBot(
            {
                token: process.env.TELE_BOT_TOKEN,
                id: process.env.TELE_CHANNEL_ID
            }
        )

        CarNews.find({ posted: false }, { content: 1 }, ((err, docs) => {
            if (err) throw new Error(`dj content fetch error - ${err}`)
            console.log("uploads found - ", docs)
            docs.map(async doc => {
                try {
                    bot.sendMessage(doc.content)
                    await CarNews.findByIdAndUpdate(doc._id, { $set: { posted: true } })
                } catch (error) {
                    console.log(`dj bot message send error - ${error}`)
                }
            })
        }))
    })
}