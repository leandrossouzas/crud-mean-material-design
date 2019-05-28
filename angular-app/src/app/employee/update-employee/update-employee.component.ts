import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Employee } from '../../shared/employee';
import { EmployeeService } from '../../shared/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {

  updateEmployeeForm: FormGroup;
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<UpdateEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private employeeService: EmployeeService
  ) {

  }

  ngOnInit() {
    this.updateEmployeeForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      position: ['', [Validators.required]],
      office: ['', [Validators.required]],
      salary: [null, [Validators.required]]
    });

  }

  onSubmit() {
    this.isLoading = true;
    let employee: Employee = {
      ...this.updateEmployeeForm.value
    };

    this.employeeService.updateEmployee(employee)
      .subscribe(
        (employee) => {
          console.log(employee);
          this.snackBar.open('Employee Created', 'OK', { duration: 4000 });
          this.dialogRef.close(employee);
          this.isLoading = true;
        },
        (err) => {
          console.log(err);
          this.snackBar.open('Ops, an error has ocurred', 'OK', { duration: 4000 });
          this.dialogRef.close();
          this.isLoading = true;
        }
      );
  }

}