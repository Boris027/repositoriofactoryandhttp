import { BehaviorSubject, Observable, of } from "rxjs";
import { Model } from "../../models/base.model";
import { IBaseRepository } from "../interfaces/base-repository.interface";
import { Inject, Injectable } from "@angular/core";
import { GETVALUEFROM } from "../repository.token";

@Injectable({
    providedIn:'root'
})

export class BaseRepository<T extends Model> implements IBaseRepository<T>{

    constructor(
        @Inject(GETVALUEFROM) protected getvaluefrom:string
    ){
        console.log("localstorage")
        let data=localStorage.getItem(getvaluefrom)
        if(data!=null){
            this._data.next(JSON.parse(data))
        }
        
    }
    

    private _data:BehaviorSubject<T[]> = new BehaviorSubject<T[]>([])
    public $data:Observable<T[]> =this._data.asObservable()

    getAll(): Observable<T[]> {
        return this.$data
    }
    getOne(id: string): Observable<T> {
        let array=this._data.getValue()
        let value=array.find(c=>c.id==id)
        return of(value!!)
    }

    create(value: T): Observable<T> {
        let array=this._data.getValue()
        value.id=(array.length>0)? parseInt(array[array.length-1].id!!)+1+"" :0+""
        array.push(value)
        this._data.next(array)
        localStorage.setItem(this.getvaluefrom,JSON.stringify(array))
        return of(value)
    }

    delete(id: string): Observable<T> {
        let array=this._data.getValue()
        let index=array.findIndex(c=>c.id==id)
        let returnxd=array[index]
        array.splice(index,1)
        this._data.next(array)
        localStorage.setItem(this.getvaluefrom,JSON.stringify(array))
        return of(returnxd)
    }

    update(id: string, value: T): Observable<T> {
        let array=this._data.getValue()
        let index=array.findIndex(c=>c.id==id)
        array[index]=value
        this._data.next(array)
        localStorage.setItem(this.getvaluefrom,JSON.stringify(array))
        return of(value)
    }
    
}