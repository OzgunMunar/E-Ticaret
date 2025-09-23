import { HttpClient, httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal, ViewEncapsulation } from '@angular/core';
import { ProductModel } from "@/shared/product.model"
import { BasketModel } from "@/shared/basket.model"
import { TrCurrencyPipe } from 'tr-currency'
import { InfiniteScrollDirective } from 'ngx-infinite-scroll'
import { ActivatedRoute } from '@angular/router';
import { Common } from '../../services/common';
import { FlexiToastService } from 'flexi-toast';

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
  readonly categoryKey = signal<string | undefined>(undefined)

  readonly #activated = inject(ActivatedRoute)
  readonly #common = inject(Common)
  readonly #http = inject(HttpClient)
  readonly #toast = inject(FlexiToastService)
  
  readonly user = computed(() => this.#common.user())

  readonly result = httpResource<ProductModel[]>(
    () => {

      let endpoint = 'apiUrl/products?'

      if (this.categoryKey()) {

        endpoint += `categoryName=${this.categoryKey()}&`

      }

      endpoint += `_limit=${this.limit()}&_start=${this.start()}`
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

  addBasket(data: ProductModel) {

    const basket: BasketModel = {

      userId: this.#common.user()!.id!,
      productId: data.id!,
      productName: data.name,
      price: data.price,
      quantity: 1

    }

    this.#http.post("apiUrl/baskets", basket).subscribe((res) => {

      this.#toast.showToast("Başarılı", "Ürün sepete eklendi.")
      this.#common.basketCount.update(prevVal => prevVal + 1)

    }) 

  }

}
