const { AutoCar } = require("../libraries/news_adaptor/auto_car")

module.exports = (agenda) => {
    agenda.define(process.env.PARSER_JOB, () => {
        console.log(`job started - ${process.env.PARSER_JOB}`)
        try {
            const autoCar = new AutoCar({ url: process.env.AUTO_CAR_URL })
            autoCar.getArticle()
        } catch (error) {
            console.log(`news sync job error - ${error} `)
        }
        console.log(`job ended - ${process.env.PARSER_JOB}`)
    })
}