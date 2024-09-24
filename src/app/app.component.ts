import { Component, inject } from '@angular/core';
import { RouterOutlet,RouterLink, ActivatedRoute } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { BootspringService } from './bootspring.service';
import { UserData } from './user-data';
import { StorageService } from './storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, TodoComponent, LoginComponent,LogoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  bootspringService: BootspringService = inject(BootspringService);
  storageService: StorageService = inject(StorageService);

  constructor(){
    
  }
  
  ngOnInit(){
      //this.bootspringService.getUsers().subscribe(data => console.log(data));
      this.storageService.updateUserList();
      /*console.log(this.storageService.userList);
      let tempUser = {id:7,name:"edited",pass:"edited",todoList: new Array()}
      //console.log(this.storageService.getUserIdbyNameAndPass("admin","admin"));

      //this.bootspringService.addUser(tempUser);
      
      //this.bootspringService.deleteUser(7);

      this.bootspringService.editUser(1,tempUser);*/
  };





  title = 'todo-list-angular';
}
