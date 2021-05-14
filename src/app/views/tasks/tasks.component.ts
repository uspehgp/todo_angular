import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {Task} from 'src/app/model/Task';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {EditTaskDialogComponent} from "../../dialog/edit-task-dialog/edit-task-dialog.component";
import {ConfirmDialogComponent} from "../../dialog/confirm-dialog/confirm-dialog.component";

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {


    // поля для таблицы (те, что отображают данные из задачи - должны совпадать с названиями переменных класса)
    displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category', 'operations','select'];
    dataSource: MatTableDataSource<Task>; // контейнер - источник данных для таблицы

    // ссылки на компоненты таблицы
    @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) private sort: MatSort;

    @Output()
    updateTask = new EventEmitter<Task>();

    @Output()
    deleteTask = new EventEmitter<Task>();

    tasks: Task[];

    @Input('tasks')
    private set setTasks(tasks: Task[]) {
        this.tasks = tasks;
        this.fillTable()
    }

    @Output()
    selectTask = new EventEmitter<Task>();

    constructor(private dataHandler: DataHandlerService,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        //this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);

        // датасорс обязательно нужно создавать для таблицы, в него присваивается любой источник (БД, массивы, JSON и пр.)
        this.dataSource = new MatTableDataSource();

        this.fillTable();
    }

    // в этом методе уже все проинциализировано, поэтому можно присваивать объекты (иначе может быть ошибка undefined)
    // ngAfterViewInit(): void {
    //     this.addTableObjects();
    // }

    // в зависимости от статуса задачи - вернуть цвет названия
    getPriorityColor(task: Task) {

        // цвет завершенной задачи
        if (task.completed) {
            return '#F8F9FA'; // TODO вынести цвета в константы (magic strings, magic numbers)
        }

        if (task.priority && task.priority.color) {
            return task.priority.color;
        }

        return '#fff'; // TODO вынести цвета в константы (magic strings, magic numbers)

    }

    // показывает задачи с применением всех текущий условий (категория, поиск, фильтры и пр.)
    private fillTable() {

        if (!this.dataSource) {
            return;
        }

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

    openEditTaskDialog(task: Task): void {

        const dialogRef = this.dialog.open(EditTaskDialogComponent, {
            data: [task, 'Редактирование задачи'],
            autoFocus: false
        });
        dialogRef.afterClosed().subscribe(result => {

            if (result as Task) {
                this.updateTask.emit(task);
                return;
            }

            if (result === 'delete') {
                this.deleteTask.emit(task);
                return;

            }

            if (result === 'complete') {
                task.completed = true;
                this.updateTask.emit(task);
                return;
            }

            if (result === 'activate') {
                task.completed = false;
                this.updateTask.emit(task);
                return;
            }

        })
    }

    // диалоговое окно подтверждения удаления
    openDeleteDialog(task: Task) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '500px',
            data: {dialogTitle: 'Подтвердите действие', message: `Вы действительно хотите удалить задачу: "${task.title}"?`},
            autoFocus: false
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) { // если нажали ОК
                this.deleteTask.emit(task);
            }
        });
    }

    onToggleStatus(task) {
        task.completed=!task.completed;
        this.updateTask.emit(task);
    }
}
