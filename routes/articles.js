const express = require('express')
const Article = require('./../models/article')
const router = express.Router()

router.get('/', async (req, res) => {
    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/blog', {articles: articles})
})

router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug })
    if (article == null) res.redirect('/blog')
    res.render('articles/show', { article: article })
})
module.exports = router