import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar-contatos',
    pathMatch: 'full',
  },
  {
    path: 'listar-contatos',
    loadComponent: () => import('./listar-contatos/listar-contatos.page').then( m => m.ListarContatosPage)
  },
  {
    path: 'adicionar-contato',
    loadComponent: () => import('./adicionar-contato/adicionar-contato.page').then( m => m.AdicionarContatoPage)
  },
];
