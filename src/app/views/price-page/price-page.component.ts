import { Component, OnInit } from '@angular/core';
import { PriceService} from 'src/app/shared/services/price.service'

@Component({
  selector: 'app-price-page',
  templateUrl: './price-page.component.html',
  styleUrls: ['./price-page.component.scss']
})
export class PricePageComponent implements OnInit {

  data:any
  constructor(private priceService:PriceService) { }

  ngOnInit(): void {
    this.getAllPrizes()
  }

  getAllPrizes(){
    this.priceService.getAllPrice().subscribe((result)=>{
      this.data = result;
      console.log(this.data)
    })
  }

}
