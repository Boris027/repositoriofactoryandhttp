import { Observable } from "rxjs";
import { IBaseService } from "../interfaces/base-service.interface";
import { Model } from "../../models/base.model";
import { Inject, Injectable } from "@angular/core";
import { REPOSITORYPEOPLE_TOKEN } from "../../repositories/repository.token";
import { IBaseRepository } from "../../repositories/interfaces/base-repository.interface";
import { Person } from "../../models/person.model";


@Injectable({
    providedIn:'root'
})
export class BaseService<T extends Model> implements IBaseService<T>{
    constructor(
        @Inject(REPOSITORYPEOPLE_TOKEN) protected repository:IBaseRepository<T>
    ){}


    create(value: T): Observable<T> {
        return this.repository.create(value)
    }

    getAll(): Observable<T[]> {
        return this.repository.getAll()
    }
    getOne(id: string): Observable<T> {
        return this.repository.getOne(id)
    }
    delete(id: string): Observable<T> {
        return this.repository.delete(id)
    }
    update(id: string, value: T): Observable<T> {
        return this.repository.update(id,value)
    }
    
    

}