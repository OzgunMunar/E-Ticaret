import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoryModel } from "@/shared/category.model"

@Component({
  imports: [
    RouterOutlet
  ],
  templateUrl: './layouts.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export default class Layouts {

  readonly result = httpResource<CategoryModel[]>(() => "apiUrl/categories")
  readonly data = computed(() => this.result.value() ?? [])

}
