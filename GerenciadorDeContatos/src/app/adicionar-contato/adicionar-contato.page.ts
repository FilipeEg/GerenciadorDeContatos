import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService, Contato } from '../service/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adicionar-contato',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './adicionar-contato.page.html',
})
export class AdicionarContatoPage {
  contato: Contato = { nome: '', email: '' };

  constructor(private firebaseService: FirebaseService, private router: Router) {}

  // Função para adicionar contato
  adicionarContato() {
    if (!this.contato.nome || !this.contato.email) {
      return;
    }

    this.firebaseService.addContato(this.contato)
      .then(() => {
        // Navega para a lista após adicionar
        this.router.navigate(['/listar-contatos']);
      })
      .catch(err => console.error(err));
  }
}
