import { Component, OnInit } from '@angular/core';
import { AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Doc {
  date: any;
  id?: string;
  verified: boolean;
}

@Component({
  selector: 'app-document-validate',
  templateUrl: './document-validate.component.html',
  styleUrls: ['./document-validate.component.scss']
})
export class DocumentValidateComponent implements OnInit {

  DocCollection: AngularFirestoreCollection<Doc>;
  Docs: Observable<Doc[]>;
  MaxDocs = 5;
  DocLength = 0;
  Verified = 0;
  currentDocs: Doc[];
  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.DocCollection = this.db.collection<Doc>('docs');
    this.Docs = this.DocCollection.snapshotChanges().pipe(map(actions => {
      this.DocLength = 0;
      this.Verified = 0;
      this.currentDocs = [];
      return actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        this.DocLength++;
        if (data.verified) {
          this.Verified++;
        }
        this.currentDocs.push({ id, ...data });
        return { id, ...data };
      });
    }));
  }

  accept(id) {
    const doc = this.currentDocs.find(item => item.id === id);
    this.DocCollection.doc(`/${id}`).update({verified: !doc.verified});
  }

  delete(id) {
    this.DocCollection.doc(`/${id}`).delete();
  }

}
