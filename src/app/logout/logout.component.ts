import { Component, inject } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [NgIf],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
  loginService:LoginService = inject(LoginService);
  
  constructor(private router:Router){}

  
  ngOnInit(){
   if(this.loginService.currentUserId === -1){
    this.router.navigate(["/"]);
   } 
  }

  logout(){
    this.loginService.saveUser();
    this.router.navigate(["/"]);
  }

}
