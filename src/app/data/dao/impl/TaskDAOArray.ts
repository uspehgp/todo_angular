import {TaskDAO} from "../interface/TaskDAO";
import {Category} from "../../../model/Category";
import {Observable, of} from "rxjs";
import {Priority} from "../../../model/Priority";
import {Task} from 'src/app/model/Task';
import {TestData} from "../../TestData";
import {filter} from "rxjs/operators";

export class TaskDAOArray implements TaskDAO {


    getAll(): Observable<Task[]> {
        return of(TestData.tasks);
    }

    get(id: number): Observable<Task> {
        return undefined;
    }


    add(T): Observable<Task> {
        return undefined;
    }

    getCompletedCountInCategory(category: Category): Observable<number> {
        return undefined;
    }

    getTotalCount(): Observable<number> {
        return undefined;
    }

    getTotalCountInCategory(category: Category): Observable<number> {
        return undefined;
    }

    getUncompletedCountInCategory(category: Category): Observable<number> {
        return undefined;
    }

    search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
        return of(this.searchTodos(category, searchText, status, priority));
    }

    private searchTodos(category: Category, searchText: string, status: boolean, priority: Priority): Task[] {
        let allTasks = TestData.tasks;
        if (category != null) {
            allTasks = allTasks.filter(todo => todo.category === category)
        }
        return allTasks;

    }

    update(task: Task): Observable<Task> {
        const taskTmp = TestData.tasks.find(t => t.id === task.id);
        TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1, task);
        return of(task);
    }

    delete(id: number): Observable<Task> {
        const taskTmp = TestData.tasks.find(t => t.id === id);
        TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1);
        return of(taskTmp);
    }

    updateCompleted(task: Task) {
        const taskTmp = TestData.tasks.find(t => t.id === task.id);
        task.completed=!taskTmp.completed;
        TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1, task);
        return (task);
    }
}
