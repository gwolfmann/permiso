import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../infraest/usuario.service';
import { _Usuario } from '../../../client/model/permiso';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  user: _Usuario;
  isAdmin:boolean     = false;
  verPermiso:boolean  = false;
  constructor(private router: Router, private usuarioService: UsuarioService) {
      this.usuarioService.user.subscribe(x => {this.user = x; this.updateAdmin()});
  }    
  ngOnInit(): void {
  }
  updateAdmin() {
    this.isAdmin = (this.user) && ( (this.user.nickuser=='Admin') || (this.user.catuser.toString() == 'Administrador') );
    if (!this.isAdmin) {this.verPermiso=false}
    this.updatePermiso();
  }
  updatePermiso(){
    this.verPermiso=((this.isAdmin) || (this.user !== null));
  }
  
  logout(){
    this.verPermiso=false;
    this.usuarioService.logout();
    this.router.navigate(['/login']);
  }
}
