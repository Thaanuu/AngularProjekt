import { inject, Injectable } from '@angular/core';
import { UserData } from './user-data';
import { TodoService } from './todo.service';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  storageService: StorageService = inject(StorageService);
  todoService: TodoService = inject(TodoService);

  currentUserId:number = -1;

  

  constructor() { }

  loadUser(){
    
    this.todoService.loadTodos(this.storageService.getUserbyId(this.currentUserId)!.todoList);
    this.todoService.currentUser = this.currentUserId;
  }

  checkUser(name: string,pass: string): boolean{
    this.currentUserId = this.storageService.getUserIdbyNameAndPass(name,pass);
    if(this.currentUserId !== -1){
      this.todoService.currentUser = this.currentUserId;
      return true;
    }
    return false;
  }

  saveUser(){
    this.storageService.saveUserData(this.currentUserId,this.todoService.getAllTodos());
    this.todoService.currentUser = -1;
  }

}
