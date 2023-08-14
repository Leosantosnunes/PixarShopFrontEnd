import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LibraryComponent } from './library/library.component';
import { PartialsModule } from '../partials/partials.module';
import { ModelModule } from '../model/model.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [ FormsModule,PartialsModule,ModelModule, RouterModule,CommonModule],
    declarations: [AboutComponent,ContactComponent,LibraryComponent],
    exports:[AboutComponent,ContactComponent,LibraryComponent,PartialsModule]
})
export class PagesModule{

}