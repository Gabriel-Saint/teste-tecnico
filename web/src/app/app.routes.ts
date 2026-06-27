import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./veiculos/veiculo-lista/veiculo-lista').then(m => m.VeiculoLista)
  }
];
