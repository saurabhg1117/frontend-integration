import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {

  update:boolean=false;
  constructor(public es : EmployeeService) { }

  ngOnInit(): void {
    this.resetForm();
   
  }

  onSubmit(form: NgForm)
  {
    console.log(form.value)
    if(!this.update){
    
    this.es.postEmployee(form.value).subscribe((res)=>{
      this.resetForm(form);
      console.log("Employee record inserted successfully")
    })
  }
  else{
      this.es.putEmployee(form.value).subscribe((res)=>{
        this.resetForm(form);
        console.log("Employee record updated successfully")
        this.update=false
      })
  }
  }

  resetForm(form?:NgForm){
    if(form){
      form.reset();
    }
    this.es.selectedEmployee={
      eid:0,
      name:"",
      age:0,
      salary:0,
      designation:""
    }
    this.refreshEmployees();
  }

  refreshEmployees(){
    this.es.getAllEmployees().subscribe((res)=>{
      this.es.employees = res as Employee[];
    })
  }

  updateEmp(emp:Employee)
  {
    this.es.selectedEmployee=emp;
    this.update=true;
  }

  deleteEmp(id:number){
    if(confirm("Do you really want to delete")){
      this.es.deleteEmployee(id).subscribe((resp)=>{
        this.resetForm();
      })
    }
  }

}
