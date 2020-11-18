import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeseosService } from 'src/app/services/deseos.service';
import { ListaItem } from '../models/lista-item.model';
import { Lista } from '../models/lista.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

    lista:Lista;
    nombreItem='';
  constructor(private service:DeseosService,private route:ActivatedRoute) {
    const id= this.route.snapshot.paramMap.get('listaId');
      this.lista=service.cargarLista(id);

   }

  ngOnInit() {
  }
  agregarItem(){
    if (this.nombreItem.length ===0) {
      return;
    }
    const nuevoItem= new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);
    this.nombreItem='';
    this.service.guardarStorage();
    
  }
  cambioCheck(item:ListaItem){

    const pendientes = this.lista.items
                                    .filter(itemData => !itemData.completado)
                                    .length;

    if(pendientes === 0){
      this.lista.terminadaEn=new Date();
      this.lista.terminada=true;
    } else{
      this.lista.terminadaEn=null;
      this.lista.terminada=false;
    }

    this.service.guardarStorage();
    console.log(this.service.listas);
  }
  borrar(i:number){

    this.lista.items.splice(i,1);
    this.service.guardarStorage();

  }

}
