export interface CategoryModel {
  id?: number,
  name: string,
  url: string
}

export const initialCategory: CategoryModel = {
  name: "",
  url: ""
}