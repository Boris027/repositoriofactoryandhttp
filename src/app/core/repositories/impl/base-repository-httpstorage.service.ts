import { BehaviorSubject, Observable, of } from "rxjs";
import { Model } from "../../models/base.model";
import { IBaseRepository } from "../interfaces/base-repository.interface";
import { Inject, Injectable } from "@angular/core";
import { GETVALUEFROM, URLAPI } from "../repository.token";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn:'root'
})

export class BaseRepositoryHTTP<T extends Model> implements IBaseRepository<T>{

    constructor(
        @Inject(GETVALUEFROM) protected getvaluefrom:string,
        private httpclient:HttpClient,
        @Inject(URLAPI) protected urlapi:string
    ){
        console.log("http")
        this.fetchData()
    }
    

    private _data:BehaviorSubject<T[]> = new BehaviorSubject<T[]>([])
    public $data:Observable<T[]> =this._data.asObservable()

    private fetchData(): void {
        this.httpclient.get<T[]>(this.urlapi).subscribe({
            next: (data) => {
                console.log("Data received:", data);
                this._data.next(data); // Emitir los datos recibidos
            },
            error: (err) => {
                console.error("Error: La API no está operativa", err); // Imprimir el error
            }
        });
    }

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
        let body:string=JSON.stringify(value)
        
        console.log(body)
        this.httpclient.post(this.urlapi,body).subscribe({
            next:(value)=>{
                return of(value)
            },
            error:(err)=>{
                console.error("error al subir los datos al servidor")
            }
        })
        return of(value)
    }

    delete(id: string): Observable<T> {
        let array=this._data.getValue()
        let index=array.findIndex(c=>c.id==id)
        let returnxd=array[index]
        array.splice(index,1)
        this._data.next(array)
        this.httpclient.delete(this.urlapi+`/${id}`).subscribe({
            next:(value)=>{

                return of(returnxd)
            },
            error:(err)=>{
                console.error("error al eliminar el usuario")
            }
        })
        return of(returnxd)
    }

    update(id: string, value: T): Observable<T> {
        let array=this._data.getValue()
        let index=array.findIndex(c=>c.id==id)
        array[index]=value
        this._data.next(array)
        this.httpclient.put(this.urlapi+`/${id}`,JSON.stringify(value)).subscribe({
            next:(value)=>{

                return of(value)
            },
            error:(err)=>{
                console.error("error al eliminar el usuario")
            }
        })
        return of(value)
    }
    
}