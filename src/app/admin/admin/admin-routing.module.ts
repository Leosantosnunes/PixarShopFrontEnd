import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { MovieEditorComponent } from '../movie-editor/movie-editor.component';
import { MovieTableComponent } from '../movie-table/movie-table.component';
import { OrderTableComponent } from '../order-table/order-table.component';

const routes: Routes = [{
  path: '', component: AdminComponent,canActivate: [AuthGuard] ,
  children: [
    { path: 'movies/:mode/:id', component: MovieEditorComponent, data: { title: 'Edit Movie' }, canActivate: [AuthGuard] },
    { path: 'movies/:mode', component: MovieEditorComponent, data: { title: 'Add Movie' }, canActivate: [AuthGuard] },
    { path: 'movies', component: MovieTableComponent, data: { title: 'Movie Table' }, canActivate: [AuthGuard] },
    { path: 'orders', component: OrderTableComponent, data: { title: 'Order Table' }, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'admin' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
