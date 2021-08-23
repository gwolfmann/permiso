import { Component, OnInit } from '@angular/core';
import * as datamodel from '/home/gustavo/transp/permiso/client/model/permiso';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Message,MessageService } from 'primeng/api';
import { Per0Service } from '../per0.service';
import { UsersService } from '../users.service';
import { SectorService } from '../sector.service';
import { _Usuario, _Sector } from '../../../client/model/permiso';
import { map } from 'rxjs/operators';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-per0',
  templateUrl: './per0.component.html',
  styleUrls: ['./per0.component.css'],
  providers: [MessageService,DatePipe,GalleriaModule]
})
export class Per0Component implements OnInit {


  formgr: FormGroup;
  editing:  Boolean = false;
  adding:   Boolean = false;
  todelete: Boolean = false;
  toselect: Boolean = false;
  presview: Boolean = true;
  withList: Boolean = false;
  withSel:  Boolean = true;

  solicitantes: _Usuario[];
    autorizantes: _Usuario[];
    supervisors:  _Usuario[];
    personal1s:   _Usuario[];
    personal2s:   _Usuario[];
    personal3s:   _Usuario[]; 
    personal4s:   _Usuario[];
    personal5s:   _Usuario[]; 
    personal6s:   _Usuario[];
    resareas:     _Usuario[];
    sectordess:   _Sector[]
  first = 0; //for pagination table
  rows = 10;
  modlistafunc = function () {};
  pdflistafunc = function () {};

  msgs:[Message];
  datePickerConfig: Partial<BsDatepickerConfig>;
  public wo: datamodel._Permiso0 = new datamodel._Permiso0();
  public wl: datamodel._Permiso0[];
  private _p:datamodel.Permiso0 = new datamodel.Permiso0();
  public cols: any[];

  public filelist: any[];

  validationMessages = {
    'numero': {  },
    'fecha': {  },
    'solicitante': {  },
    'sectordes': {  },
    'destarea': {  },
    'inssegur': {  },
    'resarea': {  },
    'autorizante': {  },
    'supervisor': {  },
    'fechaini': {  },
    'horaini': {  },
    'horafin': {  },
    'turno': {  },
    'fechaaut': {  },
    'autorizada': {  },
    'fechaace': {  },
    'aceptada': {  },
    'fechaapr': {  },
    'aprobada': {  },
    'contacto': {  },
    'medicion': {  },
    'personal1': {  },
    'personal2': {  },
    'personal3': {  },
    'personal4': {  },
    'personal5': {  },
    'personal6': {  },
    'casco': {  },
    'antsegur': {  },
    'proaudit': {  },
    'guante': {  },
    'zapsegur': {  },
    'profacia': {  },
    'carsolda': {  },
    'rescarac': {  },
    'rescartu': {  },
    'barpolvo': {  },
    'barsolda': {  },
    'sumaire': {  },
    'equauton': {  },
    'venforza': {  },
    'traimper': {  },
    'delplast': {  },
    'mamtyvek': {  },
    'escalera': {  },
    'andamio': {  },
    'arnsegur': {  },
    'munconfi': {  },
    'procelec': {  },
    'cabtierr': {  },
    'canetiqu': {  },
    'extintor': {  },
    'senadver': {  },
    'cercado': {  },
    'cinvalla': {  },
    'otrelseg': {  },
    'altura1': {  },
    'altura2': {  },
    'altura3': {  },
    'altura4': {  },
    'image1': {  },
    'image2': {  },
    'image3': {  },
  };

  formerrors = {
    'numero': '',
    'fecha': '',
    'solicitante': '',
    'sectordes': '',
    'destarea': '',
    'inssegur': '',
    'resarea': '',
    'autorizante': '',
    'supervisor': '',
    'fechaini': '',
    'horaini': '',
    'horafin': '',
    'turno': '',
    'fechaaut': '',
    'autorizada': '',
    'fechaace': '',
    'aceptada': '',
    'fechaapr': '',
    'aprobada': '',
    'contacto': '',
    'medicion': '',
    'personal1': '',
    'personal2': '',
    'personal3': '',
    'personal4': '',
    'personal5': '',
    'personal6': '',
    'casco': '',
    'antsegur': '',
    'proaudit': '',
    'guante': '',
    'zapsegur': '',
    'profacia': '',
    'carsolda': '',
    'rescarac': '',
    'rescartu': '',
    'barpolvo': '',
    'barsolda': '',
    'sumaire': '',
    'equauton': '',
    'venforza': '',
    'traimper': '',
    'delplast': '',
    'mamtyvek': '',
    'escalera': '',
    'andamio': '',
    'arnsegur': '',
    'munconfi': '',
    'procelec': '',
    'cabtierr': '',
    'canetiqu': '',
    'extintor': '',
    'senadver': '',
    'cercado': '',
    'cinvalla': '',
    'otrelseg': '',
    'altura1': '',
    'altura2': '',
    'altura3': '',
    'altura4': '',
    'image1': '',
    'image2': '',
    'image3': '',
  };

