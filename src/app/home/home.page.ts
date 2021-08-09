import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { FilterPopOverComponent } from '../components/filter-pop-over/filter-pop-over.component';
import { ApiService } from '../services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  BuildingDetails: any;
  Buildings = [];
  StoredBuildings;
  data: any;
  storedRatedBuildings: any;
  BuildingDetailslength: any;
  BuildingDetailsId: any[];
  length: any;
  constructor(private apiService: ApiService, private popoverController: PopoverController, private activatedRoute:ActivatedRoute) { 
    
  }
  ngOnInit() {
    
 
  }
  ionViewWillEnter() {
    this.activatedRoute.queryParams.subscribe(params=>{
      this.StoredBuildings = localStorage.getItem('Buildings');
      if(this.data?.data?.length>0){
        console.log(this.data?.data)
  this.BuildingDetails = this.data;
      }else{
        this.getBuildings();
      }
    });
   
  }
  async filterPopover(ev: any) {
    const filterPopover = await this.popoverController.create({
      component: FilterPopOverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await filterPopover.present();

    filterPopover.onDidDismiss()
    .then((data) => {
        console.log(data.data);
        this.data = data;
        this.BuildingDetails = this.data.data;
     
    });
    const { role } = await filterPopover.onDidDismiss();
    if(role=='backdrop'){
      this.getBuildings();
    }
    console.log('onDidDismiss resolved with role', role);
  }
  putstar(i, status) {
    console.log(i, status);
    if (status) {
      this.BuildingDetails[i].isselect = status;
      console.log(this.BuildingDetails[i]);
      this.Buildings.push(this.BuildingDetails[i]);
      localStorage.setItem("BuildingDetails", JSON.stringify(this.Buildings));
    }
  }
  getBuildings() {
    this.apiService.getBuildings().subscribe(datas => {
      console.log(datas);
      this.BuildingDetails = datas;
      this.data=[];
//       this.storedRatedBuildings=localStorage.getItem("BuildingDetails");
//       for(let i=0;i<this.BuildingDetails.length;i++){
//         console.log(this.BuildingDetails.length);
//         for(let j=0;j<100;j++){
//           console.log(this.BuildingDetails[i]?.id,this.BuildingDetails[i]?.id==this.storedRatedBuildings[j]?.id)
//           if(this.BuildingDetails[i]?.id==this.storedRatedBuildings[j]?.id){
//             console.log(this.BuildingDetails[i]?.id,this.BuildingDetails[i]?.id==this.storedRatedBuildings[j]?.id)
// this.BuildingDetails[i].isselect = this.storedRatedBuildings[j].isselect;
//           }
//         }
        
//       }
      
     
    }, error => {
      console.log(error);
    })
  }
}


