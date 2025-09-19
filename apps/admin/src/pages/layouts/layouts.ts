import { ChangeDetectionStrategy, Component, computed, signal, ViewEncapsulation } from '@angular/core';
import Breadcrumb from './breadcrumb';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { navigations } from '../../navigation';
import { NavbarPipe } from '../../pipes/navbar-pipe';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  imports: [
    Breadcrumb,
    RouterLink,
    RouterLinkActive,
    NavbarPipe,
    FormsModule,
    DatePipe,
    RouterOutlet],
  templateUrl: './layouts.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export default class Layouts {

  readonly navigations = computed(() => navigations)
  readonly search = signal<string>("")
  readonly time = signal<Date | string>(new Date())

  constructor() {
    setInterval(() => {
      this.time.set(new Date())
    }, 1000)
  }

}
