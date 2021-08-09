import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/app.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  SearchProductList=[];
  isItemAvailable: boolean;
  SearchProductListResult=[];

  constructor(private apiService:ApiService) { }

  ngOnInit() {
    
  }
  ionViewWillEnter(){
    this.getBuilding();
  }
  getItems(ev: any) {
    this.getBuilding();
    var val = ev.target.value;
    if (val && val.trim() !== '') {
      this.SearchProductListResult=[];
        this.isItemAvailable = true;
        this.SearchProductList.filter(item => 
         
         { 
            if(item.building.toString().toLowerCase().indexOf(val.toString().toLowerCase()) > -1){
              this.SearchProductListResult.push(item);
            }
            });
    } else {
        this.isItemAvailable = false;
    }
}
  getBuilding(){
    this.apiService.getBuildings().subscribe(datas=>{
      this.SearchProductList = datas;
    })
  }
  clearsearch(){
    this.SearchProductListResult=[];
  }
}

