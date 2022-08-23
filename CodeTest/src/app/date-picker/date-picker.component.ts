import {Component, EventEmitter, Output} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {DateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})

export class DatePickerComponent{
  @Output() public found = new EventEmitter<any>();
//when ever data picker is clicked emit the new Date.
  constructor() {
    this.range.valueChanges.subscribe(x => {
      if(x.start !== null && x.end !== null){
        this.found.emit(x);
      }
    })
  }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
}
