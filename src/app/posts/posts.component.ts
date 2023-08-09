import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { TokenStorageService } from '../_services/token-storage.service';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css',"../../assets/css/templatemo-eduwell-style.css"]
})
export class PostsComponent implements OnInit {


  commentText:String =''
  commentTextUpdate:String =''

 
  postId!: Number  ;
  post:any
  comments:any
  currentUser:any
  
  like: any = {
    reactType: "like",
 
  };


  postUpdate: any = {
    title: null,
    description: null,
    content: null
  };

  response:any
  updatePostSection = false
  likePost:any
  openCommentSection = false
  openAllComments = false
  btnAbonner = true
 
  abonnement:any
 
  accessAbon = false
  deleteAbonId:any
  accesPost= false
  idForDelete:any

  constructor(private route : ActivatedRoute , private router: Router, private postsService : PostsService,private token: TokenStorageService
    ) {  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.postId = this.route.snapshot.params.postId;
  
    this.getPostById()
    this.getallComments()
  
  
  this.postsService.getAllAbon().subscribe(res=>{
    console.warn('ssssssssssssss',  res )
    res.map((el:any)=>{
      if (el.idUser === this.currentUser.id) {
        this.idForDelete = el.id
      }
      
    
    })
  })


 

  }

 
  getallComments(){
    this.postsService.getAllComment(this.postId).subscribe(res=>{
      this.comments = res
      console.warn("-*-*-*-",res)
          })
  }

  openUpdateSection(){
    this.updatePostSection = true
    this.postUpdate = {
      title: this.post.title,
      description: this.post.description ,
      content: this.post.content
    }
  }



  generarPDF() {

    const div = document.getElementById('content');
    const options = {
      background: 'white',
      scale: 3
    };

    html2canvas(div!, options).then((canvas) => {

      var img = canvas.toDataURL("image/PNG");
      var doc = new jsPDF('l', 'mm', 'a4', true);
 
      const bufferX = 5;
      const bufferY = 5;
      const imgProps = (<any>doc).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');

      return doc;
    }).then((doc) => {
      doc.save('poste.pdf');  
    });
  }

  updatePost(){

    
   
    this.postsService.updatePostById(this.postId,this.postUpdate).subscribe(res =>{
      console.warn('-*-*-*',res)
    })

    this.updatePostSection = false

    window.location.reload();
  }

  getPostById(){
    this.postsService.getPostById(this.postId).subscribe(res =>{

      this.post = res

      if (this.currentUser.id === this.post.users.id) {
        this.accesPost = true
      }
    
      this.postsService.getAbonnementByUserId(this.post.users.id).subscribe(res=>{
           console.warn("res", res  )

           res.map((el:any)=>{
             if (el.id === this.currentUser.id) {
              this.btnAbonner = false
             }else{
               this.btnAbonner = true
             }
           })
        
    
      })
       

    if (this.currentUser.id !== this.post.users.id) {
      this.accessAbon = true
    }
      
    this.postsService.getAllLikesPerPost(this.post.id).subscribe(res=>{
   
      this.response = res
  
      console.warn('response', this.response)
     

        this.response.map((el:any)=>{
        
          if (this.currentUser.id === el.users.id) {
            this.likePost = true

             

          }
     
        })
         
  
   })

    })
  }




  
  saveComment(){
    console.warn("-*-*-*-",this.commentText)
    this.postsService.postComment(this.commentText,this.post.id,this.currentUser.id).subscribe(res=>{
 
    })
    window.location.reload();
  }

  deleteComment(comentId:Number){

    this.postsService.deleteComment(this.postId,comentId).subscribe(res =>{
      console.warn('ress',res)
    })
    window.location.reload();
  }




  deletePostById( ){
    this.postsService.deletePost(this.postId).subscribe(res =>{
      console.warn('ress',res)
    })
  
    this.router.navigate(['/user'])
  }




  addLike(){
    this.postsService.addLike(this.post.id,this.currentUser.id,this.like).subscribe(res=>{
   console.warn('sfdvsdsdv',res)
    })
    window.location.reload();
    this.likePost = !this.likePost
  }

 

  deleteLike(){
    this.postsService.getAllLikesPerPost(this.post.id).subscribe(res=>{
       this.response = res
        this.response.map((el:any)=>{
          if (this.currentUser.id === el.users.id) {
       
            this.postsService.deleteLike(el.idReact).subscribe(res=>{
        
            })

          } 
         
        })
    })
    this.likePost = !this.likePost

    
  }



  openUpdateComment(comment:any ){
 
    this.openCommentSection = true
    this.commentTextUpdate = comment
  }







  updateComment(commentId:Number){

    console.warn('sfdvsdsdv',this.commentTextUpdate)
   

    this.postsService.updateCommentById(this.postId, commentId,this.commentTextUpdate).subscribe(res=>{
      console.warn('fjhv,i',res)
  
    })
    window.location.reload()
    this.openCommentSection = false
  }





  addAbonnement(){
    this.postsService.abonner(this.post.users.id,this.currentUser.id,this.abonnement).subscribe(res=>{
 console.warn('zefjknejlknv',res)
 this.deleteAbonId = res
 this.idForDelete = this.deleteAbonId.id
 this.btnAbonner =  !this.btnAbonner
    })
  }





  deleteAbonnement( ){
  console.warn(this.idForDelete)
   if ( this.idForDelete) {
     
    this.postsService.deleteAbonner(this.idForDelete).subscribe(res =>{
      console.warn('-*-*-*-*res',res)
          })

   }
   this.btnAbonner =  !this.btnAbonner
  }





  opennAllCommentsSection(){
    this.openAllComments = !this.openAllComments
  }






  updatePub(){
    this.router.navigate(['user/postsUpdate/'+this.postId])
  }
}
