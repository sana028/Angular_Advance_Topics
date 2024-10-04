import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservablesPromiseComponent } from './observables-promise.component';

describe('ObservablesPromiseComponent', () => {
  let component: ObservablesPromiseComponent;
  let fixture: ComponentFixture<ObservablesPromiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObservablesPromiseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservablesPromiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
