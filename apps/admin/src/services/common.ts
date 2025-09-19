import { Injectable, signal } from '@angular/core';
import { BreadCrumbModel } from '../pages/layouts/breadcrumb';

@Injectable({
  providedIn: 'root'
})
export class Common {
  data: BreadCrumbModel[] = []

  set(data: BreadCrumbModel[]) {

    this.data = data
    
    const val: BreadCrumbModel = {
      title: "Ana Sayfa",
      icon: "home",
      url: "/"
    }

    this.data = data
    this.data.unshift(val)

  }

}
