import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadMeBlockComponent } from './read-me-block.component';

describe('ReadMeBlockComponent', () => {
  let component: ReadMeBlockComponent;
  let fixture: ComponentFixture<ReadMeBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadMeBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadMeBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
