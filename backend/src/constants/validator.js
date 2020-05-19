module.exports.emailSchema = {
    token: { type: String },
    todos: [{
        task: { type: String },
        done: { type: Boolean },
        created: { type: Date },
        completed: { type: Date }
    }],
    email: { type: String }
}

module.exports.urlSchema = {
    url: { type: String }
}

module.exports.currencySchema = {
    base: { type: String },
    toList: [{ type: String }],
    date: { type: Date }
}