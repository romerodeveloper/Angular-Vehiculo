import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVehiculoComponent } from './components/add-vehiculo/add-vehiculo.component';
import { ListVehiculoComponent } from './components/list-vehiculo/list-vehiculo.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';


const routes: Routes = [
  
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'logout', component: LoginComponent },
  { path: 'list', component: ListVehiculoComponent },
  { path: 'add', component: AddVehiculoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
