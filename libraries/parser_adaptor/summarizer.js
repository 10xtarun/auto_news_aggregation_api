const SummarizerManager = require("node-summarizer").SummarizerManager
const titlegen = require("titlegen")

class NodeSummarizer {

    getSummary(text, options) {
        const { n_sentences } = options

        try {
            const Summarizer = new SummarizerManager(text, n_sentences)
            const titleGenerator = titlegen.create()

            return Summarizer.getSummaryByRank()
                .then(result => {
                    // generate title
                    titleGenerator.feed(result.sentence_list)
                    titleGenerator.config.min_word_count = 7
                    titleGenerator.config.max_word_count = 12
                    const title = titleGenerator.next()

                    return {
                        summary: result.summary,
                        title
                    }
                })
                .catch(err => console.log(`node summary error - ${err}`))

        } catch (error) {
            console.log(`node summary error - ${error}`)
        }
    }
}

module.exports = {
    NodeSummarizer
}