import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-user-listar',
  templateUrl: './user-listar.component.html',
  styleUrls: ['./user-listar.component.css']
})
export class UserListarComponent implements OnInit {
  users: User[];
  displayedColumns = ['id', 'nome']
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  saida(): void{
    this.router.navigate(["/"])
  }
  getUsers(): void {
    this.userService.getUsers()
    .subscribe(users => this.users = users);
  }

  delete(user: User): void {
    this.users = this.users.filter(h => h !== user);
    this.userService.deleteUser(user).subscribe();
  }

  updateUser(){
    this.router.navigate(['/user/update/consultar/'])
  }
}
