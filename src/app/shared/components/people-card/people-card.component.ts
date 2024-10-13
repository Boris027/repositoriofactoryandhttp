import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PeopleService } from 'src/app/core/services/impl/people.service';

@Component({
  selector: 'app-people-card',
  templateUrl: './people-card.component.html',
  styleUrls: ['./people-card.component.scss'],
})
export class PeopleCardComponent  implements OnInit {

  @Input() name:string=""
  @Input() surname:string=""
  @Input() age:string=""
  @Input() id:string=""
  @Output() newItemEvent=new EventEmitter<string>()

  constructor(private service:PeopleService) { }

  ngOnInit() {}

  delete(){
    //this.newItemEvent.emit(this.id)
    this.service.delete(this.id)
  }

}
