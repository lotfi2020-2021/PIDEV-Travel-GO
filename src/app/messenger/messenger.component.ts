import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Message } from '../modal/message';

import { PostsService } from '../posts/posts.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Conversation } from '../modal/conversation';
import { MessengerServiceService } from '../_services/messenger-service.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css',"../../assets/css/templatemo-eduwell-style.css"]
})
export class MessengerComponent implements OnInit {
   listUsers:any
   currentUser:any
   idConv:any
   conversation!: Conversation
 
   messageContent!: string;

   listMessage!: Message[]
   
  constructor( private messengerServiceService : MessengerServiceService,private route : ActivatedRoute , private router: Router, private postsService : PostsService,private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.messengerServiceService.getListUsers().subscribe(res =>{
      this.listUsers = res
    })
 
  }

  createConv(user2Id:number){
    this.messengerServiceService.createConversation(this.currentUser.id,user2Id).subscribe(res =>{
       this.idConv = res.id 
    })

    if (this.idConv) {
      this.messengerServiceService.getConversationById(this.idConv).subscribe(res=>{
        this.listMessage = this.conversation.messages
        console.warn('-*-listMessage  *', this.listMessage)
      })
    }
  }
  onSubmit(): void {
 
     
 
 
      this.messengerServiceService.sendMessage(this.idConv, this.currentUser.id,  this.messageContent).subscribe(res =>{
        console.warn("sss",res)
      })
      if (this.idConv) {
        this.messengerServiceService.getConversationById(this.idConv).subscribe(res=>{
        
          this.conversation = res
          this.listMessage = this.conversation.messages
          console.warn('-*-listMessage  *', this.listMessage)
          if (this.idConv) {
            this.messengerServiceService.getConversationById(this.idConv).subscribe(res=>{
            
              this.conversation = res
              this.listMessage = this.conversation.messages
              console.warn('-*-listMessage  *', this.listMessage)
            })
          }
        })
      }
    }
    

  }

 
