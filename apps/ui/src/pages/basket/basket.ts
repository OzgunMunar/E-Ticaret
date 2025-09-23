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

  readonly result = httpResource<BasketModel[]>(() => {

    const user = this.#common.user()

    if (!user) {
      return undefined
    }

    return `apiUrl/baskets?userId=${user.id}`

  })


  readonly data = computed(() => this.result.value() ?? [])

}
