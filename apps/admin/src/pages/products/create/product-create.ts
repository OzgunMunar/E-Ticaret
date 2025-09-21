import { HttpClient, httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, linkedSignal, resource, signal, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Blank from 'apps/admin/src/components/blank';
import { FlexiToastService } from 'flexi-toast';
import { NgxMaskDirective } from 'ngx-mask';
import { lastValueFrom } from 'rxjs';
import { ProductModel, initialProduct } from "@/shared/product.model"
import { CategoryModel } from "@/shared/category.model"
import { FlexiSelectModule } from 'flexi-select';

@Component({
  imports: [
    Blank,
    FormsModule,
    NgxMaskDirective,
    FlexiSelectModule
  ],
  templateUrl: './product-create.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export default class ProductCreate {

  readonly #http = inject(HttpClient)
  readonly #router = inject(Router)
  readonly #toast = inject(FlexiToastService)

  readonly id = signal<string | undefined>(undefined)
  readonly #active = inject(ActivatedRoute)

  readonly data = linkedSignal(() => this.result.value() ?? {...initialProduct})
  readonly cardTitle = computed(() => this.id() ? 'Ürün Güncelle' : 'Ürün Ekle')
  readonly btnName = computed(() => this.id() ? 'Ürün Güncelle' : 'Ürün Ekle')
  readonly breadCrumbName = computed(() => this.id() ? 'Ürün Güncelle' : 'Ürün Ekle')

  readonly categoryResult = httpResource<CategoryModel[]>(() => "apiUrl/categories")
  readonly categories = computed(() => this.categoryResult.value() ?? [])
  readonly categoryLoading = computed(() => this.categoryResult.isLoading())

  readonly result = resource({
    params: () => this.id(),
    loader: async () => {

      var res = await lastValueFrom(this.#http.get<ProductModel>
        (`apiUrl/products/${this.id()}`))
      return res

    }
  })

  constructor() {
    this.#active.params.subscribe((res) => {

      if (res["id"]) {
        this.id.set(res["id"])
      }

    })
  }

  save(form: NgForm) {

    if (!form.valid) {
      return
    }

    const { id, ...payload } = this.data()

    if (!this.id()) {

      this.#http.post("apiUrl/products", payload).subscribe(() => {
        this.#router.navigateByUrl("/products")
        this.#toast.showToast("Başarılı", "Ürün başarıyla eklendi.", "success")})
    } else {

      this.#http.put(`apiUrl/products/${this.id()}`, this.data()).subscribe(() => {
      this.#router.navigateByUrl("/products")
      this.#toast.showToast("Başarılı", "Ürün başarıyla güncellendi.", "info")})

    }

  }

  setCategoryName() {
    
    const id = this.data().categoryId
    const category = this.categories().find(p => p.id == id)
    this.data.update((prevVal) => ({...prevVal, categoryName: category?.name ?? ""}))
  }

}
