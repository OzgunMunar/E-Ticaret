import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, effect, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CategoryModel } from "@/shared/category.model"

@Component({
  imports: [
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

}
