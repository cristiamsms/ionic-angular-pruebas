import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../pages/models/lista.model';

@Pipe({
  name: 'filtro',
  pure: false
})
export class FiltroPipe implements PipeTransform {

  transform(listas:Lista[], completada:boolean=true): Lista[] {
    
    return listas.filter(lista=>lista.terminada === completada);
  }

}
