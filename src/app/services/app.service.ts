
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    url:string=`https://narayan.iqnext.io/places/`
  constructor(private http: HttpClient, public toastController: ToastController) { }

  //Toast
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      mode:'md',
      position: 'middle',
      cssClass: 'customToastClass',
      buttons: [ {
        text: 'Cancel',
          role: 'cancel',
        handler: () => {
          
        }
      }
        ]
    });
    toast.present();
    const { role } = await toast.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  
  getBuildings() {
    return this.http.get<any>(this.url);
  }
}