import { Injectable, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly snackBar = inject(MatSnackBar);

  success(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  warning(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['warning-snackbar'],
    });
  }

  error(error: HttpErrorResponse): void {
    const response = error.error;

    if (response?.data && Array.isArray(response.data)) {
      const messages = response.data as string[];

      const message =
        messages.length === 1 ? messages[0] : messages.map((item) => `- ${item}`).join('\n');

      this.snackBar.open(message, 'Fechar', {
        duration: 6000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['warning-snackbar'],
      });

      return;
    }

    this.snackBar.open(response?.message ?? 'Ocorreu um erro ao realizar a operação.', 'Fechar', {
      duration: 6000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }
}
