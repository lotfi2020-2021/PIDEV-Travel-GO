import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../modal/post';

import { PostsService } from '../posts/posts.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css',"../../assets/css/templatemo-eduwell-style.css"]
})
export class UpdatePostComponent implements OnInit {

  postUpdate: Post = {
    id : 0  ,
    title :"",
    description :  "",
    content : "",
  };

  idUser!:Number
  currentUser: any;
  postId:any
  post:any
  constructor(private userService: UserService,private token: TokenStorageService, private router: Router, private postsService : PostsService,private route : ActivatedRoute  ) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
   
    this.postId = this.route.snapshot.params.postId;
    this.postsService.getPostById(this.postId).subscribe(res =>{
      this.postUpdate  = {
        id : res.id  ,
        title :res.title,
        description :  res.description,
        content : res.content,
      };  
      console.warn('*/*/*/',this.postUpdate)
    })

  }


  savePost(){
    this.idUser = this.currentUser.id
    console.warn('*--*-*-*',this.idUser)
    this.postsService.updatePostById(this.postId,this.postUpdate).subscribe(res =>{
      console.warn('-*-*-*',res)
    })

    this.router.navigate(['user'])
     
  }

}