import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendasUpdateComponent } from './vendas-update.component';

describe('VendasUpdateComponent', () => {
  let component: VendasUpdateComponent;
  let fixture: ComponentFixture<VendasUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendasUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendasUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
