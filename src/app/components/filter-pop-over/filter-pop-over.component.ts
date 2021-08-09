import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { ApiService } from 'src/app/services/app.service';

@Component({
  selector: 'app-filter-pop-over',
  templateUrl: './filter-pop-over.component.html',
  styleUrls: ['./filter-pop-over.component.scss'],
})
export class FilterPopOverComponent implements OnInit {
  product: any;
  isSelect: boolean;

  public form = [
    { val: '1', isChecked: true },
    { val: '2', isChecked: false },
    { val: '3', isChecked: false },
    { val: '4', isChecked: false },
    { val: '5', isChecked: false },
  ];
  selectedvalue=[];
  Buildings=[];
  result=[];
  constructor(private popoverController:PopoverController,private apiservice:ApiService) { }

  ngOnInit() { 
    this.Buildings = JSON.parse(localStorage.getItem('BuildingDetails'));
  }
  setValue(event){
    
    this.selectedvalue.push(event);
  }
  apply(){
    for(let i=0;i<this.selectedvalue.length;i++){
      if (this.Buildings==null) {
        return null;
      }else{
      this.result.push(Object.assign({}, ...this.Buildings.filter(item=>
        {
          console.log(item);
         return item.isselect ==this.selectedvalue[i]
        })
            
));
        }
    };
 
    this.popoverController.dismiss(this.result);
  
      
        
  }
  
  viewMainCat(type) {

    if (type == 1) {
      this.isSelect = true;
    } else if (type == 2) {
      this.isSelect = false;
    }

  }


}
