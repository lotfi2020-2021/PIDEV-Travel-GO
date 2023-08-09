import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts/posts.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  afterFilter:any
  posts:any
  Following:any
  numberPosts:any
  allAbon:any
  abonUser:any
  constructor(private token: TokenStorageService,private userService: UserService, private postsService : PostsService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();

    this.getAllPosts()
    this.postsService.getAllAbon().subscribe(res=>{
   
      this.allAbon = res
 
      this.abonUser = this.allAbon.filter(
        ( _:any) =>
           _.idUser.toString()
             .includes(this.currentUser.id) 
       
       );
      console.warn('this.currentUser.id)', this.currentUser)
  
      this.Following = this.abonUser.length
    })
    
  }

  getAllPosts(){
    this.userService.getPosts().subscribe(res => {
      
      this.posts = res


 
      
  
      this.afterFilter = this.posts.filter(
        ( _:any) =>
           _.users.id.toString()
             .includes(this.currentUser.id) 
       
       );
   
       this.numberPosts = this.afterFilter.length
    
    })
 
   
  }
}
