import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/core/services/github.service';
import { UtilService } from 'src/app/core/services/util.service';
import { Quote } from 'src/app/models/todo';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
  progQuote: Quote = { author: undefined, quote: undefined }
  quotes: Quote[] = []
  page = 0
  constructor(
    private githubServices: GithubService,
    private utilServices: UtilService) {

  }

  async ngOnInit() {
    await this.getOne()
    await this.getQuotes()
  }
  async getOne() {
    try {
      const { quote } = await this.githubServices.getQuote()
      this.progQuote.quote = quote.en || 'something happend bad while fetching'
      this.progQuote.author = `by ${quote.author}`
    } catch (err) {
      console.log(err)
      this.utilServices.openSnackBar(err.message || err)
    }
  }

  async getQuotes() {
    try {
      this.page = this.page + 1
      const { quotes } = await this.githubServices.getQuotesbyPage(this.page)
      this.quotes = Quote.fromJsonList(quotes)
    } catch (err) {
      console.log(err)
      this.utilServices.openSnackBar(err.message || err)
    }
  }

}
