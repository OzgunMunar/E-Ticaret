import { UserModel } from '@/shared/user.model';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Common } from 'apps/ui/src/services/common';
import { FlexiToastService } from 'flexi-toast';

@Component({
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Login {

  readonly #http = inject(HttpClient)
  readonly #toast = inject(FlexiToastService)
  readonly #router = inject(Router)
  readonly #common = inject(Common)

  signIn(form: NgForm) {

    if(!form.valid) {
      this.#toast.showToast("Hata","Lütfen tüm alanları doldurun.","error")
      return
    }

    const userName = form.value['userName']
    const password = form.value['password']

    this.#http.get<UserModel[]>(`apiUrl/users?userName=${userName}&password=${password}`)
    .subscribe((res) => {

      if(res.length === 0) {

        this.#toast.showToast("Hata","Kullanıcı adı veya şifre yanlış","error")
        return

      }

      const user = res[0]
      localStorage.setItem("response", JSON.stringify(user))
      this.#common.user.set(user)
      this.#router.navigateByUrl("/")

    })

  }

}
