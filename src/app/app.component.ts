import {Component, OnInit} from '@angular/core';
import {Task} from './model/Task';
import {DataHandlerService} from "./service/data-handler.service";
import {Category} from "./model/Category";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styles: []
})
export class AppComponent implements OnInit {
    title = 'Todo';
    tasks: Task[];
    categories: Category[];
    selectedCategory: Category = null;
    completed: Task;

    constructor(public dataHandler: DataHandlerService) {
    }

    ngOnInit(): void {
        // this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
        this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
        this.onSelectCategory(null);
    }

    onSelectCategory(category: Category) {

        this.selectedCategory = category;

        this.dataHandler.searchTasks(this.selectedCategory, null, null, null)
            .subscribe(tasks => {
                this.tasks = tasks
            });
    }

    onUpdateTask(task: Task) {
        console.log("at onUpdateTask");
        this.dataHandler.updateTask(task).subscribe(() => {
            this.dataHandler.searchTasks(this.selectedCategory, null, null, null)
                .subscribe(tasks => {
                    this.tasks = tasks
                });
        })

    }

    onDeleteTask(task: Task) {
        console.log("at onDeleteTask");
        this.dataHandler.deleteTask(task.id).subscribe(() => {
            this.dataHandler.searchTasks(this.selectedCategory, null, null, null)
                .subscribe(tasks => {
                    this.tasks = tasks
                });
        })
    }
}
