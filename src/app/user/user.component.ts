import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[];

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
    .subscribe(users => this.users = users);
  }

  add(nome: string): void {
    nome = nome.trim();
    if (!nome) { return; }
    this.userService.addUser({ nome } as User)
      .subscribe(user => {
        this.users.push(user);
      });
  }

  delete(user: User): void {
    this.users = this.users.filter(h => h !== user);
    this.userService.deleteUser(user).subscribe();
  }

  navigateToUserCreate(): void{
    this.router.navigate(['/user/create'])
   }

   navigateToUserListar(): void{
    this.router.navigate(['/user/listar'])
   }

   navigateToUserSearch(){
     this.router.navigate(['/user/search'])
   }

   navigateToUserUpdate(){
     this.router.navigate(['/user/update'])
   }
   
   mostraLista() {
    this.router.navigate(['user']);
  }

  saida(): void{
    this.router.navigate(["user"])
  }

}

