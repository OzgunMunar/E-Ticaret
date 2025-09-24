import { ChangeDetectionStrategy, Component, computed, inject, signal, ViewEncapsulation } from '@angular/core';
import { Common } from '../../services/common';
import { HttpClient, httpResource } from '@angular/common/http';
import { BasketModel } from '@/shared/basket.model';
import { TrCurrencyPipe } from 'tr-currency';
import { OrderModel, initialOrder } from "@/shared/order.model"
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { FlexiToastService } from 'flexi-toast';
import { DatePipe } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  imports: [
    TrCurrencyPipe,
    FormsModule,
    DatePipe,
    ReactiveFormsModule,
    NgxMaskDirective
  ],
  providers: [provideNgxMask()],
  templateUrl: './payment.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export default class Payment {

  readonly result = httpResource<BasketModel[]>(() => {

    return `apiUrl/baskets?userId=${this.#common.user()!.id}`

  })

  readonly baskets = computed(() => this.result.value() ?? [])
  readonly data = signal<OrderModel>({...initialOrder})
  readonly term = signal<boolean>(false)

  readonly #common = inject(Common)
  readonly #toast = inject(FlexiToastService)
  readonly #http = inject(HttpClient)
  readonly showSuccessPart = signal<boolean>(false)

  readonly total = computed(() => {

    let val = 0

    this.baskets().forEach((res) => {

      val += res.productPrice * res.quantity

    })

    return val

  })

  readonly kdv = computed(() => {

    return (this.total() * 0.18)

  })

  pay(form: NgForm) {

    if(!this.term()) {
      this.#toast.showToast("Uyari", "Lütfen kullanım koşullarını kabul edin.", "info")
      return
    }

    if (!form.valid) {

      this.#toast.showToast("Hata", "Lütfen tüm alanları doldurun.", "error")
      return

    }

    this.data.update((prevVal) => ({

      ...prevVal,
      basket: [...this.baskets()],
      userId: this.#common.user()!.id!,
      orderNumber: `TS-${new Date().getFullYear()}-${new Date().getTime()}}`,
      date: new Date()

    }))

    this.#http.post(`apiUrl/orders`, this.data()).subscribe((res) => {

      this.showSuccessPart.set(true)
      this.#common.basketCount.set(0)

      this.baskets().forEach(item => {
        this.#http.delete(`apiUrl/baskets/${item.id}`).subscribe()
      })

    })

  }

}
