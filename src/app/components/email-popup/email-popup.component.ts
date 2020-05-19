import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-email-popup',
  templateUrl: './email-popup.component.html',
  styleUrls: ['./email-popup.component.css']
})
export class EmailPopupComponent {
  emailForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    token: new FormControl('')
  })
  constructor(
    private dialogRef: MatDialogRef<EmailPopupComponent>,
    private recaptchaV3Service: ReCaptchaV3Service) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get token(): AbstractControl {
    return this.emailForm.get('token')
  }

  async validate(): Promise<void> {
    let token, err = null
    try {
      token = await this.recaptchaV3Service.execute('sendmail').toPromise()
    } catch (e) {
      err = e.message
    }
    this.token.setValue(token)
    this.dialogRef.close({ err, ...this.emailForm.value });
  }

}
