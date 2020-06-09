module.exports = {
    recaptcha: {
        GOOGLE_RECAPTCHA_URL: 'https://www.google.com/recaptcha/api/siteverify',
        GOOGLE_RECAPTCHA_SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY
    },
    ip: {
        IP_URL: 'https://ipapi.co'
    },
    email: {
        HOST: process.env.EMAIL_HOST,
        PORT: process.env.EMAIL_PORT,
        AUTH: {
            USER: process.env.EMAIL_USERNAME,
            PASS: process.env.EMAIL_PASSWORD
        }
    },
    currency: {
        EXCHANGE_URL: 'https://api.ratesapi.io/api',
        OPEN_EXCHANGE_URL: 'https://api.exchangerate-api.com/v6/latest',
        LIST: ["GBP", "HKD", "IDR", "ILS", "DKK", "INR", "CHF", "MXN", "CZK", "SGD", "THB", "HRK", "MYR", "NOK", "CNY", "BGN", "PHP",
            "SEK", "PLN", "ZAR", "CAD", "ISK", "BRL", "RON", "NZD", "TRY", "JPY", "RUB", "KRW", "USD", "HUF", "AUD"]
    },
    quotes: {
        PROG_QUOTE_URL: "https://programming-quotes-api.herokuapp.com/quotes"
    },
    url: {
        SHORTNER: "https://cleanuri.com/api/v1/shorten",
        TINYURL: "https://tinyurl.com/create.php?source=indexpage&url=",
        ISGD: "https://is.gd/create.php?format=simple&url="
    },
    appConfig: {
        CORS: {
            // origin: ["https://vasuvanka.github.io"],
            origin: '*',
            optionsSuccessStatus: 200
        },
        PORT: process.env.PORT || '3000',
        MORGAN: "combined"
    },
    weather: {
        API_KEY: process.env.WEATHER_API_KEY,
        URL: 'https://api.weatherbit.io/v2.0/current'
    }
}