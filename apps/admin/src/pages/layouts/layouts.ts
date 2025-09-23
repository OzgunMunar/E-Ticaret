import { ChangeDetectionStrategy, Component, computed, inject, signal, ViewEncapsulation } from '@angular/core';
import Breadcrumb from './breadcrumb';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { navigations } from '../../navigation';
import { NavbarPipe } from '../../pipes/navbar-pipe';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Common } from '../../services/common';

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
  readonly #common = inject(Common)
  readonly user = computed(() => this.#common.user()!)
  readonly #router = inject(Router)
    
  constructor() {

    setInterval(() => {

      this.time.set(new Date())

    }, 1000)

  }

  logout() {
    localStorage.clear()
    this.#common.user.set(undefined)
    this.#router.navigateByUrl("/login")
  }


}
