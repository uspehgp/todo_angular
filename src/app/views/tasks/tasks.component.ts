import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Task} from 'src/app/model/Task';
import {DataHandlerService} from "../../service/data-handler.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, AfterViewInit {

    tasks: Task[];
    displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];
    dataSource: MatTableDataSource<Task>; // контейнер - источник данных для таблицы

    // ссылки на компоненты таблицы
    @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) private sort: MatSort;

    constructor(private dataHandler: DataHandlerService) {
    }

    ngOnInit() {
        this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);

        // датасорс обязательно нужно создавать для таблицы, в него присваивается любой источник (БД, массивы, JSON и пр.)
        this.dataSource = new MatTableDataSource();

        this.refreshTable();
    }

    // в этом методе уже все проинциализировано, поэтому можно присваивать объекты (иначе может быть ошибка undefined)
    ngAfterViewInit(): void {

        this.addTableObjects();

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

    // показывает задачи с применением всех текущий условий (категория, поиск, фильтры и пр.)
    private refreshTable() {

        this.dataSource.data = this.tasks; // обновить источник данных (т.к. данные массива tasks обновились)

        this.addTableObjects();


        // когда получаем новые данные..
        // чтобы можно было сортировать по столбцам "категория" и "приоритет", т.к. там не примитивные типы, а объекты
        // @ts-ignore - показывает ошибку для типа даты, но так работает, т.к. можно возвращать любой тип
        this.dataSource.sortingDataAccessor = (task, colName) => {

            // по каким полям выполнять сортировку для каждого столбца
            switch (colName) {
                case 'priority': {
                    return task.priority ? task.priority.id : null;
                }
                case 'category': {
                    return task.category ? task.category.title : null;
                }
                case 'date': {
                    return task.date ? task.date : null;
                }

                case 'title': {
                    return task.title;
                }
            }
        };

    }

    private addTableObjects() {
        this.dataSource.sort = this.sort; // компонент для сортировки данных (если необходимо)
        this.dataSource.paginator = this.paginator; // обновить компонент постраничности (кол-во записей, страниц)
    }


}
