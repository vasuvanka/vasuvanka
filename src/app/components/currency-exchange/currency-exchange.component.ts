import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GithubService } from 'src/app/core/services/github.service';
import { UtilService } from 'src/app/core/services/util.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-currency-exchange',
  templateUrl: './currency-exchange.component.html',
  styleUrls: ['./currency-exchange.component.css']
})
export class CurrencyExchangeComponent implements OnInit {
  codes: string[] = []
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  codeCtrl = new FormControl();
  filteredCodes: Observable<string[]>;
  selectedCodes: string[] = [];
  exchangeRate;
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  todayExchangeRate = {base:"",rates:{}}
  currencyForm = new FormGroup({
    base: new FormControl('', [Validators.required]),
    toList: new FormControl('', Validators.required)
  })

  @ViewChild('codeInput') codeInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private githubServices: GithubService) {
    this.filteredCodes = this.codeCtrl.valueChanges.pipe(
      startWith(null),
      map((c: string | null) => c ? this._filter(c) : this.codes.slice()));

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterx(value))
      );
  }

  async ngOnInit() {
    this.codes = await this.githubServices.currencyCodes()
    this.options = this.codes
    const { data } = await this.githubServices.getTodaysExchangeRate()
    if (data) {
      this.todayExchangeRate = data
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.selectedCodes.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
    this.codeCtrl.setValue(null);
  }

  remove(code: string): void {
    const index = this.selectedCodes.indexOf(code);

    if (index >= 0) {
      this.selectedCodes.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedCodes.push(event.option.viewValue);
    this.codeInput.nativeElement.value = '';
    this.codeCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.codes.filter(c => c.toLowerCase().indexOf(filterValue) === 0);
  }

  async onSubmit() {
    try {
      const { data } = await this.githubServices.getExchangeRate(this.myControl.value, this.selectedCodes, new Date())
      this.exchangeRate = data
    } catch (err) {
      console.log(err)
    }
  }

  private _filterx(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
