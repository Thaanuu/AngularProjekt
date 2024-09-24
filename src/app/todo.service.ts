import { inject, Injectable } from '@angular/core';
import { TodoData } from './todo-data';
import { DatePipe } from '@angular/common';
import { StorageService } from './storage.service';
import { BootspringService } from './bootspring.service';
import { on } from 'node:events';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { 

  }

  currentUser: number = -1;
  todoArray: TodoData[] = [];
  //{id: 0, todoText:"test", status:"open",description:"",deadline:"", priority:false}
  currentSort: string = "alphabet";
  
  editMode:boolean = false;
  transferMode:boolean = false;

  todoField: string ="";
  descriptionField: string ="";
  deadlineField: string ="";

  storageService:StorageService = inject(StorageService);
  bootspringService:BootspringService = inject(BootspringService);

  checkStuff(){
    for(let todo of this.todoArray){
      if((new Date(todo.deadline).getTime())-(new Date().getTime()) >7){
        if(todo.status !== "completed"){
          todo.status = "overdue";
          this.sort(this.currentSort);
        }
      }
    }
  }

  getUsers(){
    return this.storageService.getAllUsers();
  }

  transferTodo(idTo:number,todo:TodoData){
    this.storageService.bootspringService.transferTodo(this.currentUser,todo.id,idTo);
    this.storageService.getUserbyId(idTo)!.todoList.push(todo);
    this.storageService.saveUserData(idTo, this.storageService.getUserbyId(idTo)!.todoList);
    this.storageService.updateUserList();
    this.loadTodos(this.storageService.getUserbyId(this.currentUser)?.todoList!);
    this.sort(this.currentSort);
  }


  loadTodos(todos:TodoData[]){
    this.todoArray = todos;
    this.sort(this.currentSort);
  }

  getAllTodos(){
    return this.storageService.getUserbyId(this.currentUser)!.todoList;
  }

  getTodoById(id: number): TodoData | undefined{
    return this.storageService.userList[this.currentUser-1].todoList.find((todo) => todo.id === id);
  }
  

  addTodo(puserId: number, text: string, pdescription: string, pdeadline: string){
    let tempTodo: TodoData = {
      id:undefined!, 
      userId:puserId,
      todoText:text,
      status:"open",
      description:pdescription,
      deadline:pdeadline,
      priority:false};
    this.bootspringService.addTodo(tempTodo);
    //this.todoArray.push(tempTodo);
    this.storageService.updateUserList();
    this.sort(this.currentSort);
    this.loadTodos(this.storageService.getUserbyId(this.currentUser)?.todoList!);
  }

  deleteTodo(id: number){
    
    //this.storageService.userList[this.currentUser-1].todoList.splice(this.storageService.userList[this.currentUser-1].todoList.findIndex(t => t.id === id,1));
    //this.todoArray.splice(Array.prototype.indexOf(this.getTodoById(id),1))
    this.bootspringService.deleteTodo(this.currentUser,id);
    this.storageService.updateUserList();
    this.sort(this.currentSort);
    this.loadTodos(this.storageService.getUserbyId(this.currentUser)?.todoList!);
  }

  deleteAllTodos(){
    this.storageService.userList[this.currentUser-1] .todoList= [];
    this.bootspringService.deleteAllTodos(this.currentUser); 
    this.storageService.updateUserList();
    this.sort(this.currentSort);
    this.loadTodos(this.storageService.getUserbyId(this.currentUser)?.todoList!);
  }


  editTodoStatus(id: number, status: string){
      const todo = this.getTodoById(id)!;
      if(todo !== undefined){
        todo.status = status;
      }
      this.bootspringService.editTodo(todo);
      this.storageService.updateUserList();
      this.sort(this.currentSort);
      this.loadTodos(this.storageService.getUserbyId(this.currentUser)?.todoList!);
  }

  editTodoPriority(id: number, prio:boolean){
      const todo = this.getTodoById(id)!;
      todo.priority = prio;
      this.bootspringService.editTodo(todo);
      this.storageService.updateUserList();
      this.sort(this.currentSort);
      this.loadTodos(this.storageService.getUserbyId(this.currentUser)?.todoList!);
  }
  editTodo(id:number, todoText:string, description:string, deadline:string){
    const todo = this.getTodoById(id)!;
    if(todo !== undefined){
      todo.todoText = todoText;
      todo.description = description;
      todo.deadline = deadline;
    }
    
    this.bootspringService.editTodo(todo);
    this.storageService.updateUserList();
    this.sort(this.currentSort);
    this.loadTodos(this.storageService.getUserbyId(this.currentUser)?.todoList!);
  }

  sort(sortType:string){
    this.currentSort = sortType;
    switch(sortType){
      case "alphabet":
        this.getAllTodos().sort((a,b) => a.todoText.toLowerCase().localeCompare(b.todoText.toLowerCase()));
        break;
      case "deadline":
        this.getAllTodos().sort((a,b) => {
          let dateA = this.dateConvert(a.deadline);
          let dateB = this.dateConvert(b.deadline);
          if(isNaN(dateA.getTime())){
          return 1;
          } else if(isNaN(dateB.getTime())){return -1}

          return dateB.getTime() - dateA.getTime();
          
          });
        break;
        case "status":
          this.getAllTodos().sort((a,b) =>{
          return this.deadlineNumber(a.status) - this.deadlineNumber(b.status);
          });
          
          break;
      case "priority":
          this.getAllTodos().sort((a) => {
          return a.priority ? -1: 1;
          });
          this.storageService.loaded = true;
          break;
    }
  }

dateConvert(date: string){
  let dateParts = date.split(".");
    if((parseInt(dateParts[1])-1) > 12 || parseInt(dateParts[0]) >31){
      return new Date("");
    }
    let dateObject = new Date(parseInt(dateParts[2]), parseInt(dateParts[1])-1, parseInt(dateParts[0]))
    return dateObject;
}

getDayDiff(pDate:string): number{
  let currentDate = new Date();
  let date = this.dateConvert(pDate);
  return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) ) /(1000 * 60 * 60 * 24));

}


deadlineNumber(status:string):number{
  switch(status){
    case "overdue":
  return 0;
      break;
  case"in progress":
    return 1;
      break;
  case"open":
    return 2;
      break;
  case"completed":
    return 3;
      break;
  }
  return -1;
}


}
