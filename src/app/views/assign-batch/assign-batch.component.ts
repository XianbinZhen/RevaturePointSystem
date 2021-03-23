import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/shared/models/employee';
import { TrainerService } from 'src/app/shared/services/trainer.service';

@Component({
  selector: 'app-assign-batch',
  templateUrl: './assign-batch.component.html',
  styleUrls: ['./assign-batch.component.scss']
})
export class AssignBatchComponent implements OnInit {
  batchId: number = 1;
  changeValue = false;

  actionType: string = 'Assign';

  constructor(private trainerService: TrainerService) { }

  ngOnInit(): void {
  }

  action(e: any) {

    this.trainerService.getEmployeeById(e).subscribe((res) => {
      let employee: Employee = res;
      employee.batchId = this.batchId;
      this.trainerService.updateEmployee(employee).subscribe((res) => {
        this.changeValue = !this.changeValue;
      }, error => {
        console.log(error);
      });
    }, error => {
      console.log(error);
    });
  }

}
