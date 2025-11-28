import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatIconModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  shouldRun = false;


  toggleMenu() {
    this.shouldRun = !this.shouldRun
  }
}
