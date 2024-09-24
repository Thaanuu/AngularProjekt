import { Component, inject } from '@angular/core';
import { SettingsComponent } from '../settings/settings.component';
import { LogoutComponent } from '../logout/logout.component';
import { SettingsService } from '../settings.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { BootspringService } from '../bootspring.service';
import { map, Observable, of } from 'rxjs';
import { UserData } from '../user-data';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [SettingsComponent, LogoutComponent,ReactiveFormsModule, CommonModule, NgIf,AsyncPipe],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent {

  settingsService: SettingsService = inject(SettingsService);
  bootspringService: BootspringService = inject(BootspringService);
  ngOnInit(){
    //this.settingsService.storageService.updateUserList();
  }


  


  userForm = new FormGroup({
    name: new FormControl("", Validators.required),
    pass: new FormControl("", Validators.required)
  });

  addOrEditUser(){
    if(this.settingsService.editingMode){
      this.editUser(this.settingsService.currentEditUserid);
    } else {
      this.addUser();
    }
    this.userForm.reset();
  }

  addUser(){
    this.settingsService.createUser(this.userForm.value.name!, this.userForm.value.pass!);
    

  }
  editMode(id:number){
    this.settingsService.editingMode = true;
    this.settingsService.currentEditUserid = id;
    this.userForm.setValue({name:this.settingsService.getUserbyId(id)!.name, pass:this.settingsService.getUserbyId(id)!.pass});
  }
  editUser(id:number){
    this.settingsService.editUser(id, this.userForm.value.name!, this.userForm.value.pass!);
    this.settingsService.editingMode = false;
    this.userForm.reset();
  }
  deleteUser(id:number){
    this.settingsService.deleteUser(id);
  }
  
}
