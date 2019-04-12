import { ChangeDetectorRef, Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { TAB_ID } from './tab-id.injector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
// tslint:disable:variable-name
export class AppComponent {
  private readonly _message = new Subject<string>();

  readonly tabId = this._tabId;
  readonly message$ = this._message
    .asObservable()
    .pipe(tap(() => setTimeout(() => this._changeDetector.detectChanges())));

  constructor(
    @Inject(TAB_ID) private readonly _tabId: number,
    private readonly _changeDetector: ChangeDetectorRef
  ) {}

  onClick(): void {
    chrome.tabs.sendMessage(this.tabId, 'request', message => {
      this._message.next(
        chrome.runtime.lastError
          ? `The current page is protected by the browser or try to refresh the current page...`
          : message
      );
    });
  }
}
