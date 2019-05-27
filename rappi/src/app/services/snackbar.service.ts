import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(
    public snackBar: MatSnackBar,
  ) { }

  message(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    this.snackBar.open(message, action ? action : null, config);
  }
}
