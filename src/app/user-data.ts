import { TodoData } from "./todo-data";

export interface UserData {
    id:number;
    name:string;
    pass:string;
    todoList:TodoData[];
}
