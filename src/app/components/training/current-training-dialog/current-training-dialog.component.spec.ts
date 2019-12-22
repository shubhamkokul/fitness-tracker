import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentTrainingDialogComponent } from './current-training-dialog.component';

describe('CurrentTrainingDialogComponent', () => {
  let component: CurrentTrainingDialogComponent;
  let fixture: ComponentFixture<CurrentTrainingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentTrainingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentTrainingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
