import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Contato } from '../service/firebase.service';

@Component({
  selector: 'app-contato-item',
  standalone: true,
  imports: [IonicModule, CommonModule],
  template: `
    <ion-item>
      <ion-label>
        <h2>{{ contato.nome }}</h2>
        <p>{{ contato.email }}</p>
      </ion-label>
    </ion-item>
  `
})
export class ContatoItemComponent {
  @Input() contato!: Contato;
}
