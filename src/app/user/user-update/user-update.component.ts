import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/user';
import { UserService } from 'src/app/user.service';


@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  users: User = new User();
  
  constructor(private router: Router,
              private route: ActivatedRoute, 
              private userService: UserService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.userService.readById(id).subscribe(users => {
      this.users = users
    });
  }
  updateUser(){
    this.userService.updateUser(this.users).subscribe();
    this.saida();
   
  }

  saida(){
    this.router.navigate(["user"])
   }

}
