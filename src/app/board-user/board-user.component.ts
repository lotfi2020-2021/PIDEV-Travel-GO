import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.scss']
})
export class BoardUserComponent implements OnInit {
  content?: string;
  openPost = false
  posts:any
  currentUser: any;
  errorLike:String = ""
  searchBytitle:String=""
  response:any

  like: any = {
    reactType: "like",
 
  };

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;
  postCreation: any = {
    title: null,
    description: null,
    content: null
  };
  comment = "eezrzerzer"
  
  isAlreadyLinking = false
  postComments:any
  fileId:any
  afterFilter:any

  constructor(private userService: UserService,private token: TokenStorageService,private router: Router ) { }

  ngOnInit(): void {

    this.currentUser = this.token.getUser();

    console.warn('-*--*-*',this.currentUser)
    this.userService.getUserBoard().subscribe(
      data => {
        this.content = data;
        console.warn("USDER")
      },
      err => {
        console.warn("pppppppp")
      }
    );

   
    this.getAllPosts()


    this.userService.getAllLikes(this.currentUser.id).subscribe(res =>{
      console.warn('-*-*getAllLikesgetAllLikes-*',res)
    })
 



     
 
  }



  goToPostDetail(id:Number){
    this.router.navigate(['user/posts/'+id])
  }
  goToCreatePost(){
    
    this.router.navigate(['user/postsCreate'])
   
  }
  getCommentByPostId(postId:Number){
    this.userService.getAllComment(postId).subscribe(res=>{
      console.warn('zefzf',res)
      this.postComments = res
    })
  }
  

  addComment(postId:Number){
    console.warn("-*-*-*-**",postId)
    console.warn('zzzz',this.comment)

let userId:Number = this.currentUser.id

    this.userService.postComment(this.comment,postId,userId).subscribe(
      data => {
        console.log(data);
     
      },
      err => {
   
      }
    );
    this.getCommentByPostId(postId)
  }


  

  getAllPosts(){
    this.userService.getPosts().subscribe(res => {
      
      this.posts = res
      this.afterFilter = this.posts
      console.warn('dfsdcsdfdscsdc', res)
   
     
    })
    
   
  }

 


 
  
 

  openPostSection(){
    this.openPost = true
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
 

  filterArray() {
    this.afterFilter = this.posts.filter(
     ( _:any) =>
        _.title
          .toString()
          .toLocaleLowerCase()
          .includes(this.searchBytitle.trim().toLowerCase()) 
    
    );
 
  }
}
