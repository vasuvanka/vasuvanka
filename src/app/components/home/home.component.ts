import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  links = [
    { label: 'Task Manager', url: '' },
    { label: 'URL Shortner', url: 'url-shortner' },
    { label: 'Currency Exchange', url: 'currency' },
    { label: 'Quotes', url: 'quotes' },
  ];
  activeLink = this.links[0];
  constructor() { }
}
