import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaufaComponent } from './chaufa.component';

describe('ChaufaComponent', () => {
  let component: ChaufaComponent;
  let fixture: ComponentFixture<ChaufaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChaufaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChaufaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
