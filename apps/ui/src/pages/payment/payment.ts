import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Common } from '../../services/common';
import { httpResource } from '@angular/common/http';
import { BasketModel } from '@/shared/basket.model';
import { TrCurrencyPipe } from 'tr-currency';
import { CommonModule } from '@angular/common';

@Component({
  imports: [
    RouterLink,
    TrCurrencyPipe,
    CommonModule
  ],
  templateUrl: './payment.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Payment {

  readonly result = httpResource<BasketModel[]>(() => {
    return `apiUrl/baskets?userId=${this.#common.user()!.id}`
  })

  readonly data = computed(() => this.result.value() ?? [])

  readonly #common = inject(Common)

  readonly total = computed(() => {

    let val = 0

    this.data().forEach((res) => {

      val += res.productPrice * res.quantity

    })

    return val

  })

  readonly kdv = computed(() => {

    return (this.total() * 0.18)

  })

}
