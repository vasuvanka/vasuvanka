import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { GithubService } from 'src/app/core/services/github.service';
import { UtilService } from 'src/app/core/services/util.service';

@Component({
  selector: 'app-url-shortner',
  templateUrl: './url-shortner.component.html',
  styleUrls: ['./url-shortner.component.css']
})
export class UrlShortnerComponent {
  urlForm = new FormGroup({
    url: new FormControl('', [Validators.required, Validators.pattern("")])
  })
  shorternedUrl: string
  constructor(
    private gitHubServices: GithubService,
    private utilServices: UtilService) { }

  get url(): AbstractControl {
    return this.urlForm.get('url')
  }

  async onSubmit() {
    try {
      const resp = await this.gitHubServices.shorternUrl(this.url.value)
      this.url.setValue('')
      this.shorternedUrl = resp.url
      this.utilServices.openSnackBar(resp.message)
      console.log(resp)
    } catch (err) {
      console.log(err)
      this.utilServices.openSnackBar(err.message || err)
    }
  }

  copy() {
    this.utilServices.openSnackBar('copied to clipboard')
  }
}
