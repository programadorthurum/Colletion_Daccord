import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { User } from "src/app/user";
import { UserService } from "src/app/user.service";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  users: User= new User();
  submitted = false;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  save(){
    this.userService.addUser(this.users).subscribe();
    this.saida();
    this.userService.showMessage("Operação realizada com sucesso!!!")
  }

  saida(){
   this.router.navigate(["user"])
  }
 
 onSubmit() {
   this.submitted = true;
   this.save();    
 }

 gotoList() {
   this.router.navigate(['user']);
 }

}
