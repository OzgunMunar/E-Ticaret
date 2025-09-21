import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, resource, signal, ViewEncapsulation } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { initialUser, UserModel } from '../users';
import { ActivatedRoute, Router } from '@angular/router';
import { FlexiToastService } from 'flexi-toast';
import { FormsModule, NgForm } from '@angular/forms';
import Blank from 'apps/admin/src/components/blank';

@Component({
  imports: [
    Blank,
    FormsModule
  ],
  templateUrl: './create.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export default class Create {

  readonly #http = inject(HttpClient)
  readonly id = signal<string | undefined>(undefined)

  readonly data = computed(() => this.result.value() ?? { ...initialUser })
  readonly #activated = inject(ActivatedRoute)

  readonly cardTitle = computed(() => this.id() ? "Kullanıcı Güncelle" : "Kullanıcı Ekle")
  readonly btnName = computed(() => this.id() ? "Güncelle" : "Kaydet")
  readonly breadCrumbName = computed(() => this.id() ? 'Kullanıcı Güncelle' : 'Kullanıcı Ekle')
  readonly #router = inject(Router)
  readonly #toast = inject(FlexiToastService)

  readonly result = resource({
    params: () => this.id(),
    loader: async () => {
      
      var res = await lastValueFrom(this.#http.get<UserModel>(`apiUrl/users/${this.id()}`))
      return res

    }
  })


  constructor() {
    this.#activated.params.subscribe((res) => {

      if (res['id']) {
        this.id.set(res['id'])
      }

    })
  }

  save(form: NgForm) {

    if (!form.valid) return

    if (!this.id()) {
        this.#http.post("apiUrl/users", this.data()).subscribe((res) => {
        this.#toast.showToast("Başarılı", "Kullanıcı başarıyla kaydedildi.")
        this.#router.navigateByUrl("/users")
      })
    } else {
        this.#http.put(`apiUrl/users/${this.id()}`, this.data()).subscribe((res) => {
        this.#toast.showToast("Başarılı", "Kullanıcı başarıyla güncellendi.")
        this.#router.navigateByUrl("/users")
      })
    }

  }

}