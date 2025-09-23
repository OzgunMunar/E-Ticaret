import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, effect, inject, ViewEncapsulation } from '@angular/core';
import { Common } from '../../services/common';
import { BasketModel } from '@/shared/basket.model';
import { TrCurrencyPipe } from 'tr-currency';

@Component({
  imports: [
    TrCurrencyPipe
  ],
  templateUrl: './basket.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Basket {

  readonly #common = inject(Common)
  readonly total = computed(() => {
    
    let val = 0

    this.data().forEach((res) => {

      val += res.productPrice * res.quantity

    })

    return val

  })

  readonly result = httpResource<BasketModel[]>(() => {

    const user = this.#common.user()

    if (!user) {
      return undefined
    }

    return `apiUrl/baskets?userId=${user.id}`

  })

  readonly kdv = computed(() => {

    return (this.total() * 0.18)

  })

  readonly data = computed(() => this.result.value() ?? [])

}