  constructor(public ps: Per0Service, private fb: FormBuilder, private messSrv: MessageService, private router: Router, private route: ActivatedRoute, private uss: UsersService, private ses: SectorService,private dp:DatePipe) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-dark-blue', showWeekNumbers: false, dateInputFormat: 'DD/MM/YYYY' });

    this.formgr = this.fb.group({
      numero: ['',], 
fecha: ['',], 
solicitante: ['',], 
sectordes: ['',], 
destarea: ['',], 
inssegur: ['',], 
resarea: ['',], 
autorizante: ['',], 
supervisor: ['',], 
fechaini: ['',], 
horaini: ['',], 
horafin: ['',], 
turno: ['',], 
fechaaut: ['',], 
autorizada: ['',], 
fechaace: ['',], 
aceptada: ['',], 
fechaapr: ['',], 
aprobada: ['',], 
contacto: ['',], 
medicion: ['',], 
personal1: ['',], 
personal2: ['',], 
personal3: ['',], 
personal4: ['',], 
personal5: ['',], 
personal6: ['',], 
casco: ['',], 
antsegur: ['',], 
proaudit: ['',], 
guante: ['',], 
zapsegur: ['',], 
profacia: ['',], 
carsolda: ['',], 
rescarac: ['',], 
rescartu: ['',], 
barpolvo: ['',], 
barsolda: ['',], 
sumaire: ['',], 
equauton: ['',], 
venforza: ['',], 
traimper: ['',], 
delplast: ['',], 
mamtyvek: ['',], 
escalera: ['',], 
andamio: ['',], 
arnsegur: ['',], 
munconfi: ['',], 
procelec: ['',], 
cabtierr: ['',], 
canetiqu: ['',], 
extintor: ['',], 
senadver: ['',], 
cercado: ['',], 
cinvalla: ['',], 
otrelseg: ['',], 
altura1: ['',], 
altura2: ['',], 
altura3: ['',], 
altura4: ['',], 
image1: ['',], 
image2: ['',], 
image3: ['',], 
    });
    
