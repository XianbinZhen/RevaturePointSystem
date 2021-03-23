import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/shared/models/employee';
import { TrainerService } from 'src/app/shared/services/trainer.service';

@Component({
  selector: 'app-give-revature-point',
  templateUrl: './give-revature-point.component.html',
  styleUrls: ['./give-revature-point.component.scss'],
})
export class GiveRevaturePointComponent implements OnInit {
  amount: number = 100;
  changeValue = false;

  actionType: string = 'Give away';
  constructor(private trainerService: TrainerService,
    private router: Router) {}

  ngOnInit(): void {}

  action(e: any) {

    this.trainerService.getEmployeeById(e).subscribe((res) => {
      let employee: Employee = res;
      employee.allTimeRevaPoints += this.amount;
      employee.currentRevaPoints += this.amount;
      this.trainerService.updateEmployee(employee).subscribe((res) => {
        console.log(res);
        // this.router.navigate(['/trainer/leaderboard']);
        this.changeValue = !this.changeValue;
      }, error => {
        console.log(error);
      });
    }, error => {
      console.log(error);
    });
  }
  
}
