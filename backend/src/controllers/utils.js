const requestify = require('requestify');
const nodemailer = require("nodemailer");
let transporter = null
const { currency, ip, url, quotes, email, recaptcha, weather } = require('../constants/index')
module.exports.initNodeMailer = () => {
    transporter = nodemailer.createTransport({
        host: email.HOST,
        port: email.PORT,
        secure: false,
        auth: {
            user: email.AUTH.USER,
            pass: email.AUTH.PASS
        }
    });
}
module.exports.getIpInfo = async (ipAddress) => {
    if (!ipAddress) {
        return null
    }
    const url = `${ip.IP_URL}/${ipAddress}/json`
    const response = await requestify.get(url)
    if (!response.body) {
        return null
    }
    try {
        const resp = JSON.parse(response.body)
        return resp
    } catch (err) {
        console.log(err)
        return null
    }
}

module.exports.buildDate = function buildDate(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

module.exports.getCurrencyRate = async (base = 'INR', symbols = [], date = new Date()) => {
    const url = `${currency.EXCHANGE_URL}/latest?base=${base}&symbols=${symbols.join(',')}`
    const response = await requestify.get(url)
    if (!response.body) {
        return null
    }
    try {
        const resp = JSON.parse(response.body)
        return resp
    } catch (err) {
        console.log(err)
        return null
    }
}

module.exports.getShorternUrl = async (fullUrl) => {
    const response = await requestify.post(url.SHORTNER, { url: fullUrl })
    if (!response.body) {
        return null
    }
    try {
        const resp = JSON.parse(response.body)
        return resp
    } catch (err) {
        console.log(err)
        return null
    }
}

module.exports.getCurrencyCodes = () => {
    return currency.LIST
}

module.exports.getProgQuote = async () => {
    try {
        const response = await requestify.get(quotes.PROG_QUOTE_URL + '/random')
        if (!response.body) {
            return null
        }
        const resp = JSON.parse(response.body)
        return resp
    } catch (err) {
        console.log(err)
        return null
    }
}

module.exports.getProgQuoteByPage = async (number = 1) => {
    try {
        const response = await requestify.get(quotes.PROG_QUOTE_URL + '/page/' + number)
        if (!response.body) {
            return null
        }
        const resp = JSON.parse(response.body)
        return resp
    } catch (err) {
        console.log(err)
        return null
    }
}

module.exports.sendMail = async (to, from, subject, text, html) => {
    try {
        const mail = await transporter.sendMail({ from, to, subject, text, html });
        return mail
    } catch (err) {
        console.log(err)
        return null
    }
}

module.exports.verifyReCaptcha = async (token) => {
    try {
        const url = `${recaptcha.GOOGLE_RECAPTCHA_URL}?secret=${recaptcha.GOOGLE_RECAPTCHA_SITE_KEY}&response=${token}`
        const response = await requestify.post(url)
        const resp = JSON.parse(response.body)
        return resp
    } catch (err) {
        console.log(err)
        return null
    }
}

module.exports.getWeather = async (lan, lon) => {
    try {
        const url = `${weather.URL}?key=${weather.API_KEY}&lat=${lan}&lon=${lon}`
        const response = await requestify.get(url)
        if (!response.body) {
            return null
        }
        const resp = JSON.parse(response.body)
        return resp
    } catch (err) {
        console.log(err)
        return null
    }
}

module.exports.IP = () => {
    const os = require('os')
    const ifaces = os.networkInterfaces();

    for (const dev in ifaces) {
        let filteredIFace = ifaces[dev].filter(details => {
            return details.family === 'IPv4' && details.internal === false;
        });

        if (filteredIFace.length > 0) {
            address = filteredIFace[0].address;
        }
    }

    return address
}

module.exports.getIPAddress = async () => {
    try {
        const url = `http://bot.whatismyipaddress.com`
        const response = await requestify.get(url)
        return response.body
    } catch (err) {
        console.log(err)
        return null
    }
}