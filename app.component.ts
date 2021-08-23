import { Component } from '@angular/core';
import { UsuarioService } from './infraest/usuario.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'permISO';
  user:string;
  constructor(private usuarioService: UsuarioService) {
      this.user = '';
  }  
}
