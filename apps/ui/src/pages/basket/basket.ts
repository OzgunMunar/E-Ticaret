import { HttpClient, httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, effect, inject, ViewEncapsulation } from '@angular/core';
import { Common } from '../../services/common';
import { BasketModel } from '@/shared/basket.model';
import { TrCurrencyPipe } from 'tr-currency';
import { FlexiToastService } from 'flexi-toast';

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
  readonly #http = inject(HttpClient)
  readonly #toast = inject(FlexiToastService)

  increment(val: BasketModel) {

    const updated = { ...val, quantity: val.quantity + 1 }
    this.#http.put(`apiUrl/baskets/${val.id}`, updated).subscribe(() => {

      this.result.reload()

    })

  }

  decrease(val: BasketModel) {

    const updated = { ...val, quantity: val.quantity - 1 }
    if (val.quantity - 1 <= 0) {

      this.#toast.showSwal("Sil?", "Ürünü sepetten sikmek istediğinize emin misiniz?", "Sil", () => {

        this.#http.delete(`apiUrl/baskets/${val.id}`).subscribe(() => {

          this.result.reload()

        })

      })

    } else {

      const updated = { ...val, quantity: val.quantity - 1 }

      this.#http.put(`apiUrl/baskets/${val.id}`, updated).subscribe(() => {

        this.result.reload()

      })

    }

  }

}
