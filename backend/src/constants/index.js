module.exports = {
    recaptcha: {
        GOOGLE_RECAPTCHA_URL: 'https://www.google.com/recaptcha/api/siteverify',
        GOOGLE_RECAPTCHA_SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY || '6LdNBvEUAAAAAJQg5vFjzfHhnwbKA6C6RvxyP-Et'
    },
    ip: {
        IP_URL: 'https://ipapi.co'
    },
    email: {
        HOST: "smtp-mail.outlook.com",
        PORT: 587,
        AUTH: {
            USER: process.env.EMAIL_USERNAME || 'vasuvanka-services@outlook.com',
            PASS: process.env.EMAIL_PASSWORD || 'vasu4198'
        }
    },
    currency: {
        EXCHANGE_URL: 'https://api.ratesapi.io/api',
        LIST: ["GBP", "HKD", "IDR", "ILS", "DKK", "INR", "CHF", "MXN", "CZK", "SGD", "THB", "HRK", "MYR", "NOK", "CNY", "BGN", "PHP",
            "SEK", "PLN", "ZAR", "CAD", "ISK", "BRL", "RON", "NZD", "TRY", "JPY", "RUB", "KRW", "USD", "HUF", "AUD"]
    },
    quotes: {
        PROG_QUOTE_URL: "https://programming-quotes-api.herokuapp.com/quotes"
    },
    url: {
        SHORTNER: "https://cleanuri.com/api/v1/shorten"
    },
    appConfig: {
        CORS: { origin: ["http://localhost:4200"] },
        PORT: process.env.PORT || '3000',
        MORGAN: "combined"
    },
    weather: {
        API_KEY: process.env.WEATHER_API_KEY || '77746c5cbb334eb38419215a69aa9dc8',
        URL: 'https://api.weatherbit.io/v2.0/current'
    }
}