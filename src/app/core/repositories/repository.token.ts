import { InjectionToken } from "@angular/core";
import { IBaseRepository } from "./interfaces/base-repository.interface";
import { Person } from "../models/person.model";


export const REPOSITORYPEOPLE_TOKEN=new InjectionToken<IBaseRepository<Person>>('REPOSITORY_TOKEN')
export const GETVALUEFROM=new InjectionToken<string>("GETVALUEFROM")
export const URLAPI=new InjectionToken<string>("URLAPI")