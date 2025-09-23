import { ChangeDetectionStrategy, Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from "@angular/forms"
import { HttpClient } from '@angular/common/http';
import { initialUser, UserModel } from "@/shared/user.model"
import { FlexiToastService } from 'flexi-toast';

@Component({
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './register.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Register {

  readonly #http = inject(HttpClient)
  readonly data = signal<UserModel>(initialUser)
  readonly #toast = inject(FlexiToastService)
  readonly #router = inject(Router)

  signUp(form: NgForm) {

    if(!form.valid) {
      this.#toast.showToast("Hata","Lütfen tüm alanları doldurun.","error")
      return
    }

    this.data.update((prevVal) => ({
      ...prevVal
    }))

    this.#http.post("apiUrl/users", this.data()).subscribe(() => {

      this.#toast.showToast("Başarılı","Kaydınız başarıyla tamamlandı. Giriş yapabilirsiniz.","success")
      this.#router.navigateByUrl("/auth/login")

    })

  }

}
