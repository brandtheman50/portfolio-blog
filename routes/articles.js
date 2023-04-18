require('dotenv').config();
const express = require('express')
const session = require('express-session')
const Article = require('./../models/article')
const router = express.Router()
let loggedIn = true;
const adminUsername = process.env.ADMIN_USERNAME 
const adminPassword = process.env.ADMIN_PASSWORD

router.get('/', async (req, res) => {
    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/blog', {articles: articles})
})

router.get('/login', (req, res) => {
    res.render('articles/login');
})

router.post('/auth', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (username && password) {
        if (username == adminUsername && password == adminPassword) {
            loggedIn = true;
            res.redirect('/blog/admin');
        }
        else {
            console.log("Incorrect username or password")
            res.redirect('/blog/login');
        }
    }
})

router.get('/admin', async (req, res) => {
    if (loggedIn == true) {
        const articles = await Article.find().sort({
            createdAt: 'desc'
        })
        res.render('articles/admin', {articles: articles});
    }
    else {
        res.redirect('/blog/login');
    }
})
router.get('/new', (req, res) => {
    if (loggedIn == true) {
        res.render('articles/new', { article: new Article()});
    }
    else {
        res.redirect('/blog/login');
    }
    
})

router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug })
    if (article == null) res.redirect('/blog')
    res.render('articles/show', { article: article })
})

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', { article: article})
})

router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next()
}, saveArticleAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/blog/admin')
})
function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article
        article.title = req.body.title 
        article.description = req.body.description
        article.markdown = req.body.markdown
        try {
            article = await article.save()
            res.redirect(`/blog/${article.slug}`)
        } catch (e) {
            res.render(`articles/${path}`, { article: article})
        }
    }
}
module.exports = router