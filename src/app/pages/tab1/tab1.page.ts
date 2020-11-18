import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DeseosService } from 'src/app/services/deseos.service';
import { Lista } from '../models/lista.model';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public deseosService:DeseosService,private router:Router,private alert:AlertController) {

 
  }
  async agregarLista(){
    const alert = await this.alert.create({
      header: 'Nueva lista',
      inputs:[
        {
          name:'titulo',
          type:'text',
          placeholder:'nombre de la lista'
        }
      ],
    
      buttons: [{
        text:'cancelar',
        role:'cancel'
      },
      {
        text:'crear',
        handler:(data)=>{
          if (data.titulo.length === 0) {

            return;
            
          } 
          const id= this.deseosService.crearLista(data.titulo);
          this.router.navigateByUrl(`/tabs/tab1/agregar/${id}`);
        }
      }]
    });

    alert.present();

   

  }
  
}
