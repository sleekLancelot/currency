const express = require('express')
const axios = require('axios')
// const path = require('path')

const app = express()

const port = process.env.PORT || 5000

app.use(express.json());

// app.use('/api/rates', require('./routes/rates'))

// set a static folder
// app.use(express.static('public'))

// load this once the home page is hit
// app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'public', 'index.html')));

// commented
// app.get('/', (req, res) => res.json({ msg: 'We in this b!' }))

app.get('/api/rates/:base/:currency', async (req, res) => {
    let base = req.params.base.toUpperCase(),
        currency = req.params.currency.toUpperCase()
    try {
        const data = await axios.get(`https://api.exchangeratesapi.io/latest?base=${base}&symbols=${currency}`)

        console.log(data);
        res.json({ results: data.data, base: base, symbols: currency })
    } catch (err) {
        res.status(500).send('A problem occurred with the server,please refresh or resubmit the form')
    }
})

app.use(function (req, res, next) {
    res.status(404);
    res.send('Wrong input');
});

app.listen(port, () => console.log(`we live at ${port}`))