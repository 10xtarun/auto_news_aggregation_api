const { CarNews } = require("../models/car_news")
const { TelegramBot } = require("../libraries/post_adaptor/telegram_bot")


module.exports = (agenda) => {
    agenda.define(process.env.UPLOADS_JOB, () => {
        console.log(`job started - ${process.env.UPLOADS_JOB}`)
        const bot = new TelegramBot(
            {
                token: process.env.TELE_BOT_TOKEN,
                id: process.env.TELE_CHANNEL_ID
            }
        )

        CarNews.find({ parsed: true, posted: false }, { content: 1, title: 1 }, ((err, docs) => {
            if (err) throw new Error(`dj content fetch error - ${err}`)
            docs.map(async doc => {
                try {
                    const message = ""
                        + `${doc.title}`
                        + `...   `
                        + `${doc.content}`

                    bot.sendMessage(message, { parse_mode: "html" })
                    await CarNews.findByIdAndUpdate(doc._id, { $set: { posted: true } })
                } catch (error) {
                    console.log(`dj bot message send error - ${error}`)
                }
            })
        }))
        console.log(`job ended - ${process.env.UPLOADS_JOB}`)
    })
}