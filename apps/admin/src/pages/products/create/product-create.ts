import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Blank from 'apps/admin/src/components/blank';

@Component({
  imports: [
    Blank,
    FormsModule
  ],
  templateUrl: './product-create.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export default class ProductCreate {

  readonly #http = inject(HttpClient)
  readonly #router = inject(Router)

  save(form: NgForm) {

    if (!form.valid) {
      return
    } else {

      this.#http.post("http://localhost:3000/products", form.value).subscribe(() => {
        this.#router.navigateByUrl("/products")
      })

    }

  }

}
