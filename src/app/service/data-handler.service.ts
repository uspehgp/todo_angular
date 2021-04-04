import {Injectable} from '@angular/core';
import {Category} from "../model/Category";
import {TestData} from "../data/TestData";
import {Task} from "../model/Task";
import {BehaviorSubject, Observable} from "rxjs";
import {TaskDAOArray} from "../data/dao/impl/TaskDAOArray";
import {CategoryDAOArray} from "../data/dao/impl/CategoryDAOArray";
import {Priority} from "../model/Priority";

@Injectable({
    providedIn: 'root'
})
export class DataHandlerService {

    taskSubject = new BehaviorSubject<Task[]>(TestData.tasks);

    categorySubject = new BehaviorSubject<Category[]>(TestData.categories);

    taskDaoArray = new TaskDAOArray();

    categoryDAOArray= new CategoryDAOArray();

    constructor() {
    }

    getAllTasks(): Observable<Task[]> {
        return this.taskDaoArray.getAll();
    }

    getAllCategories(): Observable<Category[]>{
        return this.categoryDAOArray.getAll();
    }

    searchTasks(category:Category, searchText: string, status:boolean, priority: Priority):Observable<Task[]>{
        return this.taskDaoArray.search(category,searchText,status,priority);
    }

    updateTask (task: Task): Observable<Task>{
        return this.taskDaoArray.update(task);
    }


}
