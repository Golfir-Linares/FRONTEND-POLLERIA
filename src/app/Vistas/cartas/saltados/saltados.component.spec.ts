import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaltadosComponent } from './saltados.component';

describe('SaltadosComponent', () => {
  let component: SaltadosComponent;
  let fixture: ComponentFixture<SaltadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaltadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaltadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
