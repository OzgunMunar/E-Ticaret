import { ChangeDetectionStrategy, Component, 
  computed, inject, resource, signal, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import Blank from 'apps/admin/src/components/blank';
import { CategoryModel, initialCategory } from '../categories';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FlexiToastService } from 'flexi-toast';
import { lastValueFrom } from 'rxjs';

@Component({
  imports: [
    Blank,
    FormsModule
  ],
  templateUrl: './create.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export default class CreateCategory {

  readonly id = signal<string | undefined>(undefined)
  readonly cardTitle = computed(() => this.id() ? 'Kategori Guncelle' : "Kategori Ekle")
  readonly btnName = computed(() => this.id() ? 'Kategori Guncelle' : "Kategori Ekle")
  readonly breadCrumbName = computed(() => this.id() ? 'Kategori Güncelle' : 'Kategori Ekle')
  readonly result = resource({
    params: () => this.id(),
    loader: async() => {
      
      var res = await lastValueFrom(this.#http.get<CategoryModel>
        (`http://localhost:3000/categories/${this.id()}`))
      
      return res

    }
  })
  readonly data = computed(() => this.result.value() ?? initialCategory)

  readonly #http = inject(HttpClient)
  readonly #activated = inject(ActivatedRoute)
  readonly #toast = inject(FlexiToastService)
  readonly #router = inject(Router)

  constructor() {
    this.#activated.params.subscribe((res) => {

      if (res["id"]) {
        this.id.set(res["id"])
      }

    })
  }

  save(form: NgForm) {

    if (!form.valid) return
    
    const { id, ...payload } = this.data()

    if (!this.id()) {
      
      this.#http.post("http://localhost:3000/categories", payload)
        .subscribe((res) => {

          console.log("yeni kategori", res)
          this.#toast.showToast("Başarılı", "Kategori kaydı başarılı.", "success")
          this.#router.navigateByUrl('/categories')

        })

    } else {

      this.#http.put(`http://localhost:3000/categories/${this.id()}`, this.data())
        .subscribe((res) => {

          this.#toast.showToast("Başarılı", "Kategori kaydı başarıyla güncellendi.", "success")
          this.#router.navigateByUrl('/categories')

        })

    }

  }

}
