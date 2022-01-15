import { PersonType as Person } from "./person";
export interface EmployeeType{
  email:string;
  password:string; 
  Person: Person;
}