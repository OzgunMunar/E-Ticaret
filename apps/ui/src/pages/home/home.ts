import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, effect, ViewEncapsulation } from '@angular/core';
import { ProductModel } from "@/shared/product.model"
import { TrCurrencyPipe } from 'tr-currency'

@Component({
  imports: [
    TrCurrencyPipe
  ],
  templateUrl: './home.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export default class Home {

  readonly result = httpResource<ProductModel[]>(() => "apiUrl/products")
  readonly data = computed(() => this.result.value() ?? [])


}
