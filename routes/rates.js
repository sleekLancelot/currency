const express = require('express')
const router = express.Router()

const axios = require('axios')

router.get('/', async (req, res) => {
    try {
        const data = await axios.get(`https://api.exchangeratesapi.io/latest?base=${req.query.base}&symbols=${req.query.symbols}`)

        console.log(data);
        res.json({ results: data.data })

    } catch (err) {
        res.status(500).send('A problem occurred with the server,pleas refresh or resubmit the form')
    }
})

module.exports = router;