import { Component, OnInit } from '@angular/core';
import * as datamodel from '/home/gustavo/transp/permiso/client/model/permiso';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Message,MessageService } from 'primeng/api';
import { SectorService } from '../sector.service';

import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.css'],
  providers: [MessageService,DatePipe]
})
export class SectorComponent implements OnInit {


  formgr: FormGroup;
  editing:  Boolean = false;
  adding:   Boolean = false;
  todelete: Boolean = false;
  toselect: Boolean = false;
  presview: Boolean = true;
  withList: Boolean = false;
  withSel:  Boolean = true;

  
  first = 0; //for pagination table
  rows = 10;
  modlistafunc = function () {};
  pdflistafunc = function () {};

  msgs:[Message];
  datePickerConfig: Partial<BsDatepickerConfig>;
  public wo: datamodel._Sector = new datamodel._Sector();
  public wl: datamodel._Sector[];
  private _p:datamodel.Sector = new datamodel.Sector();
  public cols: any[];

  validationMessages = {
    'nomsector': {  },
    'dessector': {  },
  };

  formerrors = {
    'nomsector': '',
    'dessector': '',
  };

  constructor(public ps: SectorService, private fb: FormBuilder, private messSrv: MessageService, private router: Router, private route: ActivatedRoute) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-dark-blue', showWeekNumbers: false, dateInputFormat: 'DD/MM/YYYY' });

    this.formgr = this.fb.group({
      nomsector: ['',], 
dessector: ['',], 
    });
    
    

  }


  async addOrEdit(): Promise<void> {
    var strerror: string;
    var p:datamodel.Sector;
    var bien:boolean = true;
    var existe:boolean = false;
    if (!this.formgr.valid) { 
      strerror = 'Hay campos incorrectos';
      bien = false;
    } 
    if (bien && this.adding) { 
        existe = <boolean>await this.ps.keyquery(this.formgr.controls['nomsector'].value);
        if (existe) {
           strerror = 'La Llave no puede duplicarse';
           bien = false;
        }
    } 
    if (bien) { 
       p = new datamodel.Sector();
       p.setValue(this.wo, false);
       if (!p.Sectorrestfunc()) {
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
    this.wo = new datamodel._Sector();
    this.formgr.disable();
    this.editing = false;
    this.adding = false;
    
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
      { field: 'nomsector', header: 'Sector' },
    ];
    this.formgr.disable();
    

    this.formgr.valueChanges.subscribe(data => {
      this.logValidationErrors(this.formgr);
    })
  }

  delete() {
    this.ps.deletedata(this.wo)
  }

  nuevo() {
    this.wo = new datamodel._Sector();
    
    this.adding=true;
    this.editar();
  }

  editar() {
    this.editing = true;
    this.formgr.enable();
    if (this.adding) {
          this.formgr.controls['nomsector'].enable();
    }
    else{
          this.formgr.controls['nomsector'].disable();
    }
  }

  isNew():boolean {return typeof this.wo.nomsector=='undefined';}

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
      
      this.router.navigate(['/sector']);
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



 
 
}

