import { Component, OnInit } from '@angular/core';
import { LazyLoadingService } from './../../shared/lazy-loading.service';
import { PostDetailsComponent } from '../post-details/post-details.component';
import { PostListComponent } from '../post-list/post-list.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor(public sll: LazyLoadingService) { }

  ngOnInit(): void {
  }

  isFormRegistartion() {
    this.sll.statusRegistration = !this.sll.statusRegistration;
    this.sll.statusPopup = !this.sll.statusPopup;
  }

}
