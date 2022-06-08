import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPeopleComponent } from './components/add-people/add-people.component';
import { ListPeopleComponent } from './components/list-people/list-people.component';


const routes: Routes = [
  { path: '', redirectTo: 'People', pathMatch: 'full'},
  { path: 'list', component: ListPeopleComponent },
  { path: 'add', component: AddPeopleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
