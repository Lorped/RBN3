import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumComponent } from './forum.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ForumComponent}
]

@NgModule({
  declarations: [ForumComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ForumModule { }
