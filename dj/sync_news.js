const { AutoCar } = require("../libraries/news_adaptor/auto_car")

module.exports = (agenda) => {
    agenda.define(process.env.NEWS_JOB, () => {
        console.log(`job started - ${process.env.NEWS_JOB}`)
        try {
            const autoCar = new AutoCar({ url: process.env.AUTO_CAR_URL })
            autoCar.getNews()

        } catch (error) {
            console.log(`news sync job error - ${error} `)
        }
        console.log(`job ended - ${process.env.NEWS_JOB}`)
    })
}