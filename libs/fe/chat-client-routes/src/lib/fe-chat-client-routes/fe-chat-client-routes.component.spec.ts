import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeChatClientRoutesComponent } from './fe-chat-client-routes.component';

describe('FeChatClientRoutesComponent', () => {
  let component: FeChatClientRoutesComponent;
  let fixture: ComponentFixture<FeChatClientRoutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeChatClientRoutesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeChatClientRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
