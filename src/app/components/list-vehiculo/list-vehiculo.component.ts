import { Component, OnInit } from '@angular/core';
import { Vehiculo } from 'src/app/model/vehiculo';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

  
@Component({
  selector: 'app-list-vehiculo',
  templateUrl: './list-vehiculo.component.html',
  styleUrls: ['./list-vehiculo.component.css']
})
export class ListVehiculoComponent implements OnInit {

    vehiculoSet: Vehiculo[];
    vehiculoFil: Vehiculo[];
    collectionSize: number;
    searchTerm: string;
    closeModal: string;
    msgError = '';
    currentVehiculo = null;
    currentIndex = -1;
    
    constructor(private vehiculoService : VehiculoService, 
                    private modalService: NgbModal) { 
                      
                    }
  
    ngOnInit(): void {
      this.refreshList();
    }
  
    triggerModal(content:any, val:Vehiculo) {
      this.currentVehiculo = val
      this.retrievePeople(this.currentVehiculo.id)
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
        this.closeModal = `Closed with: ${res}`;
      }, (res) => {
        this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
      });
    }
    
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }
  
    search(value: string): void {
      this.vehiculoFil = this.vehiculoSet.filter((val) => val.referencia.toLowerCase().includes(value));
      this.collectionSize = this.vehiculoFil.length;
    }
  
    retrievePeoples(): void {
      this.vehiculoService.getAll()
        .subscribe(
          data => {
            this.vehiculoSet = data;
            console.log(data);
          },
          error => {
            console.log(error);
          });
    }
  
    retrievePeople(val:string): void {
      this.vehiculoService.get(val)
        .subscribe(
          data => {
            this.currentVehiculo = data;
            console.log(data);
          },
          error => {
            this.msgError =  error.message +' \n '+ error.error.message;
            console.log(error);
          });
    }
  
    updatePeople(): void {
     this.vehiculoService.update(this.currentVehiculo.id, this.currentVehiculo)
        .subscribe(
          data => {
            this.refreshList();
            console.log(data);
          },
          error => {
            console.log(error);
          });
    }
  
    deletePeople(val1:string): void {
      this.vehiculoService.delete(val1)
         .subscribe(
           data => {
             this.refreshList();
             console.log(data);
           },
           error => {
             console.log(error);
           });
     }
  
    setActivePeople(vehiculo : Vehiculo, index : number): void {
      this.currentVehiculo = vehiculo;
      this.currentIndex = index
    }
  
    refreshList(): void {
      this.retrievePeoples();
    }
  
  
  
  }