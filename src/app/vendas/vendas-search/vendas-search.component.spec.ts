import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendasSearchComponent } from './vendas-search.component';

describe('VendasSearchComponent', () => {
  let component: VendasSearchComponent;
  let fixture: ComponentFixture<VendasSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendasSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendasSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
