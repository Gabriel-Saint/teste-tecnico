import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, switchMap } from 'rxjs';
import { VeiculoService } from '../veiculo-service';

@Component({
  selector: 'app-veiculo-lista',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './veiculo-lista.html',
  styleUrl: './veiculo-lista.scss'
})
export class VeiculoLista {
  private readonly service = inject(VeiculoService);

  private readonly recarregar$ = new BehaviorSubject<void>(undefined);

  protected readonly veiculos$ = this.recarregar$.pipe(
    switchMap(() => this.service.listar())
  );

  protected excluir(id: string): void {
    if (!confirm('Tem certeza que deseja excluir este veículo?')) {
      return;
    }
    this.service.remover(id).subscribe(() => this.recarregar$.next());
  }
}
