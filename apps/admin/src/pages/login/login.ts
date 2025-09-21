import { HttpClient, HttpParams } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserModel } from "@/shared/user.model"
import { FlexiToastService } from 'flexi-toast';
import { Router } from '@angular/router';

@Component({
  imports: [
    FormsModule
  ],
  templateUrl: './login.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export default class Login {

  readonly #http = inject(HttpClient)
  readonly #toast = inject(FlexiToastService)
  readonly #router = inject(Router)

  signIn(form: NgForm) {

    if(!form.valid) return

    const params = new HttpParams()
      .set('userName', form.value['userName'])
      .set('password', form.value['password']);

    this.#http.get<UserModel[]>('apiUrl/users', { params }).subscribe((res) => {

      if(res.length === 0) {
        this.#toast.showToast("Hata","Kullanıcı adı veya şifre yanlış!","error")
        return
      } else if(!res[0].isAdmin) {
        this.#toast.showToast("Hata","Buraya giriş yapmaya yetkiniz yok.","error")
        return
      }

      localStorage.setItem("response", JSON.stringify(res[0]))
      this.#router.navigateByUrl("/")

    })

  }

}
