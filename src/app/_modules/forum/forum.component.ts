import { Component , OnInit } from '@angular/core';

import { ForumService, Bacheca } from '../../_services/index';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  forum: Array<Bacheca> = [];

  constructor ( private forumService: ForumService) {}

  ngOnInit(): void {
    this.forumService.getforum().subscribe ( (data) => {
      this.forum = data;
    });


  }



  
}
