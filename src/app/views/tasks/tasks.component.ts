import {Component, OnInit} from '@angular/core';
import {Task} from 'src/app/model/Task';
import {DataHandlerService} from "../../service/data-handler.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

    tasks: Task[];
    displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];
    dataSource: MatTableDataSource<Task>; // контейнер - источник данных для таблицы

    constructor(private dataHandler: DataHandlerService) {
    }

    ngOnInit() {
        this.dataHandler.taskSubject.subscribe(tasks => this.tasks = tasks);

        // датасорс обязательно нужно создавать для таблицы, в него присваивается любой источник (БД, массивы, JSON и пр.)
        this.dataSource = new MatTableDataSource();

        this.refreshTable();
    }

    toggleTaskCompleted(task: Task) {
        task.completed = !task.completed;
    }

    getPriorityColor(task: Task) {

        if (task.completed) {
            return '#F8F9FA';
        }

        if (task.priority && task.priority.color) {
            return task.priority.color;
        }

        return '#fff';

    }

    private refreshTable() {
        this.dataSource.data = this.tasks; // обновить источник данных (т.к. данные массива tasks обновились)
    }
}
