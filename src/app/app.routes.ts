import { Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { LoginComponent } from './login/login.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';


export const routes: Routes = [
    {
        title: "Login",
        path: "",
        component: LoginComponent
    },
    {
        title: "Todo List",
        path: "todo",
        component: TodoComponent
    },
    {
        title: "Settings",
        path: "settings",
        component: SettingsPageComponent
    }
];
