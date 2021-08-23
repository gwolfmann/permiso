import { Component, OnInit } from '@angular/core';
import * as datamodel from '/home/gustavo/transp/permiso/client/model/permiso';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Message,MessageService } from 'primeng/api';
import { UsersService } from '../users.service';

import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [MessageService,DatePipe]
})
export class UsersComponent implements OnInit {


  formgr: FormGroup;
  editing:  Boolean = false;
  adding:   Boolean = false;
  todelete: Boolean = false;
  toselect: Boolean = false;
  presview: Boolean = true;
  withList: Boolean = false;
  withSel:  Boolean = true;

  fromLogin:Boolean = false;
  first = 0; //for pagination table
  rows = 10;
  modlistafunc = function () {};
  pdflistafunc = function () {};

  msgs:[Message];
  datePickerConfig: Partial<BsDatepickerConfig>;
  public wo: datamodel._Usuario = new datamodel._Usuario();
  public wl: datamodel._Usuario[];
  private _p:datamodel.Usuario = new datamodel.Usuario();
  public cols: any[];

  validationMessages = {
    'nomuser': {  },
    'nickuser': {  },
    'password': {  },
    'catuser': {  },
    'domicilio': {  },
    'localidad': {  },
    'email': {  },
    'telefono': {  },
  };

  formerrors = {
    'nomuser': '',
    'nickuser': '',
    'password': '',
    'catuser': '',
    'domicilio': '',
    'localidad': '',
    'email': '',
    'telefono': '',
  };

  constructor(public ps: UsersService, private fb: FormBuilder, private messSrv: MessageService, private router: Router, private route: ActivatedRoute) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-dark-blue', showWeekNumbers: false, dateInputFormat: 'DD/MM/YYYY' });

    this.formgr = this.fb.group({
      nomuser: ['',], 
nickuser: ['',], 
password: ['',], 
catuser: ['',], 
domicilio: ['',], 
localidad: ['',], 
email: ['',], 
telefono: ['',], 
    });
    
    this.route.paramMap.subscribe( params => this.nuevoUsuario(params.get('modo')) );

  }


  async addOrEdit(): Promise<void> {
    var strerror: string;
    var p:datamodel.Usuario;
    var bien:boolean = true;
    var existe:boolean = false;
    if (!this.formgr.valid) { 
      strerror = 'Hay campos incorrectos';
      bien = false;
    } 
    if (bien && this.adding) { 
        existe = <boolean>await this.ps.keyquery(this.formgr.controls['nickuser'].value);
        if (existe) {
           strerror = 'La Llave no puede duplicarse';
           bien = false;
        }
    } 
    if (bien) { 
       p = new datamodel.Usuario();
       p.setValue(this.wo, false);
       if (!p.Usuariorestfunc()) {
          bien = false;
          strerror = 'Error en los datos globales';
       }
    }
    if (bien) {
       this.submit();
       this.clean();
    } else {
       this.messSrv.add({ severity: 'error', summary: 'Error', detail: strerror });
    }
  }

  clean(): void {
    if (!this.isNew()){
       this.ps.getdata().subscribe(da => { this.wl = da; });
    }
    this.wo = new datamodel._Usuario();
    this.formgr.disable();
    this.editing = false;
    this.adding = false;
    if (this.fromLogin) {
       this.fromLogin=false;
       this.router.navigate(['']);
    }
  }
  
  submit(): void {
     if (!this.adding){
       this.ps.replacedata(this.wo)
     } else {
       this.ps.adddata(this.wo)
     }
  }

  ngOnInit(): void {
    this.ps.getdata().subscribe(da => { this.wl = da; });

    this.cols = [
      { field: 'nickuser', header: 'Usuario' },
{ field: 'nomuser', header: 'Nombre Real' },
    ];
    this.formgr.disable();
    if (this.fromLogin) {
       this.formgr.enable();
    }

    this.formgr.valueChanges.subscribe(data => {
      this.logValidationErrors(this.formgr);
    })
  }

  delete() {
    this.ps.deletedata(this.wo)
  }

  nuevo() {
    this.wo = new datamodel._Usuario();
    
    this.adding=true;
    this.editar();
  }

  editar() {
    this.editing = true;
    this.formgr.enable();
    if (this.adding) {
          this.formgr.controls['nickuser'].enable();
    }
    else{
          this.formgr.controls['nickuser'].disable();
    }
  }

  isNew():boolean {return typeof this.wo.nickuser=='undefined';}

  onSubmit() {
    // necesario para la tabla del grupo
  }

  showDialog() {
    this.todelete = true;
  }

  showSelection() {
    this.toselect = true;
  }

  confirma(quehace:boolean){
    this.todelete=false;
    if (quehace){this.delete()}
  }

  selecciona(quehace:boolean){
    this.toselect=false;
    if (quehace){
      
      this.router.navigate(['/per0']);
//      this.router.navigate(['/periods'])
    }
  }

  logValidationErrors(group: FormGroup = this.formgr, chkall: boolean = false) {
    Object.keys(group.controls).forEach((key: string) => {
      //agregar recursividad si hay grupos anidados
      const ctrls = group.get(key);
      this.formerrors[key] = '';
      if (ctrls && !ctrls.valid && (chkall || (ctrls.touched || ctrls.dirty))) {
        const mess = this.validationMessages[key];
        for (const errky in ctrls.errors) {
          if (errky) {
            this.formerrors[key] += mess[errky] + ' ';
          }
        }
      }
    })
  }

  modolista(modo:Boolean) {
     this.modlistafunc();
     this.presview=!modo;
  }
  generatePdf() {this.pdflistafunc();}
  next() {  this.first = this.first + this.rows;  }
  prev() {  this.first = this.first - this.rows;  }
  reset() { this.first = 0;  }
  isLastPage(): boolean {
      return this.wl ? this.first === (this.wl.length - this.rows) : true;
  }
  isFirstPage(): boolean {
      return this.wl ? this.first === 0 : true;
  }









 
nuevoUsuario(modo:string){
     if (modo == 'nuevo') {
       this.fromLogin=true;
       this.nuevo();
     }
   } 
}

