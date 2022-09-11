import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyEducationComponent } from './faculty-education.component';

describe('FacultyEducationComponent', () => {
  let component: FacultyEducationComponent;
  let fixture: ComponentFixture<FacultyEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyEducationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
