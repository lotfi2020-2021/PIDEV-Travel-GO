import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../modal/post';

 

  const API_URL = 'http://localhost:8089/api/';


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getPosts(): Observable<any> {
    return this.http.get(API_URL + 'posts');
  }

  getPostById(postId : Number): Observable<any> {
    return this.http.get(API_URL + 'posts/'+postId);
  }


  updatePostById(postId : Number,post:Post ): Observable<any> {
    return this.http.put(API_URL + 'posts/'+postId,post);
  }

  updateCommentById(postId : Number, comentId:Number , text:String ): Observable<any> {
    return this.http.put(API_URL + 'posts/' + postId + '/comments/' + comentId, 
   {text} );
  }

 

 
  
  postComment(text: String,postId: Number,idUser:Number): Observable<any> {
    return this.http.post(API_URL + 'posts/' + postId + '/comments/' + idUser, {
      text
  
    });
  }
 
  getAllComment(postId: Number): Observable<any> {
    return this.http.get(API_URL + 'posts/ '+ postId +'/comments');
   
  }

  addLike(idPost: Number, userId:Number,like:any): Observable<Object> {
    return this.http.post(API_URL + 'liking/add-like/'+ userId +"/"+ idPost,like);
  }


  getAllLikes(userId: Number): Observable<any> {
    return this.http.get(API_URL + 'liking/like-user/'+ userId);
  }

  getAllLikesPerPost(postId: Number | undefined): Observable<any> {
    return this.http.get(API_URL + 'liking/like-post/'+ postId);
  }
 

 
    addComment(commentId:Number , postId:Number,userId:Number,text:String): Observable<Object> {
        return this.http.post(API_URL + 'posts/'+postId+'/comments/'+ commentId+'/'+userId ,{
            text
        
          });
      }
      
 
 
  deleteLike(id:Number ): Observable<Object> {
    return this.http.delete(API_URL + 'liking/delete-like/'+ id );
  }
  deleteComment(postId:Number,commentId:Number ): Observable<Object> {
    return this.http.delete(API_URL + 'posts/'+postId+'/comments/'+ commentId  );
  }
  deletePost(postId:Number  ): Observable<Object> {
    return this.http.delete(API_URL + 'posts/'+postId   );
  }
 

  savePosts(id:Number , post:any): Observable<Object> {
    return this.http.post(API_URL + 'posts/'+ id ,post);
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'company', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
  abonner(idUser1:Number , idUser2:Number,abonnement:any ): Observable<Object> {
    return this.http.post(API_URL + "Follow/ "+idUser1  +"/"+idUser2,abonnement)
  }

  deleteAbonner(abonId:Number  ): Observable<Object> {
    return this.http.delete(API_URL + 'Follow/'+ abonId  );
  }
 
 
  getAbonnementByUserId(idUser : Number): Observable<any> {
    return this.http.get(API_URL + 'Follow/User/'+idUser );
  }

  getAllAbon( ): Observable<any> {
    return this.http.get(API_URL + 'Follow' );
  }

 
 
}
