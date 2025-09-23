import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal, ViewEncapsulation } from '@angular/core';
import { ProductModel } from "@/shared/product.model"
import { TrCurrencyPipe } from 'tr-currency'
import { InfiniteScrollDirective } from 'ngx-infinite-scroll'
import { ActivatedRoute } from '@angular/router';

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
  readonly data = computed(() => this.result.value() ?? [])
  readonly dataSignal = signal<ProductModel[]>([])
  readonly #activated = inject(ActivatedRoute)
  readonly categoryKey = signal<string | undefined>(undefined)

  readonly result = httpResource<ProductModel[]>(
    () => {

      let endpoint = 'apiUrl/products?'

      if (this.categoryKey()) {

        endpoint += `categoryId=${this.categoryKey()}&`

      }

      endpoint += `_limit=${this.limit()}&_start=${this.start()}`

      // const endpoint = `apiUrl/products?_limit=${this.limit()}&_start=${this.start()}`
      return endpoint

    });

  constructor() {

    this.#activated.params.subscribe((res) => {

      if (res['categoryKey']) {
        this.categoryKey.set(res['categoryKey'])
      }

      this.dataSignal.set([])
      this.start.set(0)

    })

    effect(() => {

      const currentData = this.data()

      if(this.start() === 0) {
        this.dataSignal.set(currentData)
      } else {
        this.dataSignal.update(prevVal => [...prevVal, ...currentData])
      }

    })

  }

  onScroll() {
    this.limit.update(prevVal => prevVal + 6)
    this.start.update(prevVal => prevVal + 6)
  }

}
