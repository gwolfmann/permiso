import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';




import Timestamp = firebase.firestore.Timestamp;
import * as datamodel from '../../client/model/permiso';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usuarioes: Observable<datamodel._Usuario[]>;
  usuarioColl: AngularFirestoreCollection<datamodel._Usuario>;
  usuarioDoc: AngularFirestoreDocument<datamodel._Usuario>;

  

  constructor(db: AngularFirestore) {
    this.usuarioColl = db.collection('usuarioes');
}
getdata(){
    
    this.usuarioes = this.usuarioColl.snapshotChanges().pipe(map(a => {
      return a.map(p =>
        { const d = p.payload.doc.data() as datamodel._Usuario;
          Object.keys(d).filter(key => d[key] instanceof Timestamp)
          .forEach(key => d[key] = d[key].toDate());//          d.id = p.payload.doc.id;
          return d;
        } )
  } ));
  return this.usuarioes;
}

deletedata(p:datamodel._Usuario){
  this.usuarioDoc = this.usuarioColl.doc(`${p.nickuser }`);
  this.usuarioDoc.delete();
}

adddata(p:datamodel.Usuariointfc){
  this.usuarioColl.doc(p.nickuser).set({...p} as datamodel._Usuario);
}

replacedata(p:datamodel._Usuario){
  this.usuarioDoc = this.usuarioColl.doc(`${p.nickuser}`);
  this.usuarioDoc.update(p);
}

async keyquery(s:string,lretobj = false) {
var p:datamodel._Usuario;
var ret:boolean = false;
const query = this.usuarioColl.ref.where('nickuser', '==', s);
return query.get().then(querySnapshot => {
//    if (querySnapshot.empty) {
//        console.log('no data found');
//    } else 
    if (querySnapshot.size > 0) {
        if (lretobj){
           querySnapshot.forEach(documentSnapshot => {
              p=documentSnapshot.data() as datamodel._Usuario;
           });
        } else {
           ret=true;
        }
    }
    if (lretobj) {
       return p;
    } else {
       return ret;
    }
    });
}


}
