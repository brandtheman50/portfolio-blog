require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const app = express();
const articleRouter = require('./routes/articles')

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
})
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index')
});

app.use('/blog', articleRouter);

app.listen(5000);