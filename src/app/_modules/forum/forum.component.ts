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

    //this.printpath('', this.router.config);
  }


 
  /*
  printpath(parent: string, config: Route[]) {
    for (let i = 0; i < config.length; i++) {
      const route = config[i];
      console.log(parent + '/' + route.path);
      if (route.children) {
        const currentPath = route.path ? `${parent}/${route.path}` : parent;
        this.printpath(currentPath, route.children);
      }
    }
  }
  */
  
}