    this.withList = true;
    //this.modlistafunc = function () {this.dofooter();}
    this.pdflistafunc = function () {this.makepdf();};


  }


  async addOrEdit(): Promise<void> {
    var strerror: string;
    var p:datamodel.Permiso0;
    var bien:boolean = true;
    var existe:boolean = false;
    if (!this.formgr.valid) { 
      strerror = 'Hay campos incorrectos';
      bien = false;
    } 
    if (bien && this.adding) { 
        existe = <boolean>await this.ps.keyquery(this.formgr.controls['numero'].value);
        if (existe) {
           strerror = 'La Llave no puede duplicarse';
           bien = false;
        }
    } 
    if (bien) { 
       p = new datamodel.Permiso0();
       p.setValue(this.wo, false);
       if (!p.Permiso0restfunc()) {
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
    this.wo = new datamodel._Permiso0();
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
      { field: 'fecha', header: 'Fecha Alta' },
{ field: 'numero', header: 'Numero Permiso' },
    ];
    this.formgr.disable();
     const sup = this.uss.getdata().pipe(map(ss => ss.filter(s =>  datamodel.catusertostr(s.catuser) === 'sup' )));
    sup.subscribe(da=> {this.supervisors  = da;});
    const per = this.uss.getdata().pipe(map(ss => ss.filter(s =>  datamodel.catusertostr(s.catuser) === 'tra' )));
    per.subscribe(da=> {this.personal1s = da;this.personal2s = da;this.personal3s = da;this.personal4s = da;this.personal5s = da;this.personal6s = da;});
    const res = this.uss.getdata().pipe(map(ss => ss.filter(s =>  datamodel.catusertostr(s.catuser) === 'res' )));
    res.subscribe(da=> {this.resareas = da;});
    const sol = this.uss.getdata().pipe(map(ss => ss.filter(s =>  datamodel.catusertostr(s.catuser) === 'res' || datamodel.catusertostr(s.catuser) === 'adm' )));
    sol.subscribe(da=> {this.solicitantes = da;});
    const aut = this.uss.getdata().pipe(map(ss => ss.filter(s =>  datamodel.catusertostr(s.catuser) === 'jef' )));
    aut.subscribe(da=> {this.autorizantes = da;});
    const sec = this.ses.getdata();
    sec.subscribe(da=> {this.sectordess = da;});

    this.formgr.valueChanges.subscribe(data => {
      this.logValidationErrors(this.formgr);
    })
    this.getList();
  }

  delete() {
    this.ps.deletedata(this.wo)
  }

  nuevo() {
    this.wo = new datamodel._Permiso0();
    this.getNewValues(); 
    this.adding=true;
    this.editar();
  }

  async editar() {
    this.editing = true;
    this.formgr.enable();
    if (this.adding) {
          this.formgr.controls['numero'].enable();
    }
    else{
          this.formgr.controls['numero'].disable();
    }
    this.getList()
  }

  async getList(){
    this.filelist =  <any[]>await this.ps.getImages();
  }


  isNew():boolean {return typeof this.wo.numero=='undefined';}

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
      this.printper(this.wo);
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
































































 
async getNewValues(){
    let hoy=new Date();
    let man=new Date();
    let pas=new Date();
    man.setDate(hoy.getDate()+0);
    pas.setDate(hoy.getDate()+0);
    this.wo.fecha=hoy;
    this.wo.fechaini=man;
    this.wo.fechaaut=hoy;
    this.wo.fechaace=man;
    this.wo.fechaapr=pas;
    let lastnumber= <number>await this.ps.getNewNumber()+1;
    this.wo.numero= lastnumber.toString();
  }
makepdf() {
    const vals = this.wl.sort(function (a, b) {
      if (Number(a.numero) < Number(b.numero)) return -1;
      else if (Number(a.numero) > Number(b.numero)) return 1;
      else return 0;
    });
    const dd = {
      pageOrientation: 'landscape',
      content: [
        { text: 'Listado de Permisos', style: 'header' },
//      { text: 'Empresa:' + this.empresaService.getValue().nomempresa, style: 'subheader' },
        {
          style: 'tableExample',
          table: {
            widths: [50, 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: [
              ['Numero', 'Fecha Ini', 'Sector', 'Tarea', 'Supervisor', 'Autorizante'],
              ...vals.map(a => ([
                a.numero,
                { text: this.dp.transform(a.fechaini, "dd-MM-yyyy") },
                { text: a.sectordes },
                { text: a.destarea },
                { text: a.supervisor },
                { text: a.autorizante }
              ])),
              ['', '', '', '', '', '']
            ]
          }
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          fontSize: 9,
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
         bold: true,
          fontSize: 13,
          color: 'black'
        }
      },
      defaultStyle: {
        // alignment: 'justify'
      }

    }
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(dd).download('lispermi');
  };
printper(p:datamodel._Permiso0 ){
   const dd = {
     pageOrientation: 'portrait',
     styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        regular: {
          fontSize: 11,
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
         bold: true,
          fontSize: 13,
          color: 'black'
        }
      },
      defaultStyle: {
        fontSize: 11
      },
      content: [
        { text: 'Permiso de Trabajo N°'+p.numero, style: 'header' },

        { table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 0,
          widths: [ 100, 'auto' ],
  
          body: [
            [ 'Fecha Inicio:',  this.dp.transform(p.fechaini, "dd-MM-yyyy") ],
            [ 'Sector:', p.sectordes],
            [ 'Tarea:' ,p.destarea ],
            [ 'Supervisor:', p.supervisor ],
            [ 'Instr.Seguridad:', p.inssegur ],
            [ 'Personal:', p.personal1 ],
            [ 'Personal:', p.personal2 ],
            [ 'Personal:', p.personal3 ],
            [ 'Personal:', p.personal4 ],
            [ 'Personal:', p.personal5 ],
            [ 'Personal:', p.personal6 ]            
          ]
          }
        }
      ]
    }
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(dd).download('permiso'+p.numero);
    return;
}  
}

