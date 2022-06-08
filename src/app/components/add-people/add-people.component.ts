import { Component, OnInit } from '@angular/core';
import { People } from 'src/app/model/people';
import { PeopleService } from 'src/app/services/people.service';

@Component({
  selector: 'app-add-people',
  templateUrl: './add-people.component.html',
  styleUrls: ['./add-people.component.css']
})
export class AddPeopleComponent implements OnInit {

  people = new People();
  submitted = false;
  msgError = '';

  constructor(private peopleService: PeopleService) { 
    
  }

  ngOnInit(): void {
  }

  existsPK (val:string): void {
    this.peopleService.get(val)
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  savePeople(): void {
    const data = {
      id: this.people.id,
      name: this.people.name,
      surname: this.people.surname,
      age: this.people.age,
      country: this.people.country,
      email: this.people.email
    };

    this.peopleService.create(data)
      .subscribe(
        data => {
          this.submitted=true;
          console.log(data);
        },
        error => {
          this.msgError  = error.message +' \n '+ error.error.message;
          console.log(error);
        });
  }

  newPeople() {
    this.submitted = false;
    this.people.id = null;
    this.people.name = null;
    this.people.surname = null;
    this.people.age = null;
    this.people.country = null;
    this.people.email = null;
  }

}