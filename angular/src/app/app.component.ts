import { ChangeDetectorRef, Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { TAB_ID } from './tab-id.injector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private readonly message = new Subject<string>();

  readonly message$ = this.message
    .asObservable()
    .pipe(tap(() => setTimeout(() => this.changeDetector.detectChanges())));

  readonly isOptions = String(window.location.href).includes('options');
  readonly isPopup = String(window.location.href).includes('popup');
  readonly isTab = String(window.location.href).includes('tab');

  constructor(@Inject(TAB_ID) readonly tabId: number, private readonly changeDetector: ChangeDetectorRef) {}

  onClick(): void {
    chrome.tabs.sendMessage(this.tabId, 'request', message => {
      this.message.next(
        chrome.runtime.lastError
          ? `The current page is protected by the browser, goto: https://www.google.nl and try again.`
          : message
      );
    });
  }
}
