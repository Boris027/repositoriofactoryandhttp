import { Observable } from "rxjs";
import { Model } from "../../models/base.model";
export interface IBaseService<T>{
    getAll():Observable<T[]>
    create(value:T):Observable<T>
    getOne(id:string):Observable<T>
    delete(id:string):Observable<T>
    update(id:string, value:T):Observable<T>
    
}