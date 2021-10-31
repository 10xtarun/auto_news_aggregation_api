const { default: axios } = require("axios")
const cheerio = require("cheerio");
const { CarNews } = require("../../models/car_news")
const { NodeSummarizer } = require("../parser_adaptor/summarizer")

class AutoCar {
    constructor(config) {
        this._config = config;
    }

    getNews() {
        let url
        try {
            url = this._config.url
            if (!url) throw new Error("url missing or invalid")
        } catch (error) {
            console.log(`Error : ${error}`)
        }

        axios.get(url)
            .then(response => {
                if (response.status != 200) {
                    throw new Error(`failed to recieve response from autocar`)
                }

                const $ = cheerio.load(response.data)

                const newsBox = $('a[href]')

                newsBox.each(chd => {
                    try {
                        const link = newsBox[chd].attribs["href"]
                        if (link.includes("/car-news/")) {
                            CarNews.create({
                                link: link
                            })
                                .catch(err => {
                                    if (err.code != 11000) {
                                        // ignore unique error
                                        console.log(`document save error -${err.code} - ${err.message}`)
                                    }
                                })
                        }
                    } catch (error) {
                        console.log(`document parse error - ${error}`)
                    }
                })
            })
            .catch(error => {
                console.log(`axios fetch error - ${error}`)
            })
    }

    getArticle() {
        let url
        try {
            url = this._config.url
            if (!url) throw new Error("url missing or invalid")
        } catch (error) {
            console.log(`Error : ${error}`)
        }

        CarNews.find({ parsed: false }, { link: 1 }, (err, doc) => {
            if (err) console.log(`car news link fetch error - ${err}`)

            doc.map(news => {
                axios.get(news.link)
                    .then(response => {
                        if (response.status !== 200) throw console.log(`car news fetch error - status: ${response.status}`)

                        const $ = cheerio.load(response.data)
                        const coreParagraphs = $(`p[class=new-pare-p]`)
                        coreParagraphs.splice(coreParagraphs.length - 3)

                        const summarizer = new NodeSummarizer()
                        summarizer.getSummary(coreParagraphs.text(), { n_sentences: 5 })
                            .then((result) => {
                                if(!result.summary) throw new Error(`summary generation error`)
                                console.log("summarization completed")
                                return CarNews.findOneAndUpdate({ link: news.link }, {
                                    $set: {
                                        content: result.summary,
                                        title: result.title,
                                        parsed: true
                                    }
                                })
                            })
                            .catch(err => console.log(`summary doc save failed - ${err}`))
                    })
                    .catch(err => console.log(`car news fetch error - ${err} `))
            })
        })
    }
}

module.exports = {
    AutoCar
}