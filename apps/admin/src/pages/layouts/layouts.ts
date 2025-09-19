import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import Breadcrumb from './breadcrumb';

@Component({
  imports: [Breadcrumb],
  templateUrl: './layouts.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Layouts {

}
