const SummarizerManager = require("node-summarizer").SummarizerManager

class NodeSummarizer {

    getSummary(text, options) {
        const { n_sentences } = options

        try {
            const Summarizer = new SummarizerManager(text, n_sentences)

            return Summarizer.getSummaryByRank()
                .then(result => result.summary)
                .catch(err => console.log(`node summary error - ${err}`))

        } catch (error) {
            console.log(`node summary error - ${error}`)
        }
    }
}

module.exports = {
    NodeSummarizer
}