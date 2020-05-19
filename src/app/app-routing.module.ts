import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { TodoComponent } from './components/todo/todo.component';
import { WeatherComponent } from './components/weather/weather.component';
import { BioComponent } from './components/bio/bio.component';
import { JokesComponent } from './components/jokes/jokes.component';
import { UrlShortnerComponent } from './components/url-shortner/url-shortner.component';
import { QuotesComponent } from './components/quotes/quotes.component';
import { CurrencyExchangeComponent } from './components/currency-exchange/currency-exchange.component';


const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      // {
      //   path: "task-manager",
      //   component: TodoComponent
      // },
      {
        path: "url-shortner",
        component: UrlShortnerComponent
      },
      {
        path: "weather",
        component: WeatherComponent
      },
      {
        path: "",
        component: TodoComponent
      },
      {
        path: "jokes",
        component: JokesComponent
      },
      {
        path: "quotes",
        component: QuotesComponent
      },
      {
        path: "currency",
        component: CurrencyExchangeComponent
      }
    ]
  },
  {
    path: "portfolio",
    component: PortfolioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
