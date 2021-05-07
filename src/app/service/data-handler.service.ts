import {Injectable} from '@angular/core';
import {Category} from "../model/Category";
import {Task} from "../model/Task";
import {TaskDAOArray} from "../data/dao/impl/TaskDAOArray";
import {CategoryDAOArray} from "../data/dao/impl/CategoryDAOArray";
import {Priority} from "../model/Priority";
import {PriorityDAOArray} from "../data/dao/impl/PriorityDAOArray";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DataHandlerService {

    private taskDaoArray = new TaskDAOArray();

    categoryDAOArray = new CategoryDAOArray();

    priorityDAOArray = new PriorityDAOArray();

    constructor() {
    }

    getAllTasks(): Observable<Task[]> {
        return this.taskDaoArray.getAll();
    }

    getAllCategories(): Observable<Category[]> {
        return this.categoryDAOArray.getAll();
    }

    getAllPriorities(): Observable<Priority[]> {
        return this.priorityDAOArray.getAll();

    }


    searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
        return this.taskDaoArray.search(category, searchText, status, priority);
    }

    updateTask(task: Task): Observable<Task> {
        console.log("at updateTask");
        return this.taskDaoArray.update(task);
    }


    deleteTask(id: number): Observable<Task> {
        return this.taskDaoArray.delete(id);
    }

    // updateTaskCompleted(task: Task) {
    //     return this.taskDaoArray.updateCompleted(task)
    // }
}
