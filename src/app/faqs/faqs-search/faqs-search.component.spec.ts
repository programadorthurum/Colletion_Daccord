import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqsSearchComponent } from './faqs-search.component';

describe('FaqsSearchComponent', () => {
  let component: FaqsSearchComponent;
  let fixture: ComponentFixture<FaqsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqsSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
