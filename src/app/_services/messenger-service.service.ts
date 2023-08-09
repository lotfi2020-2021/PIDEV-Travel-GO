import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conversation } from '../modal/conversation';


const API_URL = 'http://localhost:8089/api/';
@Injectable({
  providedIn: 'root'
})
export class MessengerServiceService {
  private baseUrl = 'http://localhost:8089/api/conversation';
  constructor(private http: HttpClient) { }

  getListUsers( ): Observable<any> {
    return this.http.get(API_URL + 'users' );
  }

  

  // createConv(currentUserId:Number , user2Id:Number): Observable<any> {
  //   return this.http.post(API_URL + 'conversation/user/'+ currentUserId + '/' + user2Id);
  // }

 

  createConversation(currentUserId:number,userId: number): Observable<any> {
    const url = `${this.baseUrl}/user/${currentUserId}/${userId}`;
    return this.http.post(url, null);
  }

  getConversationById(id: number): Observable<Conversation> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Conversation>(url);
  }

  sendMessage(convId: number,userId:number, content: string): Observable<any> {
    const url = `${this.baseUrl}/message/${convId}/${userId}`;
    const contentMap:any = {};
    contentMap['content'] = content;
    return this.http.post(url, contentMap);
  }


}
