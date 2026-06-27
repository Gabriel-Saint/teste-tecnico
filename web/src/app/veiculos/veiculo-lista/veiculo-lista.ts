import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VeiculoService } from '../veiculo-service';

@Component({
  selector: 'app-veiculo-lista',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './veiculo-lista.html',
  styleUrl: './veiculo-lista.scss'
})
export class VeiculoLista {
  private readonly service = inject(VeiculoService);
  protected readonly veiculos$ = this.service.listar();
}
