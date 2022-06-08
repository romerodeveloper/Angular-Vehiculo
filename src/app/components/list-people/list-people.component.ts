import { Component, OnInit } from '@angular/core';
import { People } from 'src/app/model/people';
import { PeopleService } from 'src/app/services/people.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

  
@Component({
  selector: 'app-list-people',
  templateUrl: './list-people.component.html',
  styleUrls: ['./list-people.component.css']
})
export class ListPeopleComponent implements OnInit {

    peopleSet: People[];
    peopleFil: People[];
    collectionSize: number;
    searchTerm: string;
    closeModal: string;
    msgError = '';
    currentPeople = null;
    currentIndex = -1;
    
    constructor(private peopleService : PeopleService, 
                    private modalService: NgbModal) { 
                      
                    }
  
    ngOnInit(): void {
      this.refreshList();
    }
  
    triggerModal(content:any, val:People) {
      this.currentPeople = val
      this.retrievePeople(this.currentPeople.id)
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
      this.peopleFil = this.peopleSet.filter((val) => val.name.toLowerCase().includes(value));
      this.collectionSize = this.peopleFil.length;
    }
  
    retrievePeoples(): void {
      this.peopleService.getAll()
        .subscribe(
          data => {
            this.peopleSet = data;
            console.log(data);
          },
          error => {
            console.log(error);
          });
    }
  
    retrievePeople(val:string): void {
      this.peopleService.get(val)
        .subscribe(
          data => {
            this.currentPeople = data;
            console.log(data);
          },
          error => {
            this.msgError =  error.message +' \n '+ error.error.message;
            console.log(error);
          });
    }
  
    updatePeople(): void {
     this.peopleService.update(this.currentPeople.id, this.currentPeople)
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
      this.peopleService.delete(val1)
         .subscribe(
           data => {
             this.refreshList();
             console.log(data);
           },
           error => {
             console.log(error);
           });
     }
  
    setActivePeople(people : People, index : number): void {
      this.currentPeople = people;
      this.currentIndex = index
    }
  
    refreshList(): void {
      this.retrievePeoples();
    }
  
  
  
  }