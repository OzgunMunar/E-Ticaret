import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, effect, signal, ViewEncapsulation } from '@angular/core';
import { ProductModel } from "@/shared/product.model"
import { TrCurrencyPipe } from 'tr-currency'
import { InfiniteScrollDirective } from 'ngx-infinite-scroll'

@Component({
  imports: [
    TrCurrencyPipe,
    InfiniteScrollDirective
  ],
  templateUrl: './home.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export default class Home {

  readonly limit = signal<number>(6)
  readonly start = signal<number>(0)
  readonly result = httpResource<ProductModel[]>(
  () => {
      const endpoint = `apiUrl/products?_limit=${this.limit()}&_start=${this.start()}`
      return endpoint
  });

  readonly data = computed(() => this.result.value() ?? [])
  readonly dataSignal = signal<ProductModel[]>([])

  constructor() {

    effect(() => {

      this.dataSignal.update(prevVal => [...prevVal, ...this.data()])

    })

  }

  onScroll() {
    this.limit.update(prevVal => prevVal + 6)
    this.start.update(prevVal => prevVal + 6)
  }

}
