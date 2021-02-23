import {Injectable} from '@angular/core';
import {Category} from "../model/Category";
import {TestData} from "../data/TestData";
import {Task} from "../model/Task";
import {BehaviorSubject, Observable} from "rxjs";
import {TaskDAOArray} from "../data/dao/impl/TaskDAOArray";

@Injectable({
    providedIn: 'root'
})
export class DataHandlerService {

    taskSubject = new BehaviorSubject<Task[]>(TestData.tasks);

    categorySubject = new BehaviorSubject<Category[]>(TestData.categories);

    taskDaoArray = new TaskDAOArray();

    constructor() {
    }

    getAllTasks(): Observable<Task[]> {
        return this.taskDaoArray.getAll();
    }

    // getCategories(): Category[] {
    //     return TestData.categories;
    // }

    fillTasks() {
        this.taskSubject.next(TestData.tasks);
    }

    fillTasksByCategory(category: Category) {
        const tasks = TestData.tasks.filter(task => task.category === category);
        this.taskSubject.next(tasks);
    }
}
