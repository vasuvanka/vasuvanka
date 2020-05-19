const { Router } = require('express')
const { validate } = require('@vasuvanka/json-validator')
const {
    verifyReCaptcha,
    sendMail,
    initNodeMailer,
    getShorternUrl,
    getCurrencyRate,
    getCurrencyCodes,
    getProgQuoteByPage,
    getProgQuote,
    getIpInfo, getWeather, IP, getIPAddress
} = require('../controllers/utils')
const { emailSchema, urlSchema, currencySchema } = require('../constants/validator')
const router = Router()
initNodeMailer()
router.post('/email', async (req, res, next) => {
    const err = validate(req.body, emailSchema)
    if (err) {
        return res.status(400).send({ message: err })
    }
    try {
        const resp = await verifyReCaptcha(req.body.token)
        if (resp && !resp.success) {
            return res.status(400).send({ message: 'verification failed' })
        }
        const mail = await sendMail(req.body.email, '"vasu vanka services" <vasuvanka-services@outlook.com>', "Task list", "todo list", `<p>task list<p>\n<p>${JSON.stringify(req.body.todos)}</p>`)
        if (!mail) {
            throw new Error('unable to send email')
        }
        res.status(200).send({ message: 'mail sent' })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
})

router.post('/url', async (req, res, next) => {
    const err = validate(req.body, urlSchema)
    if (err) {
        return res.status(400).send({ message: err })
    }
    try {
        const resp = await getShorternUrl(req.body.url)
        if (!resp) {
            return res.status(500).send({ message: 'oops! something went wrong' })
        }
        res.status(201).send({ message: 'url shortned', url: resp.result_url })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
})

router.post('/currency-exchange-rate', async (req, res, next) => {
    const err = validate(req.body, currencySchema)
    if (err) {
        return res.status(400).send({ message: err })
    }
    try {
        const resp = await getCurrencyRate(req.body.base, req.body.toList, new Date(req.body.date || new Date().toUTCString()))
        if (!resp) {
            return res.status(500).send({ message: 'oops! something went wrong' })
        }
        res.status(200).send({ message: 'currency exchange rate for date ' + new Date().toLocaleDateString(), data: resp })
    } catch (err) {
        res.status(500).send({ message: err.message || 'internal error' })
    }
})

router.get('/currency-codes', async (req, res, next) => {
    res.send(getCurrencyCodes())
})

router.get('/ip-info', async (req, res, next) => {
    try {
        const ipInfo = await getIpInfo(req.ip)
        res.json(ipInfo)
    } catch (err) {
        res.status(500).send({ message: err.message || 'internal error' })
    }
})

router.get('/quotes/random', async (req, res, next) => {
    try {
        const data = await getProgQuote()
        return res.send({ message: "programmers quote", quote: data })
    } catch (err) {
        res.status(500).send({ message: err.message || 'internal error' })
    }
})

router.get('/quotes/page/:id', async (req, res, next) => {
    try {
        const pageNo = Number(req.params.id)
        const quotes = await getProgQuoteByPage(pageNo)
        return res.send({ message: "programmers quote", quotes })
    } catch (err) {
        res.status(500).send({ message: err.message || 'internal error' })
    }
})

router.get('/weather', async (req, res, next) => {
    try {
        const ipInfo = await getIpInfo(req.ip)
        if (!ipInfo) {
            return res.status(500).send({ message: 'internal error' })
        }
        const lat = ipInfo.latitude
        const lon = ipInfo.longitude

        if (!lat || !lon) {
            return res.status(500).send({ message: 'internal error' })
        }
        const weather = await getWeather(lat, lon)
        if (!weather) {
            return res.status(500).send({ message: 'internal error' })
        }
        res.json({ weather, message: "weather data based on IP address" })
    } catch (err) {
        res.status(500).send({ message: err.message || 'internal error' })
    }
})

router.get('/ip', async (req, res, next) => {
    const ip = await getIPAddress()
    res.status(ip ? 200 : 500).json({ ip, message: ip ? 'ip addresss' : 'no ip address' })
})

module.exports = router