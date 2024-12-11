import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeChatClientPagesComponent } from './fe-chat-client-pages.component';

describe('FeChatClientPagesComponent', () => {
  let component: FeChatClientPagesComponent;
  let fixture: ComponentFixture<FeChatClientPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeChatClientPagesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeChatClientPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
