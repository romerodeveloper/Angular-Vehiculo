import { Component, OnInit } from '@angular/core';
import { Vehiculo } from 'src/app/model/vehiculo';
import { VehiculoService } from 'src/app/services/vehiculo.service';

@Component({
  selector: 'app-add-vehiculo',
  templateUrl: './add-vehiculo.component.html',
  styleUrls: ['./add-vehiculo.component.css']
})
export class AddVehiculoComponent implements OnInit {

  people = new Vehiculo();
  submitted = false;
  msgError = '';

  constructor(private vehiculoService: VehiculoService) { 
    
  }

  ngOnInit(): void {
  }

  existsPK (val:string): void {
    this.vehiculoService.get(val)
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  savePeople(): void {
    const data = {
      id: this.people.id,
      marca: this.people.marca,
      referencia: this.people.referencia,
      modelo: this.people.modelo,
      color: this.people.color,
      estadoMecanico: this.people.estadoMecanico,
      fechaSoat: this.people.fechaSoat,      
      fechaTecnomecanica: this.people.fechaTecnomecanica,
      traspaso: this.people.traspaso
    };

    this.vehiculoService.create(data)
      .subscribe(
        data => {
          this.submitted=true;
          console.log(data);
        },
        error => {
          this.msgError  = error.message +' \n '+ error.error.message;
          console.log(error);
        });
  }

  newPeople() {
    this.submitted = false;
    this.people.id = null;
    this.people.marca = null;
    this.people.referencia = null;
    this.people.modelo = null;
    this.people.color = null;
    this.people.estadoMecanico = null;
    
    this.people.fechaSoat = null;
    this.people.fechaTecnomecanica = null;
    this.people.traspaso = null;
  }

}