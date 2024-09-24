import { Component, inject } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [NgIf],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  constructor(private router: Router){

  }
  loginService:LoginService = inject(LoginService);
  toggleSettings(){
    if(this.router.url === "/todo"){
    this.router.navigate(["/settings"]);
    } else {
      this.router.navigate(["/todo"])
    }
  }
}
