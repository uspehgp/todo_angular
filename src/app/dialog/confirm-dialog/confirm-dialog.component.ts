import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
    dialogTitle: string;
    massage: string;

    constructor(
        private dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data: { dialogTitle: string, massage: string }) {
        this.dialogTitle = data.dialogTitle;
        this.massage = data.massage
    }

    ngOnInit(): void {
    }

    onConfirm(): void {
        this.dialogRef.close(true);
    }

    onCancel() {
        this.dialogRef.close(false);
    }

}
