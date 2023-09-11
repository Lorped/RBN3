import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatExpansionModule} from '@angular/material/expansion'; 
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


import { ForumService } from '../../_services/index';
import { ForumComponent } from './forum.component';
import { SubforumComponent } from './subforum/subforum.component';
import { ThreadComponent } from './thread/thread.component';
import { EditComponent } from './edit/edit.component';


const routes: Routes = [
  { path: '', component: ForumComponent},
  { path: '/', component: ForumComponent},
  { path: 'subforum/:id', component: SubforumComponent},
  { path: 'subforum/:id/thread/:idx', component: ThreadComponent},
  { path: 'subforum/:id/edit', component: EditComponent},
  { path: 'subforum/:id/thread/:idx/edit', component: ThreadComponent},
  { path: '*' , redirectTo: ''}
]

@NgModule({
  declarations: [
    ForumComponent,
    SubforumComponent,
    ThreadComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatExpansionModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [
    ForumService
  ]
})
export class ForumModule { }
