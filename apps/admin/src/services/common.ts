import { Injectable, signal } from '@angular/core';
import { BreadCrumbModel } from '../pages/layouts/breadcrumb';
import { UserModel } from '../pages/users/users';

@Injectable({
  providedIn: 'root'
})
export class Common {
  readonly data = signal<BreadCrumbModel[]>([])
  readonly user = signal<UserModel | undefined>(undefined)

  set(data: BreadCrumbModel[]) {

    const val: BreadCrumbModel = {
      title: "Ana Sayfa",
      icon: "home",
      url: "/"
    }
    
    this.data.set([val, ...data])

  }

}
