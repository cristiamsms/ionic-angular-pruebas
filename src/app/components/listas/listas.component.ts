import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { Lista } from 'src/app/pages/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
@Input() terminada =true;
@ViewChild(IonList) lista:IonList;




  constructor(public service:DeseosService,private router:Router,private alert:AlertController) { }

  ngOnInit() {}
  listaSelecionada(lista:Lista  ){
    if (this.terminada) {
      
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    }
    this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
  }
  borrar(lista:Lista)
  { 
    this.service.borrarLista(lista);    
    this.service.guardarStorage();

  }
   async editar(lista:Lista)
  {
    const alert = await this.alert.create({
      header: 'Editar lista',
      inputs:[
        {
          name:'titulo',
          type:'text',
          value:lista.titulo,
          placeholder:'nombre de la lista'
        }
      ],
    
      buttons: [{
        text:'cancelar',
        role:'cancel',
        handler:()=>{
          this.lista.closeSlidingItems();
        }
      },
      {
        text:'Actualizar',
        handler:(data)=>{
          if (data.titulo.length === 0) {

            return;
            
          } 
           lista.titulo=data.titulo;
          this.service.guardarStorage();
          this.lista.closeSlidingItems();
        }
      }]
    });

    alert.present();

  }
}
