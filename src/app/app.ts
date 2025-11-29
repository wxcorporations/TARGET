import { Component, signal, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { RouterOutlet } from '@angular/router';
import { Header } from './presentation/layout/header/header';
import { CreateStores } from './application/create-stores';




@Injectable({ providedIn: 'root' })
export class EnvironmentService {
  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('target-front');


  ngOnInit(): void {
    const env = new EnvironmentService('browser' as any)

    if (env.isBrowser && typeof window !== 'undefined') {
      const store = new CreateStores()
      store.execute()
    }
  }

}


