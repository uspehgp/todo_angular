import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from "@angular/common";

@Pipe({
    name: 'taskDate'
})
export class TaskDatePipe implements PipeTransform {

    transform(date: Date | string, format = 'mediumDate'): string {
        if (date == null) return 'Без срока';

        date = new Date(date);

        const currentDate = new Date().getDate();

        if (date.getDate() === currentDate) return 'Сегодня'
        if (date.getDate() === currentDate + 1) return 'Завтра'
        if (date.getDate() === currentDate - 1) return 'Вчера'

        return new DatePipe('ru-Ru').transform(date, format);
    }

}
