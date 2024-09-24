import { inject, Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  storageService: StorageService = inject(StorageService);


  constructor() { }

  editingMode = false;
  currentEditUserid = -1;


  getAllUsers(){
    return this.storageService.getAllUsers();
  }

  getUserbyId(id:number){
    return this.storageService.getUserbyId(id);
  }

  createUser(name:string,pass:string){
    this.storageService.createUser(name, pass);
  }

  editUser(id:number, name:string,pass:string){
    this.storageService.editUser(id, name, pass);
  }

  deleteUser(id:number){
    this.storageService.deleteUser(id);
  }



}
