import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,map } from 'rxjs';
import { UserData } from './user-data';
import { TodoData } from './todo-data';
@Injectable({
  providedIn: 'root'
})
export class BootspringService {

  private url = "http://localhost:8080/userprofiles";
  private todoUrl = "http://localhost:8080/todos";



  constructor(private http: HttpClient) {   }

  
   public getUsers():Observable<UserData[]>{
    let users!: UserData[];
    return this.http.get<UserData[]>(this.url);    
   }
   /*
   public getUserbyId(id:number):UserData{
    this.http.get<UserData>(this.url + "/" +id).pipe(map(data => {return data;}))
    console.log(this.user);
    return this.user;
   }*/
  public getTodos(id:number):Observable<TodoData[]>{
    return this.http.get<TodoData[]>(this.url+"/"+id+"/todos");
  }

   public addUser(user: UserData){    
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    return this.http.post<UserData>(this.url,user,{headers:headers}).subscribe();
   }

   public addTodo(todo: TodoData){
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    return this.http.post<TodoData>(this.url+ "/" +todo.userId +"/"+ "todos" ,todo,{headers:headers}).subscribe();

   }

   public deleteTodo(userId: number, todoId: number){
    return this.http.delete(this.url+ "/" +userId +"/"+ "todos" +"/" +todoId).subscribe();
   }

   public deleteAllTodos(userId: number){
    return this.http.delete(this.url+ "/" +userId +"/"+ "todos/deleteall").subscribe();
   }

   public editTodo(todo: TodoData){
    const headers = new HttpHeaders({"Content-Type":"application/json"});

    return this.http.put(this.url+ "/" +todo.userId +"/"+ "todos" +"/"+todo.id, todo, {headers:headers}).subscribe();
   }
   public deleteUser(id:number){
    return this.http.delete(this.url + "/" +id).subscribe();
   }

   public transferTodo(currentUserId:number, todoId:number, toUserId:number){
    return this.http.put(this.url+ "/" +currentUserId +"/"+ "todos" +"/"+todoId+"/"+toUserId,undefined).subscribe();
   }

   public editUser(id:number,user: UserData){
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    return this.http.put<UserData>(this.url  + "/" +id, user,{headers:headers}).subscribe();
   }








  }
