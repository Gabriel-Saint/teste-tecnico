import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

// Dados que qualquer tela pode passar pra reaproveitar este dialog
export interface ConfirmacaoData {
  titulo: string;
  mensagem: string;
  confirmar?: string;
  cancelar?: string;
}

@Component({
  selector: 'app-confirmacao-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirmacao-dialog.html'
})
export class ConfirmacaoDialog {
  protected readonly data = inject<ConfirmacaoData>(MAT_DIALOG_DATA);
  private readonly ref = inject(MatDialogRef<ConfirmacaoDialog>);

  protected cancelar(): void {
    this.ref.close(false);
  }

  protected confirmar(): void {
    this.ref.close(true);
  }
}
