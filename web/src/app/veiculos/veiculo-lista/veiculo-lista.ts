import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { VeiculoService } from '../veiculo-service';

@Component({
  selector: 'app-veiculo-lista',
  imports: [AsyncPipe],
  templateUrl: './veiculo-lista.html',
  styleUrl: './veiculo-lista.scss'
})
export class VeiculoLista {
  private readonly service = inject(VeiculoService);
  protected readonly veiculos$ = this.service.listar();
}
