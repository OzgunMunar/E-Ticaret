export interface ProductModel {
  id?: number,
  name: string,
  imageUrl: string,
  price: number,
  stock: number,
  categoryId: number,
  categoryName: string
}

export const initialProduct: ProductModel = {
  name: "",
  imageUrl: "",
  price: 0,
  stock: 0,
  categoryId: 132,
  categoryName: "Telefon"
}
