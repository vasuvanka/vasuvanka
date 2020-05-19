import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BioComponent } from './components/bio/bio.component';
import { TodoComponent } from './components/todo/todo.component';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from './material/material.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailPopupComponent } from './components/email-popup/email-popup.component';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { HttpClientModule } from '@angular/common/http';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { UrlShortnerComponent } from './components/url-shortner/url-shortner.component';
import { WeatherComponent } from './components/weather/weather.component';
import { JokesComponent } from './components/jokes/jokes.component';
import { QuotesComponent } from './components/quotes/quotes.component';
import { Covid19Component } from './components/covid19/covid19.component';
import { GithubService } from './core/services/github.service';
import { StorageService } from './core/services/storage.service';
import { UtilService } from './core/services/util.service';
import { CurrencyExchangeComponent } from './components/currency-exchange/currency-exchange.component';

@NgModule({
  declarations: [
    AppComponent,
    BioComponent,
    TodoComponent,
    HomeComponent,
    EmailPopupComponent,
    PortfolioComponent,
    UrlShortnerComponent,
    WeatherComponent,
    JokesComponent,
    QuotesComponent,
    Covid19Component,
    CurrencyExchangeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    RecaptchaV3Module,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: '6LcSwvkUAAAAAKlNNqe0wJlxIJnYdhZ5CRWjgc6c' },
    GithubService,
    StorageService,
    UtilService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
