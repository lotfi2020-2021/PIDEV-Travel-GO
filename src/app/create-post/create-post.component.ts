import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../modal/post';

import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css',"../../assets/css/templatemo-eduwell-style.css"]
})
export class CreatePostComponent implements OnInit {

  postCreation: Post = {
    id : 0  ,
    title :"",
    description :  "",
    content : "",
  };

  idUser!:Number
  currentUser: any;
  constructor(private userService: UserService,private token: TokenStorageService,private router: Router ) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.warn('*/*/*/',this.currentUser)
  }


  savePost(){
    this.idUser = this.currentUser.id
    console.warn('*--*-*-*',this.idUser)
    this.userService.savePosts(this.idUser,this.postCreation).subscribe(res =>{
      console.warn('-*-*-*',res)
    })

    this.router.navigate(['user'])
     
  }
}
