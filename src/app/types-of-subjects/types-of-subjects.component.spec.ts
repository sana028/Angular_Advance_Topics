import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesOfSubjectsComponent } from './types-of-subjects.component';

describe('TypesOfSubjectsComponent', () => {
  let component: TypesOfSubjectsComponent;
  let fixture: ComponentFixture<TypesOfSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypesOfSubjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypesOfSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
