require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const app = express();
const methodOverride = require('method-override');
const articleRouter = require('./routes/articles')

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
})
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index')
});

app.use('/blog', articleRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server is running on port ' + port))