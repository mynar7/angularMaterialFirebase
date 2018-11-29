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
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.scss']
})
export class DocumentUploadComponent implements OnInit {

  DocCollection: AngularFirestoreCollection<Doc>;
  Docs: Observable<Doc[]>;
  MaxDocs = 5;
  DocLength = 0;
  Verified = 0;
  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.DocCollection = this.db.collection<Doc>('docs');
    this.Docs = this.DocCollection.snapshotChanges().pipe(map(actions => {
      this.DocLength = 0;
      this.Verified = 0;
      return actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        this.DocLength++;
        if (data.verified) {
          this.Verified++;
        }
        return { id, ...data };
      });
    }));
  }

  addDoc() {
    if (this.DocLength < this.MaxDocs) {
      this.DocCollection.add({date: Date.now(), verified: false});
    }
  }

}
