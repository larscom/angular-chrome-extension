import { Component, Inject, signal } from '@angular/core'
import { TAB_ID } from 'src/app/app.config'

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [],
  templateUrl: 'popup.component.html',
  styleUrls: ['popup.component.scss']
})
export class PopupComponent {
  message = signal('')

  constructor(@Inject(TAB_ID) readonly tabId: number) {}

  onClick() {
    chrome.tabs.sendMessage(this.tabId, 'request', (msg) => {
      this.message.set(
        chrome.runtime.lastError
          ? 'The current page is protected by the browser, goto: https://www.google.nl and try again.'
          : msg
      )
    })
  }
}
