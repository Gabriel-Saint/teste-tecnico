import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./veiculos/veiculo-lista/veiculo-lista').then(m => m.VeiculoLista)
  },
  {
    path: 'novo',
    loadComponent: () =>
      import('./veiculos/veiculo-form/veiculo-form').then(m => m.VeiculoForm)
  },
  {
    path: ':id/editar',
    loadComponent: () =>
      import('./veiculos/veiculo-form/veiculo-form').then(m => m.VeiculoForm)
  }
];
