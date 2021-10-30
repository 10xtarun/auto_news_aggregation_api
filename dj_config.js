const { Agenda } = require("agenda")

const jobTypes = [
    "sync_uploads"
]

const startDJ = () => {
    let agenda

    agenda = new Agenda({
        db: {
            address: process.env.MONGO_URI,
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        }
    })

    jobTypes.map(type => {
        require("./dj/" + type)(agenda)
    })

    if (jobTypes.length) {
        agenda.on("ready", async () => {
            await agenda.start()
            agenda.every("1 minutes", process.env.UPLOADS_JOB)
        })
    }

    let graceful = () => {
        agenda.stop(() => process.exit(0));
    };

    process.on("SIGTERM", graceful);
    process.on("SIGINT", graceful);
}

module.exports = {
    startDJ,
}