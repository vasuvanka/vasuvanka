import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { MatChipsModule } from '@angular/material/chips';

const mat = [
  MatCardModule, MatButtonModule, MatFormFieldModule, MatCheckboxModule, MatInputModule, MatIconModule, MatDividerModule, MatListModule,
  MatProgressBarModule, MatDialogModule, MatSnackBarModule, ClipboardModule, MatTabsModule, MatChipsModule, MatAutocompleteModule]
@NgModule({
  imports: mat,
  exports: mat,
})
export class MaterialModule { }
