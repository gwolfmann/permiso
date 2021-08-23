import { Injectable } from '@angular/core';
import { _Usuario } from '/home/gustavo/transp/permiso/client/model/permiso';
import { UsersService } from '../users.service';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({ providedIn: 'root' })
export class UsuarioService {

    private currentUserSubject: BehaviorSubject<_Usuario>;
    user: Observable<_Usuario>;

    constructor(public ps: UsersService) {
        var e : _Usuario;
        if (sessionStorage.getItem('user')=== null) {
            e = new _Usuario();
        } else {
            e = JSON.parse(sessionStorage.getItem('user'));
        }
        this.currentUserSubject = new BehaviorSubject<_Usuario>(e);
        this.user = this.currentUserSubject.asObservable();
    }
    /*
        getAll() {
            return this.http.get<User[]>(`${environment.apiUrl}/users`);
        }
    
        getById(id: number) {
            return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
        }
    */
    setValue(u: _Usuario) {
        this.currentUserSubject.next(u);
        sessionStorage.setItem('user', JSON.stringify(u));
    }

    getValue(): _Usuario {
        return this.currentUserSubject.getValue();
    }

    async login(username: string, password: string): Promise<number> {
        var retrived: _Usuario;
        var ret: number;
        ret = 0;
        retrived = <_Usuario>await this.ps.keyquery(username, true);

        if ((retrived.nickuser == 'Admin') && (retrived.password == 'Sg2812')) {
            ret = 762;
        }
        if (retrived.nickuser == username) {
            if (retrived.password == password) {
                ret = 100;
            } else {
                ret = 2;
            }
        }
        if ( (ret == 762 ) || (ret == 100) ) {
            this.setValue(retrived);
        }
        return ret;

    }

    logout() {
        sessionStorage.removeItem('user');
        this.currentUserSubject.next(null);
    }
}
