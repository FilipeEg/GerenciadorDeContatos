import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, onValue, update, remove } from "firebase/database";
import { BehaviorSubject } from 'rxjs';

export interface Contato {
  id?: string;
  nome: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private firebaseConfig = {
    apiKey: "AIzaSyA_k-L27QV2XQUoZ738sIxGfOWW2N9W_PM",
    authDomain: "ionic-a6219.firebaseapp.com",
    projectId: "ionic-a6219",
    storageBucket: "ionic-a6219.firebasestorage.app",
    messagingSenderId: "330126286912",
    appId: "1:330126286912:web:3bea160ea70169c10c3fa5",
    measurementId: "G-KNE115VW2N"
  };

  private app = initializeApp(this.firebaseConfig);
  private db = getDatabase(this.app);
  private contatosRef = ref(this.db, 'contato');

  private contatosSubject = new BehaviorSubject<Contato[]>([]);
  contatos$ = this.contatosSubject.asObservable();

  constructor() {
    onValue(this.contatosRef, snapshot => {
      const data = snapshot.val();
      const lista: Contato[] = [];
      for (let key in data) {
        lista.push({ id: key, ...data[key] });
      }
      this.contatosSubject.next(lista);
    });
  }

  // Funções de CRUD para o Firebase
  addContato(contato: Contato) {
    const novoRef = push(this.contatosRef);
    return set(novoRef, { nome: contato.nome, email: contato.email });
  }

  updateContato(id: string, contato: Partial<Contato>) {
    return update(ref(this.db, `contato/${id}`), contato);
  }

  deleteContato(id: string) {
    return remove(ref(this.db, `contato/${id}`));
  }
}
