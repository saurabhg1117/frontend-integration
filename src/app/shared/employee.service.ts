import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  selectedEmployee!: Employee;
  employees!: Employee[];

  url:string = "http://localhost:8090/employees";
  constructor(private http: HttpClient) { }

  postEmployee(emp : Employee)
  {
    return this.http.post(this.url,emp)
  }

  getAllEmployees(){
    return this.http.get(this.url);
  }

  putEmployee(emp:Employee){
    return this.http.put(this.url,emp);
  }

  deleteEmployee(id:number){
    return this.http.delete(this.url+"/"+id);
  }
}
