const { Agenda } = require("agenda")
const { before, after } = require("../../test.config")

describe("SYNC JOBS TESTING", function () {
    let agenda

    const jobTypes = [
        "sync_uploads",
        "sync_news",
        "sync_parser"
    ]

    before("create agenda instance", function (done) {
        Promise.resolve()
            .then(() => {
                agenda = new Agenda({
                    db: {
                        address: process.env.MONGO_URI,
                        collection: "testJobs",
                        options: {
                            useNewUrlParser: true,
                            useUnifiedTopology: true,
                        },
                    }
                })
                return agenda
            })
            .then(() => {
                jobTypes.map(type => {
                    require("../../dj/" + type)(agenda)
                })
                return agenda.on("ready")
            })
            .then(() => {
                agenda.start()
                done()
            })
            .catch(err => {
                console.log(err)
                done(err)
            })
    })

    after("stop agenda instance", function (done) {
        agenda.stop(() => process.exit(0))
        done()
    })

    it("should run sync upload job", function (done) {
        agenda.every("30 minutes", process.env.UPLOADS_JOB)
            .then(job => {
                console.log(job)
            })
    })
})