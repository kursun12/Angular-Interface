import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faPlus} from '@fortawesome/free-solid-svg-icons';
import { without, findIndex } from 'lodash';

library.add(faTimes, faPlus);


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {  //variabels worden hier gedeclareerd
  title = 'Wisdom Pet Medicine';
  theList: object[];
  modiefiedList: object[];
  orderBy: string;
  orderType: string;
  lastIndex: number;

  //methdoes hieronder

  deleteApt(theApt: object) {
    this.theList = without(this.theList, theApt);
    this.modiefiedList = without(this.modiefiedList, theApt);
  }

  addApt(theApt: any) {
    theApt.aptId = this.lastIndex;
    this.theList.unshift(theApt);
    this.modiefiedList.unshift(theApt);
    this.lastIndex++;
  }

  updateApt(aptInfo) {
    let aptIndex: number;
    let modifiedIndex: number;

    aptIndex = findIndex(this.theList, { aptId: aptInfo.theApt.aptId})
    modifiedIndex = findIndex(this.modiefiedList, { aptId: aptInfo.theApt.aptId})

    this.theList[aptIndex][aptInfo.labelname] = aptInfo.newValue;
    this.modiefiedList[aptIndex][aptInfo.labelname] = aptInfo.newValue;
  }

  searchApt(theQuery: string) {
    this.modiefiedList = this.theList.filter(eachItem => {
      return (
        eachItem['petName'].toLowerCase().includes(theQuery.toLowerCase()) ||
        eachItem['ownerName'].toLowerCase().includes(theQuery.toLowerCase()) ||
        eachItem['aptNotes'].toLowerCase().includes(theQuery.toLowerCase()) 
      );
    });

    this.sortItems();
  }

  sortItems() { //weird working sorting method alghorityhm

    let order: number;

    if (this.orderType === 'asc') {
      order =1;
    }
    else {
     order = -1;
    }

    this.modiefiedList.sort((a,b) => {
      if(a[this.orderBy].toLowerCase() < b[this.orderBy].toLowerCase()) {
        return -1 * order;
      }
      if (a[this.orderBy].toLowerCase() > b[this.orderBy].toLowerCase()) {
        return 1 * order;
      }
    });
  }

  orderApt(orderObj) {
    
    this.orderBy = orderObj.orderBy;
    this.orderType = orderObj.orderType;

    this.sortItems();
  }

  constructor(private http: HttpClient) {
    this.orderBy = 'petName';
    this.orderType = 'asc';
    
  }

  ngOnInit(): void {
    this.lastIndex = 0;
    this.http.get<Object[]>('../assets/data.json').subscribe(data => {
      this.theList = data.map((item: any) => {
        item.aptId = this.lastIndex++;
        return item;
      });

      this.modiefiedList = data;

      this.sortItems();
    });
  }
}