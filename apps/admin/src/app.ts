import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({

  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: '<router-outlet />',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush

})

export default class App {



}
