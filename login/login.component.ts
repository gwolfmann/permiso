import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../infraest/alert.service';
import { UsuarioService } from '../infraest/usuario.service';
import { Message, MessageService } from 'primeng/api';
import { _Usuario } from '../../../client/model/permiso';

@Component({
    templateUrl: 'login.component.html',
    providers: [MessageService]
})
export class LoginComponent implements OnInit {
    formgr: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private usuarioService: UsuarioService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.formgr = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
	this.usuarioService.setValue(null);
    }

    // convenience getter for easy access to form fields
    get f() { return this.formgr.controls; }

    async onSubmit() {
        this.submitted = true;
        var strerror: string;
        this.alertService.clear();

        if (this.formgr.invalid) {
            return;
        }

        this.loading = true;
        var valid: number;
        valid = <number>await this.usuarioService.login(this.f.username.value, this.f.password.value);

        switch (valid) {
            case 762: {
                this.loading = false;
               // sessionStorage.setItem('user', JSON.stringify(this.f.username.value));
                this.router.navigate(['/users']);
                break;
            }
            case 100: {
                this.loading = false;
             //   sessionStorage.setItem('user', JSON.stringify(this.f.username.value));
//                this.router.navigate(['/emps']);
                this.router.navigate(['/per0']);
                break;
            }
            case 0: {
                strerror = 'Usuario Inexsistente';
                this.loading = false;
                break;
            }
            case 2: {
                strerror = 'Password Invalido';
                this.loading = false;
                break;
            }
        }
        if (strerror) {
            this.alertService.error(strerror);
        }
    }
}
