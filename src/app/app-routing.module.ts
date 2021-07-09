import { SavedComponent } from './gallery/saved/saved.component';
import { ViewComponent } from './gallery/view/view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    redirectTo: "view",
    pathMatch: "full"
  },
  {
    path: "view",
    component: ViewComponent
  },
  {
    path: "saved",
    component: SavedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
