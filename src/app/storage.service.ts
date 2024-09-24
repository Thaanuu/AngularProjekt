import { inject, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TodoData } from './todo-data';
import { UserData } from './user-data';
import { isPlatformBrowser } from '@angular/common';
import { platform } from 'os';
import { BootspringService } from './bootspring.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  //userListLoad: UserData[] = [];

  userList: UserData[] = [];/* [{id:0,name:"admin",pass:"admin",todoList: new Array()},
                          {id:1,name:"user",pass:"user",todoList: new Array()}
  ];*/
  loaded:boolean = false;

  bootspringService: BootspringService = inject(BootspringService);

  constructor(/*@Inject(PLATFORM_ID) platformId: object*/) {
    //this.getUserbyId(1)?.todoList.push({id: 0, todoText:"test", status:"open",description:"1",deadline:"2", priority:false});
    /*if(isPlatformBrowser(platformId)){
      this.userList = JSON.parse(localStorage.getItem("users")!);
    }*/


   }

   updateUserList(){
    this.loaded = false;
      this.bootspringService.getUsers().subscribe(users =>{
        var userListLoad:UserData[] = [];
        users.map(user => {
          this.bootspringService.getTodos(user.id).subscribe(todos => {
            userListLoad.push({id:user.id,name:user.name,pass:user.pass,todoList: todos})
          });
        });
        this.userList = userListLoad;
        this.loaded = true;
      });

   }
  
  getAllUsers(){

    return this.userList;
    //return this.bootspringService.getUsers();
  }

  getUserbyId(id:number){
    return this.userList.find((user) => user.id === id);
    
    //return this.bootspringService.getUserbyId(id);
  }

  getUserIdbyNameAndPass(name: string,pass: string){
    let user = this.userList.find((user) => user.name === name && user.pass === pass);
    if(user !== null || user !!== undefined){
    return user!.id;
    }
    return -1;
    /*let user = this.bootspringService.getUsers().find((user) => user.name === name && user.pass === pass);
    console.log(user);
    if(user !== null || user !== undefined){
      return user!.id;
      }
      return -1;*/
  }

  saveUserData(id:number, todoList:TodoData[]){
    /*this.getUserbyId(id)!.todoList = todoList;
    this.saveToLocalStorage();*/
    let user = this.getUserbyId(id)!;
    user.todoList = todoList;
    this.bootspringService.editUser(id,user);
  }

  createUser(name:string,pass:string){
    /*  this.userList.push({id:this.getAllUsers().length,name:name,pass:pass,todoList: new Array()});
      this.saveToLocalStorage();*/
      this.bootspringService.addUser({id:undefined!,name:name,pass:pass,todoList: new Array()});
      this.updateUserList();
  }

  editUser(id:number, name:string, pass:string){
    this.loaded = false;
    let user = this.getUserbyId(id)!;
    user.name = name;
    user.pass = pass;
    this.bootspringService.editUser(id, user);
    this.loaded = true;
    
  }

  deleteUser(id:number){
    
    this.userList.splice(this.userList.findIndex(u => u.id === id),1);
    this.loaded == false;
    this.bootspringService.deleteUser(id);
    this.loaded = true;
  }

}

