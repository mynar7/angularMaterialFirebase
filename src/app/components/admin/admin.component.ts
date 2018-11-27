import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
// import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Hero {
  name: string;
  id?: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  // heroes: Observable<any[]>;
  heroesCollection: AngularFirestoreCollection<Hero>;
  heroes: Observable<Hero[]>;
  heroForm = new FormGroup({
    name: new FormControl('')
  });
  // snapshot: Observable<DocumentChangeAction<Hero>[]>;
  // constructor(private db: AngularFireDatabase) { }
  constructor(private db: AngularFirestore) { }

  addHero() {
    const name = this.heroForm.value.name;
    this.heroesCollection.add({name});
    this.heroForm.controls.name.setValue('');
  }

  removeHero(id) {
    // this.db.list('heroes').remove(key);
    // console.log(id);
    this.heroesCollection.doc(`/${id}`).delete();
  }
  ngOnInit() {
    // this.heroes = db.list('heroes').valueChanges();
    // this.heroes = this.db.list('heroes').snapshotChanges();
    // db.list('heroes').push('aquaman');
    this.heroesCollection = this.db.collection<Hero>('heroes');
    // this.heroes = this.heroesCollection.valueChanges();
    this.heroes = this.heroesCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Hero;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  addAquaman() {
    this.heroesCollection.add({name: 'Aquaman'});
  }


}
