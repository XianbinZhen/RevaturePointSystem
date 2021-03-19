import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { AssociateService } from 'src/app/shared/services/associate.service';

@Component({
  selector: 'app-leaderboard-page',
  templateUrl: './leaderboard-page.component.html',
  styleUrls: ['./leaderboard-page.component.scss']
})
export class LeaderboardPageComponent implements OnInit {

  data: any;

  constructor(private associates: AssociateService) { }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  async getAllEmployees(){
    this.associates.getAllAssociates().subscribe((result)=>{
      this.data = result;
      this.data.sort((a:any, b:any) =>
        parseInt(b.allTimeRevaPoints) - parseInt(a.allTimeRevaPoints)
    );
    })
  }
}