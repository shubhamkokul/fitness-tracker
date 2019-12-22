import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-current-training-dialog',
  templateUrl: './current-training-dialog.component.html',
  styleUrls: ['./current-training-dialog.component.scss']
})
export class CurrentTrainingDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {
  }

  ngOnInit() {
  }

}
