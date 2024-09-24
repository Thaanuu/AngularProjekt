import { Component, inject, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private router:Router){}

  loginService: LoginService = inject(LoginService);

  loginForm = new FormGroup({
    name: new FormControl("", Validators.required),
    pass: new FormControl("", Validators.required)
  });

  login(){
    
    if(this.loginService.checkUser(this.loginForm.value.name!,this.loginForm.value.pass!)){
      this.loginService.loadUser();
      this.router.navigate(["/todo"]);
    }

  }
}
