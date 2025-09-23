import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, effect, inject, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CategoryModel } from "@/shared/category.model"
import { CommonModule } from '@angular/common';
import { Common } from '../../services/common';

@Component({
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './layouts.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export default class Layouts {

  readonly result = httpResource<CategoryModel[]>(() => "apiUrl/categories")
  readonly data = computed(() => this.result.value() ?? [])
  readonly #router = inject(Router)
  readonly #common = inject(Common)
  readonly user = computed(() => this.#common.user())
  readonly basketCount = computed(() => this.#common.basketCount())

  logOut() {

    localStorage.clear()
    this.#common.user.set(undefined)
    this.#common.basketCount.set(0)
    this.#router.navigateByUrl("/auth/login")
  }

}
