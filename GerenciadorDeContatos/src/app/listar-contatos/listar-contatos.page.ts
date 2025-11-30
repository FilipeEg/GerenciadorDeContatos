import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ContatoItemComponent } from '../contato-item/contato-item.component';
import { FirebaseService, Contato } from '../service/firebase.service';
import { HttpClient } from '@angular/common/http';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listar-contatos',
  standalone: true,
  imports: [IonicModule, RouterLink, CommonModule, ContatoItemComponent],
  templateUrl: './listar-contatos.page.html',
})
export class ListarContatosPage implements OnInit {
  apiContatos: Contato[] = [];
  firebaseContatos: Contato[] = [];
  todosContatos: Contato[] = [];

  constructor(private http: HttpClient, private firebaseService: FirebaseService) {
    addIcons({ "add-circle-outline": addCircleOutline });
  }

  ngOnInit() {
    // Busca contatos da API externa
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe(res => {
        this.apiContatos = res.map(u => ({ nome: u.name, email: u.email }));
        this.atualizarLista();
      });

    // Observa contatos do Firebase
    this.firebaseService.contatos$.subscribe(lista => {
      this.firebaseContatos = lista;
      this.atualizarLista();
    });
  }

  // Atualiza a lista combinando API + Firebase
  private atualizarLista() {
    this.todosContatos = [...this.apiContatos, ...this.firebaseContatos];
  }

  editarContato(c: Contato) {
  if (!c.id) return; // Só contatos do Firebase

  const novoNome = prompt('Novo nome', c.nome);
  const novoEmail = prompt('Novo email', c.email);
  if (novoNome && novoEmail) {
    this.firebaseService.updateContato(c.id, { nome: novoNome, email: novoEmail });
  }
}

removerContato(id: string) {
  this.firebaseService.deleteContato(id);
}

}
