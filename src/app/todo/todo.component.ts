import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoTableComponent } from '../todo-table/todo-table.component';
import { LogoutComponent } from '../logout/logout.component';
import { TodoService } from '../todo.service';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, TodoTableComponent, LogoutComponent,SettingsComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  todoService: TodoService = inject(TodoService);
  buttonText: string ="Add Todo";
  currentEditingId: number= -1;


  addTodo(text: string, description: string, deadline: string){
    if(this.todoService.editMode === false){
      this.todoService.addTodo(this.todoService.currentUser,text, description,deadline);

    } else{
      this.todoService.editTodo(this.currentEditingId,text,description,deadline);
      this.currentEditingId = -1;
      this.buttonText ="Add Todo";
      this.todoService.editMode = false;
    }
    this.todoService.todoField="";
    this.todoService.descriptionField="";
    this.todoService.deadlineField="";
  }
  
  deleteAll(){
    this.todoService.deleteAllTodos();
  }

  changeButtonEvent(event: any){
    if(event.edit === true){
      this.currentEditingId = event.todoId;
      this.todoService.editMode = true;
    this.buttonText = "Edit Todo";
    }
  }
}
