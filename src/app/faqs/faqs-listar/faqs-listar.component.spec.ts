import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqsListarComponent } from './faqs-listar.component';

describe('FaqsListarComponent', () => {
  let component: FaqsListarComponent;
  let fixture: ComponentFixture<FaqsListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqsListarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqsListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
