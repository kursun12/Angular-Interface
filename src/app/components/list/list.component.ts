import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @Input() aptList;
  @Output() deleteEvent = new EventEmitter();
  @Output() updateEVT = new EventEmitter();

  handleDelete(theApt: object) {  // method/event
    console.log(theApt);
    this.deleteEvent.emit(theApt);
  }

  handleUpdate(theApt: object, labelName: string, newValue: string) {
    this.updateEVT.emit({
      theApt: theApt,
      labelName: labelName,
      newValue: newValue
    })
  }
}
