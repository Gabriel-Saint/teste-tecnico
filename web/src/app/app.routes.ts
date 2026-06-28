import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'veiculos', pathMatch: 'full' },
  {
    path: 'veiculos',
    loadComponent: () =>
      import('./veiculos/veiculo-lista/veiculo-lista').then(m => m.VeiculoLista)
  },
  {
    path: 'veiculos/novo',
    loadComponent: () =>
      import('./veiculos/veiculo-form/veiculo-form').then(m => m.VeiculoForm)
  },
  {
    path: 'veiculos/:id/editar',
    loadComponent: () =>
      import('./veiculos/veiculo-form/veiculo-form').then(m => m.VeiculoForm)
  },
  { path: '**', redirectTo: 'veiculos' }
];
