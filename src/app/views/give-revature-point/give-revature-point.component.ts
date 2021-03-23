import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-give-revature-point',
  templateUrl: './give-revature-point.component.html',
  styleUrls: ['./give-revature-point.component.scss']
})
export class GiveRevaturePointComponent implements OnInit {

  actionType: string = 'Give away';
  constructor() { }

  ngOnInit(): void {
  }

  action(e:any) {
    console.log(e);
  }
}
