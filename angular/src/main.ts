import { bootstrapApplication } from '@angular/platform-browser'

import { AppComponent } from './app/app.component'
import { appConfig } from './app/app.config'

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const { id: tabId } = [...tabs].pop()
  bootstrapApplication(AppComponent, appConfig(tabId)).catch((err) => console.error(err))
})
