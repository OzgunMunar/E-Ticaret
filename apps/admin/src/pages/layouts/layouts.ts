import { ChangeDetectionStrategy, Component, computed, signal, ViewEncapsulation } from '@angular/core';
import Breadcrumb from './breadcrumb';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { navigations } from '../../navigation';
import { NavbarPipe } from '../../pipes/navbar-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [
    Breadcrumb,
    RouterLink,
    RouterLinkActive,
    NavbarPipe,
    FormsModule],
  templateUrl: './layouts.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export default class Layouts {

  readonly navigations = computed(() => navigations)
  readonly search = signal<string>("")

}
