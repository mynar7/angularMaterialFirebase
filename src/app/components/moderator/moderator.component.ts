import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentChangeAction } from '@angular/fire/firestore';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Hero {
  name: string;
  id?: string;
}

@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.scss']
})
export class ModeratorComponent implements OnInit {
  @ViewChild('nameInput') nameInput: ElementRef;
  heroesCollection: AngularFirestoreCollection<Hero>;
  heroes: Observable<Hero[]>;
  heroFoci;
  heroName;
  heroForm = new FormGroup({
    name: new FormControl('')
  });
  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    // this.heroes = db.list('heroes').valueChanges();
    // this.heroes = this.db.list('heroes').snapshotChanges();
    // db.list('heroes').push('aquaman');
    this.heroesCollection = this.db.collection<Hero>('heroes');
    // this.heroes = this.heroesCollection.valueChanges();
    this.heroes = this.heroesCollection.snapshotChanges().pipe(map(actions => {
      this.heroFoci = {};
      this.heroName = {};
      actions.map(action => {
        this.heroFoci[action.payload.doc.id] = false;
        const data = action.payload.doc.data();
        this.heroName[action.payload.doc.id] = data.name;
      });
      return actions.map(action => {
        const data = action.payload.doc.data() as Hero;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  onFocus(id) {
    Object.keys(this.heroFoci).map(key => {
      if (id === key) {
        this.setName(key);
        this.heroFoci[key] = true;
      } else {
        this.heroFoci[key] = false;
      }
    });
    setTimeout(() => {
      if (this.nameInput) {
        this.nameInput.nativeElement.focus();
      }
    });
  }

  setName(id) {
    this.heroForm.controls.name.setValue(this.heroName[id]);
  }

  onBlur(id) {
    this.heroFoci[id] = false;
  }

  updateHero() {
    let id;
    Object.keys(this.heroFoci).map(key => {
      if (this.heroFoci[key]) {
        id = key;
      }
    });
    this.heroesCollection.doc(`/${id}`).update({name: this.heroForm.value.name});
    return false;
  }

}
