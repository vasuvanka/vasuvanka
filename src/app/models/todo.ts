export class Todo {
    task: string
    done: boolean
    created: Date
    completed: Date
}

export class Mail {
    token: string
    email: string
    todos: Todo[]
}

export class Quote {
    quote: string
    author: string

    static fromJson(json: any): Quote {
        const quote = new Quote()
        quote.author = json.author
        quote.quote = json.en || json.sn
        return quote
    }

    static fromJsonList(jsons: any[]): Quote[] {
        return (jsons || []).map(Quote.fromJson)
    }
}