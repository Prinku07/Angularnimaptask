import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor() { }

  country(){
    return [
      { id: 1,  name: "India"  },
      {id: 2, name: "USA"},
      {id: 3, name: "UK"}
    ]
  }

  state(){
    return [
      {   id: 1,  name: "Gujarat" }, {  id: 1, name: "Maharashtra", },  {id: 1, name: "Goa" },
      { id: 2, name: "New york" }, { id: 2,  name:"Las Vegas"}, { id: 2, name:  "Washington" },
      { id: 3, name: "London" }, { id: 3,  name :"England"}, { id: 3, name: " France" }
    ]
  }
}
