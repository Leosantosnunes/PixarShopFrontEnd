import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { PartialsModule } from 'src/app/partials/partials.module';
import { ModelModule } from 'src/app/model/model.module';
import { FormsModule } from '@angular/forms';
import { MovieEditorComponent } from '../movie-editor/movie-editor.component';
import { MovieTableComponent } from '../movie-table/movie-table.component';


@NgModule({
  declarations: [
    AdminComponent,MovieEditorComponent,MovieTableComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    PartialsModule,
    ModelModule,
    FormsModule
  ]
})
export class AdminModule { }
