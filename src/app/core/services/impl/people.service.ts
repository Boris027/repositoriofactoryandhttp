import { Inject, Injectable } from "@angular/core";
import { Person } from "../../models/person.model";
import { BaseService } from "./base.service";
import { REPOSITORYPEOPLE_TOKEN } from "../../repositories/repository.token";
import { IBaseRepository } from "../../repositories/interfaces/base-repository.interface";


@Injectable({
    providedIn:'root'
})
export class PeopleService extends BaseService<Person>{
    constructor(
        @Inject(REPOSITORYPEOPLE_TOKEN) repository:IBaseRepository<Person>
    ){
        super(repository)
    }
}