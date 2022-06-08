import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVehiculoComponent } from './list-vehiculo.component';

describe('ListVehiculoComponent', () => {
  let component: ListVehiculoComponent;
  let fixture: ComponentFixture<ListVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListVehiculoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
