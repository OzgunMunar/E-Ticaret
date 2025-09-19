import { ChangeDetectionStrategy, Component, signal, ViewEncapsulation } from '@angular/core';
import Blank from '../../components/blank';
import { FlexiGridModule } from 'flexi-grid';

export interface ProductModel {
  id: string,
  name: string,
  imageUrl: string,
  price: number,
  stock: number
}


@Component({
  imports: [
    Blank,
    FlexiGridModule],
  templateUrl: './products.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export default class Products {

  readonly data = signal<ProductModel[]>([
    {
      id:"1",
      imageUrl: "https://m.media-amazon.com/images/I/71+8503v2xL._AC_UL640_FMwebp_QL65_.jpg",
      name: 'BMW 1.5i',
      price: 10000000,
      stock: 15
    }
  ])

}
