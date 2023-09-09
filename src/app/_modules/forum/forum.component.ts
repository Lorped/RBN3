import { Component , OnInit } from '@angular/core';
import { Router  } from '@angular/router';
import { ForumService, Bacheca } from '../../_services/index';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  forum: Array<Bacheca> = [];

  constructor (private router: Router, private forumService: ForumService) {}

  ngOnInit(): void {
    this.forumService.getforum().subscribe ( (data) => {
      this.forum = data;
    });
  }

  
}
