import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SectorComponent} from './sector/sector.component';
import {UsersComponent} from './users/users.component';
import {LoginComponent} from './login/login.component';
import {Per0Component} from './per0/per0.component';
const routes: Routes = [{path:'sector',component:SectorComponent},
{path:'users',component:UsersComponent},
{path:'login',component:LoginComponent},
{path:'per0',component:Per0Component},
{path:'',redirectTo:'login',pathMatch:'full'},
{path:'users/:modo',component:UsersComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
