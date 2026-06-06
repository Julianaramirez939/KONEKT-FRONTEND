import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityRegisterComponent } from './university-register.component';

describe('UniversityRegisterComponent', () => {
  let component: UniversityRegisterComponent;
  let fixture: ComponentFixture<UniversityRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniversityRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversityRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
