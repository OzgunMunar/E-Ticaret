import { AfterViewInit, ChangeDetectionStrategy, Component, inject, input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { BreadCrumbModel } from '../pages/layouts/breadcrumb';
import { Common } from '../services/common';

@Component({
  selector: "app-blank",
  imports: [],
  template: `
    <title>e-Ticaret Admin | {{ pageTitle() }}</title>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export default class Blank implements OnInit{
  
  ngOnInit(): void {
    this.#common.set(this.breadcrumbs())
  }
  
  readonly pageTitle = input.required<string>()
  readonly breadcrumbs = input.required<BreadCrumbModel[]>()

  readonly #common = inject(Common)

}

// 108. 7. dakika
