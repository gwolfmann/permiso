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
export class SectorService {

  sectores: Observable<datamodel._Sector[]>;
  sectorColl: AngularFirestoreCollection<datamodel._Sector>;
  sectorDoc: AngularFirestoreDocument<datamodel._Sector>;

  

  constructor(db: AngularFirestore) {
    this.sectorColl = db.collection('sectores');
}
getdata(){
    
    this.sectores = this.sectorColl.snapshotChanges().pipe(map(a => {
      return a.map(p =>
        { const d = p.payload.doc.data() as datamodel._Sector;
          Object.keys(d).filter(key => d[key] instanceof Timestamp)
          .forEach(key => d[key] = d[key].toDate());//          d.id = p.payload.doc.id;
          return d;
        } )
  } ));
  return this.sectores;
}

deletedata(p:datamodel._Sector){
  this.sectorDoc = this.sectorColl.doc(`${p.nomsector }`);
  this.sectorDoc.delete();
}

adddata(p:datamodel.Sectorintfc){
  this.sectorColl.doc(p.nomsector).set({...p} as datamodel._Sector);
}

replacedata(p:datamodel._Sector){
  this.sectorDoc = this.sectorColl.doc(`${p.nomsector}`);
  this.sectorDoc.update(p);
}

async keyquery(s:string,lretobj = false) {
var p:datamodel._Sector;
var ret:boolean = false;
const query = this.sectorColl.ref.where('nomsector', '==', s);
return query.get().then(querySnapshot => {
//    if (querySnapshot.empty) {
//        console.log('no data found');
//    } else 
    if (querySnapshot.size > 0) {
        if (lretobj){
           querySnapshot.forEach(documentSnapshot => {
              p=documentSnapshot.data() as datamodel._Sector;
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
