import { Component } from '@angular/core';
import { PeopleService } from '../core/services/impl/people.service';
import { IonInput } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Person } from '../core/models/person.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private peopleservice:PeopleService) {
    peopleservice.getAll()
  }

  getall():Observable<Person[]>{
    return this.peopleservice.getAll()
  }


  adduser(name:IonInput,surname:IonInput,age:IonInput){
    let finalname=name.value+""
    let finalsurname=surname.value+""
    let finalage=parseInt(age.value+"")
    this.peopleservice.create({name:finalname,surname:finalsurname,age:finalage})
    name.value=""
    surname.value=""
    age.value=""
  }

}
