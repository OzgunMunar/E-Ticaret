import { BasketModel } from '@/shared/basket.model';
import { UserModel } from '@/shared/user.model';
import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Common {
  
  readonly user = signal<UserModel | undefined>(undefined)
  readonly basketCount = signal<number>(0)

  readonly #http = inject(HttpClient)

  constructor() {
  
    const response: string | null = localStorage.getItem("response")
    
    if(response) {

      this.user.set(JSON.parse(response))

    }

    effect(() => {
      
      if(this.user()) {

        this.getBasketCount()

      } else {

        this.basketCount.set(0)

      }

    })
    
  }

  getBasketCount() {

    if(this.user()) {

      const endpoint = `apiUrl/baskets?userId=${this.user()!.id}`
      this.#http.get<BasketModel[]>(endpoint).subscribe((res) => {
      
        this.basketCount.set(res.length)

      })

    }

  }

}
