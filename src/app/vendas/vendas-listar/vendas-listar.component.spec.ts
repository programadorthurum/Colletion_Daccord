import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendasListarComponent } from './vendas-listar.component';

describe('VendasListarComponent', () => {
  let component: VendasListarComponent;
  let fixture: ComponentFixture<VendasListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendasListarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendasListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
