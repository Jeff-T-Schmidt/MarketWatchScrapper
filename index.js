const PORT = 8080
const express = require("express")
const axios = require("axios")
const cheerio = require("cheerio")
const { response } = require("express")
const e = require("express")

const app = express()

// const articles = []

app.get("/", (req, res) => {
    res.json("Welcome to my Market Watch Scrapper")
})

app.get("/all", (req, res) => {

    // axios.get('https://www.news.com.au/finance')
    //     .then((response) => {
    //         const html = response.data
    //         // console.log(html)
    //         const $ = cheerio.load(html)

    //          $('a:contains("stock")', html).each(function () {
    //             const title = $(this).text()
    //             const url = $(this).attr('href')
    //              articles.push({
    //                 title,
    //                 url
    //             })
    //         })
    //         res.json(articles)
    //     }).catch((err) => console.log(err)) 

    const fetchStocks = async () => {
        try {
            const response = await axios.get("https://www.yahoo.com/")
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []

            $('<li class="stream-item js-stream-content Bgc(t) Pos(r) My(12px) stream-grid-view_Flxb(1/3) stream-grid-view_Fxg(2)"></li>').each((index, el)=>{
                const article = $(el)
                const title = article.find('.stream-item-title','#stream_item_title_7').text()
                //.js-content-viewer.rapidnofollow.D(b).Td(n).Td(n):f.C(--batcave).C($streamBrandHoverClass):h.C($streamBrandHoverClass):f.stream-title.wafer-destroyed
                articles.push(title)
            })
            return articles
        } catch (error) {
            console.error(error)
        }
    }
    fetchStocks().then(articles => console.log(articles))
})

app.listen(PORT, () => console.log(`server running on ${PORT}`))
