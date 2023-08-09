import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../modal/post';

 

const API_URL = 'http://localhost:8089/api/';


@Injectable({
  providedIn: 'root'
})
export class UserService {
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


 
  
  postComment(text: string,postId: Number,idUser:Number): Observable<any> {
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

  getAllLikesPerPost(postId: Number): Observable<any> {
    return this.http.get(API_URL + 'liking/like-post/'+ postId);
  }
 
 
  deleteLike(id:Number ): Observable<Object> {
    return this.http.delete(API_URL + 'liking/delete-like/'+ id );
  }

  savePosts(id:Number , post:Post): Observable<Object> {
    return this.http.post(API_URL + 'posts/'+ id ,post);
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'company', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  test(): Observable<any> {
    return this.http.get(API_URL + 'retrieve-user-by-sexe/Women');
  }

}
