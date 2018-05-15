import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowmailComponent } from './showmail.component';

describe('ShowmailComponent', () => {
  let component: ShowmailComponent;
  let fixture: ComponentFixture<ShowmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
