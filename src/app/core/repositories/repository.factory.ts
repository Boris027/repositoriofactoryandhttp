import { FactoryProvider } from "@angular/core";
import { GETVALUEFROM, REPOSITORYPEOPLE_TOKEN, URLAPI } from "./repository.token";
import { BaseRepository } from "./impl/base-repository-localstorage.service";
import { Person } from "../models/person.model";
import { IBaseRepository } from "./interfaces/base-repository.interface";
import { HttpClient } from "@angular/common/http";
import { BaseRepositoryHTTP } from "./impl/base-repository-httpstorage.service";

function createlocalstorageservice(getvaluefrom:string):IBaseRepository<Person>{
    return new BaseRepository<Person>(getvaluefrom)
}

function createhttpstorage(getvaluefrom:string,http:HttpClient,urlapi:string):IBaseRepository<Person>{
    return new BaseRepositoryHTTP<Person>(getvaluefrom,http,urlapi)
}



export const repositoryProvider:FactoryProvider={
    provide: REPOSITORYPEOPLE_TOKEN,
    deps:[GETVALUEFROM,HttpClient,URLAPI],
    useFactory: (getvaluefrom:string,http:HttpClient,urlapi:string)=>{
        
        //para que el httpfuncione tiene que estar la api habilitada
        const usehttp=false
        return usehttp? createhttpstorage(getvaluefrom,http,urlapi): createlocalstorageservice(getvaluefrom)
    }
}