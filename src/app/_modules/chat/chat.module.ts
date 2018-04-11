import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { ChatComponent } from './chat.component';
import { CHAT_ROUTES } from './chat.routing';
import { ChatService } from '../../_services/index';
import { PostService } from '../../_services/index';

@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(CHAT_ROUTES)
  ],
  providers: [
    ChatService,
    PostService

  ]
})
export class ChatModule {
}
