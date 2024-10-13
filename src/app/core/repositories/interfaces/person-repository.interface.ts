import { Person } from "../../models/person.model";
import { IBaseRepository } from "./base-repository.interface";

export interface IPersonRepository extends IBaseRepository<Person>{

}