import { Component, Inject } from '@angular/core';
import { bindCallback } from 'rxjs';
import { map } from 'rxjs/operators';
import { TAB_ID } from './providers/tab-id.provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly isOptions = String(window.location.href).includes('options');
  readonly isPopup = String(window.location.href).includes('popup');
  readonly isTab = String(window.location.href).includes('tab');

  message: string;

  constructor(@Inject(TAB_ID) readonly tabId: number) {}

  async onClick(): Promise<void> {
    this.message = await bindCallback<string>(chrome.tabs.sendMessage.bind(this, this.tabId, 'request'))()
      .pipe(
        map(msg =>
          chrome.runtime.lastError
            ? 'The current page is protected by the browser, goto: https://www.google.nl and try again.'
            : msg
        )
      )
      .toPromise();
  }
}
