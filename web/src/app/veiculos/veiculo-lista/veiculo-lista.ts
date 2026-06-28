import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, catchError, map, of, startWith, switchMap } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VeiculoService } from '../veiculo-service';
import { Veiculo } from '../veiculo';
import { ConfirmacaoDialog } from '../../shared/confirmacao-dialog/confirmacao-dialog';

interface ListaState {
  carregando: boolean;
  erro: boolean;
  veiculos: Veiculo[];
}

@Component({
  selector: 'app-veiculo-lista',
  imports: [
    AsyncPipe,
    RouterLink,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './veiculo-lista.html',
  styleUrl: './veiculo-lista.scss'
})
export class VeiculoLista {
  private readonly service = inject(VeiculoService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  private readonly recarregar$ = new BehaviorSubject<void>(undefined);

  protected readonly estado$ = this.recarregar$.pipe(
    switchMap(() =>
      this.service.listar().pipe(
        map((veiculos): ListaState => ({ carregando: false, erro: false, veiculos })),
        startWith<ListaState>({ carregando: true, erro: false, veiculos: [] }),
        catchError(() => of<ListaState>({ carregando: false, erro: true, veiculos: [] }))
      )
    )
  );

  protected readonly colunas = ['placa', 'marca', 'modelo', 'ano', 'chassi', 'renavam', 'acoes'];

  protected recarregar(): void {
    this.recarregar$.next();
  }

  protected excluir(veiculo: Veiculo): void {
    const ref = this.dialog.open(ConfirmacaoDialog, {
      data: {
        titulo: 'Excluir veículo',
        mensagem: `Deseja realmente excluir o veículo ${veiculo.placa}?`,
        confirmar: 'Excluir'
      }
    });

    ref.afterClosed().subscribe(confirmado => {
      if (!confirmado) {
        return;
      }
      this.service.remover(veiculo.id).subscribe({
        next: () => {
          this.snackBar.open('Veículo excluído com sucesso.', 'Fechar', { duration: 3000 });
          this.recarregar$.next();
        },
        error: () =>
          this.snackBar.open('Não foi possível excluir o veículo.', 'Fechar', { duration: 5000 })
      });
    });
  }
}
