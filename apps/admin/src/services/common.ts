import { Injectable, signal } from '@angular/core';
import { BreadCrumbModel } from '../pages/layouts/breadcrumb';

@Injectable({
  providedIn: 'root'
})
export class Common {
  readonly data = signal<BreadCrumbModel[]>([])

  set(data: BreadCrumbModel[]) {

    const val: BreadCrumbModel = {
      title: "Ana Sayfa",
      icon: "home",
      url: "/"
    }
    
    this.data.set([val, ...data])

  }

}
