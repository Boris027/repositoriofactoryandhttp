import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleCardComponent } from './components/people-card/people-card.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [PeopleCardComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[PeopleCardComponent]
})
export class SharedmoduleModule { }
