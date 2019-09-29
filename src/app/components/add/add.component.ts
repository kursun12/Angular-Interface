import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  showForm: boolean;     //variabel

  @Output() addEvt = new EventEmitter();

  toggleAptDisplay() {   //methode
    this.showForm = !this.showForm;   //if true go to false, if false go to true
  }

  handleAdd(formInfo: any) {
    const tempItem : object = {
      petName: formInfo.petName,
      ownerName: formInfo.ownerName,
      aptDate: formInfo.aptDate + ' ' + formInfo.aptTime,
      aptNotes: formInfo.aptNotes,
    };

    this.addEvt.emit(tempItem);
    this.showForm = !this.showForm;

  }

  constructor() {
    this.showForm = true;
   }

  ngOnInit() {
  }

}
