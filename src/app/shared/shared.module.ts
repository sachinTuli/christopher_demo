import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NgModule } from '@angular/core';
import { ModelComponent } from './components/model/model.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemComponent } from './components/item/item.component';


@NgModule({
  imports: [
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    ModelComponent,
    ItemComponent
  ],
  declarations: [
    HeaderComponent,
    ModelComponent,
    ItemComponent
  ],
  providers: [],
})
export class SharedModule { }
