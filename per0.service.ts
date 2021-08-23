import { Injectable, Inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { _Usuario } from '../../client/model/permiso';
import { UsuarioService } from './infraest/usuario.service';

import Timestamp = firebase.firestore.Timestamp;
import * as datamodel from '../../client/model/permiso';

//import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class Per0Service {

  permiso0es: Observable<datamodel._Permiso0[]>;
  permiso0Coll: AngularFirestoreCollection<datamodel._Permiso0>;
  permiso0Doc: AngularFirestoreDocument<datamodel._Permiso0>;

  
  user: _Usuario;
  usuarioService: UsuarioService;
  dbs:AngularFirestore;

  constructor(db: AngularFirestore , 
    private uService: UsuarioService,
    ) {
    this.usuarioService=uService;
   this.dbs = db ;
   //this.permiso0Coll=db.collection('permiso0es',ref => ref.where("nickuser","==","this.user.nickname"));
    this.permiso0Coll=db.collection('permiso0es');
    this.getImages();
}

getdata(){
    this.user= this.usuarioService.getValue();
    this.permiso0es = this.permiso0Coll.snapshotChanges().pipe(map(a => {
      return a.map(p =>
        { const d = p.payload.doc.data() as datamodel._Permiso0;
          Object.keys(d).filter(key => d[key] instanceof Timestamp)
          .forEach(key => d[key] = d[key].toDate());//          d.id = p.payload.doc.id;
          return d;
        } )
  } ));
  return this.permiso0es;
}

deletedata(p:datamodel._Permiso0){
  this.permiso0Doc = this.permiso0Coll.doc(`${p.numero }`);
  this.permiso0Doc.delete();
}

adddata(p:datamodel.Permiso0intfc){
  this.permiso0Coll.doc(p.numero).set({...p} as datamodel._Permiso0);
}

replacedata(p:datamodel._Permiso0){
  this.permiso0Doc = this.permiso0Coll.doc(`${p.numero}`);
  this.permiso0Doc.update(p);
}

async keyquery(s:string,lretobj = false) {
var p:datamodel._Permiso0;
var ret:boolean = false;
const query = this.permiso0Coll.ref.where('numero', '==', s);
return query.get().then(querySnapshot => {
//    if (querySnapshot.empty) {
//        console.log('no data found');
//    } else 
    if (querySnapshot.size > 0) {
        if (lretobj){
           querySnapshot.forEach(documentSnapshot => {
              p=documentSnapshot.data() as datamodel._Permiso0;
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

async getNewNumber():Promise<number> {
   var p:datamodel._Permiso0;
   var ret=0;

   const query=this.dbs.collection('permiso0es').ref.orderBy('fecha').limitToLast(1);
   var res = await query.get();
   if (res.size > 0) {
       res.forEach(a => {
         p=a.data() as datamodel._Permiso0;
         ret=Number.parseInt(p.numero);
       })
   }
   return ret;
}

async getImages():Promise<any[]>{
  var fileList: any[] = [];

  var storage = firebase.storage();
  // Create a reference from a Google Cloud Storage URI
  var gsReference = storage.refFromURL('gs://permiso-digital.appspot.com/files/106');
  await gsReference.listAll().then(function(res) {
      res.items.forEach(function(itemRef) {
        itemRef.getDownloadURL().then((url) => {
          fileList.push(
            {
              source: url,
              alt: 'imagen',
              title: 'Prmiso 106'
            });
          console.log(url)});
      // All the items under listRef.
      });})
      .catch(function(error) {
        // Uh-oh, an error occurred!
      });
  return fileList;
}

}
