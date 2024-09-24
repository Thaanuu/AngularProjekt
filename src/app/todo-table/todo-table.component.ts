import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { TodoData } from '../todo-data';
import { NgFor,NgIf } from '@angular/common';
import { TodoService } from '../todo.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-table',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf],
  templateUrl: './todo-table.component.html',
  styleUrl: './todo-table.component.scss'
})
export class TodoTableComponent {

  todoService: TodoService = inject(TodoService);

  @Output() changeButtonEvent = new EventEmitter<{todoId: number, edit: boolean}>();
  
  deleteTodo(id:number){
    
    this.todoService.deleteTodo(id);
  }

  

  markComplete(id: number){
    this.todoService.editTodoStatus(id, "completed");
  }

  changeStatus(id:number,selectStatus:any){
    this.todoService.editTodoStatus(id,selectStatus.target.value);
  }
  changePrio(id:number,selectPrio:any){
    if(selectPrio.target.checked){
      console.log(true);
      this.todoService.editTodoPriority(id,true);
    } else {
      console.log(false);
      this.todoService.editTodoPriority(id,false);
    }

  }

  changeSort(select: any){
    this.todoService.currentSort = select.target.value;
    this.todoService.sort(select.target.value);
  }

  editTodo(id: number){
    const todo = this.todoService.getTodoById(id);
    if(todo !== undefined){
    this.todoService.todoField= todo.todoText;
    this.todoService.descriptionField=todo.description;
    this.todoService.deadlineField=todo.deadline;
    }
    this.changeButtonEvent.emit({todoId:id,edit:true});
  }
  checkDateforHighlight(tempTodo:TodoData): boolean{
    if( this.todoService.getDayDiff(tempTodo.deadline) > -8 && this.todoService.getDayDiff(tempTodo.deadline) < 0){
      if(tempTodo.status !== "completed"){
        return true;
      }
    }
    return false;
  } 

  checkDateforTransfer(tempTodo:TodoData): boolean{
    if( this.todoService.getDayDiff(tempTodo.deadline) < -7){
      if(tempTodo.status !== "completed"){
        return true;
      }
    }
    return false;
  } 

  openTransfer(){
    this.todoService.transferMode = true;
  }

  transfer(todo:TodoData,selection:any){
    this.todoService.transferTodo(parseInt(selection.target.value),todo);
    this.todoService.transferMode = false;
  }
}