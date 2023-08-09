import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content?: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.userService.test().subscribe(resp => {

      console.warn('hjklmùmlkjb',resp.body)
      console.warn('resp',resp)

    })
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
        console.warn("ADMIN")
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
}
