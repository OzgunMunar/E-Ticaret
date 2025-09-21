import { ChangeDetectionStrategy, Component, computed, inject, signal, ViewEncapsulation } from '@angular/core';
import Blank from '../../components/blank';
import { FlexiGridFilterDataModel, FlexiGridModule } from 'flexi-grid';
import { HttpClient, httpResource } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { FlexiToastService } from 'flexi-toast';
import { ProductModel } from "@/shared/product.model"
import { CategoryModel } from "@/shared/category.model"

@Component({
  imports: [
    Blank,
    FlexiGridModule,
    RouterLink,
  ],
  templateUrl: './products.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export default class Products {

  readonly result = httpResource<ProductModel[]>(() => "apiUrl/products")
  readonly categoryResult = httpResource<CategoryModel[]>(() => "apiUrl/categories")
  readonly data = computed(() => this.result.value() ?? [])
  readonly loading = computed(() => this.result.isLoading())

  readonly #http = inject(HttpClient);
  readonly #toast = inject(FlexiToastService)

  readonly categoryFilter = computed<FlexiGridFilterDataModel[]>(() => {

    const categories = this.categoryResult.value() ?? []
    const filters = categories.map<FlexiGridFilterDataModel>((val) => 
      ({ name: val.name, value: val.name }))

    return filters
    
  })

  delete(id?: number) {

    if(!id) {
      this.#toast.showToast("Hata", "Geçersiz kategori ID", "info");
      return;
    }

    this.#toast.showSwal("Ürünü Sil?", "Ürünü silmek istediğinize emin misiniz?", "Sil", () => {

      this.#http.delete(`apiUrl/products/${id}`)
        .subscribe((res) => {

          this.result.reload()
          this.#toast.showToast("İşlem başarılı", "Ürün silindi.")

        })

    })

  }

}
