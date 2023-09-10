import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MatExpansionModule} from '@angular/material/expansion'; 
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


import { ForumService } from '../../_services/index';
import { ForumComponent } from './forum.component';
import { SubforumComponent } from './subforum/subforum.component';
import { ThreadComponent } from './thread/thread.component';


const routes: Routes = [
  { path: '', component: ForumComponent},
  { path: 'subforum/:id', component: SubforumComponent},
  { path: 'subforum/:id/thread/:idx', component: ThreadComponent} 
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
    MatSortModule
    
  ],
  providers: [
    ForumService
  ]
})
export class ForumModule { }
